// pages/template/gofight/gofight.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mername:"",
    data:[],
    pageNo:1,
    userId:"",
    x: app.globalData.systemInfo.windowWidth - 70,
    y: app.globalData.systemInfo.windowHeight - 60
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      mername: options.mername,
      userId:options.userId
    })
    console.log(this.data.userId)
    this.getData()
    wx.setNavigationBarTitle({
      title: this.data.mername//页面标题为路由参数
    })
  },
  // 获取战绩
  getData() {
    wx.request({
      url: app.data.local + 'stusermilitary/userexploits',
      method: "POST",
      data: {
        pageNo: this.data.pageNo,
        pageSize: 10,
        userId: this.data.userId
      },
      method: 'POST',
      header: { 'content-type': 'application/json' },
      success: (res) => {
        let data = res.data.data
        this.setData({
          data: this.data.data.concat(data)
        })
        console.log(JSON.stringify(data))
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
      pageNo: ++this.data.pageNo,
    })
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

    },
  godataDetail (e) {
    let id = e.currentTarget.id
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../../fightTemplate/mySelfData/mySelfData?sectionid=' + id + "&Bscore=" + this.data.data[index].Bscore + "&isWin=" + this.data.data[index].isWin,
    })
  }
})