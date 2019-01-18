// pages/template/wallet/wallet.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startdrill:"",
    isBond:"",
      x: app.globalData.systemInfo.windowWidth - 70,
      y: app.globalData.systemInfo.windowHeight - 60
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       this.setData({
         isBond: options.isBond,
         startdrill: options.startdrill
       })
  }, 
    backIndex() {//返回首页
        wx.switchTab({
            url: '../../index/index',
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
          * 用户转发
          */
    onShareAppMessage: function (res) {
        app.handleShare();
        return app.onShareAppMessage({});

    },
  // 跳转充值
  gochongzhi () {
    wx.navigateTo({
      url: '../recharge/recharge'
    })
  },
  gobaozhengjin () {
    if(this.data.isBond==1){
      wx.navigateTo({
        url: '../backdeposit/backdeposit'
      })
    } else if (this.data.isBond == 0){
          wx.redirectTo({
            url: '../depositper/depositper'
          })
    }
  },
  goxiaofeijilu () {
    wx.navigateTo({
      url: '../consumptionrecords/consumptionrecords'
    })
  }
})