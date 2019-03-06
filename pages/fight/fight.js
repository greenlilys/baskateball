// pages/fight/fight.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hx: true,
    hx1: false,
    zhan1: true,
    myFight: true,
    pageNo: 1,
    data: [],
    userId: "",
    dataBox: {},
    color: '#c71111,#000',
    sharePersonId:'',//分享人Id
  },
  //  myFight
  myFight() {
    this.setData({
      hx: true,
      hx1: false,
      zhan1: true,
      zhan2: false,
      myFight: true,
      myFight2: false
    })
  },
  // myFight2
  myFight2() {
    this.setData({
      hx: false,
      hx1: true,
      zhan1: false,
      zhan2: true,
      myFight: false,
      myFight2: true,
      pageNo: 1
    })
    this.data.data = []
    this.getData()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {     
      let that = this;
      this.setData({
          sharePersonId: options.sharePersonId || ''
      })
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    });
  },
    /**
       * 用户转发
       */
    onShareAppMessage: function (res) {
        app.handleShare();
        return app.onShareAppMessage({
            path: '/pages/fight/fight?sharePersonId=' + app.globalData.userId
        });

    },  

  //允许登录
  bindGetUserInfo: function(e) {
    var that = this;
    //插入登录的用户的相关信息到数据库
    wx.request({
      url: app.data.local + 'stuser/userlogin',
      data: {
        wechatToken: app.globalData.openid,
        nickName: e.detail.userInfo.nickName,
        avatar: e.detail.userInfo.avatarUrl,
          userId: that.data.sharePersonId
      },
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res)
        if (res.data.errcode == 200) {
          var data = {
            userId: res.data.data.id
          }
          wx.setStorageSync('data', data)
          wx.switchTab({
            url: "../fight/fight"
          })
          that.setData({
            loginBox: false,
            mask: false,
            userId: res.data.data.id,
          })
          app.globalData.userId = that.data.userId;
          app.globalData.loginFlag= res.data.data.loginFlag;
        }
      }
    })
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
    this.getFight()
    if (app.globalData.userId) {
      this.setData({
        loginBox: false,
        mask: false,
      })
    }
    if (!app.globalData.userId) {
      this.setData({
        loginBox: true,
        mask: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
    navhelp(){
        wx.navigateTo({
            url: '/pages/template/help/help',
        })
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
 
  // 跳转战绩详情
  godataDetail(e) {
    console.log(e)
    let id = e.currentTarget.id
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../fightTemplate/mySelfData/mySelfData?sectionid=' + id + "&Bscore=" + this.data.data[index].Bscore + "&isWin=" + this.data.data[index].isWin
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
        userId: app.globalData.userId
      },

      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {         
        let data = res.data.data;
          console.log(data)
        this.setData({
          data: this.data.data.concat(data)
        })
        wx.showLoading({
          title: '加载中',
          icon: 'loading',
        });
        setTimeout(() => {
          wx.hideLoading();
        }, 500)
        let o = this.data.data
        if (o.indexOf(o.length + 1) == -1) {
          wx.showToast({
            title: '没有更多数据了',
          })
        }
        if (this.data.data.length > 0) {
          this.setData({
            myFight2: true,
            noData: false
          })
        } else {
          this.setData({
            myFight2: false,
            noData: true
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
  // 获取战力
  getFight() {
    wx.request({
      url: app.data.local + 'stuser/detail',
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      data: {
        userId: app.globalData.userId
      },
      success: (res) => {
          console.log(res)
        this.setData({
          dataBox: res.data.data
        })
      }
    })
  }
})