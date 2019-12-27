// pages/bigdata/bigdata.js
//画图插件
//const app = getApp();
var wxCharts = require('../../utils/wxcharts.js');
var columnChart = null;
var chartData = {
  main: {
    title: '总成交量',
    data: [10, 11, 25, 54, 3, 25, 3,4, 6, 23, 54, 32, 13,16, 15, 14, 13, 17, 16],
    categories: ["断路器", "隔离开关", "组合电器", "母线", "开关柜", "主变压器", "避雷器", "避雷针", "电抗器", "电力电容器", "电流互感器", "电压互感器", "放电线圈", "接地网", "绝缘子", "熔断器", "所用变", "站内电缆", "阻波器"]
  }
};

Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    chartTitle: '国网河北检修公司在运设备分布情况',
    isMainChartDisplay: true,
    shebeilist: [],
    chartDatalist: [],
  },


  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //调用云函数
    var that = this;
    wx.cloud.init();
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getShebei',
      // 传给云函数的参数
      data: {
       
      },
      success: function (res) { 
      //赋值
        for(let i=0; i< res.result.length; i++){
          that.data.shebeilist[i]=res.result[i].sbsblx;
          that.data.chartDatalist[i] = res.result[i].total;
        };
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