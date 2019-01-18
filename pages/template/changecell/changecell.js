const app = getApp();
Page({
    data: {
        phone: '', //手机号
        code: '', //验证码
        verifyCode: null, //用于存放验证码接口里获取到的code
        codename: '获取验证码'
    },
    // 获取手机号
    getPhoneValue: function(e) {
        this.setData({
            phone: e.detail.value
        })
    },
    // 获取验证码
    getCodeValue: function(e) {
        this.setData({
            code: e.detail.value
        })
    },
    getCode: function() {
        var a = this.data.phone;
        var that = this;
        var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
        if (that.data.phone == "") {
            wx.showToast({
                title: '手机号不能为空',
                icon: 'none',
                duration: 1000
            })
            return false;
        } else if (!myreg.test(that.data.phone)) {
            wx.showToast({
                title: '请输入正确的手机号',
                icon: 'none',
                duration: 1000
            })
            return false;
        } else {
            wx.request({
                data: {

                },
                url: app.data.local + 'stuser/sendSms/' + that.data.phone,
                method: "POST",
                success(res) {                   
                    that.setData({
                        verifyCode: res.data.data
                    })
                    var num = 61;
                    var timer = setInterval(function() {
                        num--;
                        if (num <= 0) {
                            clearInterval(timer);
                            that.setData({
                                codename: '重新发送',
                                disabled: false
                            })

                        } else {
                            that.setData({
                                codename: num + "s"
                            })
                        }
                    }, 1000)
                }
            })

        }
    },
    //获取验证码
    getVerificationCode() {
        this.getCode();
        var _this = this
        _this.setData({
            disabled: true
        })
    },
    confirmbind: function() {
        var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
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
        }
        if (this.data.code == "") {
            wx.showToast({
                title: '验证码不能为空',
                icon: 'none',
                duration: 1000
            })
            return false;

        } else {
            wx.request({
                data: {
                    phone: this.data.phone,
                    verifyCode: this.data.code,
                    userId: app.globalData.userId
                },
                method: 'POST',
                url: app.data.local + 'stuser/bind',
                success(res) {
                    console.log(res)
                    if (res.data.errcode == "200") {
                        wx.showToast({
                            title: '绑定成功',
                        })
                        wx.switchTab({
                            url: '../../personal/personal',
                        })
                    } else {
                        wx.showToast({
                            icon: 'none',
                            title: '绑定失败',
                        })
                    }
                }
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            phone: options.phone
        })
    },
    /**
      * 用户转发
      */
    onShareAppMessage: function (res) {
        app.handleShare();
        return app.onShareAppMessage({});

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

    }

  
})