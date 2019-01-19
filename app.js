//阿拉丁
const util = require('utils/util');
const ald = require('./utils/ald-stat.js');
// 小神推
App = require('./utils/pushsdk.js').pushSdk(App, 'App').App;
Page = require('./utils/pushsdk.js').pushSdk(Page).Page;
App({
    globalData: {
        openid: null,
        userId: "",//用户id
        userInfo: null,//用户基本信息
        systemInfo: {},//设备信息
        userDetail: {},//用户个人信息
        loginFlag: ''
    },
    data: {
        // local: 'https://xcx.sbtgo.com/starts/sp/' 
         local: 'https://xcx.sbtgo.com/starts2/sp/'
        // local: 'http://192.168.3.212:8089/starts/sp/'
    },
    onLaunch: function () {
        this.getUserId();//如果本地存储有userId,从本地存储读userId
        this.getOpenid();
        this.getSystemInfo();
        this.getUserInfo();
    },
    onShow: function () {

    },
    //本地存储读userId
    getUserId: function () {
        var data = wx.getStorageSync('data') || [];
        this.globalData.userId = data.userId ? data.userId : '';
    },
    //用户基本信息，需要用户授权
    getUserInfo: function () {
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: res => {
                            this.globalData.userInfo = res.userInfo;
                        }
                    })
                }
            }
        })
    },
    //系统信息
    getSystemInfo: function () {
        wx.getSystemInfo({
            success: (res) => {
                // console.log(res);
                this.globalData.systemInfo = res;
            }
        });
    },
    //登录接口code换用户唯一标识openid
    getOpenid: function () {
        wx.login({
            success: (res) => {
                wx.request({
                    url: this.data.local + 'stuser/getOpenid',
                    header: {
                        'content-type': 'application/json'
                    },
                    data: res.code,
                    method: 'POST',
                    success: (res) => {
                        this.globalData.openid = res.data.openid;
                        //上报粉丝        
                        wx.xst.setOpenId(res.data.openid);
                    }
                })
            }
        })
    },
    // 请求封装
    sendRequest: function (options) {
        wx.showLoading({
            title: '加载中',
        })
        let method = options.method ? options.method.toUpperCase() : "POST";
        wx.request({
            url: this.data.local + options.url,
            method: method,
            header: {'content-type': 'application/json'},
            data: options.data,
            success: (res) => {
                if (res.data.errcode == '200') {
                    typeof options.success == 'function' && options.success(res.data.data);
                } else {
                    console.log(res);
                    wx.showToast({
                        title: '系统错误',
                        image: '/pages/image/warn.png',
                        duration: 1000
                    })
                    typeof options.fail == 'function' && options.fail(res);
                }
            },
            fail: (res) => {
                console.log(res);
                wx.showToast({
                    title: '网络错误',
                    image: '/pages/image/warn.png',
                    duration: 1000
                })
                typeof options.fail == 'function' && options.fail(res);
            },
            complete: (res) => {
                wx.hideLoading();
                typeof options.complete == 'function' && options.complete();
            }

        })
    },


    //图片preview

    previewImage: function (options) {
        wx.previewImage({
            current: options.current || '',
            urls: options.urls || [options.current]
        })
    },

    // @onShareAppMessage

    onShareAppMessage: function (options) {
        let title = '最刺激的3v3篮球排位赛，谁是城市王者？';
        let path = '/pages/index/index?sharePersonId=' + this.globalData.userId;
        let defaultImg = '/pages/image/share.jpg';
        return {
            title: options.title || title,
            path: options.path || path,
            imageUrl: options.imageUrl || defaultImg
        }
    },

    // 转发统计

    handleShare: function () {
        wx.request({
            url: this.data.local + 'stusermilitary/usershare',
            method: "POST",
            data: {
                'userId': this.globalData.userId
            },
            header: {
                'content-type': 'application/json'
            },
            success: (res) => {
                console.log('发送成功' + JSON.stringify(res))
            },
            fail: (res) => {
                console.log('发送失败')
            }

        })
    },
    //获取用户个人信息

    getUserDetail() {
        let that = this;
        let promise = new Promise(function (resolve, reject) {
            that.sendRequest({
                url: 'stuser/detail',
                data: {
                    userId: that.globalData.userId
                },
                success: (res) => {
                    console.log(res)
                    that.globalData.userDetail = res;
                    resolve(res);
                }

            })
        })
        return promise;

    }

})