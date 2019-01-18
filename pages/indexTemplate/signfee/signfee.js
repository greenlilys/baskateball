// pages/indexTemplate/signfee/signfee.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      mask:false,
      modal:false,
      modal2:false,
      num:"",
      myNum:"",
      matchId:"",
      userId:"",
      confirm:true
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
//  缴纳报名费
pay () {
  this.setData({
    mask:true,
    modal:true
  })
},
// 取消报名
cancel () {
  this.setData({
    mask: false,
    modal: false
  })
},
// 确认报名
confirm () {
          this.setData({
            confirm:false,
         })
          var that = this
            //统一下单
            wx.request({
              url:app.data.local + "stsign/payentryfee",
              method:"POST",
              data: {
                userId:this.data.userId,
                matchId:this.data.matchId
              },
              method: 'POST',
              success: function (res) {
                console.log(res);
                if(res.data.data=="success"){
                  wx.redirectTo({
                          url: '../signSuccess/signSuccess',
                    })
                } else if (res.data.data == 400){
                  wx.showToast({
                    title: '您已报名',
                  })
                } else if (res.data.data == 401){
                  wx.showToast({
                    title: '余额不足',
                  })
                  that.setData({
                    modal2: true,
                    modal: false
                  })
                }
              },
              'fail': function (res) {
                console.log("获取信息失败");
              }
            })
          
},
// 取消充值
btn1 () {
  this.setData({
    modal2: false,
    modal:true
  })
},
// 充值
btn2(){
  wx.navigateTo({
    url: '../../template/recharge/recharge',
  })
}
})