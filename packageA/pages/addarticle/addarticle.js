// packageA/pages/addarticle/addarticle.js
const app = getApp()
const HTTP = 'https://www.powerclouds.net/wechat/'
// const HTTP = 'http://127.0.0.1:8000/wechat/'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gongMessage:{},  // 授权公众号信息
    isShowFrom1: true,  // 是否折叠隐藏表单
    imgUrl:'',  // 文章封面图片
    articleTitle:'',  // 文章标题
    articleDescribe:'',  // 文章简介
    articleUrl:'',  // 文章链接
    editFlag:true, // 编辑文章标记
    editId:'',  // 需要编辑文章的ID
    openid:'',  // 文章作者opened
    gong_id:'',  // 公众号ID
    articleList:[], // 所有文章列表

  },
  // 获取文章封面图片地址
  getimgUrl:function (event) {
    var that = this
    console.log(event.detail.value)
    that.setData({
      imgUrl:event.detail.value,
    })
    
  },
  // 获取文章标题
  titleInput:function (e) {
    var that = this 
    console.log(e.detail.value)
    that.setData({
      articleTitle:e.detail.value,
    })
  },
  // 获取文章描述
  describeInput:function (e) {
    var that = this 
    console.log(e.detail.value)
    that.setData({
      articleDescribe:e.detail.value,
    })
  },
  // 获取文章链接
  getarticleUrl:function (e) {
    var that = this 
    console.log(e.detail.value)
    that.setData({
      articleUrl:e.detail.value,
    })
  },
   // 折叠显示
   showFrom(e) {
    var param = e.target.dataset.param;
    this.setData({
      isShowFrom1: param == 1 ? (!this.data.isShowFrom1) : false,
      // isShowFrom2: param == 2 ? (!this.data.isShowFrom2) : false,
      // isShowFrom3: param == 3 ? (!this.data.isShowFrom3) : false
    });
  },
   //提交数据
   submitdata: function () {
    var that = this;
    //判断数据不能为空
    if (that.data.articleTitle == "" || that.data.articleDescribe == "" || that.data.articleUrl == ""){
      wx.showToast({
        title: '标题、简介、链接、文章配图不能为空',
        icon: 'none'
      })
    }else{
      //上传服务器
      wx:wx.showToast({
        title: '上传中',
        icon: 'loading'
      })
      wx.request({
        url: HTTP+'addarticle/', //url
        data: {
          imageUrl:that.data.imgUrl,  // 文章配图
          title: that.data.articleTitle,   // 标题
          describes: that.data.articleDescribe, // 描述
          gong_id: that.data.gong_id,// 公众号id
          openid: that.data.openid,  // 文章作者openid
          articleUrl: that.data.articleUrl,  // 文章链接
          editFlag: that.data.editFlag,  // 是否编辑文章标签
          editId: that.data.editId,  //  需要修改文章的ID
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
            title: '请检查网络',
            icon: 'fail',
          })
        },
      })
    }
  },

  // 获取历史文章
  getmyarticle:function (openid, gongid) {
    var that = this
    wx.request({
      url:HTTP+'getmyarticle/',
      data:{
        openid:openid,
        gong_id:gongid,
      },
      header: {
      'content-type': 'application/json' // 默认值
      },
      success (res) {
      console.log(res.data)
      that.setData({
        articleList:res.data,
      })
      },
      fail:function () {
        console.log('获取文章失败！')
      }
    })
  },
        // 编辑文章
        editArticle: function (event){
          var that = this;
          var id = event.currentTarget.dataset.id;
          console.log("文章id"+id)  
          wx.request({
            url: HTTP+'getarticle/',
            data:{
              articleid:id,
            },
            header: {
            'content-type': 'application/json' // 默认值
            },
            success (res) {
            console.log(res.data)
            that.setData({
              imgUrl:res.data[0].imageUrl,
              articleTitle:res.data[0].title,  // 文章标题
              articleDescribe:res.data[0].describes,  // 文章简介
              articleUrl:res.data[0].articleUrl,  // 文章链接 
              editFlag:false,
              editId:id,
              isShowFrom1:true,
            })
            },
            fail:function () {
              console.log('获取文章失败！')
            }
          })
        },
    // 删除文章
    deleteArticle: function (event){
      var that = this;
      var id = event.currentTarget.dataset.id;
      console.log("文章id"+id)
      wx.request({
        url: HTTP+'deletearticle/', 
        data: {
          id: id, //文章id
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
          console.log('删除文章失败！')
        },
      })          
    },
    // 点击跳转
    onclick:function (event) {
      var id = event.currentTarget.dataset.id
      console.log(id)
      wx.navigateTo({
        url: '../../pages/changemessage/changemessage?articleid=' + id
      })
    },
    copy: function (e) {
      console.log('pages/message/message?articleid='+e.currentTarget.dataset.id);
      wx.setClipboardData({
        data: 'packageA/pages/message/message?articleid=' + e.currentTarget.dataset.id,
        success: function (res) {
          wx.showToast({
            title: '复制成功',
          });
        }
      });
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取授权公众号信息
    var gongindex = options.gongindex
    // var gongname = options.gongname
    var that = this
    var gonginfo = wx.getStorageSync('gongMessage')
    wx.setNavigationBarTitle({
      title: gonginfo[gongindex]['gong_name']+'留言板',
    })
    // 获取有权文章
    this.getmyarticle(wx.getStorageSync('openid'), wx.getStorageSync('gongMessage')[gongindex]['id'])
    that.setData({
      gongMessage:gonginfo[gongindex],
      openid:wx.getStorageSync('openid'),
      gong_id:gonginfo[gongindex]['id'],
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