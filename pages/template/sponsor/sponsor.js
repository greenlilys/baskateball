// pages/template/sponsor/sponsor.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: [],
    // customItem: '全部'
    orgName:'',
    phone:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  jgInput(e){
    this.setData({
      orgName:e.detail.value
    })
  },
  cellInput(e){
    this.setData({
      phone: e.detail.value
    })
  },
  // 提交审核
  subbtn(){
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    var myjg = /^[\u4e00-\u9fa5]{2,30}$/;
    if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
   } else  if (this.data.orgName == ''){
      wx.showToast({
        title: '机构名称不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myjg.test(this.data.orgName)){
      wx.showToast({
        title: '机构名称必须纯汉字',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    else{
      wx.request({
        url: app.data.local + 'stapply/apply',
        method:'POST',
        header: { 'content-type': 'application/json' },
        data: {
          areaList:this.data.region,
          phone:this.data.phone,
          orgName: this.data.orgName,
          userId:app.globalData.userId
        },
        success: (res) => {
          console.log(res)
          if (res.data.errcode == 200){
            wx.showToast({
              title: '申请成功',
              icon: 'none',
              duration: 2000
            })
            wx.switchTab({
              url: '../../personal/personal',
            })
          }
          // } else if (res.data.errcode == 'success'){
          //   wx.showToast({
          //     title: res.data.msg,
          //     icon: 'none',
          //     duration: 2000
          //   })
           
          // }
        }
      })
    }
 }
})