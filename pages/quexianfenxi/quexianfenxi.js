//缺陷分析模块
const app = getApp();
var wxCharts = require('../../utils/wxcharts.js');
var tynxpieChart = null;//缺陷按投运年限
var columnChart = null;//缺陷按类别统计
var ringChar = null;//缺陷按缺陷性质分类

Page({
  /**
   * 页面的初始数据
   */
  //设备类型绑定函数
  bindShowMsg() {
    this.setData({
      select: !this.data.select
    });

  },
  mySelect(e) {
    var name = e.currentTarget.dataset.name;
    this.setData({
      shebeiKeyword: name,
      select: false, 
      showone:true,//图表1加载按钮是否显示
      showtwo:true,//图表2加载按钮是否显示
      showthree:true,//图表3加载按钮是否显示
    });
  },
  
  

  data: {
    sblxtypelist: app.globalData.sblxtypelist,
    select: false,
    shebeiKeyword: '断路器',//当前设备类型
    // shebeilist: [],//云函数连接查询返回的数据集合
    // quexianlist: [],//通过设备类型筛选之后的数据集合
    flagone: 0,//投运1-5年
    flagtwo: 0,//投运6-10年
    flagthree: 0,//投运11-15年
    flagfour: 0,//投运15年以上
    criticalnumber:0,//危急缺陷数量
    seriousnumber:0,//严重缺陷数量
    commonlynumber:0,//一般缺陷数量
    quexiantypelist:[],//从返回缺陷数据集中提取的缺陷类别
    quexiantypetotal:[],//从返回缺陷数据集中提取的缺陷类别
    showone:true,//图表1加载按钮是否显示
    showtwo:true,//图表2加载按钮是否显示
    showthree:true,//图表3加载按钮是否显示
  },

  //设备类型赋值
  bindshebeiKeywordInputy: function (e) {
    var shebeiKeyword = e.detail.value;
    this.setData({
      shebeiKeyword: shebeiKeyword,
    })
  }
  ,
//查询按钮点击
  searchBtnClick:function(e){
  this.setData({
    shebeiKeyword: this.data.shebeiKeyword,
    showone:true,
    showtwo:true,
    showthree:true,
  });
  this.onLoad();

  },


  onLoad: function (options) {
      //权限认证
      wx.getStorage({
        key: 'userObj',
        success: function (userObj) {
          console.log('用户已登录！');
        },
        fail: function (e) {
          wx.redirectTo({
            url: '../login/login'
          })
        }
      })
      //调用云函数
      var that = this;
      wx.cloud.init();
      wx.cloud.callFunction({
        // 云函数名称
        name: 'getQueXianFenXi',
        // 传给云函数的参数
        data: {
          sbsblx: that.data.shebeiKeyword
        },
        success: function (res) {
          //获取屏幕显示宽度
          var windowWidth = wx.getSystemInfoSync().windowWidth;
          try {
            var res1 = wx.getSystemInfoSync();
            windowWidth = res1.windowWidth;
          } catch (e) {
            console.error('getSystemInfoSync failed!');
          }
  
          //1.按投运年限分布图表
         that.setData({
          flagone: res.result[0].oneflagyear,//投运1-5年
          flagtwo: res.result[0].twoflagyear,//投运6-10年
          flagthree: res.result[0].threeflagyear,//投运11-15年
          flagfour: res.result[0].fourflagyear,//投运15年以上
          showone:false,//控制加载按钮不显示 
         });
         //图表
     
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
           width: windowWidth,
           height: 350,
           dataLabel: true,
         });

           //2.按缺陷类别分布画图
           for(let i=0;i<res.result[1].length;i++){
            that.data.quexiantypelist.push(res.result[1][i].typename);
            that.data.quexiantypetotal.push(res.result[1][i].typetotal);
           };
           that.setData({
            quexiantypelist:that.data.quexiantypelist,
            quexiantypetotal:that.data.quexiantypetotal,
            showtwo:false,//控制加载按钮不显示 
           });
          columnChart = new wxCharts({
            canvasId: 'columnCanvas',
            type: 'column',
            animation: true,
            categories: that.data.quexiantypelist,
            series: [{
              name: that.data.shebeiKeyword + '缺陷数量',
              data: that.data.quexiantypetotal,
              format: function (val, name) {
                return val;
              }
            }],
            yAxis: {
              format: function (val) {
                return val;
              },
              title: that.data.shebeiKeyword,
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
            height: 350,
          });


            //3.按缺陷性质分类
            that.setData({
              showthree:false,
            });
            ringChar=new wxCharts({
              animation: true,
              canvasId: 'ringCanvas',
              type: 'ring',
              extra: {
                ringWidth: 10,//圆环的宽度
                pie: {
                  offsetAngle: -45//圆环的角度
                }
              },
              title: {
                name: '缺陷性质占比',
                color: '#7cb5ec',
                fontSize: 25
              },
              subtitle: {
                name: that.data.shebeiKeyword,
                color: 'red',
                fontSize: 25
              },
              series: [{
                name: '危急缺陷',
                data: res.result[2][0],
                stroke: false
              }, {
                name: '严重缺陷',
                data: res.result[2][1],
                stroke: false
              }, {
                name: '一般缺陷',
                data: res.result[2][2],
                stroke: false
              }],
              disablePieStroke: true,
              width: windowWidth,
              height: 350,
              dataLabel: true,
              legend: true,
              padding: 0
            });

  
  
  
        },
        fail: console.error
      });
  
     
     
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})