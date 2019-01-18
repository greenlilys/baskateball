//pages/fightTemplate/mySelfData/mySelfData.js
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    sectionid:"",
    Bscore:"",
    isWin:"",
    redNum:"",
    blueNum:"",
    dataRed:[],
    dataBlue:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      sectionid: options.sectionid,
      Bscore: options.Bscore,
      isWin: options.isWin,
      redNum: options.Bscore.substr(0,2),
      blueNum: options.Bscore.substr(3, 5)
    })
    this.getData()
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
          console.log(res.userInfo)
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 获取战绩详情
  getData(){
    wx.request({
      url: app.data.local + 'stusermilitary/exploitsdetail',
      method: "POST",
      data: {
        id: this.data.sectionid
      },
      method: 'POST',
      header: { 'content-type': 'application/json' },
      success: (res) => {
        for (var i in res.data.data.red){
          res.data.data.red[i].nickName = res.data.data.red[i].nickName.substr(0,4)
        }
        for (var i in res.data.data.blue){
          res.data.data.blue[i].nickName = res.data.data.blue[i].nickName.substr(0, 4)
        }
          this.setData({
             dataRed:res.data.data.red,
             dataBlue:res.data.data.blue
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