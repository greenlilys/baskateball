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
        userInfo:null,//用户基本信息
        systemInfo: {},//设备信息
        userDetail:{},//用户个人信息
        loginFlag:''
            
    },
    data: {     
        
        local: 'https://xcx.sbtgo.com/starts/sp/',
        localc: 'https://xcx.sbtgo.com/starts/sp/',
        localg: 'https://xcx.sbtgo.com/starts/sp/'

        // local: 'http://192.168.3.212:8089/starts/sp/',
        // localc: 'http://192.168.3.212:8089/starts/sp/',
        // localg: 'http://192.168.3.212:8089/starts/sp/'
    },
    onLaunch: function () {        
        // 存储userId,编译从本地存储读userId
        var data = wx.getStorageSync('data') || [];        
        this.globalData.userId = data.userId;       
    },
    onShow: function () {              
        this.getSystemInfo();
        this.getUserInfo();
    },
    //登录接口code换用户唯一标识openid
    getOpenid:function(){       
        wx.login({
            success: (res)=> {
                wx.request({
                    url: this.data.local + 'stuser/getOpenid',
                    header: {
                        'content-type': 'application/json'
                    },
                    data: res.code,
                    method: 'POST',
                    success: (res)=> {
                        this.globalData.openid = res.data.openid;
                        //上报粉丝        
                        wx.xst.setOpenId(res.data.openid);
                    }
                })
            }
        })
    },
    // 请求封装
    sendRequest:function(options){
        let method = options.method ? options.method.toUpperCase() : "POST";     
        wx.request({
            url: this.data.local + options.url ,
            method: method,
            header: { 'content-type': 'application/json' },
            data: options.data,
            success: (res) => {
                if (res.data.errcode == '200'){
                    typeof options.success == 'function' && options.success(res.data.data);
                }else{
                    console.log(res.data);
                    typeof options.fail == 'function' && options.fail(res);
                }
            },
            fail:(res) => {
                console.log(res);
                typeof options.fail == 'function' && options.fail(res);
            }

        })
    },
    //用户基本信息，需要用户授权
    getUserInfo:function(){
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
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                // console.log(res);
                that.globalData.systemInfo = res;
            }
        });
    },
  
      //图片preview
    
    previewImage: function (options) {
        wx.previewImage({
            current: options.current || '',
            urls: options.urls || [options.current]
        })
    },
         
    // @onShareAppMessage
     
    onShareAppMessage: function (options){        
        let title = '最刺激的3v3篮球排位赛，谁是城市王者？';
        let path = '/pages/index/index?sharePersonId=' + this.globalData.userId;
        let defaultImg = '/pages/image/share.jpg';
        return {
            title: options.title || title,
            path: options.path || path,
            imageUrl:options.imageUrl || defaultImg
        }
    },
    
      // 转发统计
     
    handleShare:function(){
        wx.request({
            url: this.data.local + 'stusermilitary/usershare',
            method: "POST",
            data: {
                'userId': this.globalData.userId
            },
            header: {
                'content-type': 'application/json'
            },
            success: (res)=> {                              
                console.log('发送成功' + JSON.stringify(res))                
            },
            fail:(res)=> {
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

                },
                fail: (res) => {
                    console.log('fail');
                    reject(res);
                }

            })
        })
        return promise;
       
    }

})