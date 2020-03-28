// pages/bigdata/bigdata.js
//画图插件
//const app = getApp();
var wxCharts = require('../../utils/wxcharts.js');
var columnChart = null;
var tynxpieChart = null;//按投运年限
var chartData = {
  main: {
    title: '总成交量',
    data: [10, 11, 25, 54, 3, 25, 3, 4, 6, 23, 54, 32, 13, 16, 15, 14, 13, 17, 16],
    categories: ["断路器", "隔离开关", "组合电器", "母线", "开关柜", "主变压器", "避雷器", "避雷针", "电抗器", "电力电容器", "电流互感器", "电压互感器", "放电线圈", "接地网", "绝缘子", "熔断器", "所用变", "站内电缆", "阻波器"]
  }
};

Page({


  /**
   * 页面的初始数据
   */
  data: {
    loginshow:false,//没有登录时不能查看
    chartTitle: '国网河北检修公司在运设备分布情况',
    isMainChartDisplay: true,
    shebeilist: [],
    chartDatalist: [],
    datetime: "", //当前日期
    pmstotal: 0, //设备总数
    flagone: 0,//投运1-5年
    flagtwo: 0,//投运6-10年
    flagthree: 0,//投运11-15年
    flagfour: 0,//投运15年以上
    showone:true,//图表1加载按钮是否显示
    showtwo:true,//图表2加载按钮是否显示
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   // 权限认证
    var that=this
    wx.getStorage({
      key: 'userObj',
      success: function (userObj) {
        // console.log('用户已登录！');
        that.setData({
          loginshow:true
        })

      },
      fail: function (e) {
        wx.redirectTo({
          url: '../login/login'
        })
      }
    })


    // 调用云函数
    var that = this;
    wx.cloud.init();
    wx.cloud.callFunction({
    // 云函数名称
     name: 'getShebei',
      // 传给云函数的参数
      data: {

      },
      success: function (res) { 
        
        var now = new Date();//当前日期
        for (let i = 0; i < res.result.length; i++){
          that.data.shebeilist[i] = res.result[i].sbsblx;
          that.data.chartDatalist[i] = res.result[i].total;
          that.data.pmstotal = that.data.pmstotal + res.result[i].total;
          //console.log(that.data.pmstotal);
        };
        that.setData({
          //初始值
          pmstotal: that.data.pmstotal,
          datetime: now.getFullYear() + "年" + (now.getMonth() + 1) + "月" + now.getDate() + "日",
          showone: false
        });
        var windowWidth = 320;
        try {
          var res = wx.getSystemInfoSync();
          windowWidth = res.windowWidth;
        } catch (e) {
          console.error('getSystemInfoSync failed!');
        }

        columnChart = new wxCharts({
          canvasId: 'columnCanvas',
          type: 'column',
          animation: true,
          categories: that.data.shebeilist,
          series: [{
            name: '在运设备数量',
            data: that.data.chartDatalist,
            format: function (val, name) {
              return val;
            }
          }],
          yAxis: {
            format: function (val) {
              return val ;
            },
            title: '在运设备数量分布图',
            min: 0
          },
          xAxis: {
            disableGrid: false,
            type: 'calibration'
          },
          extra: {
            column: {
              width: 15
            }
          },
          width: windowWidth,
          height: 380,
        });

    },
      fail: console.error
    });
    //调用第二个云函数,获取缺陷按投运年限分布情况
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getyunxingfenxi',
      // 传给云函数的参数
      data: {

      },
      success: function (res) {
        that.setData({
          flagone: res.result.oneflagyear,
          flagtwo: res.result.twoflagyear,
          flagthree: res.result.threeflagyear,
          flagfour: res.result.fourflagyear,
          showtwo:false
        });
        //加载投运年限图表
        var windowWidth1 = wx.getSystemInfoSync().windowWidth;
        try {
          var res1 = wx.getSystemInfoSync();
          windowWidth1 = res1.windowWidth;
        } catch (e) {
          console.error('getSystemInfoSync failed!');
        }

        tynxpieChart = new wxCharts({
          animation: true,
          canvasId: 'tynxpieCanvas',
          type: 'pie',
          series: [{
            name: '投运1-5年',
            data: that.data.flagone,
          }, {
            name: '投运6-10年',
            data: that.data.flagtwo,
          }, {
            name: '投运11-15年',
            data: that.data.flagthree,
          }, {
            name: '投运15年以上',
            data: that.data.flagfour,
          }],
          width: windowWidth1,
          height: 350,
          dataLabel: true,
        });
      },
      fail: console.error
    });






    //返回数据量超过1M，不能使用云函数,在本地拼接调用,但是云端限制并发连接数存在问题
    // wx.cloud.init();
    // const db = wx.cloud.database();
    // const MAX_LIMIT = 20;
    // var filterobj=this.data.filterobj;
    // //const countResult = db.collection('pmis').count();
    // //console.log(countResult)
    // //const total = countResult.total
    // getListCount(filterobj).then(res => {
    //   let count = res
    //   let list = []
    //   console.log(count);
    //   for (let i = 0; i < count; i += MAX_LIMIT ) {
    //     getListIndexSkip(filterobj, i).then(res => {
    //       console.log(res);
    //       list = list.concat(res);
    //       console.log(list);
    //       if (list.length == count) {
    //         resolve(list);
    //         console.log(list)
    //       }
    //     })
    //       .catch(e => {
    //         console.error(e)
    //         reject("查询失败")
    //       })
    //   }
    // });

    // //获取总数函数
    // function getListCount(filterobj) {
    //   return new Promise((resolve, reject) => {
    //     db.collection('pmis').where(filterobj).count().then(res => {
    //       resolve(res.total);
    //     }).catch(e => {
    //       console.log(e)
    //       reject("查询失败获取总数函数")
    //     })
    //   })
    // }
    // //
    // function getListIndexSkip(filterobj, skip) {
    //   return new Promise((resolve, reject) => {
    //     let statusList = []
    //     let selectPromise;
    //     if (skip > 0) {
    //       selectPromise = db.collection('pmis').where(filterobj).skip(skip).limit(MAX_LIMIT).get();
    //      //人为延时
    //      for(let k=0;k<30;k++){
    //        console.log("延时");
    //      };

    //     } else {
    //       //skip值为0时，会报错
    //       selectPromise = db.collection('pmis').where(filterobj).get()
    //     }
    //     selectPromise.then(res => {
    //       //console.log(res.data);
    //       resolve(res.data);
    //     }).catch(e => {
    //       console.error(e)
    //       reject("查询失败!单次函数")
    //     })
    //   })
    // };


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})