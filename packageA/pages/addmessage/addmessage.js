// packageA/pages/addmessage/addmessage.js
const app = getApp()
const HTTP = 'https://www.powerclouds.net/wechat/'
// const HTTP = 'http://127.0.0.1:8000/wechat/'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articlecontent:[],  // 文章内容
    messages:'',  // 留言信息
    message:'',   // 提交留言信息
    condition: false,
    repeatcondition: true,
    hasUserInfo: true,
    //判断小程序的组件在当前版本是否可用
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  

  },
    //获取留言本文域信息
    getmessages: function (e) {
      this.setData({
        messages: e.detail.value,
      }) 
    },
  //点击提交留言
  btnmessage: function (e) {
    var that = this;
    console.log("提交的留言信息为"+that.data.messages)
    if (that.data.messages == ""){
      wx: wx.showToast({
        title: '请输入留言内容...',
        icon: 'none',
      })
    }else{
      if (that.data.repeatcondition == true) {
        wx: wx.showToast({
          title: '正在发布',
          icon: 'loading',
        })
        that.setData({
          message: that.data.messages
        })
        //显示留言内容
        that.setData({
          condition: true,
          repeatcondition: false,
          messagesnull: ''
        })
        wx: wx.showToast({
          title: '留言成功',
          icon: 'success',
        })
      } else {
        wx: wx.showToast({
          title: '您已经留过言了',
          icon: 'none',
        })
      }
    }
  },
    //删除留言
    deleter_message: function () {
          //隐藏留言内容
          this.setData({
            condition: false,
            repeatcondition: true,
            message: '',
            messages:'',
          })
    
    },
     //点击浏览文章
     onclick:function (e) {
      var articleUrl = e.currentTarget.dataset.articleurl
      console.log(e)
      wx.navigateTo({
        url: '../viewarticle/viewarticle?articleUrl=' + articleUrl 
      }) 
      },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('gongname')+'留言板',
    })
    if(wx.getStorageSync('articlecontent')){
      that.setData({
        articlecontent:wx.getStorageSync('articlecontent')
      })
    }

    this.setData({
      nickName: wx.getStorageSync('username'), 
      avatarUrl: wx.getStorageSync('headpath'),
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
    var that = this;
    if(that.data.messages==""){
      console.log("没有留言数据！")
    }else{
      wx.request({
        url: HTTP+'addmessage', //上传留言内容
        data: {
          username: wx.getStorageSync('username'),//用户名
          avatarUrl: wx.getStorageSync('headpath'),//头像
          articleid: wx.getStorageSync('articleid'), //文章ID
          message: that.data.message,//留言内容
          authorreply: '', //作者回复
          ischeck:false, //是否精选
          zannumber:0, //点赞次数
          isup:false, //是否置顶
          openid: wx.getStorageSync('openid'), //用户唯一标识
          articleid: wx.getStorageSync('articleid'), //文章ID
        },
        header: {
          'content-type': 'application/json' // 数据格式（默认值）
        },
        method: 'get', //上传方式
        success: function (res) {   //回调成功
          console.log(res.data)
          if (res.statusCode == 200) {
            console.log('留言成功')
          } else {
            wx: wx.showToast({
              title: '留言失败',
              icon: 'none',
            })
          }
        },
        //回调失败
        fail: function (res) {
          console.log(res)
          wx.showToast({
            title: '服务器错误',
            icon: 'fail',
          })
        },
      })
    }
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