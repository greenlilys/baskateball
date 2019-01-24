// pages/template/recharge/recharge.js
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
        jine:'',
       code: null,
       data:[],
       pageNo:1
  },
  // 获取充值框金额
  jinInput:function (e) {
    this.setData({
      jine: Math.ceil(e.detail.value)
      })
  },
   
  getData() {
    
    wx.request({
      url: app.data.local + 'stgiftbag/list',
      method:"POST",
      header: { 'content-type': 'application/json' },
      data: {
        pageNo: this.data.pageNo,
        pageSize: 50
      },
      success: (res) => {
         this.setData({
          data: res.data.data
        })
      }
    })
  },
  // 点击充值
  confirmcz () {
     that = this
    console.log(that.data.jine)
    if (that.data.jine == '') {
      wx.showModal({
        title:'提示',
        content:'输入金额不能为空!',
        success:function(res){
              if(res.confirm) {
                console.log('用户点击确定')
              }else{
                console.log('用户点击取消')
              }
        }
      })
    } else if (isNaN(Number(that.data.jine))) {
      wx.showModal({
        title: '提示',
        content: '输入有误，请重新输入',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消')
          }
        }
      })
    }else{
            wx.request({
                url: app.data.local + 'pay/wxPay',
              data: {
                userId: app.globalData.userId,
                orderPrice: this.data.jine,
                sourceType: 2,
                openId: app.globalData.openid,
                bagId:""
              },
              method: 'POST',
              success: function (res) {
                console.log(res);
                var data = res.data.data;
                if (res.data.errcode == 200) {

                  // 调用微信支付
                  wx.requestPayment({
                    'appId': 'wx57c653d01323764f',
                    'timeStamp': data.timeStamp,
                    'nonceStr': data.nonceStr,
                    'package': data.package,
                    'signType': 'MD5',
                    'paySign': data.paySign,
                    'success': function (res) {
                      if (res.errMsg == "requestPayment:ok") {
                        wx.switchTab({
                          url: '../../personal/personal',
                        })
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
      }
  },
  chongzhi (e) {
    console.log(e)
    var id = e.currentTarget.id;
    let index = e.currentTarget.dataset.index
    wx.request({
        url: app.data.local + 'pay/wxPay',
            data: {
               userId:app.globalData.userId,
              orderPrice: this.data.data[index].gifbagAmount,
               sourceType:3,
              bagId:id,
              openId: app.globalData.openid
            },
            method: 'POST',
            success: function (res) {
              console.log(res);
              var data = res.data.data;
              if (res.data.errcode==200){
                
             // 调用微信支付
              wx.requestPayment({
                'appId':'wx57c653d01323764f',
                'timeStamp': data.timeStamp,
                'nonceStr': data.nonceStr,
                'package': data.package,
                'signType': 'MD5',
                'paySign': data.paySign,
                'success': function (res) {
                  if (res.errMsg == "requestPayment:ok") {
                        wx.switchTab({
                          url: '../../personal/personal',
                        })
                      }
                },
                'fail': function (res) {
                  console.log(res)
                }
              })
              }else{
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