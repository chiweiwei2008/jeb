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

    var that = this;
    wx.getStorage({ //如果找到缓存，则将选项设为对应的状态
     key: 'stimulist',
      success: function (res) {
        that.setData({
          timulist: res.data,
          timutotal: res.data.length,
          tigan: res.data[that.data.timunumber].tigan,
          answerA: res.data[that.data.timunumber].answerA,
          answerB: res.data[that.data.timunumber].answerB,
          answerC: res.data[that.data.timunumber].answerC,
          answerD: res.data[that.data.timunumber].answerD,
        })
        console.log('没有执行！');
      },
      fail: function (res) {
        console.log('没有缓存！');
      }
    });
    

   
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
   if(that.data.timulist.length==0){
    wx.cloud.callFunction({
      // 云函数名称
      name: 'gettikuData',
      // 传给云函数的参数
      data: {
        tikuname: that.data.tikuname,
        //timuname: that.data.timuname,
      },
      success: function (res) {
        console.log(res.result.data);
        //console.log(that.searchDatalist);
        wx.setStorage({
          key: 'stimulist',
          data: res.result.data
        });
        that.onLoad();

      },
      fail: console.error
    });

   }
   
  },

  //上一题按钮函数  
  loginBtnClick1: function (e) {
    if (this.data.timunumber!=0){
      this.setData({
        timunumber: this.data.timunumber-1,
        timutotal: this.data.timutotal,
        tigan: this.data.timulist[this.data.timunumber].tigan,
        answerA: this.data.timulist[this.data.timunumber].answerA,
        answerB: this.data.timulist[this.data.timunumber].answerB,
        answerC: this.data.timulist[this.data.timunumber].answerC,
        answerD: this.data.timulist[this.data.timunumber].answerD,
      });
      this.onLoad();
    }else{
      wx.showToast({
        title: '已经是第一题！',
        icon: 'none',
        duration: 3000,

      })
    };

  },

  //下一题按钮函数  
  loginBtnClick4: function (e) {
    if (this.data.timunumber < this.data.timutotal-1) {
      this.setData({
        timunumber: this.data.timunumber + 1,
        timutotal: this.data.timutotal,
        tigan: this.data.timulist[this.data.timunumber].tigan,
        answerA: this.data.timulist[this.data.timunumber].answerA,
        answerB: this.data.timulist[this.data.timunumber].answerB,
        answerC: this.data.timulist[this.data.timunumber].answerC,
        answerD: this.data.timulist[this.data.timunumber].answerD,
      });
      this.onLoad();

    } else {
      wx.showToast({
        title: '已经是最后一题！',
        icon: 'none',
        duration: 3000,

      })
    };

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