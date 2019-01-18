// pages/template/MyCore/MyCore.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageNo: 1,
        data: [], //积分列表
        integral: "" //累计积分
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            integral: options.integral,
            data: []
        })
        this.getCore();

    },
    getCore() {
        var that = this;
        wx.request({
            data: {
                pageNo: this.data.pageNo,
                pageSize: 5,
                userId: app.globalData.userId
            },
            method: 'POST',
            url: app.data.local + 'stuser/integral',
            success(res) {
                let lastData = res.data.data;
                that.setData({
                    data: that.data.data.concat(lastData)
                })
            }
        })
    },
    lower() {       
        this.setData({
            pageNo: ++this.data.pageNo,
        })
        this.getCore();
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
    onShareAppMessage: function(res) {
        app.handleShare();
        return app.onShareAppMessage({});

    }
})