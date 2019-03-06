// pages/ranking/ranking.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        hasUserInfo: false,
        hx1: true,
        hidden: true,
        hiddenuser: true,
        title1: '全国',
        title2: '全部用户',
        titleA: true,
        xsjl: true,
        xsjh: true,
        zhanli: true,
        title1: true,
        title2: false,
        jingyan: false,
        jyBox: true,
        user: [],
        dataBox: [],
        userJ: [],
        dataJ: [],
        pageNo: 1,
        nickName: "",
        sharePersonId: '',//分享人Id
    },
    clickqg() {
        this.setData({
            hidden: !this.data.hidden,
            titleA: true,
            titleB: false,
            xsjl: true,
            xsjh: true
        })
    },
    clickuser() {
        this.setData({
            hiddenuser: !this.data.hiddenuser,
            titleA: false,
            titleB: true,
            xsjl: false,
            xsjh: false
        })
    },
    qg() {
        this.setData({
            title1: "全国",
            hidden: true
        })
    },
    hd() {
        this.setData({
            title1: "华东地区",
            hidden: true
        })
    },
    hn() {
        this.setData({
            title1: "华南地区",
            hidden: true
        })
    },
    hb() {
        this.setData({
            title1: "华北地区",
            hidden: true
        })
    },
    full() {
        this.setData({
            title2: "全部用户",
            hiddenuser: true
        })
    },
    my() {
        this.setData({
            title2: "我关注的",
            hiddenuser: true
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            sharePersonId: options.sharePersonId || ''
        })
        // 获取战力
        this.getData()
        // 获取经验值
        this.getJing()
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
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
        let that = this
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    clientHeight: res.windowHeight
                });
            }
        });
    },
    // 获取战力
    getData() {
        console.log(app.globalData.userId)
        wx.request({
            url: app.data.local + 'stusermilitary/rankings',
            data: {
                pageNo: this.data.pageNo,
                pageSize: 10,
                userId: app.globalData.userId,
                type: 1
            },
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success: (res) => {
                // console.log(res)
                let dataBox = res.data.data.other;
                let user = res.data.data.user;
                
                this.setData({
                    dataBox: this.data.dataBox.concat(dataBox),
                    user: user
                })
                wx.showLoading({
                    title: '加载中',
                    icon: 'loading',
                });
                setTimeout(() => {
                    wx.hideLoading();
                }, 500)
                if (this.data.dataBox.length > 0) {
                    this.setData({
                        zhanlizhi: true,
                        zwgz: false
                    })
                } else {
                    this.setData({
                        zhanlizhi: false,
                        zwgz: true
                    })
                }
            }
        })
    },
    /**
       * 用户转发
       */
    onShareAppMessage: function (res) {
        app.handleShare();
        return app.onShareAppMessage({
            path: '/pages/ranking/ranking?sharePersonId=' + app.globalData.userId
        });

    },
    lower() {
        this.setData({
            pageNo: ++this.data.pageNo,
        })
        this.getData()
    },
    // 获取经验值
    getJing() {
        wx.request({
            url: app.data.local + 'stusermilitary/rankings',
            data: {
                pageNo: this.data.pageNo,
                pageSize: 10,
                userId: app.globalData.userId,
                type: 2
            },
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success: (res) => {
                if (res.data.data.other) {
                    for (var i in res.data.data.other) {
                        res.data.data.other[i].nick = res.data.data.other[i].nickName.substr(0, 4)
                    }
                }
                let dataJ = res.data.data.other
                let userJ = res.data.data.user
                this.setData({
                    dataJ: this.data.dataJ.concat(dataJ),
                    userJ: userJ,
                })
                wx.showLoading({
                    title: '加载中',
                    icon: 'loading',
                });
                setTimeout(() => {
                    wx.hideLoading();
                }, 500)
                if (this.data.dataJ.length > 0) {
                    this.setData({
                        jyBox: true,
                        // zanwuguanzhu: false
                        noData: false
                    })
                } else {
                    this.setData({
                        jyBox: false,
                        // zanwuguanzhu: true
                        noData: true
                    })
                }
            }
        })
    },
    lowerJ() {
        this.setData({
            pageNo: ++this.data.pageNo,
        })
        this.getJing()
    },
    //允许登录
    bindGetUserInfo: function (e) {
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
            success: function (res) {
                console.log(res)
                if (res.data.errcode == 200) {
                    var data = {
                        userId: res.data.data.id
                    }
                    wx.setStorageSync('data', data)
                    wx.switchTab({
                        url: "../ranking/ranking"
                    })
                    that.setData({
                        loginBox: false,
                        mask: false,
                        userId: res.data.data.id,
                    })
                    app.globalData.userId = that.data.userId;
                    app.globalData.loginFlag = res.data.data.loginFlag;
                }
            }
        })

    },

    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
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


    // 战力
    zhanli() {
        console.log("llll")
        this.setData({
            title1: true,
            title2: false,
            hx1: true,
            jingyan: false,
            hx2: false,
            zhanli: true,
            pageNo: 1
        })
        this.data.dataBox = []
        this.getData()
    },
    // 经验值
    jingyan() {
        this.setData({
            hx1: false,
            hx2: true,
            title1: false,
            title2: true,
            zhanli: false,
            jingyan: true,
            pageNo: 1
        })
        this.data.dataJ = []
        this.getJing()
    },
    // 去我的主页
    goMyPage(e) {
        console.log(e)
        let userId = e.currentTarget.id
        wx.navigateTo({
            url: '../template/myPage/myPage?userId=' + userId,
        })
    },
    // 去他的主页
    gohePage(e) {
        console.log(e)
        let userId = e.currentTarget.id
        wx.navigateTo({
            url: '../template/hePage/hePage?userId=' + userId,
        })
    },
    onPullDownRefresh: function () {
        this.zhanli()
        setTimeout(function () {
            wx.stopPullDownRefresh()
        }, 2000)
    },

})