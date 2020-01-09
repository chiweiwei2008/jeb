var wxCharts = require('../../utils/wxcharts.js');
var lineChart = null;
Page({
  data: {
    sbsblx: '',
    sbsblxlist: [],
    sbyxbh: '',
    sbyxbhlist: [],
    bdzname: '',
    bdznamelist: [],
    yousepulist: [],
    select: false,
    sbsblxselect: false,
    sbyxbhselect: false,
    datelist: ['2019/1/1', '2019/1/2', '2019/1/3', '2019/1/4', '2019/1/5'],//图表日期项
    chardataC2H2: [0.1, 0.11, 0.12, 0.13, 0.14],
    chardataC2H4: [0.2, 0.21, 0.22, 0.23, 0.24],
    chardataC2H6: [0.34, 0.33, 0.32, 0.34, 0.35],
    chardataCH4: [0.45, 0.43, 0.42, 0.41, 0.45],
    chardataCO: [0.55, 0.53, 0.52, 0.51, 0.55],
    chardataCO2: [0.65, 0.63, 0.62, 0.61, 0.65],
    chardataH2: [0.75, 0.73, 0.72, 0.71, 0.75],
    chardataH2O: [0.85, 0.83, 0.82, 0.81, 0.85],
    chardataO2: [0.95, 0.93, 0.92, 0.91, 0.95],
    //加载按钮是否加载
    showone:false,  



  },
  touchHandler: function (e) {
    lineChart.scrollStart(e);
  },
  moveHandler: function (e) {
    lineChart.scroll(e);
  },
  touchEndHandler: function (e) {
    lineChart.scrollEnd(e);
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },

  //变电站绑定函数
  bindShowMsg() {
    this.setData({
      select: !this.data.select,
      sbsblx:'',
      sbsblxlist:[],
      sbyxbh:'',
      sbyxbhlist:[]
    });

  },
  mySelect(e) {
    var that=this;
    var name = e.currentTarget.dataset.name;
    that.data.bdzname=name;
    wx.cloud.init();
    wx.cloud.callFunction({
      name:'getYousepu',
      data:{
        bdzname:that.data.bdzname
      },
      success:function(res) {
        console.log(res.result[0]);
        that.data.sbsblxlist=res.result[0];
        that.setData({
          bdzname:that.data.bdzname,
          sbsblxlist: that.data.sbsblxlist,
          select: false,
          // sbsblx:'',
          // sbsblxlist:[],
          // sbyxbh: '',
          // sbyxbhlist: [],
          // showone:true,
        });
      }
    })
  },

  //设备类型绑定函数
  sbsblxbindShowMsg() {
    this.setData({
      sbsblxselect: !this.data.sbsblxselect,
      sbyxbh:'',
      sbyxbhlist:[]
    });

  },
  sbsblxmySelect(e) {
    var that=this;
    var name = e.currentTarget.dataset.name;
    that.data.sbsblx=name;
    wx.cloud.callFunction({
      name:'getYousepu',
      data:{
        bdzname:that.data.bdzname,
        typename:that.data.sbsblx
      },
      success:function(res) {
        console.log(res.result[0]);
        that.data.sbyxbhlist=res.result[0];
        that.setData({
          bdzname: that.data.bdzname,
          select: that.data.select,
          sbsblx: that.data.sbsblx,
          sbsblxselect: false,
          // sbyxbh: '',
          sbyxbhlist: that.data.sbyxbhlist,
          // showone:true,
        });
      }
    });
  },

  //运行编号绑定函数
  sbyxbhbindShowMsg() {
    this.setData({
      sbyxbhselect: !this.data.sbyxbhselect
    });

  },
  sbyxbhmySelect(e) {
    var that=this;
    var name = e.currentTarget.dataset.name;
    that.data.sbyxbh=name;
    wx.cloud.callFunction({
      name:'getYousepu',
      data:{
        bdzname:that.data.bdzname,
        typename:that.data.sbsblx,
        yxbhname:that.data.sbyxbh
      },
      success:function(res) {
        that.data.yousepulist=res.result;
        that.setData({
          bdzname: that.data.bdzname,
          select: that.data.select,
          sbsblx: that.data.sbsblx,
          sbsblxselect: that.data.sbsblxselect, 
          sbyxbh: that.data.sbyxbh,
          sbyxbhselect: false,
          yousepulist:that.data.yousepulist,
          showone:true,
        });
        that.onLoad();
      }
    });

  },
  onLoad: function (e) {
    // //权限认证
    // wx.getStorage({
    //   key: 'userObj',
    //   success: function (userObj) {
    //     console.log('用户已登录！');
    //   },
    //   fail: function (e) {
    //     wx.redirectTo({
    //       url: '../login/login'
    //     })
    //   }
    // });
    //调用云函数
    var that=this;
    wx.cloud.init();
    if(that.data.bdznamelist.length==0){
    wx.cloud.callFunction({
      name:'getYousepu',
      data:{
        
      },
      success:function (res) {
        that.data.bdznamelist=res.result[0];
        console.log(that.data.bdznamelist);
        that.setData({
          bdznamelist:that.data.bdznamelist
        });
      },
      fail:console.error
    });
  }
        
    //获取展示日期
    if (that.data.bdzname !== "" && that.data.sbsblx !== "" && that.data.sbyxbh !== "") {
      that.data.datelist = [];
      that.data.chardataC2H2 = [];
      that.data.chardataC2H4 = [];
      that.data.chardataC2H6 = [];
      that.data.chardataCH4 = [];
      that.data.chardataCO = [];
      that.data.chardataCO2 = [];
      that.data.chardataH2 = [];
      that.data.chardataH2O = [];
      that.data.chardataO2 = [];
      for (let i = 0; i < that.data.yousepulist.length; i++) {
        if (true) {
          that.data.datelist.push(that.data.yousepulist[i].datetime);
          that.data.chardataC2H2.push(that.data.yousepulist[i].C2H2);
          that.data.chardataC2H4.push(that.data.yousepulist[i].C2H4);
          that.data.chardataC2H6.push(that.data.yousepulist[i].C2H6);
          that.data.chardataCH4.push(that.data.yousepulist[i].CH4);
          that.data.chardataCO.push(that.data.yousepulist[i].CO/100);
          that.data.chardataCO2.push(that.data.yousepulist[i].CO2/100);
          that.data.chardataH2.push(that.data.yousepulist[i].H2);
          that.data.chardataH2O.push(that.data.yousepulist[i].H2O);
          that.data.chardataO2.push(that.data.yousepulist[i].O2/100);
        }
      };
      that.setData({
        sbsblx: that.data.sbsblx,
        sbsblxlist: that.data.sbsblxlist,
        sbyxbh: that.data.sbyxbh,
        sbyxbhlist: that.data.sbyxbhlist,
        bdzname: that.data.bdzname,
        bdznamelist: that.data.bdznamelist,
        datelist: that.data.datelist,
        chardataC2H2: that.data.chardataC2H2,
        chardataC2H4: that.data.chardataC2H4,
        chardataC2H6: that.data.chardataC2H6,
        chardataCH4: that.data.chardataCH4,
        chardataCO: that.data.chardataCO,
        chardataCO2: that.data.chardataCO2,
        chardataH2: that.data.chardataH2,
        chardataH2O: that.data.chardataH2O,
        chardataO2: that.data.chardataO2,
        showone:false, 
      });
    };
  

       
        //画图
        var windowWidth = 320;
        try {
          var res = wx.getSystemInfoSync();
          windowWidth = res.windowWidth;
        } catch (e) {
          console.error('getSystemInfoSync failed!');
        }


        lineChart = new wxCharts({
          canvasId: 'lineCanvas',
          type: 'line',
          categories: that.data.datelist,
          animation: false,
          series: [{
            name: 'C2H2',
            data: that.data.chardataC2H2,
            format: function (val, name) {
              return val + 'uL/L';
            }
          }, {
            name: 'C2H4',
            data: that.data.chardataC2H4,
            format: function (val, name) {
              return val + 'uL/L';
            }
          },
          {
            name: 'C2H6',
            data: that.data.chardataC2H6,
            format: function (val, name) {
              return val + 'uL/L';
            }
          },
          {
            name: 'CH4',
            data: that.data.chardataCH4,
            format: function (val, name) {
              return val + 'uL/L';
            }
          },
          {
            name: 'CO',
            data: that.data.chardataCO,
            format: function (val, name) {
              return val + '*100 uL/L';
            }
          },
          {
            name: 'CO2',
            data: that.data.chardataCO2,
            format: function (val, name) {
              return val + '*100 uL/L';
            }
          },
          {
            name: 'H2',
            data: that.data.chardataH2,
            format: function (val, name) {
              return val + 'uL/L';
            }
          },
          {
            name: 'H2O',
            data: that.data.chardataH2O,
            format: function (val, name) {
              return val + 'uL/L';
            }
          },
          {
            name: 'O2',
            data: that.data.chardataO2,
            format: function (val, name) {
              return val + '*100 uL/L';
            }
          }
          ],
          xAxis: {
            disableGrid: false
          },
          yAxis: {
            title: that.data.sbyxbh + that.data.sbsblx + '油色谱含量值',
            format: function (val) {
              return val;
            },
            min: 0
          },
          width: windowWidth,
          height: 380,
          dataLabel: true,
          legend:true,
          dataPointShape: true,
          enableScroll: true,
          extra: {
            lineStyle: 'curve'
          }
        });



   

  }
});