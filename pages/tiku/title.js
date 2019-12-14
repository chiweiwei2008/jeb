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
    chooseanswer: '',//当前选择答案
    answerRoW: '',//当前选择答案是否正确标记
    clearchecked:false,//清空单选按钮
    stimulistname:'onestimulist',//缓存分题型加载标记
    chooseanswerA: '',//多选题当前样式
    chooseanswerB: '',//多选题当前样式
    chooseanswerC: '',//多选题当前样式
    chooseanswerD: '',//多选题当前样式
    chooseanswerE: '',//多选题当前样式
    chooseanswerF: '',//多选题当前样式
    chooseanswerG: '',//多选题当前样式
    chooseanswerH: '',//多选题当前样式
    searchtimunumber:0,//题目跳转题数




  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    this.data.timulist=[];
    this.data.timutotal=0;
    this.data.tigan='';
    this.data.answerA = '';
    this.data.answerB = '';
    this.data.answerC = '';
    this.data.answerD = '';
    this.data.answerE = '';
    this.data.answerF = '';
    this.data.answerG = '';
    this.data.answerH = '';
    this.data.answertxt ='';
    this.data.answerRoW = '';
    this.data.chooseanswerA= '';
    this.data.chooseanswerB= '';
    this.data.chooseanswerC= '';
    this.data.chooseanswerD= '';
    this.data.chooseanswerE= '';
    this.data.chooseanswerF= '';
    this.data.chooseanswerG= '';
    this.data.chooseanswerH= '';
    wx.getStorage({ //如果找到缓存，则将选项设为对应的状态
      key: that.data.stimulistname,
      success: function (res) {
        that.setData({
          timulist: res.data,
          timutotal: res.data.length,
          tigan: res.data[that.data.timunumber].tigan,
          answerRoW:that.data.answerRoW,
          answerA: res.data[that.data.timunumber].answerA,
          answerB: res.data[that.data.timunumber].answerB,
          answerC: res.data[that.data.timunumber].answerC,
          answerD: res.data[that.data.timunumber].answerD,
          answerE: res.data[that.data.timunumber].answerE,
          answerF: res.data[that.data.timunumber].answerF,
          answerG: res.data[that.data.timunumber].answerG,
          answerH: res.data[that.data.timunumber].answerH,
          chooseanswerA: res.data[that.data.timunumber].chooseanswerA,
          chooseanswerB: res.data[that.data.timunumber].chooseanswerB,
          chooseanswerC: res.data[that.data.timunumber].chooseanswerC,
          chooseanswerD: res.data[that.data.timunumber].chooseanswerD,
          chooseanswerE: res.data[that.data.timunumber].chooseanswerE,
          chooseanswerF: res.data[that.data.timunumber].chooseanswerF,
          chooseanswerG: res.data[that.data.timunumber].chooseanswerG,
          chooseanswerH: res.data[that.data.timunumber].chooseanswerH,
          answertxt: res.data[that.data.timunumber].answertxt,
        })
        console.log(res.data);
        console.log('测试！');
      },
      fail: function (res) {
        console.log('请先导入对应题库！');
        that.setData({
          timulist: that.data.timulist,
          timutotal: that.data.timutotal,
          tigan: that.data.tigan,
          answerA: that.data.answerA,
          answerB: that.data.answerB,
          answerC: that.data.answerC,
          answerD: that.data.answerD,
          answerE: that.data.answerE,
          answerF: that.data.answerF,
          answerG: that.data.answerG,
          answerH: that.data.answerH,
          answertxt: that.data.answertxt,
          timunumber: that.data.timunumber,
        })
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
    if (name === '变电安规题库') {
      if (this.data.timuname === '单选题') this.data.stimulistname = 'onestimulist';
      if (this.data.timuname === '判断题') this.data.stimulistname = 'zerostimulist';
      if (this.data.timuname === '多选题') this.data.stimulistname = 'twostimulist';
    };
    if (name === '国网五通题库') {
      if (this.data.timuname === '单选题') this.data.stimulistname = 'gwwt-onestimulist';
      if (this.data.timuname === '判断题') this.data.stimulistname = 'gwwt-zerostimulist';
      if (this.data.timuname === '多选题') this.data.stimulistname = 'gwwt-twostimulist';
    };
    if (name === '银行业-网点负责人考试习题') {
      if (this.data.timuname === '单选题') this.data.stimulistname = 'yhywdfzr-onestimulist';
      if (this.data.timuname === '判断题') this.data.stimulistname = 'yhywdfzr-zerostimulist';
      if (this.data.timuname === '多选题') this.data.stimulistname = 'yhywdfzr-twostimulist';
    };
    this.setData({
      tikuname: name,
      selecttiku: false,
      stimulistname: this.data.stimulistname,
      timuname: this.data.timuname,
      timunumber: 0,
      answerRoW: '',
      chooseanswerA: '',//多选题当前样式
      chooseanswerB: '',//多选题当前样式
      chooseanswerC: '',//多选题当前样式
      chooseanswerD: '',//多选题当前样式
      chooseanswerE: '',//多选题当前样式
      chooseanswerF: '',//多选题当前样式
      chooseanswerG: '',//多选题当前样式
      chooseanswerH: '',//多选题当前样式
      //showDatalist:searchDatalist
    });
    this.onLoad();
  },

  //题目类型绑定函数
  bindShowMsgtimu() {
    this.setData({
      selecttimu: !this.data.selecttimu
    });

  },
  mySelecttimu(e) {
    var name = e.currentTarget.dataset.name;
    if (this.data.tikuname === '变电安规题库'){
    if (name === '单选题') this.data.stimulistname = 'onestimulist';
    if (name === '判断题') this.data.stimulistname = 'zerostimulist';
    if (name === '多选题') this.data.stimulistname = 'twostimulist';
    };
    if (this.data.tikuname === '国网五通题库') {
      if (name === '单选题') this.data.stimulistname = 'gwwt-onestimulist';
      if (name === '判断题') this.data.stimulistname = 'gwwt-zerostimulist';
      if (name === '多选题') this.data.stimulistname = 'gwwt-twostimulist';
    };
    if (this.data.tikuname === '银行业-网点负责人考试习题') {
      if (name === '单选题') this.data.stimulistname = 'yhywdfzr-onestimulist';
      if (name === '判断题') this.data.stimulistname = 'yhywdfzr-zerostimulist';
      if (name === '多选题') this.data.stimulistname = 'yhywdfzr-twostimulist';
    };
    this.setData({
      timuname: name,
      selecttimu: false,
      stimulistname: this.data.stimulistname,
      timunumber:0,
      answerRoW:'',
      chooseanswerA: '',//多选题当前样式
      chooseanswerB: '',//多选题当前样式
      chooseanswerC: '',//多选题当前样式
      chooseanswerD: '',//多选题当前样式
      chooseanswerE: '',//多选题当前样式
      chooseanswerF: '',//多选题当前样式
      chooseanswerG: '',//多选题当前样式
      chooseanswerH: '',//多选题当前样式
      //showDatalist:searchDatalist
    });
    this.onLoad();
  },


  loginBtnClick: function (e) {
    var that = this;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'gettikuData',
      // 传给云函数的参数
      data: {
        tikuname: that.data.tikuname,
        timuname: that.data.timuname,
      },
      success: function (res) {
        console.log(res.result.data);
        console.log(that.data.timuname);
        if (that.data.tikuname === '变电安规题库') {
          if (that.data.timuname === '单选题') that.data.stimulistname = 'onestimulist';
          if (that.data.timuname === '判断题') that.data.stimulistname = 'zerostimulist';
          if (that.data.timuname === '多选题') that.data.stimulistname = 'twostimulist';
        };
        if (that.data.tikuname === '国网五通题库') {
          if (that.data.timuname === '单选题') that.data.stimulistname = 'gwwt-onestimulist';
          if (that.data.timuname === '判断题') that.data.stimulistname = 'gwwt-zerostimulist';
          if (that.data.timuname === '多选题') that.data.stimulistname = 'gwwt-twostimulist';
        };
        if (that.data.tikuname === '银行业-网点负责人考试习题') {
          if (that.data.timuname === '单选题') that.data.stimulistname = 'yhywdfzr-onestimulist';
          if (that.data.timuname === '判断题') that.data.stimulistname = 'yhywdfzr-zerostimulist';
          if (that.data.timuname === '多选题') that.data.stimulistname = 'yhywdfzr-twostimulist';
        };
        //console.log(that.searchDatalist);
        wx.setStorage({
          key: that.data.stimulistname,
          data: res.result.data
        });
        that.onLoad();

      },
      fail: console.error
    });

   
   
  },
  //清空缓存按钮函数
  loginBtnClickclear: function (e) {
    
    wx.clearStorage();


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
        answerE: this.data.timulist[this.data.timunumber].answerE,
        answerF: this.data.timulist[this.data.timunumber].answerF,
        answerG: this.data.timulist[this.data.timunumber].answerG,
        answerH: this.data.timulist[this.data.timunumber].answerH,
        chooseanswer: '',
        answerRoW: '',
        clearchecked:false,
        chooseanswerA: '',//多选题当前样式
        chooseanswerB: '',//多选题当前样式
        chooseanswerC: '',//多选题当前样式
        chooseanswerD: '',//多选题当前样式
        chooseanswerE: '',//多选题当前样式
        chooseanswerF: '',//多选题当前样式
        chooseanswerG: '',//多选题当前样式
        chooseanswerH: '',//多选题当前样式
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


  //看答案按钮
  loginBtnClick2: function (e) {
    if (this.data.timulist[this.data.timunumber].answertxt===this.data.chooseanswer) {
     console.log("答案正确！");
      this.data.answerRoW=true;
    }
    else{
      console.log("答案错误！");
      this.data.answerRoW =false;
    };
    this.setData({
      answerRoW: this.data.answerRoW
    });
    //多选题使用
   // this.data.chooseanswerA ="'rightanswer'";
    if (this.data.answertxt.indexOf('A')>=0){
    this.setData({
      chooseanswerA: 'rightanswer',
     });
    } else {
      this.setData({
        chooseanswerA: 'wronganswer',
      });
     };
    if (this.data.answertxt.indexOf('B') >= 0) {
      this.setData({
        chooseanswerB: 'rightanswer',
      });
    } else {
      this.setData({
        chooseanswerB: 'wronganswer',
      });
    };
    if (this.data.answertxt.indexOf('C') >= 0) {
      this.setData({
        chooseanswerC: 'rightanswer',
      });
    } else {
      this.setData({
        chooseanswerC: 'wronganswer',
      });
    };
    if (this.data.answertxt.indexOf('D') >= 0) {
      this.setData({
        chooseanswerD: 'rightanswer',
      });
    } else {
      this.setData({
        chooseanswerD: 'wronganswer',
      });
    };
    if (this.data.answertxt.indexOf('E') >= 0) {
      this.setData({
        chooseanswerE: 'rightanswer',
      });
    } else {
      this.setData({
        chooseanswerE: 'wronganswer',
      });
    };
    if (this.data.answertxt.indexOf('F') >= 0) {
      this.setData({
        chooseanswerF: 'rightanswer',
      });
    } else {
      this.setData({
        chooseanswerF: 'wronganswer',
      });
    };
    if (this.data.answertxt.indexOf('G') >= 0) {
      this.setData({
        chooseanswerG: 'rightanswer',
      });
    } else {
      this.setData({
        chooseanswerG: 'wronganswer',
      });
    };
    if (this.data.answertxt.indexOf('H') >= 0) {
      this.setData({
        chooseanswerH: 'rightanswer',
      });
    } else {
      this.setData({
        chooseanswerH: 'wronganswer',
      });
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
        answerE: this.data.timulist[this.data.timunumber].answerE,
        answerF: this.data.timulist[this.data.timunumber].answerF,
        answerG: this.data.timulist[this.data.timunumber].answerG,
        answerH: this.data.timulist[this.data.timunumber].answerH,
        chooseanswer: '',
        answerRoW: '',
        clearchecked: false,
        chooseanswerA: '',//多选题当前样式
        chooseanswerB: '',//多选题当前样式
        chooseanswerC: '',//多选题当前样式
        chooseanswerD: '',//多选题当前样式
        chooseanswerE: '',//多选题当前样式
        chooseanswerF: '',//多选题当前样式
        chooseanswerG: '',//多选题当前样式
        chooseanswerH: '',//多选题当前样式
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
   * 单选按钮函数
   */
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.setData({
     chooseanswer: e.detail.value
    });
  },

   /**
   * 多选按钮函数
   */

  checkboxChange: function (e) {
    console.log(e.detail.value);
    console.log(e.detail.value.sort().join(""));
    console.log(e.detail.value.indexOf('A'));
    this.setData({
      chooseanswer: e.detail.value.sort().join(""),
    });
    console.log(this.data.chooseanswer.indexOf('A') >= 0 ? 'rightanswer' : 'wronganswer');
  },


  //文本框赋值
  bindKeywordInput: function (e) {
    var namesearchnumber = e.detail.value;
    this.setData({
      searchtimunumber: namesearchnumber-1,
    })
  },

  //跳转按钮函数  
  jumploginBtnClick: function (e) {
    if ((this.data.searchtimunumber < this.data.timutotal) && (this.data.searchtimunumber>=0)){
    this.setData({
      timunumber: this.data.searchtimunumber,
      chooseanswer: '',
      answerRoW: '',
      clearchecked: false,
      chooseanswerA: '',//多选题当前样式
      chooseanswerB: '',//多选题当前样式
      chooseanswerC: '',//多选题当前样式
      chooseanswerD: '',//多选题当前样式
      chooseanswerE: '',//多选题当前样式
      chooseanswerF: '',//多选题当前样式
      chooseanswerG: '',//多选题当前样式
      chooseanswerH: '',//多选题当前样式
    });
    this.onLoad();
    } else {
      wx.showToast({
        title: '无此题！',
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