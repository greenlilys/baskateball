const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //下面是字母排序
        letter: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        cityListId: '',
        //下面是城市列表信息
        citylist: []       
    },
    //点击城市
    cityTap(e) {
        console.log(e.target.dataset.val.cid)
        let pages = getCurrentPages();//当前页面
        let prevPage = pages[pages.length - 2];//上一页面
        let cityObj={};
        cityObj.city = e.target.dataset.val.city;
        cityObj.cid = e.target.dataset.val.cid;
        prevPage.setData({//直接给上页赋值
            cityObj: cityObj                     
        });
        wx.navigateBack({
            delta: 1
        })
    },
    //点击城市字母
    letterTap(e) {
        let cityListId = e.currentTarget.dataset.item;
        this.setData({
            cityListId: cityListId
        });
        
    },    

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCityList();
    },
    //获取城市列表
    getCityList(){
        app.sendRequest({
            url: 'stuser/findStCityMap',
            data: 'citylist',
            success: (res) => {
                this.setData({
                    citylist: JSON.parse(res).citylist
                })
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