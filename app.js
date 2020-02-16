//app.js
App({
  onLaunch: function () {
  
  },
  // 引入`towxml3.0`解析方法
    towxml:require('/towxml/index'),

  //声明一个数据请求方法
  getText: (url, callback) => {
    wx.request({
      url: url,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        if (typeof callback === 'function') {
          callback(res);
        };
      }
    });
    },

  onHide:function(){
    
  },
  globalData: {
    userInfo: null,
    bdznamelist:["1000kV保定站","1000kV邢台站","500kV保北站","500kV沧西站","500kV慈云站","500kV官路站","500kV广元站","500kV桂山站","500kV蔺河站","500kV彭村站","500kV清苑站","500kV深州站","500kV石北站","500kV卧牛城站","500kV武邑站","500kV黄骅站","500kV廉州站","500kV辛安站","500kV辛集站","500kV宣惠河站","500kV冶陶","500kV易水站","500kV瀛州站","500kV元氏站","500kV宗州站"],
    sblxtypelist: ["断路器","隔离开关","组合电器","母线","开关柜","主变压器","避雷器","避雷针","电抗器","电力电容器","电流互感器","电压互感器","放电线圈","接地网","绝缘子","熔断器","所用变","站内电缆","阻波器"],
    quexiansblxtypelist: ["断路器","隔离开关","组合电器","母线","主变压器","避雷器","避雷针","电抗器","电力电容器","电流互感器","电压互感器","接地网","所用变"]
  }
})