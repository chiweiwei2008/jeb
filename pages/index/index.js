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
        url: '../home/home',
        icon: 'img/1.png',
        code: '10'
      },
      {
        name: '运行数据分析',
        url: '../yunxingfenxi/yunxingfenxi',
        icon: 'img/2.png',
        code: '11'
      },
      {
        name: '缺陷分析',
        url: '../quexianfenxi/quexianfenxi',
        icon: 'img/3.png',
        code: '10'
      },
      {
        name: 'SF6在线监测',
        url: '../yali/yali',
        icon: 'img/4.png',
        code: '11'
      },
      {
        name: '油色谱',
        url: '../yousepu/yousepu',
        icon: 'img/8.png',
        code: '10'
      },
      {
        name: '机械特性',
        url: '../jixietexing/jixietexing',
        icon: 'img/6.png',
        code: '11'
      },
      {
        name: '检修决策',
        url: '../jianxiujuece/jianxiujuece',
        icon: 'img/7.png',
        code: '11'
      },
      {
        name: '在线测试',
        url: '../tiku/title',
        icon: 'img/5.png',
        code: '11'
      },
      {
        name: 'more',
        url: '../more/more',
        icon: 'img/9.jpg',
        code: '11'
      }
      
    ]

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