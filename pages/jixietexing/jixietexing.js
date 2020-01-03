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
    texinglist: [],
    select: false,
    sbsblxselect: false,
    sbyxbhselect: false,
    datelist: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],//图表日期项
    chardataA: [0,0, 0, 0, 0.326, 0.651,0.531,0.723,1.08,1.111,1.261,1.261,1.261,1.261,0.111,0,0,0,0,0],
    chardataB: [0, 0, 0, 0, 0.426, 0.751, 0.631, 0.823, 1.18, 1.211, 1.361, 1.361, 1.361, 1.361, 0.211, 0, 0, 0, 0, 0],
    chardataC: [0, 0, 0, 0, 0.306, 0.600, 0.501, 0.703, 1.08, 1.211, 1.291, 1.291, 1.291, 1.291, 0.101, 0, 0, 0, 0, 0],



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
      name: 'getJixietexing',
      // 传给云函数的参数
      data: {

      },
      success: function (res) {
        that.data.texinglist = res.result.data;
        //console.log(that.data.texinglist);
        //获取变电站集合
        that.data.bdznamelist = [];
        that.data.bdznamelist.push(that.data.texinglist[0].bdzname);
        for (let i = 0; i < that.data.texinglist.length; i++) {
          var flag = 0;
          for (let j = 0; j < that.data.bdznamelist.length; j++) {
            if (that.data.texinglist[i].bdzname !== that.data.bdznamelist[j]) { flag++ };
            if (flag == that.data.bdznamelist.length) that.data.bdznamelist.push(that.data.texinglist[i].bdzname);
          }

        };
        //获取设备类型集合
        if (that.data.bdzname !== "") {
          //console.log(that.data.bdzname);
          var listone = [];
          for (let i = 0; i < that.data.texinglist.length; i++) {
            if (that.data.texinglist[i].bdzname === that.data.bdzname) { listone.push(that.data.texinglist[i]) ;
             // console.log(i+listone[i])
             };
          };

          that.data.sbsblxlist = [];
          that.data.sbsblxlist.push(listone[0].datatype);
          for (let j = 0; j < listone.length; j++) {
            var sbsblxflag = 0;
            for (let k = 0; k < that.data.sbsblxlist.length; k++) {
              if (listone[j].datatype !== that.data.sbsblxlist[k]) { sbsblxflag++ };
              if (sbsblxflag == that.data.sbsblxlist.length) that.data.sbsblxlist.push(listone[j].datatype);
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
          let listtwo = [];
          for (let i = 0; i < that.data.texinglist.length; i++) {
            if ((that.data.texinglist[i].bdzname === that.data.bdzname) && (that.data.texinglist[i].datatype === that.data.sbsblx)) { listtwo.push(that.data.texinglist[i]) };

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
          //that.data.datelist = [];
          that.data.chardataA = [];
          that.data.chardataB = [];
          that.data.chardataC = [];

          for (let i = 0; i < that.data.texinglist.length; i++) {
            if (that.data.texinglist[i].bdzname === that.data.bdzname && that.data.texinglist[i].datatype === that.data.sbsblx && that.data.texinglist[i].yxbhname === that.data.sbyxbh) {
              //that.data.datelist.push(that.data.yalilist[i].yalidate);
              if (that.data.texinglist[i].abcname==='A相'){
              for(let j=1;j<21;j++){
                let timecurrent = 'time';
              timecurrent=timecurrent+j.toString();
              //console.log(timecurrent);
              that.data.chardataA.push(that.data.texinglist[i][timecurrent]);
               // console.log(i);
                //console.log(that.data.texinglist[i][timecurrent]);
              }
              }
              if (that.data.texinglist[i].abcname === 'B相') {
                for (let j = 1; j < 21; j++) {
                  let timecurrent = 'time';
                  timecurrent = timecurrent + j.toString();
                  //console.log(timecurrent);
                  that.data.chardataB.push(that.data.texinglist[i][timecurrent]);
                  // console.log(i);
                  //console.log(that.data.texinglist[i][timecurrent]);
                }
              }
              if (that.data.texinglist[i].abcname === 'C相') {
                for (let j = 1; j < 21; j++) {
                  let timecurrent = 'time';
                  timecurrent = timecurrent + j.toString();
                  //console.log(timecurrent);
                  that.data.chardataC.push(that.data.texinglist[i][timecurrent]);
                  // console.log(i);
                  //console.log(that.data.texinglist[i][timecurrent]);
                }
              }
              //that.data.chardataB.push(that.data.yalilist[i].sbyaliB);
              //that.data.chardataC.push(that.data.yalilist[i].sbyaliC);
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
          chardataA: that.data.chardataA,
          chardataB: that.data.chardataB,
          chardataC: that.data.chardataC,

        });

        //画图

        lineChart = new wxCharts({
          canvasId: 'lineCanvas',
          type: 'line',
          categories: that.data.datelist,
          animation: false,
          series: [{
            name: that.data.sbyxbh + 'A相',
            data: that.data.chardataA,
            format: function (val, name) {
              return val + 'A';
            }
          },
            {
              name: that.data.sbyxbh + 'B相',
              data: that.data.chardataB,
              format: function (val, name) {
                return val + 'A';
              }
            },
            {
              name: that.data.sbyxbh + 'C相',
              data: that.data.chardataC,
              format: function (val, name) {
                return val + 'A';
              }
            }],
          xAxis: {
            disableGrid: false
          },
          yAxis: {
            title: that.data.sbyxbh + that.data.sbsblx + '波形特性',
            format: function (val) {
              return val;
            },
            min: 0
          },
          width: windowWidth,
          height: 300,
          dataLabel: false,
          dataPointShape: true,
          enableScroll: false,
          extra: {
            lineStyle: 'curve',
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