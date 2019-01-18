// pages/indexTemplate/hePage/hePage.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    height: '--',
    weight: '--',
    old: '--',
    sizhi: '未知',
    gz:0,
    fs:0,
    avatar: '',
    name: '',
    row: '',
    num: 70,
    data: {},
    userId:"",
    x: app.globalData.systemInfo.windowWidth - 70,
    y: app.globalData.systemInfo.windowHeight - 60
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getData () {
    wx.request({
      url: app.data.local + 'stuser/detail',
      method:"POST",
      header: { 'content-type': 'application/json' },
      data: {
        userId: app.globalData.userId
      },
      success: (res) => {
        this.setData({
          data: res.data.data
        })
      }

    })
  },
  onLoad: function (options) {
    this.setData({
      userId:options.userId
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
  },
    backIndex() {//返回首页
        wx.switchTab({
            url: '../../index/index',
        })
    },
    /**
       * 用户转发
       */
    onShareAppMessage: function (res) {
        app.handleShare();
        return app.onShareAppMessage({});

    },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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


  // 跳转我的关注
  gogzList () {
    wx.navigateTo({
      url: '../gzlist/gzlist',
    })
  },
// 跳转我的粉丝
gofsList () {
  wx.navigateTo({
    url: '../fslist/fslist',
  })
},
// 跳转我的战绩
gomyFight(){
  wx.navigateTo({
    url: '../gofight/gofight?userId='+this.data.userId+"&mername=我的战绩"
  })
 }
})