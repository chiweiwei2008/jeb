var app = getApp();
var wxCharts = require('../../utils/wxcharts.js');
var lineChart = null;
var startPos = null;
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
    showone:true,  



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
      select: !this.data.select
    });

  },
  mySelect(e) {
    var name = e.currentTarget.dataset.name;
    this.setData({
      bdzname: name,
      select: false,
      sbsblx: '',
      sbsblxlist: [],
      sbyxbh: '',
      sbyxbhlist: [],
    });
    this.onLoad();
  },

  //设备类型绑定函数
  sbsblxbindShowMsg() {
    this.setData({
      sbsblxselect: !this.data.sbsblxselect
    });

  },
  sbsblxmySelect(e) {
    var name = e.currentTarget.dataset.name;
    this.setData({
      bdzname: this.data.bdzname,
      select: this.data.select,
      sbsblx: name,
      sbsblxselect: false,
      sbyxbh: '',
      sbyxbhlist: [],
    });
    this.onLoad();
  },

  //运行编号绑定函数
  sbyxbhbindShowMsg() {
    this.setData({
      sbyxbhselect: !this.data.sbyxbhselect
    });

  },
  sbyxbhmySelect(e) {
    var name = e.currentTarget.dataset.name;
    this.setData({
      bdzname: this.data.bdzname,
      select: this.data.select,
      sbsblx: this.data.sbsblx,
      sbsblxselect: this.data.sbsblxselect,
      sbyxbh: name,
      sbyxbhselect: false,
      showone:true, 
    });
    this.onLoad();
  },
  onLoad: function (e) {
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
      name: 'getYousepu',
      // 传给云函数的参数
      data: {

      },
      success: function (res) {
        that.data.yousepulist = res.result.data;
        //console.log(that.data.yousepulist);
        //获取变电站集合
        that.data.bdznamelist = [];
        that.data.bdznamelist.push(that.data.yousepulist[0].bdzname);
        for (let i = 0; i < that.data.yousepulist.length; i++) {
          var flag = 0;
          for (let j = 0; j < that.data.bdznamelist.length; j++) {
            if (that.data.yousepulist[i].bdzname !== that.data.bdznamelist[j]) { flag++ };
            if (flag == that.data.bdznamelist.length) that.data.bdznamelist.push(that.data.yousepulist[i].bdzname);
          }

        };
        //获取设备类型集合
        if (that.data.bdzname !== "") {
          //console.log(that.data.bdzname);
          var listone = [];
          for (let i = 0; i < that.data.yousepulist.length; i++) {
            if (that.data.yousepulist[i].bdzname === that.data.bdzname) { listone.push(that.data.yousepulist[i]) };
          };

          that.data.sbsblxlist = [];
          that.data.sbsblxlist.push(listone[0].typename);
          for (let j = 0; j < listone.length; j++) {
            var sbsblxflag = 0;
            for (let k = 0; k < that.data.sbsblxlist.length; k++) {
              if (listone[j].typename !== that.data.sbsblxlist[k]) { sbsblxflag++ };
              if (sbsblxflag == that.data.sbsblxlist.length) that.data.sbsblxlist.push(that.data.listone[j].typename);
            }
          };
          listone = [];
        } else {
          that.data.sbsblxlist = [];
        };
        //获取运行编号
        //console.log(that.data.sbsblx);
        //console.log(that.data.bdzname);
        if (that.data.sbsblx !== '' && that.data.bdzname !== '') {
          var listtwo = [];
          for (let i = 0; i < that.data.yousepulist.length; i++) {
            if ((that.data.yousepulist[i].bdzname === that.data.bdzname) && (that.data.yousepulist[i].typename === that.data.sbsblx)) { listtwo.push(that.data.yousepulist[i]) };

          };
          // console.log(listtwo);
          that.data.sbyxbhlist = [];
          that.data.sbyxbhlist.push(listtwo[0].yxbhname);
          for (let j = 0; j < listtwo.length; j++) {
            // console.log('第二层j='+j);
            var sbyxbhflag = 0;
            for (let k = 0; k < that.data.sbyxbhlist.length; k++) {
              //console.log(listtwo[j].sbyxbh);
              //console.log(that.data.sbyxbhlist[k]);
              //console.log('第三层k=' + k);
              // console.log(that.data.sbyxbhlist.length);
              // console.log(sbyxbhflag);
              if (listtwo[j].yxbhname !== that.data.sbyxbhlist[k]) { sbyxbhflag++ };
              //console.log(sbyxbhflag);
              if (sbyxbhflag == that.data.sbyxbhlist.length) {
                that.data.sbyxbhlist.push(listtwo[j].yxbhname);
                //console.log("that.data.listtwo[j].sbyxbh")
              }
            }
          };
          listtwo = [];
        } else {
          that.data.sbyxbhlist = [];
        };
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
            if (that.data.yousepulist[i].bdzname === that.data.bdzname && that.data.yousepulist[i].typename === that.data.sbsblx && that.data.yousepulist[i].yxbhname === that.data.sbyxbh) {
              that.data.datelist.push(that.data.yousepulist[i].datetime);
              that.data.chardataC2H2.push(that.data.yousepulist[i].C2H2);
              that.data.chardataC2H4.push(that.data.yousepulist[i].C2H4);
              that.data.chardataC2H6.push(that.data.yousepulist[i].C2H6);
              that.data.chardataCH4.push(that.data.yousepulist[i].CH4);
              that.data.chardataCO.push(that.data.yousepulist[i].CO/100);
              that.data.chardataCO2.push(that.data.yousepulist[i].CO2/100);
              that.data.chardataH2.push(that.data.yousepulist[i].H2/100);
              that.data.chardataH2O.push(that.data.yousepulist[i].H2O/100);
              that.data.chardataO2.push(that.data.yousepulist[i].O2);
            }
          };
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

        //画图

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
              return val + '*100 uL/L';
            }
          },
          {
            name: 'H2O',
            data: that.data.chardataH2O,
            format: function (val, name) {
              return val + '*100 uL/L';
            }
          },
          {
            name: 'O2',
            data: that.data.chardataO2,
            format: function (val, name) {
              return val + 'uL/L';
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
          height: 400,
          dataLabel: true,
          legend:true,
          dataPointShape: true,
          enableScroll: true,
          extra: {
            lineStyle: 'curve'
          }
        });

      },
      fail: console.error
    });


    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

  }
});