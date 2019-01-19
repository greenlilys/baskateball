//index.js
//获取应用实例
const app = getApp()
var Dec = require('../../AES/public.js'); //引用封装好的加密解密js
Page({
    data: {        
        lat: '',//用户地理坐标
        lon: '',//用户地理坐标
        data: [],
        myData: [],
        pageNo: 1,
        text1: true,
        hx1: true,
        fightBox: true,  
        myjoin:false,
        userId: "",
        num: "",
        hasMore: true,
        hasRefesh: false,
        hidden: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        isClose: true, //倒计时数字是否显示
        num: 3,//关闭广告弹倒计时
        isBanner: false,//广告弹窗是否显示,根据用户当日是否首次登录设置,默认隐藏
        sharePersonId: '',//分享人Id 
        windowHeight:''      
    },
    onLoad: function (options) {         
        if (app.globalData.userId) {//用户是否授权登录
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
        //通过转发进入获取转发者的userId
        this.setData({
            sharePersonId: options.sharePersonId || '',
            windowHeight: app.globalData.systemInfo.windowHeight
        })      
        // 获取用户坐标,如果未授权，弹窗提示用户授权
        wx.getLocation({
            success: (res)=>{
                this.setData({
                    lat: res.latitude,
                    lon: res.longitude
                })
                // 获取附近比赛                
                this.getData();
            },
            fail:function(res){
                console.log('获取用户位置失败' + res);
            }
        })            
        // 加密解密
        // console.log(Dec.Decrypt("JveH4kz/DOeVt/itktrsiQ=="));
        // console.log(Dec.Encrypt("songchaoqun"));        
             
    },
    onReady() { 
       if (app.globalData.loginFlag === 0) {            
            wx.hideTabBar();
            this.setData({
                isBanner: true
            })
            //开始弹窗5s倒计时
            this.countDown();
        } 
       
    },
    onShow: function () {
    },
    /**
      * 用户转发
      */
    onShareAppMessage: function (res) {
        app.handleShare();
        return app.onShareAppMessage({});
    },

    //广告倒计时
    countDown() {
        let timer = setInterval(function () {
            if (this.data.num == 0) {
                this.setData({
                    isClose: false
                })
                return false;
            };
            this.setData({
                num: this.data.num - 1
            })
        }.bind(this), 1000)
    },
    //关闭广告弹窗,显示底部TabBar
    closeBanner() {
        this.setData({
            isBanner: false
        });        
        wx.showTabBar();
    },
    //点击广告图全屏显示
    enlarge() {
        app.previewImage({
            current: 'http://shineyoobucket.oss-cn-beijing.aliyuncs.com/shineyoo/896622aecdba436c8286a17e150e8ca9.jpg'
        })
    },
    preventTouchMove() {//有弹窗广告时，阻止滑动屏幕事件
        return false;
    },

    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    getData() {
        var that = this
        wx.request({
            url: app.data.local + 'match/nearbymatch',
            data: {
                pageNo: this.data.pageNo,
                pageSize: 10,
                lat: that.data.lat,
                lon: that.data.lon
            },
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success: (res) => {               
                //  循环经纬度，分别算出距离
                for (var i in res.data.data) {
                    res.data.data[i].juli = that.distance(that.data.lat, that.data.lon, res.data.data[i].lat, res.data.data[i].lon)
                }

                let data = res.data.data;
                this.setData({
                    data: this.data.data.concat(data)
                })
                wx.showLoading({
                    title: '加载中',
                    icon: 'loading',
                });
                setTimeout(() => {
                    wx.hideLoading();
                }, 500)
               
                if (this.data.data.length > 0) {
                    this.setData({
                        fightBox: true,
                        noData: false
                    })
                } else {
                    this.setData({
                        fightBox: false,
                        noData: true
                    })
                }
            }
        })
    },
    getMyData() {
        var that = this;
        wx.request({
            url: app.data.local + 'match/mymatch',
            data: {
                pageNo: this.data.pageNo,
                pageSize: 10,
                userId: app.globalData.userId,
            },
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success: (res) => {
                for (var i in res.data.data) {
                    for (var i in res.data.data) {
                        res.data.data[i].juli = that.distance(that.data.lat, that.data.lon, res.data.data[i].lat, res.data.data[i].lon)
                    }
                }
                // console.log(res)
                let data = res.data.data
                this.setData({
                    myData: this.data.myData.concat(data)
                })
                wx.showLoading({
                    title: '加载中',
                    icon: 'loading',
                });
                setTimeout(() => {
                    wx.hideLoading();
                }, 500)   

                if (this.data.myData.length > 0) {
                    this.setData({
                        myjoin: true,
                        noData: false
                    })
                } else {
                    this.setData({
                        myjoin: false,
                        noData: true
                    })
                }           
             
            }
        })
    },
    lower() {
        this.setData({
            pageNo: ++this.data.pageNo,
        })
        this.getData();
    },
    lowerMy() {
        this.setData({
            pageNo: ++this.data.pageNo
        })
        this.getMyData();
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
        return s;
    },
    

    reset() {
        this.data.data = [];
        this.getData();
    },
    resetMy() {
        this.data.myData = [];
        this.getMyData();
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
                    // console.log(res.data.data.id)
                    wx.setStorageSync('data', data);                 
                    that.setData({
                        loginBox: false,
                        mask: false,
                        userId: res.data.data.id                        
                    })
                    app.globalData.userId = res.data.data.id;
                    app.globalData.loginFlag = res.data.data.loginFlag;                   
                    // loginFlag:0 当日首次登录 1:当日非首次登录
                    if (res.data.data.loginFlag == 0){//当日首次登录,打开弹窗广告
                        wx.hideTabBar();//隐藏tabbar
                        that.setData({
                            isBanner:true
                        })
                         //开始弹窗5s倒计时
                         that.countDown();
                    }
                }
            }
        })

    },   
    // 切换附近比赛
    nearby() {
        this.setData({
            text1: true,
            text2: false,
            hx1: true,
            hx2: false,
            pageNo: 1,
            fightBox: true,
            myjoin: false,
        })
        this.reset();
    },
    // 切换我参加的
    myjoin() {
       
        this.setData({
            text2: true,
            text1: false,
            hx2: true,
            hx1: false,
            fightBox: false,  
            myjoin: true,          
            pageNo: 1
        })
        this.resetMy();
    },
    // 进入详情
    godetail(e) {        
        let id = e.currentTarget.id.substr(0, e.currentTarget.id.length - 3);
        let status = e.currentTarget.id.substr(e.currentTarget.id.length - 3, 3);
        if (status == "报名中") {
            wx.navigateTo({
                url: '../indexTemplate/dataDetail/dataDetail?mid=' + id,
            })
        } else if (status == "已结束") {
            wx.navigateTo({
             url: '../indexTemplate/fullDetails/fullDetails?mid=' + id + '&mername=全场数据',
            })
        } else if (status == "已满") {
            wx.navigateTo({
                url: '../indexTemplate/dataDetail/dataDetail?mid=' + id
            })
        } else if (status == "进行中") {
            wx.showModal({
                title: '注意！',
                content: '比赛正在进行。。。'
            })
        }
    },
    onPullDownRefresh: function () {
        // 动态设置导航条标题
        this.nearby()
        setTimeout(function () {
            wx.stopPullDownRefresh()
        }, 2000)

    }
})