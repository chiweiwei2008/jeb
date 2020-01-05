// pages/jianxiujuece/jueceitem/jueceitem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist:[],//显示数据
    titlename:"",//标题
    showone:false,//控制第一模版是否显示
    showtwo:false,//控制第一模版是否显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var optionsname=options.name;
    //缺陷频发设备
    if(optionsname==="defectlist"){
      wx.getStorage({
        key: 'defectlist',
        success (res) {
          //console.log(res.data)
          that.setData({
            showone:true,
            datalist:res.data,
            titlename:"缺陷频发设备列表"
          });
        }})
    }
    //超检修周期设备
    if(optionsname==="repairlist"){
    wx.getStorage({
      key: 'repairlist',
      success (res) {
        //console.log(res.data)
        that.setData({
          showtwo:true,
          datalist:res.data,
          titlename:"超检修周期设备列表"
        });
      }})
    }
    //超大修技改周期设备
    if(optionsname==="mrepairlist"){
      wx.getStorage({
        key: 'mrepairlist',
        success (res) {
          //console.log(res.data)
          that.setData({
            showtwo:true,
            datalist:res.data,
            titlename:"超大修技改周期设备列表"
          });
        }})
    }
    //异常状态设备
    if(optionsname==="evaluationlist"){
      wx.getStorage({
        key: 'evaluationlist',
        success (res) {
          //console.log(res.data)
          that.setData({
            showtwo:true,
            datalist:res.data,
            titlename:"异常状态设备列表"
          });
        }})
    }
    //经历异常工况设备
    if(optionsname==="abnormallist"){
      wx.getStorage({
        key: 'abnormallist',
        success (res) {
          //console.log(res.data)
          that.setData({
            showtwo:true,
            datalist:res.data,
            titlename:"经历异常工况设备列表"
          });
        }})
    }


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