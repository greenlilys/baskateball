// pages/indexTemplate/deposit0/deposit0.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     num:"",
     myNum:"",
     matchId:"",
     userId:"",
     deposit:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        num: options.matchStartdrill,
        myNum: options.userStartdrill,
        matchId:options.matchId,
        userId:options.userId
      })
    console.log(options.matchId)
    console.log(this.data.matchId)
      // 获取保证金
    this.getDeposit()
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
  // 缴纳报名费
  pay () {
    wx.redirectTo({
          url: '../../template/deposit/deposit?matchId=' + this.data.matchId + '&userId=' + this.data.userId + '&matchStartdrill=' + this.data.num + '&userStartdrill=' + this.data.myNum
        })
  },
  // 获取保证金
  getDeposit(){
    wx.request({
      url: app.data.local + 'stuser/matchbond',
      data: {
      },
      method: 'POST',
      header: { 'content-type': 'application/json' },
      success: (res) => {
        this.setData({
          deposit: res.data.data.bzj
        })
        }
      })
  }
})