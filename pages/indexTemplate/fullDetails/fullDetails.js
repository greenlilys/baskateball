// pages/indexTemplate/fullDetails/fullDetails.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    matchId:'',
    userId:'',
    mername:"",
    pageNo:1,
    myBox:[],
    otherBox:[],
    nickName:"",
    nick:"",
    isHaveMe:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      matchId: options.mid,
      mername: options.mername
    })
    this.getData()
    // 获取用户信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.setNavigationBarTitle({
      title: this.data.mername//页面标题为路由参数
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onReady: function () {
  
  },
getData(){
  wx.request({
    url: app.data.local + 'match/matchdetail',
    method: "POST",
    header: { 'content-type': 'application/json' },
    data: {
      matchId: this.data.matchId,
      userId: app.globalData.userId,
      pageSize:10,
      pageNo:this.data.pageNo
    },
    success: (res) => {
      let myBox = res.data.data.currentUser
      let rownum = myBox.rownum
      if (rownum=="")
      {
        this.setData({
          isHaveMe: false
        })
      }
      console.log(JSON.stringify(myBox))

      for (var i in res.data.data.other){
        res.data.data.other[i].nick = res.data.data.other[i].nick_name.substr(0, 4)
      }
      let otherBox = res.data.data.other
      this.setData({
        myBox:myBox,
        otherBox:this.data.otherBox.concat(otherBox),
      })

      if (res.data.data.currentUser){
       this.setData({
         nickName: myBox.nick_name.substr(0, 4)
       })
      }
      
      wx.showLoading({
        title: '加载中',
        icon: 'loading',
      });
      setTimeout(() => {
        wx.hideLoading();
      }, 500)
     let o = this.data.otherBox
     if(o.indexOf(o.length+1)==-1){
           wx.showToast({
             title: '没有更多数据了',
           })
     }
    }
  })
},
  lower() {
    this.setData({
      pageNo: ++this.data.pageNo,
    })
    this.getData()
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