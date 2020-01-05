// pages/jianxiujuece/jianxiujuece.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    defectnumber:0,//缺陷超过2次的设备数量
    defectlist:[],//缺陷设备数组
    repairnumber:0,//超检修周期数量
    repairlist:[],//超检修周期数组
    mrepairnumber:0,//超大修周期数量
    mrepairlist:[],//超大修周期数组
    evaluationnumber:0,//状态评价异常设备数量
    evaluationlist:[],//状态评价异常设备数组
    abnormalnumber:0,//经历异常工况设备数量
    abnormallist:[],//经历异常工况设备数组

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //权限认证
    wx.getStorage({
      key: 'userObj',
      success: function (userObj) {
        console.log('用户已登录！');
      },
      fail: function (e) {
        wx.redirectTo({
          url: '../login/login'
        })
      }
    })


    //调用云函数
    var that=this;
    wx.cloud.init();
    //1.调用云函数getDecision
    wx.cloud.callFunction({
      //云函数名称
      name:'getDecision',
      //参数
      data:{

      },
      //调用成功
      success:function(res){
        that.setData({
          defectnumber:res.result.length,
          defectlist:res.result
        });
        wx.setStorage({
          data: that.data.defectlist,
          key: 'defectlist',
        })
      },
      fail:console.error,
    });


    //2.调用云函数getCycle
    wx.cloud.callFunction({
      //云函数名称
      name:'getCycle',
      data:{

      },
      //调用成功
      success:function(res){
        //console.log(res);
        that.setData({
        repairnumber:res.result[0].length,//超检修周期数量
        repairlist:res.result[0],//超检修周期数组
        mrepairnumber:res.result[1].length,//超大修周期数量
        mrepairlist:res.result[1],//超大修周期数组
        evaluationnumber:res.result[2].length,//状态评价异常设备数量
        evaluationlist:res.result[2],//状态评价异常设备数组
        abnormalnumber:res.result[3].length,//经历异常工况设备数量
        abnormallist:res.result[3].length,//经历异常工况设备数组
        });
        wx.setStorage({
          data: res.result[0],
          key: 'repairlist',
        });
        wx.setStorage({
          data: res.result[1],
          key: 'mrepairlist',
        });
        wx.setStorage({
          data: res.result[2],
          key: 'evaluationlist',
        });
        wx.setStorage({
          data: res.result[3],
          key: 'abnormallist',
        });
      },
      fail:console.error

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
    //移除缺陷缓存
    wx.removeStorage({
      key: 'defectlist',
      success (res) {
        console.log('移除缺陷缓存成功!')
      }
    });
    wx.removeStorage({
      key: 'repairlist',
      success (res) {
        console.log('移除缺陷缓存成功!')
      }
    });
    wx.removeStorage({
      key: 'mrepairlist',
      success (res) {
        console.log('移除缺陷缓存成功!')
      }
    });
    wx.removeStorage({
      key: 'evaluationlist',
      success (res) {
        console.log('移除缺陷缓存成功!')
      }
    });
    wx.removeStorage({
      key: 'abnormallist',
      success (res) {
        console.log('移除缺陷缓存成功!')
      }
    });
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