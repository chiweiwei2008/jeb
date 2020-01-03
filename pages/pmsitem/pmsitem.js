// pages/pmsitem/pmsitem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchDatalist:[]  //存放PMS数据和接受缓存
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

    
    var that = this
    wx.getStorage({
      key: 'pmsdatalist',
      success(res) {
        that.setData({
          searchDatalist:res.data[options.index]
        });
        console.log(res.data)
      }
    })
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