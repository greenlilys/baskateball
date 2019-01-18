// pages/template/opinion/opinion.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentInput:'',
      x: app.globalData.systemInfo.windowWidth - 70,
      y: app.globalData.systemInfo.windowHeight - 60
  },
  getInput: function (e) {
    this.setData({
      currentInput: e.detail.value
    })
  },
  // 提交意见
  submit () {
    wx.request({
      url: app.data.local + 'feedback/feed',
      header: { 'content-type': 'application/json' },
      method:'POST',
      data: {
        feedbackContent: this.data.currentInput,
        userId:app.globalData.userId
      },
      success: (res) => {
        if(res.statusCode == 200){
          wx.showToast({
            title: '提交成功',
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
           * 用户转发
           */
    onShareAppMessage: function (res) {
        app.handleShare();
        return app.onShareAppMessage({});

    }
})