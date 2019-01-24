const app = getApp();
var util = require('../../../utils/util.js');
var time = util.formatTime(new Date());
var that;

Page({
    data: {
        //身高选项
        arrayHeight: ['150CM', '155CM', '160CM', '165CM', '170CM', '175CM', '180CM', '185CM', '190CM', '195CM', '200CM', '205CM', '210CM', '215CM', '220CM', '225CM', '230CM', '230CM以上'],
        // 体重选项
        arrayWeight: ['50KG', '55KG', '60KG', '65KG', '70KG', '75KG', '80KG', '85KG', '90KG', '95KG', '100KG', '105KG', '110KG', '115KG', '120KG', '125KG', '130KG', '130KG以上'],
        //司职选项
        arraysizhi: [
            { id: 0, name: '得分后卫' },
            { id: 1, name: '控球后卫' },
            { id: 2, name: '中锋' },
            { id: 3, name: '小前锋' },
            { id: 4, name: '大前锋' }
        ],
        setPhone:false,//设置完手机返回
        //性别选项
        sexArr: ['男', '女'],    
        //就读选项       
        schoolArr: ['我已毕业', '我还在读'],
        userDetail: {},//用户详情     
        cityObj:{
            city: '南京',//城市
            cid:'148'
        }, 
        canUse:false,
        school:'',//学校
        shId:'',//学校id       
        isWarn: true,//弹窗提示
        type:'1',//社会1 高校2
        infotitle: ''  

    },

    //生命周期函数--监听页面加载  
    onLoad: function () {        
        //获取用户信息        
        let cityObj = this.data.cityObj;
        app.getUserDetail().then(data => {   
            // console.log(cityObj)         
            // console.log(data.cityName + data.cityId)
            // console.log(data.school + data.schoolId)
            cityObj.city = data.cityName ? data.cityName: '南京';
            cityObj.cid = data.cityId ? data.cityId:'148';
            if(!data.sex){//性别默认值
                data.sex = "1"
            }
            this.setData({
                userDetail: data,
                cityObj: cityObj,
                school: data.school ? data.school : (data.type == 1? '我已毕业' : ''),      
                shId:data.schoolId,
                type:data.type              
            }) 
            
            if (data.updateFlag == 2) {
                this.setData({
                    canUse:true
                })
            }        
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if(this.data.setPhone){
            app.getUserDetail().then(data => {
                let userDetail = this.data.userDetail;
                userDetail.phone = data.phone;
                this.setData({
                    userDetail: userDetail
                })
            })
        }        
    },
   
    //设置性别
    setSex: function (e) {
        console.log(e)       
            let userDetail = this.data.userDetail;
            userDetail.sex = Number(e.detail.value) + 1;
            this.setData({                
                userDetail: userDetail
            })
        // console.log(userDetail)
        
    },
    //是否在读
    setSchool: function (e) {     
        let school = e.detail.value == 0 ? this.data.schoolArr[e.detail.value] : '';
        let type = e.detail.value == 0 ? '1' : '';      
            this.setData({
                school: school,
                shId:'',
                type: type
            })
       
            if (e.detail.value == 1) {
                wx.navigateTo({
                    url: '/pages/template/choiceSchool/choiceSchool?cid=' + this.data.cityObj.cid + '&city=' + this.data.cityObj.city
                })
            } 
       
    },


    //选择年龄
    chooseOld(e) {
        let userDetail = this.data.userDetail;
        userDetail.age = time.substring(0, 4) - e.detail.value.substring(0, 4);       
        this.setData({
            userDetail: userDetail
        })
    },
    //选择身高
    chooseHeight(e) {
        let userDetail = this.data.userDetail;
        userDetail.height = this.data.arrayHeight[e.detail.value].substring(0,3);        
        this.setData({
            userDetail: userDetail
        })
    },
    //选择体重
    chooseWeight(e) {
        let userDetail = this.data.userDetail;
        let len = this.data.arrayWeight[e.detail.value].length;
        userDetail.weight = this.data.arrayWeight[e.detail.value].substring(0, len - 2);     
        this.setData({
            userDetail: userDetail
        })

    },
    // 选择司职
    choosesizhi(e) {       
        let userDetail = this.data.userDetail;
        userDetail.position = this.data.arraysizhi[e.detail.value].name;      
        this.setData({
            userDetail: userDetail
        })
    },
    
    setCity(){
        if (!this.data.canUse){
            wx.navigateTo({
                url: '/pages/template/choiceCity/choiceCity',
            })
        }        
    },
    //入学时间
    inSchoolTime(e) {        
            let userDetail = this.data.userDetail;
            userDetail.admissionTime = e.detail.value;
            this.setData({
                userDetail: userDetail            
            })   
         
    },
    //毕业时间
    outSchoolTime(e) {        
            let userDetail = this.data.userDetail;
            userDetail.graduationTime = e.detail.value;
            this.setData({
                userDetail: userDetail
            })  
       
    },
    //绑定手机
    bindcell() {
        if (!this.data.userDetail.phone) {
            wx.navigateTo({
                url: '/pages/template/bindingcell/bindingcell',
            })
        } else {
            wx.navigateTo({
                url: '/pages/template/changecell/changecell?phone=' + this.data.userDetail.phone
            })
        }
    },
    //遮罩层阻止滑动
    preventTouchMove() {
        return false;
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
        return app.onShareAppMessage({});

    },
    // 更改头像
    changeAvatar: function () {
        that = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: (res) => {
                console.log(res)
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                that.setData({
                    avatar: res.tempFilePaths[0],
                    updateAva: true,
                    tempFilePaths: res.tempFilePaths
                })
            }
        })
    },
    // 修改昵称
    nickInput(e) {
        // console.log(e)
        let userDetail = this.data.userDetail;
        userDetail.nickName = e.detail.value;
        this.setData({
            userDetail: userDetail
        })
    },
    setName(e){
        let userDetail = this.data.userDetail;
        userDetail.name = e.detail.value;
        this.setData({
            userDetail: userDetail
        })       
    },
    // 保存按钮
    keepbtn() {
        let userDetail = this.data.userDetail;
        let school = this.data.school;
        //选择是否在读必填      
        if (!userDetail.name){
            wx.showToast({
                title: '请填写姓名',
                image: '/pages/image/warn.png',
                duration: 2000
            })
            return;
        }        
        if (!school){
            wx.showToast({
                title: '请填写学校',
                image: '/pages/image/warn.png',
                duration: 2000
            })
            return;
        }      
        if (school && school!= '我已毕业' && this.data.shId){       
            if (!userDetail.admissionTime) {
                        wx.showToast({
                            title: '请填写入学年月',
                            image: '/pages/image/warn.png',
                            duration: 2000
                        })
                        return;
                    }
            if (!userDetail.graduationTime) {
                        wx.showToast({
                            title: '请填写毕业年月',
                            image: '/pages/image/warn.png',
                            duration: 2000
                        })
                        return;
                    }
        }       
        
        if (userDetail.updateFlag == ''){
            this.setData({
                infotitle:'以下信息只能修改一次',
                isWarn: false                
            })  
        } else if (userDetail.updateFlag == 1){           
            this.setData({
                infotitle: '以下信息保存后不能修改！',
                isWarn: false               
            }) 
        }else{          
            this.sendUserDetail();
        }
           
       
    },
    //保存用户信息
    sendUserDetail() {
        let userDetail = this.data.userDetail;       
        app.sendRequest({
            url: 'stuser/edit',           
            data: {
                id: app.globalData.userId,
                nickName: userDetail.nickName,
                height: userDetail.height,
                weight: userDetail.weight,
                age: userDetail.age,
                position: userDetail.position,                
                cityId: this.data.cityObj.cid+'',                
                schoolId: this.data.shId,
                avatar: userDetail.avatar,
                name: userDetail.name,
                sex: userDetail.sex,
                admissionTime: userDetail.admissionTime,
                type:this.data.type,
                graduationTime: userDetail.graduationTime             
            },           
            success: (res) => { 
                this.setData({
                    isWarn: true
                })
                wx.showToast({
                    title: '保存成功',
                    icon: 'success'
                }) 
                setTimeout(function(){
                    wx.navigateBack({
                        delta: 1
                    })
                },1000)               
                
            },
            fail:(res)=>{
                this.setData({
                    isWarn: true
                }) 
                wx.showToast({
                    title: '保存失败',
                    image:'/pages/image/warn.png'
                })
            }
        })
    },
    cancle() {
        this.setData({
            isWarn: true
        })
    }
})