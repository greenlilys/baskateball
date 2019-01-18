// pages/indexTemplate/hePage/hePage.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    height: '--',
    weight: '--',
    old: '--',
    sizhi: '司职',
    avatar: '',
    name: '',
    row:'',
    num:70,
    userId:'',
    data:{},
    guanzhu:true,
    x: app.globalData.systemInfo.windowWidth - 70,
    y: app.globalData.systemInfo.windowHeight - 60
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.setData({
      userId:options.userId
    })
    // 获取用户的战力详情
    this.getDetail()
    // 获取用户信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
    backIndex() {//返回首页
        wx.switchTab({
            url: '../../index/index',
        })
    },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getDetail(){
    wx.request({
      url: app.data.local + 'stuser/detail',
      method: "POST",
      header: { 'content-type': 'application/json' },
      data: {
        userId: this.data.userId,
        otherId: app.globalData.userId
      },
      success: (res) => {
        console.log(res)
        this.setData({
          data: res.data.data
        })
      }
    })
  },
  // 关注
  guanzhu(){
    wx.request({
      url: app.data.local + 'stfollow/follow',
      method: "POST",
      header: { 'content-type': 'application/json' },
      data: {
        followId: app.globalData.userId,
        userId: this.data.userId
      },
      success: (res) => {
        if (res.data.errcode==200){
          wx.showToast({
            title: '关注成功',
          })
          this.getDetail()
        }else{
          wx.showToast({
            title:"关注失败"
          })
        }
      }
    })
  },
  // 取消关注
quxiaogz () {
  wx.request({
    url: app.data.local + 'stfollow/unfollow',
    method: "POST",
    header: { 'content-type': 'application/json' },
    data: {
      followId: app.globalData.userId,
      userId: this.data.userId
    },
    success: (res) => {
      if (res.data.errcode == 200) {
        wx.showToast({
          title: '取消成功',
        })
        this.getDetail()
      } else {
        wx.showToast({
          title: "取消失败"
        })
      }
    }
  })
},
// 去他的关注列表
hegz(){
     wx.navigateTo({
       url: '../hegzlist/hegzlist?userId=' + this.data.userId,
     })
},
// 去他的粉丝列表
  hefs () {
    wx.navigateTo({
      url: '../hefslist/hefslist?userId=' + this.data.userId,
     })
  },
  // 跳转战绩详情
  hefight () {
      wx.navigateTo({
        url: '../gofight/gofight?userId=' + this.data.userId + '&mername=TA的战绩'
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

    }
})