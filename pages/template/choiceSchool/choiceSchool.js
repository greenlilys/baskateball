const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //下面是字母排序
        letter: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        cityListId: '',
        //下面是城市列表信息，这里只是模拟数据
        citylist: [{ "letter": "A", "data": [{ "id": "v7", "cityName": "安庆大学" }] }, { "letter": "B", "data": [{ "id": "v10", "cityName": "北京理工大学" }, { "id": "v4", "cityName": "北京电影学院" }, { "id": "v1", "cityName": "北京工业大学" }] }, { "letter": "C", "data": [{ "id": "v15", "cityName": "成都" }] }, { "letter": "D", "data": [{ "id": "v21", "cityName": "稻城" }] }, { "letter": "G", "data": [{ "id": "v17", "cityName": "广州" }, { "id": "v29", "cityName": "桂林" }] }, { "letter": "H", "data": [{ "id": "v9", "cityName": "海南" }, { "id": "v3", "cityName": "呼和浩特" }] }, { "letter": "L", "data": [{ "id": "v24", "cityName": "洛阳" }, { "id": "v20", "cityName": "拉萨" }, { "id": "v14", "cityName": "丽江" }] }, { "letter": "M", "data": [{ "id": "v13", "cityName": "眉山" }] }, { "letter": "N", "data": [{ "id": "v27", "cityName": "南京" }] }, { "letter": "S", "data": [{ "id": "v18", "cityName": "三亚" }, { "id": "v2", "cityName": "上海" }] }, { "letter": "T", "data": [{ "id": "v5", "cityName": "天津" }] }, { "letter": "W", "data": [{ "id": "v12", "cityName": "乌鲁木齐" }, { "id": "v25", "cityName": "武汉" }] }, { "letter": "X", "data": [{ "id": "v23", "cityName": "西安" }, { "id": "v28", "cityName": "香港" }, { "id": "v19", "cityName": "厦门" }] }, { "letter": "Z", "data": [{ "id": "v8", "cityName": "张家口" }] }], 
       
        city:'南京'
    },
    //点击城市
    cityTap(e) {
        let pages = getCurrentPages();//当前页面
        console.log(pages)
        let prevPage = pages[pages.length - 2];//上一页面
        prevPage.setData({//直接给上页赋值
            userSchool: e.target.dataset.val.cityName,
            isFinish: e.target.dataset.val.cityName

        }); 
        wx.navigateBack({
            delta: 1
        })
    },
    //点击城市字母
    letterTap(e) {
        let Item = e.currentTarget.dataset.item;
        this.setData({
            cityListId: Item
        });
        console.log(this.data.cityListId);
    },
    //切换城市
    navChoiceCity(){
        wx.navigateTo({
            url:'/pages/template/choiceCity/choiceCity'
        })
    }, 

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        if(app.globalData.city){
            this.setData({
                city: app.globalData.city
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

    }
})