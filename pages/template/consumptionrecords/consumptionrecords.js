// pages/template/consumptionrecords/consumptionrecords.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     data:[],
    pageNo:1     
  },
  getData() {
    wx.request({
        url: app.data.local + 'stconsumhistory/list',
        method:"POST",
      header: { 'content-type': 'application/json' },
      data: {
        pageNo: this.data.pageNo,
        pageSize: 5,
        userId:app.globalData.userId
      },
      success: (res) => {
        let data = res.data.data
        this.setData({
          data: this.data.data.concat(data)
        })
       if(this.data.data.length == 0){
         this.setData({
           scroll:false
         })
       }else{
         this.setData({
           scroll: true
         })
       }
      }
    })
  },
  lower() {
    this.setData({
      pageNo: ++this.data.pageNo,
    })
    this.getData()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getData()
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