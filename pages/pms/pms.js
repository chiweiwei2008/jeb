//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    loginshow:false,//没有登录时不能查看
    showDatalist:[],
    searchDatalist: [],
    select:false,
    sblxtype:'断路器',
    bdzname: '1000kV保定站',
    selectbdz: false,
    searchKeywordyxbhid:'',
    searchKeywordtypename:'',
    searchLoading: true, //"上拉加载"的变量，默认false，隐藏
    searchLoadingComplete: false , //“没有数据”的变量，默认false，隐藏
    searchPageNum: 1,   // 设置加载的第几次，默认是第一次
    callbackcount: 20,      //返回数据的个数
    pmslist : [],
    bdznamelist: app.globalData.bdznamelist,
    sblxtypelist: app.globalData.sblxtypelist

    
  },

  onLoad: function () {
      // 权限认证
      var that=this
      wx.getStorage({
        key: 'userObj',
        success: function (userObj) {
          // console.log('用户已登录！');
          that.setData({
            loginshow:true
          })
  
        },
        fail: function (e) {
          wx.redirectTo({
            url: '../login/login'
          })
        }
      })

    wx.cloud.init();
    var that = this;
    if (this.data.searchPageNum == 1)this.data.searchDatalist=[];
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getData',
      // 传给云函数的参数
      data: {
       bdzname:that.data.bdzname,
       sblxtype:that.data.sblxtype,
       searchKeywordyxbhid: that.data.searchKeywordyxbhid,
       searchKeywordtypename:that.data.searchKeywordtypename
      },
      success: function (res) {
        // console.log(res.result) ;
        //console.log(that.searchDatalist);
        that.setData({
          showDatalist: res.result.data,
          });
        //that.searchScrollLower();
       if(that.data.searchPageNum==1){
         for (var i = 0; i < that.data.callbackcount;i++){
          that.data.searchDatalist[i]=that.data.showDatalist[i];
        }

        } 
       
        that.setData({
         searchDatalist: that.data.searchDatalist,
        });
        console.log(that.data.searchDatalist);
        //that.data.searchDatalist = that.data.showDatalist;
        // console.log(that.data.searchDatalist.length);
      },
      fail: console.error
    });
  },
  //变电站名称绑定函数
  bindShowMsgbdz() {
    this.setData({
      selectbdz: !this.data.selectbdz
    });

  },
  mySelectbdz(e) {
    var name = e.currentTarget.dataset.name;
    //console.log(e);
    this.setData({
      bdzname: name,
      selectbdz: false,
      //showDatalist:searchDatalist
    });
  },
  //设备类型绑定函数
  bindShowMsg() {
    this.setData({
      select: !this.data.select
    });
  
  },
  mySelect(e) {
    var name = e.currentTarget.dataset.name;
    this.setData({
      sblxtype: name,
      select: false,
      //showDatalist:searchDatalist
    });
    //this.onLoad();
  },
//运行编号赋值
  bindKeywordInputyxbhid: function (e) {
    var nameyxbhid = e.detail.value;
    this.setData({
      searchKeywordyxbhid: nameyxbhid,
    })}
,
  //设备型号赋值
  bindKeywordInputtypename: function (e) {
    var nametypename = e.detail.value;
    this.setData({
      searchKeywordtypename: nametypename,
    })
  }
  ,
  loginBtnClick:function(e){
    this.setData({
      searchPageNum:1,
      searchLoading:false,
      searchLoadingComplete:false,
      bdzname:this.data.bdzname,
      sblxtype: this.data.sblxtype,
      searchKeywordyxbhid: this.data.searchKeywordyxbhid,
      searchKeywordtypename: this.data.searchKeywordtypename

    });
    //判断查询项是否为空
    if ((this.data.searchKeywordyxbhid != '') | (this.data.searchKeywordtypename != '')){
      wx.cloud.init();
      const db = wx.cloud.database();
      var that=this;
        wx.cloud.callFunction({
          // 云函数名称
          name: 'getData',
          // 传给云函数的参数
          data: {
            bdzname: that.data.bdzname,
            sblxtype: that.data.sblxtype,
            searchKeywordyxbhid: that.data.searchKeywordyxbhid,
            searchKeywordtypename: that.data.searchKeywordtypename
          },
          success: function (res) {
            // console.log(res.result);
            //console.log(that.searchDatalist);
            that.setData({
              pmslist : res.result.data,
            });
            // console.log(that.data.pmslist.length);
              that.onLoad();
          },
          fail:function() {
            wx.showToast({
                title: '不存在该设备！请检查查询条件，运行编号和设备型号需与被查询对象一致。',
                icon: 'none',
                duration: 3000,

          })}

        });
        //console.log(this.data.pmslist.length);
        
    }
    else
    {
      this.onLoad();
    }
  },
  //显示设备详细信息
  clickItem:function(e){
    //设置缓存，页面之间传递数据
    wx.setStorage({
      key: "pmsdatalist",
      data: this.data.searchDatalist
    })
    wx.navigateTo({
      url: '../pmsitem/pmsitem?index='+e.currentTarget.dataset.index,
    })
    console.log(e.currentTarget.dataset.index)
    //console.log(index)
  },
  /*
  searchScrollLower: function () {
    this.setData({
      searchabc:999999,
    })
  }
  */

  searchScrollLower: function () {
    let that = this;
    var total = this.data.showDatalist.length;
    var pagetotal = Math.ceil(total / that.data.callbackcount)-1;
   
    var j=0;
    var loadMore=false;
    if ((that.data.searchPageNum <= pagetotal ) && (that.data.searchPageNum>=1))
    {
      var newarray=[];
      for (var i = that.data.searchPageNum * that.data.callbackcount; i < (that.data.searchPageNum + 1) * that.data.callbackcount;i++)        {
     if(i<total){
       newarray[j]=that.data.showDatalist[i];
       j++;
       }
        }
      that.setData({
        searchPageNum: that.data.searchPageNum + 1,  //每次触发上拉事件，把searchPageNum
        searchLoading: true,
        searchLoadingComplete: false,
        searchDatalist: that.data.searchDatalist.concat(newarray),
        loadMore:true
                  });
      
     }
    if (that.data.searchPageNum >pagetotal)
    {

    that.setData({
      searchLoadingComplete:true,
      searchLoading: false,
      //loadMore: false
    })
        
    }
    if(loadMore==true)that.onLoad();
  },
  


  
})
