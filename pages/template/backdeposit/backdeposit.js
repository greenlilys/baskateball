// pages/template/backdeposit/backdeposit.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
        mask:false,
        modal:false,
        deposit:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  bkdeposit () {
     this.setData({
       mask:true,
       modal:true
     })
  },
  stay () {
    this.setData({
      mask: false,
      modal: false
    })
  },
  backbtn () {
    wx.request({
      url: app.data.localg + 'stbondrefund/createBondRefund',
      data: {
        userId:app.globalData.userId
      },
      method: 'POST',
      header: { 'content-type': 'application/json' },
      success: (res) => {
              console.log(res)
        if (res.data.errcode==200){
            wx.navigateTo({
              url: '../successdeposit/successdeposit',
            })
        } else if (res.data.errcode == 202){
            wx.showModal({
              title: '注意',
              content: res.data.errmsg,
            })
        } else if (res.data.errcode == 201){
          wx.showModal({
            title: '注意',
            content: res.data.errmsg,
          })
        }
        }
      })
  },
  // 获取保证金
  getDeposit() {
    wx.request({
      url: app.data.local + 'stuser/matchbond',
      data: {
      },
      method: 'POST',
      header: { 'content-type': 'application/json' },
      success: (res) => {
        this.setData({
          deposit:res.data.data.bzj
        })
      }
    })
  }
})