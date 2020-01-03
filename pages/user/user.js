// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用户信息
    nickName: "",
    avatarUrl: "",
    gender: 0, //性别 0：未知、1：男、2：女
    province: "",
    city: "",
    country: "",

    //功能列表    
    grids: [{
        "title": "台帐修改",
        "pageUrl": "../pms/pms",
        "imgUrl": "img/1.jpg"
      },
      {
        "title": "任务单",
        "pageUrl": "../pms/pms",
        "imgUrl": "img/2.jpg"
      },
      {
        "title": "账户管理",
        "pageUrl": "../pms/pms",
        "imgUrl": "img/3.jpg"
      },
      {
        "title": "权限设置",
        "pageUrl": "../pms/pms",
        "imgUrl": "img/4.jpg"
      }
    ]
  },
  loginOn: function(e) {
    var that = this;
    wx.getSetting({
      success(res) {
        console.log(res.authSetting)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              var userInfo = res.userInfo;
              that.setData({
                nickName: userInfo.nickName,
                avatarUrl: userInfo.avatarUrl,
                gender: userInfo.gender, //性别 0：未知、1：男、2：女
                province: userInfo.province,
                city: userInfo.city,
                country: userInfo.country,
              });
            }
          })
        }
        else{
          wx.navigateTo({ 
            url:'../login/login'});
          // wx.reLaunch({
          //   url: '../user/user'
          // });
        }

      }
    });


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // wx.getSetting({
    //   success(res) {
    //     console.log(res.authSetting)
    //   }
    // });
    wx.getUserInfo({
      success: function(res) {
        var userInfo = res.userInfo;
        that.setData({
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl,
          gender: userInfo.gender, //性别 0：未知、1：男、2：女
          province: userInfo.province,
          city: userInfo.city,
          country: userInfo.country,
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})