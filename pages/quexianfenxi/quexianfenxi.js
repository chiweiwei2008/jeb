//缺陷分析模块
const app = getApp();
var wxCharts = require('../../utils/wxcharts.js');
var tynxpieChart = null;//缺陷按投运年限
var columnChart = null;//缺陷按类别统计

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
    });
  },
  //投运年限画图
  tynxtouchHandler: function (e) {
    console.log(tynxpieChart.getCurrentDataIndex(e));
  },
  

  data: {
    sblxtypelist: app.globalData.sblxtypelist,
    select: false,
    shebeiKeyword: '断路器',//当前设备类型
    shebeilist: [],//云函数连接查询返回的数据集合
    quexianlist: [],//通过设备类型筛选之后的数据集合
    flagone: 0,//投运1-5年
    flagtwo: 0,//投运6-10年
    flagthree: 0,//投运11-15年
    flagfour: 0,//投运15年以上
    quexiantypelist:[],//从返回缺陷数据集中提取的缺陷类别
    quexiantypetotal:[],//从返回缺陷数据集中提取的缺陷类别
  
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
  });
  this.onLoad();

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
      name: 'getBigData',
      // 传给云函数的参数
      data: {
        sbsblx: that.data.shebeiKeyword
      },
      success: function (res) {
        //console.log(res.result.list);
          that.data.shebeilist= res.result;
          that.data.quexianlist=[];
        //数据分析
        //1.按设备类型统计缺陷数量
        for (var i = 0; i < that.data.shebeilist.length; i++) {
          if (that.data.shebeilist[i].sbsblx === that.data.shebeiKeyword) that.data.quexianlist[i] = that.data.shebeilist[i]
        };
        //console.log(that.data.shebeiKeyword+'缺陷数量'+that.data.quexianlist.length);
        //提取缺陷类型初值
        that.data.quexiantypelist=[];
        for(let j=0;j<that.data.quexianlist.length;j++){
             // console.log("首层循环计算器j="+j);
          if (that.data.quexiantypelist.length==0){
             if (that.data.quexianlist[j].quexianList.length>0){
               that.data.quexiantypelist.push(that.data.quexianlist[j].quexianList[0].qxqxlx);
              // console.log("that.data.quexianlist[j].quexianList[0].qxqxlx=" + that.data.quexianlist[j].quexianList[0].qxqxlx);
               break;
             };
          }
        };
         //获取全部缺陷类型
          for (let j = 0; j < that.data.quexianlist.length; j++)
          {
            //console.log("第一层循环计算器j=" + j);
             for (let k = 0; k < that.data.quexianlist[j].quexianList.length;k++){
              // console.log("第二层循环计算器k="+k);
               let typeflag = 0;
               for (let m = 0; m < that.data.quexiantypelist.length;m++){
               // console.log("第三层循环计算器m=" + m);
                // console.log("that.data.quexiantypelist.length=" + that.data.quexiantypelist.length);
                // console.log("第三层循环计算器that.data.quexianlist[j].quexianList[k].qxqxlx=" + that.data.quexianlist[j].quexianList[k].qxqxlx);
                //console.log("第三层循环计算器that.data.quexiantypelist[m]" + that.data.quexiantypelist[m]);
                 if (that.data.quexianlist[j].quexianList[k].qxqxlx !== that.data.quexiantypelist[m]){
                   typeflag=typeflag+1;
                   //console.log("typeflag=" + typeflag);
                   //console.log("that.data.quexiantypelist.length=" + that.data.quexiantypelist.length);
                    //console.log("目前缺陷集合是" + that.data.quexiantypelist);
                   if (typeflag == that.data.quexiantypelist.length ) { that.data.quexiantypelist.push(that.data.quexianlist[j].quexianList[k].qxqxlx);
                     //console.log("目前缺陷集合增加后是" + that.data.quexiantypelist);
                     };
                   };
               };
             };
           };
            //统计各类缺陷数量
           that.data.quexiantypetotal=[];
        for (let i = 0; i < that.data.quexiantypelist.length;i++){
          if (that.data.quexiantypelist[i] !== '') {
           let total=0;
            for (let j = 0; j < that.data.quexianlist.length;j++){

              for (let m = 0; m < that.data.quexianlist[j].quexianList.length;m++){
                if (that.data.quexianlist[j].quexianList[m].qxqxlx === that.data.quexiantypelist[i]) { total++};
              }
            }
            that.data.quexiantypetotal.push(total);
          };
            };
         //画图
        var windowWidth2 = 320;
        try {
          var res2 = wx.getSystemInfoSync();
          windowWidth2 = res2.windowWidth;
        } catch (e) {
          console.error('getSystemInfoSync failed!');
        }

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
          width: windowWidth2,
          height: 350,
        });



       //2.按投运年限计算缺陷数量
        var date = new Date().getFullYear();
        //console.log(date);
        //console.log(new Date("2018/1/1").getFullYear());
        for (var j = 0; j < that.data.quexianlist.length; j++) {
          var date1 = new Date(that.data.quexianlist[j].sbtyrq).getFullYear();
          if ((date - date1) > 15) that.data.flagfour = that.data.flagfour + that.data.quexianlist[j].quexianList.length;
          if (((date - date1) >= 11) && ((date - date1) <= 15)) that.data.flagthree = that.data.flagthree + that.data.quexianlist[j].quexianList.length;
          if (((date - date1) >= 6) && ((date - date1) <= 10)) that.data.flagtwo = that.data.flagtwo + that.data.quexianlist[j].quexianList.length;
          if (((date - date1) >= 0) && ((date - date1) <= 5)) that.data.flagone = that.data.flagone + that.data.quexianlist[j].quexianList.length;

        }
      //
       // console.log(that.data.flagone);
       that.setData({
         flagone: that.data.flagone,
         flagtwo: that.data.flagtwo,
         flagthree: that.data.flagthree,
         flagfour: that.data.flagfour
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