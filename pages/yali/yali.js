var app = getApp();
var wxCharts = require('../../utils/wxcharts.js');
var lineChart = null;
var startPos = null;
Page({
  data: {
    sbsblx:'',
    sbsblxlist: [],
    sbyxbh:'',
    sbyxbhlist: [],
    bdzname:'',
    bdznamelist: [],
    yalilist:[],
    select:false,
    sbsblxselect:false,
    sbyxbhselect:false,
    datelist: ['2019/1/1', '2019/1/2', '2019/1/3', '2019/1/4', '2019/1/5'],//图表日期项
    chardataA:[0.65,0.63,0.62,0.61,0.65],
    chardataB:[0.55, 0.53, 0.52, 0.51, 0.55],
    chardataC: [0.45, 0.43, 0.42, 0.41, 0.45],

    

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
  createSimulationData: function () {
    var categories = [];
    var data = [];
    for (var i = 0; i < 10; i++) {
      categories.push('201620162-' + (i + 1));
      data.push(Math.random() * (20 - 10) + 10);
    }
    return {
      categories: categories,
      data: data
    }
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
      sbsblx:'',
      sbsblxlist:[],
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
   
    //调用云函数
    var that = this;
    wx.cloud.init();
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getYali',
      // 传给云函数的参数
      data: {
       
      },
      success: function (res) {
        that.data.yalilist=res.result.data;
        //console.log(that.data.yalilist);
        //获取变电站集合
        that.data.bdznamelist=[];
        that.data.bdznamelist.push(that.data.yalilist[0].bdzname);
        for(let i=0;i<that.data.yalilist.length;i++){
          var flag = 0;
          for(let j=0;j<that.data.bdznamelist.length;j++){
            if (that.data.yalilist[i].bdzname!==that.data.bdznamelist[j]) {flag++ };
            if (flag == that.data.bdznamelist.length) that.data.bdznamelist.push(that.data.yalilist[i].bdzname);
          }
         
        };
      //获取设备类型集合
        if(that.data.bdzname!==""){
          //console.log(that.data.bdzname);
          var listone=[];
          for (let i = 0; i < that.data.yalilist.length; i++) {
            if (that.data.yalilist[i].bdzname === that.data.bdzname) { 
              listone.push(that.data.yalilist[i]);
              //console.log(i + listone[i]);
              };
          };
         
          that.data.sbsblxlist=[];
          that.data.sbsblxlist.push(listone[0].sbsblx);
          for(let j=0;j<listone.length;j++){
            var sbsblxflag = 0;
            for(let k=0;k<that.data.sbsblxlist.length;k++){
              if (listone[j].sbsblx !== that.data.sbsblxlist[k]) { sbsblxflag++ };
              if (sbsblxflag == that.data.sbsblxlist.length) that.data.sbsblxlist.push(listone[j].sbsblx);
            }
          };
          listone = [];
        }else{
          that.data.sbsblxlist=[];
        };
        //获取运行编号
        //console.log(that.data.sbsblx);
        //console.log(that.data.bdzname);
        if(that.data.sbsblx!==''&&that.data.bdzname!==''){
          var listtwo = [];
          for (let i = 0; i < that.data.yalilist.length; i++) {
            if ((that.data.yalilist[i].bdzname === that.data.bdzname)&&(that.data.yalilist[i].sbsblx===that.data.sbsblx)) {                            listtwo.push(that.data.yalilist[i]) };
            
          };
         // console.log(listtwo);
          that.data.sbyxbhlist=[];
          that.data.sbyxbhlist.push(listtwo[0].sbyxbh);
          for (let j = 0; j < listtwo.length; j++) {
           // console.log('第二层j='+j);
            var sbyxbhflag = 0;
            for (let k = 0; k < that.data.sbyxbhlist.length; k++) {
              //console.log(listtwo[j].sbyxbh);
              //console.log(that.data.sbyxbhlist[k]);
              //console.log('第三层k=' + k);
             // console.log(that.data.sbyxbhlist.length);
             // console.log(sbyxbhflag);
              if (listtwo[j].sbyxbh !== that.data.sbyxbhlist[k]) { sbyxbhflag++ };
              //console.log(sbyxbhflag);
              if (sbyxbhflag == that.data.sbyxbhlist.length) {
                that.data.sbyxbhlist.push(listtwo[j].sbyxbh);
                //console.log("that.data.listtwo[j].sbyxbh")
                }
            }
          };
          listtwo = [];
        }else{
          that.data.sbyxbhlist = [];
        };
      //获取展示日期
      if(that.data.bdzname!==""&&that.data.sbsblx!==""&&that.data.sbyxbh!==""){
         that.data.datelist=[];
         that.data.chardataA=[];
         that.data.chardataB= [];
         that.data.chardataC= [];

     for(let i=0;i<that.data.yalilist.length;i++){
       if (that.data.yalilist[i].bdzname === that.data.bdzname && that.data.yalilist[i].sbsblx === that.data.sbsblx && that.data.yalilist[i].sbyxbh === that.data.sbyxbh){
         that.data.datelist.push(that.data.yalilist[i].yalidate);
         that.data.chardataA.push(that.data.yalilist[i].sbyaliA);
         that.data.chardataB.push(that.data.yalilist[i].sbyaliB);
         that.data.chardataC.push(that.data.yalilist[i].sbyaliC);
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
              return val + 'Mpa';
            }
          }, {
            name: that.data.sbyxbh + 'B相',
            data: that.data.chardataB,
            format: function (val, name) {
              return val + 'Mpa';
            }
          },
          {
            name: that.data.sbyxbh + 'C相',
            data: that.data.chardataC,
            format: function (val, name) {
              return val + 'Mpa';
            }
          }],
          xAxis: {
            disableGrid: false
          },
          yAxis: {
            title: that.data.sbyxbh + that.data.sbsblx + 'SF6压力值',
            format: function (val) {
              return val;
            },
            min: 0.6
          },
          width: windowWidth,
          height: 300,
          dataLabel: true,
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