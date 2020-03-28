
var wxCharts = require('../../utils/wxcharts.js');
var lineChart = null;
Page({
  data: {
    loginshow:false,//没有登录时不能查看
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
    //加载按钮是否显示
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
      name:'getYali',
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
      name:'getYali',
      data:{
        bdzname:that.data.bdzname,
        sbsblx:that.data.sbsblx
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
      name:'getYali',
      data:{
        bdzname:that.data.bdzname,
        sbsblx:that.data.sbsblx,
        sbyxbh:that.data.sbyxbh
      },
      success:function(res) {
        that.data.yalilist=res.result;
        that.setData({
          bdzname: that.data.bdzname,
          select: that.data.select,
          sbsblx: that.data.sbsblx,
          sbsblxselect: that.data.sbsblxselect, 
          sbyxbh: that.data.sbyxbh,
          sbyxbhselect: false,
          yalilist:that.data.yalilist,
          showone:true,
        });
        that.onLoad();
      }
    });

  
  },

  onLoad: function (e) {

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
    
    var that=this;
    wx.cloud.init();
    if(that.data.bdznamelist.length==0){
    wx.cloud.callFunction({
      name:'getYali',
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
      if(that.data.bdzname!==""&&that.data.sbsblx!==""&&that.data.sbyxbh!==""){
         that.data.datelist=[];
         that.data.chardataA=[];
         that.data.chardataB= [];
         that.data.chardataC= [];
         for(let i=0;i<that.data.yalilist.length;i++){
          if (true){
            that.data.datelist.push(that.data.yalilist[i].yalidate);
            that.data.chardataA.push(that.data.yalilist[i].sbyaliA);
            that.data.chardataB.push(that.data.yalilist[i].sbyaliB);
            that.data.chardataC.push(that.data.yalilist[i].sbyaliC);
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
          chardataA: that.data.chardataA,
          chardataB: that.data.chardataB,
          chardataC: that.data.chardataC,
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
            }
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
     


}
});