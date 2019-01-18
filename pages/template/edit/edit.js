const app = getApp();
var util = require('../../../utils/util.js');
var time = util.formatTime(new Date());
var that;

Page({
  data: {
    //身高选项
    arrayHeight: ['150CM', '155CM', '160CM', '165CM', '170CM', '175CM', '180CM', '185CM', '190CM', '195CM', '200CM', '205CM', '210CM', '215CM','220CM','225CM','230CM','230CM以上'],
    // 体重选项
    arrayWeight:['50KG','55KG','60KG','65KG','70KG','75KG','80KG','85KG','90KG','95KG','100KG','105KG','110KG','115KG','120KG','125KG','130KG','130KG以上'],
    //司职选项
    arraysizhi:[
      {id:0,name:'得分后卫'},
      {id:1,name:'控球后卫'},
      {id:2,name:'中锋'},
      {id:3,name:'小前锋'} ,
      {id:4,name: '大前锋'}
      ],
    //性别选项
      sexArr:['男','女'],
       //就读选项
      schoolArr:['我已毕业','我还在读'],
   
    // 城市
    region: [],
    userDetail:{},//用户详情 
    sex:'男',//性别       
    isFinish: '',//是否毕业
    userSchool:'',//所在学校
    inSchoolTime:'',
    outSchoolTime:'',//毕业时间
    isWarn:true,//弹窗提示
    infotitle:'以下信息保存后不能修改！'  
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
      this.setData({
          userDetail: app.globalData.userDetail
      })  
    
  },
//设置性别
    setSex:function(e){
        // console.log(e)
        this.setData({
            sex:this.data.sexArr[e.detail.value]
        })
    },
//是否在读
    setSchool:function(e){        
        this.setData({
            isFinish: this.data.schoolArr[e.detail.value]
        })
        if (e.detail.value == 1){
            wx.navigateTo({
                url: '/pages/template/choiceSchool/choiceSchool'
            })
        }else{
            this.setData({
                userSchool:''
            })
        }
    },
  
  
  //选择年龄
  chooseOld (e) {  
      let userDetail = this.data.userDetail;
      userDetail.age = time.substring(0, 4) - e.detail.value.substring(0, 4);
      this.setData({
          userDetail: userDetail
      })  
  },
  //选择身高
  chooseHeight (e) {
      let userDetail = this.data.userDetail;
      userDetail.height = this.data.arrayHeight[e.detail.value];
      this.setData({
          userDetail: userDetail
      })    
  },
  //选择体重
  chooseWeight(e) {
      let userDetail = this.data.userDetail;
      userDetail.weight = this.data.arrayWeight[e.detail.value];
      this.setData({
          userDetail: userDetail
      }) 
   
  },
  // 选择司职
  choosesizhi (e) {
      let userDetail = this.data.userDetail;
      userDetail.position = this.data.arraysizhi[e.detail.value].name;      
    this.setData({
        userDetail: userDetail
    })
  },
  // 选择城市
  bindRegionChange: function (e) {
      let userDetail = this.data.userDetail;
      userDetail.area = e.detail.value;
      this.setData({
          userDetail: userDetail
      })   
  },
  //入学时间
    inSchoolTime(e){
        this.setData({
            inSchoolTime: e.detail.value
        })        
    },
//毕业时间
    outSchoolTime(e){
        this.setData({
            outSchoolTime: e.detail.value
        }) 
    },
  //绑定手机
  bindcell () {
    if(!this.data.phone){
        wx.navigateTo({
            url: '/pages/template/bindingcell/bindingcell',
        })
    }else{
      wx.navigateTo({
        url: '/pages/template/changecell/changecell?phone=' + this.data.phone
    })
   }
  },
  //遮罩层阻止滑动
    preventTouchMove(){
        return false;
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
      if (app.globalData.userSchool){
          this.setData({
              isFinish: app.globalData.userSchool,
              userSchool: app.globalData.userSchool
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

    /**
        * 用户转发
        */
    onShareAppMessage: function (res) {
        app.handleShare();
        return app.onShareAppMessage({});

    },
  // 更改头像
  changeAvatar: function () {
   that = this
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
  // 获取input昵称
  nickInput (e) {
      this.setData({
        name:e.detail.value
      })
  },
  // 保存按钮
    keepbtn () {
        //选择学校后必须填写入学与毕业年月
        if (this.data.userSchool){
            if (!this.data.inSchoolTime){
                wx.showToast({
                    title: '请填写入学年月',
                    image:'/pages/image/warn.png',
                    duration: 2000
                })
                return;        
            }
            if (!this.data.outSchoolTime) {
                wx.showToast({
                    title: '请填写毕业年月',
                    image: '/pages/image/warn.png',
                    duration: 2000
                })
                return;
            }
        } 
        //打开保存信息提示框
        this.setData({
            isWarn : false
        })      
   },
   //保存用户信息
    sendUserDetail(){
        let userDetail = this.data.userDetail;
        wx.request({
            url: app.data.local + 'stuser/edit',
            method: "POST",
            header: { 'content-type': 'application/json' },
            data: {
                id: app.globalData.userId,
                nickName: userDetail.name,
                height: userDetail.height.substring(0, 3),
                weight: userDetail.weight.substring(0, userDetail.weight.length - 2),
                age: userDetail.age,
                position: userDetail.position,
                city: userDetail.area,
                avatar: userDetail.avatar
            },
            method: 'POST',
            success: (res) => {
                console.log(res)
                wx.switchTab({
                    url: '../../personal/personal',
                })
            }
        })
    },
    cancle(){
        this.setData({
            isWarn: true
        }) 
    }
})