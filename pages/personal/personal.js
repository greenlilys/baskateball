
const app = getApp();
Page({
    data: {
        //用户详细信息
        userDetail: {}
    },
 
    onLoad: function (options) {
        //查看是否授权
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
       * 用户转发
       */
    onShareAppMessage: function (res) {
        app.handleShare();
        return app.onShareAppMessage({});

    },
    //允许登录
    bindGetUserInfo: function (e) {
        var that = this;
        //个人微信信息和openid唯一标示换userId
        wx.request({
            url: app.data.local + 'stuser/userlogin',
            data: {
                wechatToken: app.globalData.openid,
                nickName: e.detail.userInfo.nickName,
                avatar: e.detail.userInfo.avatarUrl,
            },
            method: "POST",
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log(res)
                if (res.data.errcode == 200) {
                    var data = {
                        userId: res.data.data.id
                    }
                    wx.setStorageSync('data', data);
                    that.setData({
                        loginBox: false,
                        mask: false                        
                    })
                    app.globalData.userId = that.data.userId;
                    //userId换个人信息
                    that.getData();
                }
            }
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
           app.getUserDetail().then(data => {
               this.setData({
                   userDetail:data
               })
           })
      
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


    // 扫一扫
    sao() {
        wx.scanCode({
            needResult: 1,
            desc: 'scanQRCode desc',
            success: function (res) {
                console.log(res)
                if (res.errMsg === "scanCode:ok") {
                    wx.request({
                        url: app.data.local + 'stsign/sign',
                        method: "POST",
                        header: { 'content-type': 'application/json' },
                        data: {
                            stuserId: app.globalData.userId,
                            orgId: res.result
                        },
                        success: (res) => {
                            console.log(res.data)
                            if (res.data.errcode == 200) {
                                wx.navigateTo({
                                    url: "../template/successScan/successScan?signNum=" + res.data.data[0].signNum
                                })
                            } else if (res.data.errcode == 201) {
                                wx.showToast({
                                    title: res.data.errmsg,
                                })
                            } else if (res.data.errcode == 202) {
                                wx.showToast({
                                    title: res.data.errmsg,
                                })
                            } else if (res.data.errcode == 203) {
                                wx.showToast({
                                    title: res.data.errmsg,
                                })
                            }
                        }
                    })
                }
            }
        })
    },
    // 跳转消息
    message() {
        wx.navigateTo({
            url: '../template/information/information',
        }),
            wx.setNavigationBarTitle({
                title: '消息'
            })
    },
    // 跳转钱包
    wallet() {
        wx.navigateTo({
            url: '../template/wallet/wallet?isBond=' + this.data.data.isBond + '&startdrill=' + this.data.data.startdrill,
        }),
            wx.setNavigationBarTitle({
                title: '我的钱包'
            })
    },
    // 跳转赛事管理
    sai() {
        wx.request({
            url: app.data.local + 'stuser/matchmanage',
            method: "POST",
            header: { 'content-type': 'application/json' },
            data: {
                userId: app.globalData.userId
            },
            success: (res) => {
                if (res.data.data == 1) {
                    wx.navigateTo({
                        url: '../template/bindingcell/bindingcell'
                    })
                } else if (res.data.data == 2) {
                    wx.navigateTo({
                        url: '../template/competitionmanage/competitionmanage'
                    })
                }
            }

        })
    },
    // 跳转计分
    goJF() {
        wx.navigateTo({
            url: '../template/MyCore/MyCore?integral=' + this.data.data.integral,
        })
    },
    // 跳转编辑资料
    goedit() {
        wx.navigateTo({
            url: '/pages/template/edit/edit' 
        })
    },
    // 跳转关于星战
    about() {
        wx.navigateTo({
            url: '../template/about/about'
        }),
            wx.setNavigationBarTitle({
                title: '关于BBALL'
            })
    },
    // 跳转我的主页
    goMypage() {
        wx.navigateTo({
            url: '../template/myPage/myPage?userId=' + app.globalData.userId,
        })
    },
    // 跳转反馈
    opinion() {
        wx.navigateTo({
            url: '../template/opinion/opinion',
        })
    },
    // 跳转使用帮助
    helpme() {
        wx.navigateTo({
            url: '../template/help/help',
        })
    }
})