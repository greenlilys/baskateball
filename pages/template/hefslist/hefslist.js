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
    avatar: '',
    name: '',
    row: '',
    num: 70,
    data: [],
    pageNo: 1,
    userId: '',
      x: app.globalData.systemInfo.windowWidth - 70,
      y: app.globalData.systemInfo.windowHeight - 60
  },
  getData() {
    wx.request({
      url: app.data.local + 'stuser/fanc',
      header: { 'content-type': 'application/json' },
      method: "POST",
      data: {
        pageNo: this.data.pageNo,
        pageSize: 5,
        userId:this.data.userId
      },
      success: (res) => {
        let data = res.data.data
        this.setData({
          data: this.data.data.concat(data)
        })
        console.log(this.data.data)
        if (this.data.data.length == 0) {
          this.setData({
            scroll: false,
            nogz: true
          })
        } else {
          this.setData({
            scroll: true,
            nogz: false
          })
        }
      }
    })
  },
    backIndex() {//返回首页
        wx.switchTab({
            url: '../../index/index',
        })
    },
  lower() {
    this.setData({
      pageNo: ++this.data.pageNo
    })
    this.getData()
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    console.log(options)
    this.setData({
      userId: options.userId
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 查看他人主页
  gohePage(e) {
    let id = e.currentTarget.id
    wx.navigateTo({
      url: '../hePage/hePage?userId=' + id,
    })
  }
})