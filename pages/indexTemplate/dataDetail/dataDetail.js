const app = getApp();
Page({
    data: {
        mask: false,
        modal: false,
        data: {},
        mid: "",
        userId: "",
        lat: "",
        lon: "",
        la2: "",
        lo2: "",
        num: "",
        sharePersonId: '',//通过转发进入获取的分享者Id
        shareId: '',//分享记录Id
        x: app.globalData.systemInfo.windowWidth - 70,
        y: app.globalData.systemInfo.windowHeight - 60,
        phone:'',//用户绑定手机
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            mid: options.mid,
            sharePersonId: options.sharePersonId || ''
        })
        //获取用户手机号
        // app.sendRequest({
        //     url: 'stuser/detail',
        //     data: {
        //         userId: app.globalData.userId
        //     },
        //     success: (data) => {
        //         this.setData({
        //             phone:data.phone
        //         })
        //     }

        // })      
    },
    /**
    * 生命周期函数--监听页面显示
    */
    onShow: function () {
        var that = this;
        if (app.globalData.userId) {
            this.setData({
                loginBox: false,
                mask: false,
            })
        } else {
            this.setData({
                loginBox: true,
                mask: true
            })
        }

        // 获取比赛详情
        that.getData();
        //获取用户地理位置
        wx.getLocation({
            success: function (res) {
                that.setData({
                    la2: res.latitude,
                    lo2: res.longitude
                })
                // 计算距离
                setTimeout(function () {
                    that.distance(that.data.la2, that.data.lo2, that.data.lat, that.data.lon)
                }, 500)
            }
        })
    },
    getData() {
        // 获取比赛详情
        wx.request({
            url: app.data.local + 'match/matchdetail',
            method: "POST",
            header: {
                'content-type': 'application/json'
            },
            data: {
                matchId: this.data.mid,
                userId: app.globalData.userId,
            },
            success: (res) => {
                this.setData({
                    data: res.data.data,
                    lat: res.data.data.lat,
                    lon: res.data.data.lon
                })
            }
        })
    },
   
    // 计算距离方法
    distance: function (la1, lo1, la2, lo2) {
        var La1 = la1 * Math.PI / 180.0;
        var La2 = la2 * Math.PI / 180.0;
        var La3 = La1 - La2;
        var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
        s = s * 6378.137; //地球半径
        s = parseInt((s * 10000) / 10000);
        // return s
        this.setData({
            num: s
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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
        return {
            title: '最刺激的3v3篮球排位赛，谁是城市王者？',
            imageUrl: '/pages/image/share.jpg',
            path: '/pages/indexTemplate/dataDetail/dataDetail?mid=' + this.data.mid + '&sharePersonId=' + app.globalData.userId,

        }

    },
    backIndex() {//返回首页
        wx.switchTab({
            url: '../../index/index',
        })
    },

    // 退赛
    Retire() {
        this.setData({
            mask: true,
            modal: true
        })
    },
    // 确定退赛
    confirmRetire() {
        var that = this
        wx.request({
            url: app.data.local + "stsign/unsignup",
            data: {
                matchId: this.data.mid,
                userId: app.globalData.userId
            },
            method: "POST",
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                if (res.data.errcode == 200) {
                    that.setData({
                        mask: false,
                        modal: false,
                    })
                    wx.switchTab({
                        url: '../successRetire/successRetire',
                    })
                } else {
                    wx.showToast({
                        title: '退赛失败',
                    })
                }
            }
        })

    },
    // 取消
    cancel() {
        this.setData({
            mask: false,
            modal: false
        })
    },
    // 报名
    baoming() {
        //查看用户是否绑定手机号
        let promise = new Promise(function(resolve,reject){
            wx.showLoading({
                title: '加载中',
                icon: 'loading',
            });
            app.sendRequest({
                url: 'stuser/detail',
                data: {
                    userId: app.globalData.userId
                },
                success: (data) => {                    
                    // resolve(data.phone)
                    resolve("")
                },
                fail:(res)=>{
                   reject(res);
                    wx.showToast({
                        title: '网络错误',
                        image: '/pages/image/warn.png',
                        duration: 2000
                    })
                   wx.hideLoading();
                }

            }) 
        })
        promise.then(phone=>{
            if(phone){
                app.sendRequest({
                    url: 'stsign/signupvalidate',                  
                    data: {
                        matchId: this.data.mid,
                        userId: app.globalData.userId
                    },
                    success: (res) => {
                        console.log(res);
                        wx.hideLoading();
                        if (res.data.data.code == 1) {
                            wx.showModal({
                                title: '注意！',
                                content: '该比赛报名人数已满',
                            })
                        }
                        if (res.data.data.code == 2) {
                            wx.navigateTo({
                                url: '../deposit0/deposit0?matchId=' + res.data.data.matchId + '&userId=' + res.data.data.userId + '&matchStartdrill=' + res.data.data.matchStartdrill + '&userStartdrill=' + res.data.data.userStartdrill
                            })
                        }
                        if (res.data.data.code == 3) {
                            wx.navigateTo({
                                url: '../signfee/signfee?matchId=' + res.data.data.matchId + '&userId=' + res.data.data.userId + '&matchStartdrill=' + res.data.data.matchStartdrill + '&userStartdrill=' + res.data.data.userStartdrill
                            })
                        }
                    },
                    fail: (res) => {
                        reject(res);
                        wx.showToast({
                            title: '网络错误',
                            image: '/pages/image/warn.png',
                            duration: 2000
                        })
                        wx.hideLoading();
                    }
                })
            }else{//用户没有绑定手机号跳转到绑定手机号页面              
                wx.navigateTo({
                    url: '/pages/template/bindingcell/bindingcell?addPhone=addPhone',
                })
            }
        })      
       
    },
    //打开地图
    openmap: function () {
        var that = this
        wx.getLocation({
            type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
            success: function (res) {
                wx.openLocation({
                    latitude: that.data.lat, // 纬度，范围为-90~90，负数表示南纬
                    longitude: that.data.lon, // 经度，范围为-180~180，负数表示西经
                    scale: 28, // 缩放比例          
                })
            }
        })
    },
    // 进入主页
    goHePage(e) {
        if (e.currentTarget.id == app.globalData.userId) {
            wx.navigateTo({
                url: '../../template/myPage/myPage?userId=' + e.currentTarget.id
            })
        } else {
            wx.navigateTo({
                url: '../../template/hePage/hePage?userId=' + e.currentTarget.id,
            })
        }
    },

    //允许登录
    bindGetUserInfo: function (e) {
        var that = this;
        wx.request({
            url: app.data.local + 'stuser/userlogin',
            data: {
                wechatToken: app.globalData.openid,
                nickName: e.detail.userInfo.nickName,
                avatar: e.detail.userInfo.avatarUrl,
                //通过转发进入的转发人userId
                userId: that.data.sharePersonId
            },
            method: "POST",
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                if (res.data.errcode == 200) {
                    var data = {
                        userId: res.data.data.id
                    }
                    wx.setStorageSync('data', data);

                    that.setData({
                        loginBox: false,
                        mask: false
                    })
                    app.globalData.userId = res.data.data.id;
                    app.globalData.loginFlag = res.data.data.loginFlag;
                }
            }
        })

    }

})