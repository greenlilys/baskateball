// pages/template/bindingcell/bindingcell.js
const app = getApp();
Page({
    data: {
        phone: '',//手机号
        code: '',//验证码       
        codename: '获取验证码',
        disabled:true
       
    },
    //获取输入框手机号
    getPhoneValue: function (e) {       
        this.setData({
            phone: e.detail.value
        })
    },
    //获取输入框验证码
    getCodeValue: function (e) {
        this.setData({
            code: e.detail.value
        })
    },
    //获取验证码
    getCodeBtn() {
        if (this.data.disabled) {
            this.getCode();
        }
    },
    //获取验证码
    getCode: function () {
        this.setData({
            disabled:false
        })
        let phone = this.data.phone;       
        let myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
        if (phone == "") {
            wx.showToast({
                title: '手机号不能为空',
                image: '/pages/image/warn.png',
                duration: 1000
            })
            this.setData({
                disabled: true
            })
            return false;
        } else if (!myreg.test(phone)) {
            wx.showToast({
                title: '请输入正确的手机号',
                image: '/pages/image/warn.png',
                duration: 1000
            })
            this.setData({
                disabled: true
            })
            return false;
        } else {
            app.sendRequest({
                data: {},                
                url: 'stuser/sendSms/' + phone,
                success:(res)=>{ 
                    var num = 61;
                    var timer = setInterval(function () {
                        num--;
                        if (num <= 0) {
                            clearInterval(timer);
                            this.setData({
                                codename: '重新发送',
                                disabled: true
                            })
                        } else {
                            this.setData({
                                codename: num + "s"
                            })
                        }
                    }.bind(this), 1000)
                },
                fail:(res)=>{
                    this.setData({
                        disabled: true
                    })
                }
            })
        }
    },
    
    //确认绑定
    confirmbind: function () {      
        let phone = this.data.phone; 
        let code = this.data.code;
        let myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
        if (phone == "") {          
            wx.showToast({
                title: '手机号不能为空',
                image: '/pages/image/warn.png',
                duration: 1000
            })
            return false;
        } else if (!myreg.test(phone)) {
            wx.showToast({
                title: '请输入正确的手机号',
                image: '/pages/image/warn.png',
                duration: 1000
            })
            return false;
        }
        if (code == "") {
            wx.showToast({
                title: '验证码不能为空',
                image: '/pages/image/warn.png',
                duration: 1000
            })
            return false;

        } else {          
            app.sendRequest({                           
                url: 'stuser/bind',
                data: {
                    phone: phone,
                    verifyCode: code,
                    userId: app.globalData.userId
                }, 
                success: (res) => {
                    // console.log(res)                    
                    wx.showToast({
                        title: '绑定成功',
                        icon: 'success',
                        duration: 1000
                    })
                    wx.navigateBack({
                        delta: 1
                    })                   
                },
                fail:(res)=>{
                    wx.showToast({
                        title: '绑定失败',
                        image: '/pages/image/warn.png',
                        duration: 1000
                    })
                }
            })
        }
    },
    /**
         * 用户转发
         */
    onShareAppMessage: function (res) {
        app.handleShare();
        return app.onShareAppMessage({});

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
       
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

    }


})