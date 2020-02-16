// pages/instructions/instructions.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showDatalist:[],   // 返回查询队列
    searchKeyword:'',  // 查询关键字
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init();
    var that = this;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getInstructions',
      // 传给云函数的参数
      data: {
       
      },
      success: function (res) {
       
        that.setData({
          showDatalist: res.result.data,
          });
     
      },
      fail: console.error
    });
 
  },
    //查询关键字赋值
    bindKeywordInput: function (e) {
      var insname = e.detail.value;
      this.setData({
        searchKeyword: insname,
      })
    } ,
    //查询函数
    searchBtnClick:function(e){
          var datalist=[];
          //判断查询项是否为空
          if (this.data.searchKeyword!= ''){
              for(let i=0;i<this.data.showDatalist.length;i++){
                 if(this.data.showDatalist[i].insname.indexOf(this.data.searchKeyword)!=-1)
                    datalist.push(this.data.showDatalist[i]);
      
              };
              if(datalist.length==0){
                  wx.showToast({
                    title: '查询结果为空！',
                    icon: 'none',
                    duration: 3000,
                  });
              }else{
                this.setData({
                  showDatalist: datalist,
                  });
              }
          
              
          }
          else
          {
            wx.showToast({
              title: '查询名称不能为空！',
              icon: 'none',
              duration: 3000,
            });
             this.onLoad();
          }
    },
   //打开对应说明书
   clickItem:function(e){
      wx.downloadFile({
          // 示例 url，并非真实存在
          url: this.data.showDatalist[e.currentTarget.dataset.index].inshttp,
          success: function (res) {
            const filePath = res.tempFilePath
            wx.openDocument({
              filePath: filePath,
              success: function (res) {
                console.log('打开文档成功')
              }
            })
          }
        })
    console.log(e.currentTarget.dataset.index)
    //console.log(index)
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