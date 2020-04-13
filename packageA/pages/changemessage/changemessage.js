// packageA/pages/changemessage/changemessage.js
const app = getApp()
const HTTP = 'https://www.powerclouds.net/wechat/'
// const HTTP = 'http://127.0.0.1:8000/wechat/'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articlecontent:[],  // 文章内容
    authormessages: new Array(),//作者回复信息
    authormessage: new Array(),
    messages: [],
    // 用户留言设置
    show: false,
    tip: '',
    inputContent: '',//获取的回复信息
    inputContentxml: '',
    buttonDisabled: false,
    modalHidden: true,
    replyContent: '',
    authorBool: new Array(),//显示回复数组
    authorbool: new Array(),
    messageid: '',//回复索引
    chooseIndex: '',//精选索引
    isChoose: new Array(),//是否设置为精选
    isTop: new Array(),//是否设置置顶留言
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
        that.setData({
          articleid:params,
          articlecontent:res.data
        })
        wx.setStorageSync('articlecontent', res.data)
        wx.setStorageSync('articleid', params)
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
   //点击浏览文章
   onclick:function (e) {
    var articleUrl = e.currentTarget.dataset.articleurl
    console.log(e)
    wx.navigateTo({
      url: '../viewarticle/viewarticle?articleUrl=' + articleUrl 
    }) 
    },

  //弹出回复框
  showModal: function (event) {
    var u_index = event.currentTarget.dataset.id;
    console.log("回复索引：" + event.currentTarget.dataset.id)
    this.setData({
      modalHidden: !this.data.modalHidden,
      messageid: u_index
    })
  },

  //获取输入框（作者回复）内容
  getInputContent: function (e) {
    console.log(e.detail.value)
    this.setData({
      inputContent: e.detail.value
    })
  },

  //确定
  modalBindaconfirm: function () {
    var that = this;
    that.getInputContent
    console.log(that.data.inputContent)
    if (that.data.inputContent == "") {
      wx.showToast({
        title: '回复内容不能为空！',
        icon: 'none',
      })
    } else {
      this.setData({
        modalHidden: !this.data.modalHidden,
        buttonDisabled: !this.data.buttonDisabled,
        inputContentxml: that.data.inputContent,
      })
      //console.log(that.data.authormessages)
      //回复内容上传服务器
      that.replay(that.data.messageid)
    }
  },

  //作者回复
  replay: function (index) {
    var that = this;
    wx.request({
      url: HTTP+'replaymessage', //作者回复
      data: {
        id: index,//留言编号
        authorreply:that.data.inputContent, // 留言内容
      },
      header: {
        'content-type': 'application/json' // 数据格式（默认值）
      },
      method: 'get', //上传方式
      success: function (res) {   //回调成功
        console.log(res.data)
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
  },

  // 取消
  modalBindcancel: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
      inputContent: ''
    })
  },

  //精选留言
  choose: function (event) {
    var that = this;
    var j_index = event.currentTarget.dataset.id;
    var chooseflag = true
    console.log("精选索引：" + event.currentTarget.dataset.id)
    wx: wx.showToast({
      title: '正在设置中',
      icon: 'loading'
    })
    wx.request({
      url: HTTP+'choosemessage', //设置为精选留言
      data: {
        id: j_index,//留言用户id
        chooseflag:chooseflag,//精选标示
      },
      header: {
        'content-type': 'application/json' // 数据格式（默认值） 
      },
      method: 'get', //上传方式
      success: function (res) {   //回调成功
            that.data.isChoose[j_index] = true
            that.setData({
              isChoose: that.data.isChoose
            })
      },
      //回调失败
      fail: function (res) {
        console.log(res)
        wx.showToast({
          title: '网络连接失败',
          icon: 'none',
        })
      },
    })
  },

  //取消精选
  cancelChoose: function (event) {
    var that = this;
    var j_index = event.currentTarget.dataset.id;
    console.log("精选索引：" + event.currentTarget.dataset.id)
    wx: wx.showToast({
      title: '正在设置中',
      icon: 'loading'
    })
    wx.request({
      url:HTTP+'choosemessage', //设置为精选留言
      data: {
        id: j_index,//留言用户id
        chooseflag: false //精选留言标识 
      },
      header: {
        'content-type': 'application/json' // 数据格式（默认值） 
      },
      method: 'get', //上传方式
      success: function (res) {   //回调成功
            that.data.isChoose[j_index] = false
            that.setData({
              isChoose: that.data.isChoose
            })
      },
      //回调失败
      fail: function (res) {
        console.log(res)
        wx.showToast({
          title: '网络连接失败',
          icon: 'none',
        })
      },
    })
  },

  // 置顶留言
  settop: function (event) {
    var that = this;
    var j_index = event.currentTarget.dataset.id;
    console.log("置顶索引：" + event.currentTarget.dataset.id)
    wx: wx.showToast({
      title: '正在设置中',
      icon: 'loading'
    })
    wx.request({
      url: HTTP+'choosemessage', //留言置顶
      data: {
        id: j_index,//留言id
        isupflag: true, //置顶留言标识 
      },
      header: {
        'content-type': 'application/json' // 数据格式（默认值） 
      },
      method: 'get', //上传方式
      success: function (res) {   //回调成功
            that.data.isTop[j_index] = !that.data.isTop[j_index]
            that.setData({
              isTop: that.data.isTop
            })
      },
      //回调失败
      fail: function (res) {
        console.log(res)
        wx.showToast({
          title: '网络连接失败',
          icon: 'none',
        })
      },
    })
  },

  // 取消置顶
  canceltop: function (event) {
    var that = this;
    var j_index = event.currentTarget.dataset.id;
    console.log("取消置顶索引：" + event.currentTarget.dataset.id)
    wx: wx.showToast({
      title: '正在设置中',
      icon: 'loading'
    })
    wx.request({
      url: HTTP+'choosemessage', //取消留言置顶
      data: {
        id:j_index,//留言用户id
        isupflag:false, //置顶留言标识 
      },
      header: {
        'content-type': 'application/json' // 数据格式（默认值） 
      },
      method: 'get', //上传方式
      success: function (res) {   //回调成功
        console.log(res.data)
        that.data.isTop[j_index] = !that.data.isTop[j_index]
        that.setData({
          isTop: that.data.isTop
        })
      },
      //回调失败
      fail: function (res) {
        console.log(res)
        wx.showToast({
          title: '网络连接失败',
          icon: 'none',
        })
      },
    })
  },

  //删除留言
  deleteMessage: function (event) {
    var that = this;
    var j_index = event.currentTarget.dataset.id;
    console.log("精选索引：" + event.currentTarget.dataset.id)
    wx.showModal({
      title: '注意',
      content: '留言删除后无法恢复，请确认！',
      success (res) {
      if (res.confirm) {
      console.log('用户点击确定')
      wx: wx.showToast({
        title: '正在删除',
        icon: 'loading'
      })
      wx.request({
        url: HTTP+'choosemessage', //删除留言
        data: {
          id: j_index,//留言id
          deleteflag: true //精选留言标识 
        },
        header: {
          'content-type': 'application/json' // 数据格式（默认值） 
        },
        method: 'get', //上传方式
        success: function (res) {   //回调成功
          console.log(res.data)
              wx.showToast({
                title: '已删除该留言，请返回刷新！',
                icon: 'none',
              })
              //刷新页面
              var messlist = that.data.messages;
              messlist.splice(j_index, 1);
              //隐藏作者回复
              that.data.authorBool[j_index] = false
              that.setData({
                messages: messlist,
                authorBool: that.data.authorBool
              })
        },
        //回调失败
        fail: function (res) {
          console.log(res)
          wx.showToast({
            title: '网络连接失败',
            icon: 'none',
          })
        },
      })

      } else if (res.cancel) {
      console.log('用户点击取消')
      }
      }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 动态设置Bar
    var gonginfo = wx.getStorageSync('gongMessage')
    wx.setNavigationBarTitle({
      title: gonginfo[0]['gong_name']+'留言板',
    })
    // 获取文章信息
    var articleid = options.articleid;
    this.getarticle(articleid)

    //获取留言信息
    var that = this;
    wx.request({
      url: HTTP+'getallmessage', //url
      data: {
       articleid:articleid,
      },
      header: {
        'content-type': 'application/json' // 数据格式（默认值）
      },
      method: 'get', //上传方式
      success: function (res) {   //回调成功
        console.log(res.data)
        var isReplyArray = new Array(res.data.length);
        var isChoosem = new Array(res.data.length);
        var arraymessage = new Array(res.data.length);
        var top = new Array(res.data.length);
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].authorreply != null) {
            isReplyArray[i] = true;
            arraymessage[i] = res.data[i].authorreply;
          } else {
            isReplyArray[i] = false;
          }
          if (res.data[i].isup != true) {
            top[i] = false
          } else {
            top[i] = true
          }
          if (res.data[i].ischeck != true) {
            isChoosem[i] = false;
          } else {
            isChoosem[i] = true;
          }
        }
        that.setData({
          authormessages: arraymessage,
          isChoose: isChoosem,//精选留言文字的切换
          isTop: top,//置顶留言文字的切换
          authorBool: isReplyArray,//显示作者留言
          messages: res.data
        })
      },
      //回调失败
      fail: function (res) {
        console.log(res)
        wx.showToast({
          title: '连接失败',
          icon: 'fail',
        })
      },
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