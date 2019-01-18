// pages/indexTemplate/depositSuccess/depositSuccess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: "",
    myNum: "",
    matchId: "",
    userId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      num: options.matchStartdrill,
      myNum: options.userStartdrill,
      matchId: options.matchId,
      userId: options.userId
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
  // 缴纳报名费
  pay () {
    wx.redirectTo({
      url: '../signfee/signfee?matchId=' + this.data.matchId + '&userId=' + this.data.userId + '&matchStartdrill=' + this.data.num + '&userStartdrill=' + this.data.myNum
    })
  }
})