//app.js
App({
  onLaunch: function () {
         //查看当前用户是否已经授权
         wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  // 授权成功后，直接将信息传到全局变量中
                  this.globalData.userInfo = res.userInfo
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }else{
              return;
            }
          }
        })
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