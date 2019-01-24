const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //下面是字母排序
        letter: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        scrollId: '',
        //大学列表信息
        schoollist: [],         
        cityObj: {},  //城市      
        scrollId: '' //滚动id
        
    },
    //点击学校
    schoolTap(e) {
        let pages = getCurrentPages();//当前页面
        // console.log(pages)
        let prevPage = pages[pages.length - 2];//上一页面
        let schoolObj = e.target.dataset.val;
        console.log(e)
        prevPage.setData({//直接给上页赋值
            school: schoolObj.school,            
            shId: schoolObj.shId,
            type:'2'

        }); 
        wx.navigateBack({
            delta: 1
        })
    },
    //点击城市字母
    letterTap(e) {   
        let scrollId = e.currentTarget.dataset.item;
        this.setData({
            scrollId: scrollId
        });
        
    },
    //切换城市
    navChoiceCity(){
        wx.navigateTo({
            url:'/pages/template/choiceCity/choiceCity'
        })
    }, 
    //获取学校列表
    getSchoolList(){
        let cid = this.data.cityObj.cid;
        let key = 'schoolList' + cid;
        app.sendRequest({
            url: 'stuser/findStSchoolByCIdMap',
            data: {
                shCityId:cid,
                firstLetter: 'schoolList'
            },
            success: (res) => {
                console.log(JSON.parse(res))
                this.setData({
                    schoollist: JSON.parse(res)[key]
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        let cityObj = {};
        cityObj.city = options.city;
        cityObj.cid = options.cid;
        this.setData({
            cityObj: cityObj
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
        this.getSchoolList();
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

    }
})