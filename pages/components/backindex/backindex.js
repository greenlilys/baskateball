// pages/components/backindex/backindex.js

//回到首页按钮(组件)

const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    //返回首页按钮初始坐标
    x: app.globalData.systemInfo.windowWidth - 70,
    y: app.globalData.systemInfo.windowHeight - 60
  },

  /**
   * 组件的方法列表
   */
  methods: {
    backIndex() {
      wx.switchTab({
        url: '../../index/index',
      })
    }
  }
})
