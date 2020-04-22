// packageA/pages/message/message.js
const app = getApp()
const HTTP = 'https://www.powerclouds.net/wechat/'
// const HTTP = 'http://127.0.0.1:8000/wechat/'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gongid:'',  // 公众号ID
    gongname:'', // 公众号名称
    articleid:'',  // 文章ID
    articlecontent:[],  // 文章内容
    buttonDisabled: false,
    modalHidden: true,
    userInfo: app.globalData.userInfo,
    hasUserInfo: false,
    //判断小程序的组件在当前版本是否可用
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    messages:[],
    authormessages: new Array(),//作者回复信息
    authorBool: new Array(),//显示回复数组
    ishave: false , //是否有筛选留言（是否显示赞）
    status: new Array(),//点赞的状态
    goodarray: new Array(),//所有点赞数
    isTop: new Array(),//置顶留言
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
    //点击浏览文章
    onclick:function (e) {
      var articleUrl = e.currentTarget.dataset.articleurl
      console.log(e)
      wx.navigateTo({
        url: '../viewarticle/viewarticle?articleUrl=' + articleUrl 
      }) 
      },
   //写留言
   writemessage: function () {
    wx.requestSubscribeMessage({
      tmplIds: ['igZeDkJvQEBeKPY4KTN2bTaXbZYi6M6Dm163XGxbwhE', '_mgeo4_TaTaYSq4hKYj7O81dcSjr3PXJezbeduzNBQU'],
      success (res) {
        wx: wx.navigateTo({//this.data.title  this.data.no
          url: '../../pages/addmessage/addmessage'
        })
       },
       fail:function (res) {
         console.log('获取授权错误')
       }
    })
  },
  //获取文章信息
  getarticle:function (params) {
    var that = this
    wx.request({
      url: HTTP+'getarticle',
      data:{
        articleid:params,
        //  gongid:1,
        // gongid:wx.getStorageSync('gongid')
      },
      header: {
        'content-type': 'application/json' // 默认值
        },
        success (res) {
        console.log(res.data)
        // wx.setNavigationBarTitle({
        //   title: res.data[0].gong_name,
        // })
        that.setData({
          articleid:params,
          articlecontent:res.data,
          gongname:res.data[0].gong_id__gong_name
        })
        wx.setStorageSync('articlecontent', res.data)
        wx.setStorageSync('articleid', params)
        wx.setStorageSync('gongname', res.data[0].gong_id__gong_name)
        wx.setNavigationBarTitle({
          title: that.data.gongname+'留言板',
        })
        },
        fail:function () {
          console.log('获取文章数据失败')
        }
    })
    that.setData(
      {
        articleid:params
      }
    )

  },

  //获取已精选留言内容
  getChooseCotent: function (articleid){
    var that = this;
    wx.request({
      url: HTTP+'getmessage', //获取已精选留言内容
      data: {
        articleid: articleid,  //文章编号 
      },
      header: {
        'content-type': 'application/json' // 数据格式（默认值）
      },
      method: 'get', //上传方式
      success: function (res) {   //回调成功
        console.log(res.data)
            var posts_message = res.data;
            console.log(posts_message)
            if (posts_message.length == 0) {
              wx.showToast({
                title: '还没有用户留言',
                icon: 'none',
              })
            } else {
              var arraymessage = new Array(res.data.length);
              var isReplyArray = new Array(res.data.length);
              var isstatus = new Array(res.data.length);
              var goodarr = new Array(res.data.length);
              var istop = new Array(res.data.length);
              for (var i = 0; i < res.data.length; i++) {
                goodarr[i] = posts_message[i].zannumber
                if (posts_message[i].isup) {
                  //判断是否置顶
                  console.log(posts_message[i].isup)
                  istop[i] = true
                } else {
                  istop[i] = false
                }
                if (posts_message[i].zannumber == 0) {
                  
                  isstatus[i] = true;
                } else {
                  isstatus[i] = false;
                }
                if (posts_message[i].authorreply != null) {
                  isReplyArray[i] = true;
                  arraymessage[i] = posts_message[i].authorreply;
                } else {
                  isReplyArray[i] = false;
                }
              }
              that.setData({
                ishave: true,
                status: isstatus,//是否已经点赞
                messages: posts_message,//所有留言信息
                authormessages: arraymessage,//作者回复内容
                authorBool: isReplyArray,//作者是否回复
                goodarray: goodarr,//赞的总数
                isTop: istop //是否置顶
              })
            }
      
        
      },
      //回调失败
      fail: function (res) {
        console.log(res)
        wx.showToast({
          title: '联网失败',
          icon: 'fail',
        })
      },
    })
  },

   // 实现点赞功能
   setGood: function (event) {
     var that = this
    console.log(event.currentTarget.dataset.index)
    var u_index = event.currentTarget.dataset.index;
    console.log(this.data.messages[u_index].id)
    wx.request({
      url: HTTP+'setgood',
      data:{
        messageid: that.data.messages[u_index].id,
      },header: {
        'content-type': 'application/json' // 默认值
        },
        success (res) {
        console.log(res.data)
        that.data.goodarray[u_index]=that.data.goodarray[u_index]+1
        that.data.status[u_index]= false
        that.setData({
          goodarray:that.data.goodarray,
          status:that.data.status,
        })
        },
        fail:function (res) {
          console.log('点赞失败！')
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
    this.getarticle(options.articleid)
    this.getChooseCotent(options.articleid)

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