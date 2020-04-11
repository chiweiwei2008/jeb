// packageA/pages/registration/registration.js
const app = getApp()
const HTTP = 'https://www.powerclouds.net/wechat/'
// const HTTP = 'http://127.0.0.1:8000/wechat/'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gongname:'',
    gongimgurl:'',
    phone:'',
    gongdescribe:'',
    // flag:false, // 避免重复提交

  },
    // 获取公众号名称
    gongnameInput:function (event) {
      var that = this
      console.log(event.detail.value)
      that.setData({
        gongname:event.detail.value,
      })
      
    },
  // 获取公众号头像网络地址
  gongimgurlInput:function (event) {
    var that = this
    console.log(event.detail.value)
    that.setData({
      gongimgurl:event.detail.value,
    })
    
  },
    // 获取联系人电话
     phoneInput:function (event) {
    var that = this
    console.log(event.detail.value)
    that.setData({
      phone:event.detail.value,
    })
    
  },
      // 获取公众号简介
      gongdescribeInput:function (event) {
        var that = this
        console.log(event.detail.value)
        that.setData({
          gongdescribe:event.detail.value,
        })
        
      },

      //提交数据
   submitdata: function () {
    var that = this;
    //判断数据不能为空
    if (that.data.gongname == "" || that.data.gongimgurl == "" || that.data.phone == "" || that.data.gongdescribe == ""){
      wx.showToast({
        title: '名称、头像、电话、公众号简介不能为空',
        icon: 'none'
      })
    }
    else if(that.data.gongname != "" && that.data.gongimgurl != "" && that.data.phone != "" && that.data.gongdescribe != "" && wx.getStorageSync('registration') == true){
      wx.showToast({
        title: '你已经申请，请耐心等待审核！',
        icon: 'none'
      })
    }
    else {
      //上传服务器
      wx:wx.showToast({
        title: '上传中',
        icon: 'loading'
      })
      wx.request({
        url: HTTP+'registgong', //url
        data: {
          gongname:that.data.gongname,  
          gongimgurl: that.data.gongimgurl,   
          phone: that.data.phone, 
          gongdescribe: that.data.gongdescribe,
          openid: wx.getStorageSync('openid'), 
        },
        header: {
          'content-type': 'application/json' // 数据格式（默认值）
        },
        method: 'get', //上传方式
        success: function (res) {   //回调成功
          console.log(res.data)
          wx.setStorageSync('registration', true)
      
        },
        //回调失败
        fail: function (res) {
          console.log(res)
          wx.showToast({
            title: '请检查网络',
            icon: 'fail',
          })
        },
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // flag = wx.getStorageSync('registration')
    // if(flag != ''){
    //   wx.showToast({
    //     title: '你已经申请，请耐心等待审核！',
    //     icon: 'none'
    //   })
    // }else{
      
    // }

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