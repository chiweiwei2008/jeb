// packageA/pages/index/index.js
const app = getApp()
const HTTP = 'https://www.powerclouds.net/wechat/'
// const HTTP = 'http://127.0.0.1:8000/wechat/'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: app.globalData.userInfo,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    gongMessage: [], 
    openid:'',
  },
  //事件处理函数 点击
  registration: function () {
    wx.navigateTo({
      url:'../../pages/registration/registration'
    })
    
  },
  //点击按钮授权
  getUserInfo: function (e) {
    var that = this;
    if (e.detail.userInfo) {
      console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
        openid:wx.getStorageSync('openid')

      })
      wx.setStorageSync('username', that.data.userInfo.nickName)
      wx.setStorageSync('headpath', that.data.userInfo.avatarUrl)
      console.log("在index页面临时授权中获取到的用户信息为：" + that.data.userInfo.nickName + " " + that.data.userInfo.avatarUrl + that.data.openid);
    } else {
      console.log('用户取消授权');
      return;
    }
  },
  //获取公众号信息
  getGongInfo: function () {
    var that = this;
    wx.request({
      url: HTTP+'getgong', //接口地址
      data: {
       openid:wx.getStorageSync('openid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        that.setData(
          {
            gongMessage:res.data
          }
        )
        // if(res.data.length==0){
        //   console.log('没有注册公众号！')
        //   wx.redirectTo({
        //     url: '../registration/registration'
        //   })
        // } 
      },
      fail:function () {
        console.log('获取网络数据失败')
      }
  
    }
    )
  },
  onclick:function (event) {
    var that = this;
    var index = event.currentTarget.dataset.index;
    wx.setStorageSync('gongMessage', that.data.gongMessage)
    wx.navigateTo({
      url: '../../pages/addarticle/addarticle?gongindex=' + index
    })
  },
  // 获取授权
  sendmessage:function (event) {
    //获取订阅消息授权
    wx.requestSubscribeMessage({
      tmplIds: ['igZeDkJvQEBeKPY4KTN2bTaXbZYi6M6Dm163XGxbwhE', '_mgeo4_TaTaYSq4hKYj7O81dcSjr3PXJezbeduzNBQU'],
      success (res) {
        console.log('获取订阅消息授权')
       },
       fail:function (res) {
         console.log('获取授权错误')
       }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('username') != '') {
      this.setData({
        hasUserInfo:true,
    })
  }


  // wx.request({
  //   url: HTTP+'gettoken',
  //   data: {
     
  //   },
  //   header: {
  //   'content-type': 'application/json' // 默认值
  //   },
  //   success (res) {
  //   console.log(res.data)
  //   // wx.setStorageSync('openid', res.data.openid)
  //   },
  //   fail:function () {
  //     console.log('获取网络数据失败')
  //   }
  // }
  // )

    wx.login({
      success (res) {
        if (res.code) {  
          //发起网络请求
          wx.request({
            url: HTTP+'onlogin',
            data: {
              code: res.code
            },
            header: {
            'content-type': 'application/json' // 默认值
            },
            success (res) {
            console.log(res.data)
            wx.setStorageSync('openid', res.data.openid)
            wx.setStorageSync('token', res.data.access_token)
            },
            fail:function () {
              console.log('获取网络数据失败')
            }
          }
          )
          
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    this.getGongInfo()
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