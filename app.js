//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    bdznamelist:["1000kV保定站","1000kV邢台站","500kV保北站","500kV沧西站","500kV慈云站","500kV官路站","500kV广元站","500kV桂山站","500kV蔺河站","500kV彭村站","500kV清苑站","500kV深州站","500kV石北站","500kV卧牛城站","500kV武邑站","500kV黄骅站","500kV廉州站","500kV辛安站","500kV辛集站","500kV宣惠河站","500kV冶陶","500kV易水站","500kV瀛州站","500kV元氏站","500kV宗州站"],
    sblxtypelist: ["断路器","隔离开关","组合电器","母线","开关柜","主变压器","避雷器","避雷针","电抗器","电力电容器","电流互感器","电压互感器","放电线圈","接地网","绝缘子","熔断器","所用变","站内电缆","阻波器"]

  }
})