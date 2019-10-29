// pages/tiku/title.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selecttiku: false,
    tikuname:'变电安规题库',
    selecttimu:false,
    timuname: '单选题',
    timutotal:0,//题目总数
    tigan:'',//题目题干
    answerA: '',//题目选项
    answerB: '',//题目选项
    answerC: '',//题目选项
    answerD: '',//题目选项
    answerE: '',//题目选项
    answerF: '',//题目选项
    answerG: '',//题目选项
    answerH: '',//题目选项
    answertxt: '',//题目答案
    timucheck:false,//题目是否是错题标记
    timuanswercheck: false,//题目是否已答过标记
    timulist:[],//存储题库数组
    timunumber:0,//当前题目数

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


      var that=this;
    //console.log('测试', this.data.tikuname);
      wx.cloud.init();
      const db = wx.cloud.database();
      db.collection('tiku').where({
        tkname: that.data.tikuname,
        tmtype: that.data.timuname
      })
        .get({
          success: function (res) {
            console.log('测试',res.data);
            that.setData({
              timulist: res.data,
            })
            // wx.setStorage({
            //  key: 'stimulist',
            //   data: res.data
            // });
          }
        })
   
  },
  //题库名称绑定函数
  bindShowMsgtiku() {
    this.setData({
      selecttiku: !this.data.selecttiku
    });

  },
  mySelecttiku(e) {
    var name = e.currentTarget.dataset.name;
    this.setData({
      tikuname: name,
      selecttiku: false,
      //showDatalist:searchDatalist
    });
  },

  //题目类型绑定函数
  bindShowMsgtimu() {
    this.setData({
      selecttimu: !this.data.selecttimu
    });

  },
  mySelecttimu(e) {
    var name = e.currentTarget.dataset.name;
    this.setData({
      timuname: name,
      selecttimu: false,
      //showDatalist:searchDatalist
    });
  },


  loginBtnClick: function (e) {
    var that = this;
    this.setData({
      timunumber: 1,
    });

    wx.getStorage({ 
      key: stimulist,
      success: function (res) {
        that.setData({
          timulist: res.data
        }); 
      },
       fail: function (res) {
         wx.cloud.init();
         const db = wx.cloud.database();
         db.collection('tiku').where({
           tkname: tikuname,
           tmtype: timuname
         })
           .get({
             success: function (res) {
               
               wx.setStorage({
                 key: 'stimulist',
                 data: res.data
               });
             }
           })
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