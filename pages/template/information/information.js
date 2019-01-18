// pages/infomation/information.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xthx: true,
    bshx: false,
    mask: false,
    modalx: false,
    pageNo: 1,
    type: 1,
    dataBox: [],
    msgBox: [],
    noData: false,
    hasData:true,
      x: app.globalData.systemInfo.windowWidth - 70,
      y: app.globalData.systemInfo.windowHeight - 60
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
    backIndex() {//返回首页
        wx.switchTab({
            url: '../../index/index',
        })
    },
  getData() {
    var that = this
    wx.request({
      url: app.data.local + 'stmessage/message',
      data: {
        pageNo: this.data.pageNo,
        pageSize: 10,
        userId: app.globalData.userId,
        type: this.data.type
      },
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        let dataBox = res.data.data.list
        that.setData({
          count: res.data.data.count,
          dataBox: that.data.dataBox.concat(dataBox)
        })
        if (that.data.dataBox.length > 0) {
          that.setData({
            hasData:true,
            noData: false
          })
        }
        else{
          that.setData({
            hasData: false,
            noData: true
          })
        }
      }
    })
  },
  lower() {
    this.setData({
      pageNo: ++this.data.pageNo
    })
    this.getData()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.data.dataBox = []
    this.getData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

    /**
           * 用户转发
           */
    onShareAppMessage: function (res) {
        app.handleShare();
        return app.onShareAppMessage({});

    },

  xtxx() {
    this.setData({
      xthx: true,
      bshx: false,
      type: 1,
      pageNo: 1
    })
    this.onShow()
  },
  bsxx() {
    this.setData({
      xthx: false,
      bshx: true,
      type: 2,
      pageNo: 1
    })
    this.onShow()
  },
  look(e) {
    var that = this
    console.log(e)
    let id = e.currentTarget.id
    wx.request({
      url: app.data.local + 'stmessage/msgdetail',
      data: {
        id: id
      },
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res)
        that.setData({
          msgBox: res.data.data,
          mask: true,
          modalx: true,
        })
      }
    })
  },
  close() {
    this.setData({
      mask: false,
      modalb: false,
      modalx: false,
    })
    if (this.data.type == 1) {
      this.setData({
        type: 1
      })
      this.onShow()
    } else if (this.data.type == 2) {
      this.setData({
        type: 2
      })
      this.onShow()
    }
  },
  // 全部已读
  fullRead() {
    console.log(1)
    let arr = []
    for (var i in this.data.dataBox) {
      arr.push(this.data.dataBox[i].id)
    }
    wx.request({
      url: app.data.local + 'stmessage/editmsgstatus',
      data: arr,
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        if (res.data.errcode == 200) {
          if (this.data.type == 1) {
            this.setData({
              type: 1
            })
            this.onShow()
          } else if (this.data.type == 2) {
            this.setData({
              type: 2
            })
            this.onShow()
          }
        }
      }
    })
  }
})