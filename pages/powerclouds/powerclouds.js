const app = getApp()

Page({
  data: {
    headerTitleName: [
      { type_name: '电力人', id: 1 },
      { type_name: '技术标准', id: 2 },
      { type_name: '变电检修', id: 3 },
      { type_name: '泛在电力物联网', id: 4 },
      { type_name: '其它', id: 5 }
    ],
    swiperTitle: '文章标题',
    swiperIndex: '1/4',
    topPic: [
      {
        pic_url:"https://www.powerclouds.net/media/banner/state.jpg",
        article_title:"文章一",
        article_author:"猿外狼",
        article_date:"2020年3月28日",
        article_url:"https://mp.weixin.qq.com/s/oPgb_707shpuje6qbFKgzQ",
        id:1,
        article_type_id:3
     },
     {
        pic_url:"https://www.powerclouds.net/media/banner/0.jpg",
        article_title:"文章二",
        article_author:"猿外狼",
        article_date:"2020年3月28日",
        article_url:"https://mp.weixin.qq.com/s/oPgb_707shpuje6qbFKgzQ",
        id:2,
        article_type_id:3
     },
     {
        pic_url:"https://www.powerclouds.net/media/banner/0.jpg",
        article_title:"文章三",
        article_author:"猿外狼",
        article_date:"2020年3月28日",
        article_url:"https://mp.weixin.qq.com/s/oPgb_707shpuje6qbFKgzQ",
        id:1,
        article_type_id:3
     },
     {
        pic_url:"https://www.powerclouds.net/media/banner/0.jpg",
        article_title:"文章4",
        article_author:"猿外狼",
        article_date:"2020年3月28日",
        article_url:"https://mp.weixin.qq.com/s/oPgb_707shpuje6qbFKgzQ",
        id:4,
        article_type_id:3
     }
    ],
    tapID: 1, // 判断是否选中
    contentNewsList: [
      {
        pic_url:"https://mmbiz.qpic.cn/mmbiz_png/Pic9YFuHEvibdJy2tupYIJOfcA7Tgc12Zv2ZcKEDcMxfCwjVJby4QMl5f582nWg7JykXmzHIaiaCpJWQZPVrBpwpQ/0?wx_fmt=png",
        article_title:"ABB HMB-4/8型液压弹簧机构常见问题分析",
        article_author:"猿外狼",
        article_date:"2020年2月26日",
        article_url:"https://mp.weixin.qq.com/s/oPgb_707shpuje6qbFKgzQ",
        id:1,
        article_type_id:3
      }
    ],
    showPagenumber: true,
    refreshing: false,
    article_type:'电力人',
    page_number:1
  },
  // banner 数字下标
  handleSwiperChange: function(e) {
    this.setData({
      swiperIndex: `${e.detail.current + 1}/4`
    })
  },
  // 下一页
  onClick:function(e) {
    
      this.setData({
        page_number: parseInt(this.data.page_number)+1
      })
      wx.navigateTo({
        url: "powerclouds?article_type="+this.data.article_type+"&tapID="+this.data.tapID+"&page_number="+this.data.page_number
      })
  },
  // headerBar 点击
  headerTitleClick: function(e) {
    this.setData({ 
      tapID: e.target.dataset.id,
      article_type: e.target.dataset.newstype,
      page_number:1
    })
    console.log(this.data.article_type)
    console.log(this.data.page_number)

    wx.navigateTo({
      url: "powerclouds?article_type="+this.data.article_type+"&tapID="+this.data.tapID+"&page_number="+this.data.page_number
    })
  },
//跳转到文章详情页
  viewDetail: function(e) {
    let newsUrl = e.currentTarget.dataset.newsurl 
    // console.log(newsUrl) ;
    wx.navigateTo({
      url: "webview/webview?newsUrl="+newsUrl
    })
},
//获取文章分类
  getArticleType:function () {
    var that=this
    wx.request({
      url: 'https://www.powerclouds.net/weixin/getarticletype', //接口地址
      data: {
       
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        that.setData(
          {
            headerTitleName:res.data
          }
        )
      },
      fail:function () {
        console.log('获取网络数据失败')
      }
  
    }
    )
  },
  //获取topPic文章
  getArticleTop:function () {
    var that=this
    wx.request({
      url: 'https://www.powerclouds.net/weixin/getarticletop', //接口地址
      data: {
      
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        that.setData(
          {
            topPic:res.data
          }
        )
      },
      fail:function () {
        console.log('获取网络数据失败')
      }

    }
    )
  },

  onLoad: function(options) {
    if(options.article_type){
      console.log(options.article_type)
      this.setData({
        article_type:options.article_type
      })
    }
    if(options.tapID){
      // console.log(options.tapID)
      this.setData({
        tapID:options.tapID
      })
    }
    if(options.page_number){
      console.log(options.page_number)
      this.setData({
        page_number: options.page_number
      })
    }
    this.getArticleType()
    this.getArticleTop()
    var that=this
    wx.request({
      url: 'https://www.powerclouds.net/weixin/getarticle', //接口地址
      data: {
        article_type: that.data.article_type,
        page_number: that.data.page_number,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        that.setData(
          {
            contentNewsList:res.data
          }
        )
      },
      fail:function () {
        console.log('获取网络数据失败')
      }
  
    }
    )
  },

 
})
