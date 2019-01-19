// pages/template/deposit/deposit.js
var app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: "",
    myNum: "",
    matchId: "",
    userId: "",
    deposit:""
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
    console.log(this.data.matchId)
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
  // 缴纳保证金
  pay () {
    var that = this
    wx.request({
        url: app.data.local + 'pay/wxPay',
      data: {
        userId: app.globalData.userId,
        orderPrice: "",
        sourceType: 1,
        openId: app.globalData.openid,
        bagId: ""
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        var data = res.data.data;
        if (res.data.errcode == 200) {
          console.log(that.data.matchId)
          // 调用微信支付
          wx.requestPayment({
            'appId': 'wx57c653d01323764f',
            'timeStamp': data.timeStamp,
            'nonceStr': data.nonceStr,
            'package': data.package,
            'signType': 'MD5',
            'paySign': data.paySign,
            'success': function (res) {
              console.log(res);
              if (res.errMsg == "requestPayment:ok") {
                console.log(that.data.matchId)
                wx.redirectTo({
                  url: '../../indexTemplate/depositSuccess/depositSuccess?matchId=' + that.data.matchId + '&userId=' + that.data.userId + '&matchStartdrill=' + that.data.num + '&userStartdrill=' + that.data.myNum
                })
                console.log(that.data.matchId)
              }
            },
            'fail': function (res) {
              console.log(res)
            }
          })

        } else {
          wx.showToast({
            title: '支付失败',
          })
        }
      },
      'fail': function (res) {
        console.log("获取信息失败");
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
          deposit: res.data.data.bzj
        })
      }
    })
  }
})