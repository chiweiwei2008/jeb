// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: true,
    username:"",
    password:"", 
    wxnickname:"",
  },
  // 获取输入账号 
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  }, 

  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  }, 

  //
  bindGetUserInfo:function(e) {
    this.setData({
      canIUse:false,
      wxnickname: e.detail.userInfo.nickName,
    })
  },

  // 登录 
  login: function (e) {
    var that = this;
    if (this.data.username.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title:'用户名和密码不能为空',
        icon:'none',
        duration: 2000
      })
    } else {
      // 调用云函数 
      wx.cloud.init();
      wx.cloud.callFunction({
        // 云函数名称
        name: 'userLogin',
        // 传给云函数的参数
        data: {
          username: this.data.username,
          password: this.data.password,
         
        },
        success: function (res) {
          if (res.result === "用户名或者密码错误！"){
            wx.showToast({
              title: '用户名或者密码错误！',
              icon: 'none',
              duration: 2000
            })
          }
          else{
            var userObj={};
            userObj.username=that.data.username;
            userObj.wxnickname=that.data.wxnickname;
            wx.setStorage({
              key: "userObj",
              data: userObj
            })
            wx.reLaunch({
              url: '../index/index'
            })
          }
       
        },
        fail: console.error
      });

     
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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