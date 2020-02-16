// pages/index/index.js
Page({

  //swiper
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },

  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  imageLoad: function () {
    this.setData({
      imageWidth: wx.getSystemInfoSync().windowWidth,//图片宽度 
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
   //swiper
    background: [
'cloud://pmis-4c63d.706d-pmis-4c63d-1300406220/jxgs/banner/bnner1.jpg', 'cloud://pmis-4c63d.706d-pmis-4c63d-1300406220/jxgs/banner/bnner2.jpg', 'cloud://pmis-4c63d.706d-pmis-4c63d-1300406220/jxgs/banner/bnner3.jpg'
],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 5000,
    duration: 500,

    //九宫格布局数据
    routers: [
      {
        name: '台账查询',
        url: '../pms/pms',
        icon: 'https://706d-pmis-4c63d-1300406220.tcb.qcloud.la/img/1.png',
        code: '10'
      },
      {
        name: '运行数据分析',
        url: '../yunxingfenxi/yunxingfenxi',
        icon: 'https://706d-pmis-4c63d-1300406220.tcb.qcloud.la/img/2.png',
        code: '11'
      },
      {
        name: '缺陷分析',
        url: '../quexianfenxi/quexianfenxi',
        icon: 'https://706d-pmis-4c63d-1300406220.tcb.qcloud.la/img/3.png',
        code: '10'
      },
      {
        name: 'SF6在线监测',
        url: '../yali/yali',
        icon: 'https://706d-pmis-4c63d-1300406220.tcb.qcloud.la/img/4.png',
        code: '11'
      },
      {
        name: '油色谱',
        url: '../yousepu/yousepu',
        icon: 'https://706d-pmis-4c63d-1300406220.tcb.qcloud.la/img/8.png',
        code: '10'
      },
      {
        name: '机械特性',
        url: '../jixietexing/jixietexing',
        icon: 'https://706d-pmis-4c63d-1300406220.tcb.qcloud.la/img/6.png',
        code: '11'
      },
      {
        name: '检修决策',
        url: '../jianxiujuece/jianxiujuece',
        icon: 'https://706d-pmis-4c63d-1300406220.tcb.qcloud.la/img/7.png',
        code: '11'
      },
      {
        name: '说明书、图纸',
        url: '../instructions/instructions',
        icon: 'https://706d-pmis-4c63d-1300406220.tcb.qcloud.la/img/10.jpg',
        code: '11'
      },
      {
        name: '在线测试',
        url: '../tiku/title',
        icon: 'https://706d-pmis-4c63d-1300406220.tcb.qcloud.la/img/5.png',
        code: '11'
      },
      {
        name: 'more',
        url: '../more/more',
        icon: 'https://706d-pmis-4c63d-1300406220.tcb.qcloud.la/img/9.jpg',
        code: '11'
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //权限认证
    // wx.getStorage({
    //   key: 'userObj',
    //   success: function (userObj) {
    //     console.log('用户已登录！');
    //   },
    //   fail: function (e) {
    //     wx.redirectTo({
    //       url: '../login/login'
    //     })
    //   }
    // })
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