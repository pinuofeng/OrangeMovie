// pages/find/find.js

var app = getApp(),
    start = 0, // 起始索引位置
    count = 10, // 每次查询数量
    total = 0; // 总数

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isFocus: true,
        inputVal: '',
        hotMovies: [],
        searchResult: [],
        showResult: false,
        loading: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let hotMovies = wx.getStorageSync('hotMovies');
        if(!hotMovies){
            this.getHotPlayMovie();
        }else{
            this.setData({
                hotMovies: hotMovies
            });
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        start = 0;
        count = 10;
        total = 0;
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        this.data.showResult && this.searchMovies(true);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    /**
     * 搜索框值改变
     */
    inputChange: function (e) {
        this.setData({
            inputVal: e.detail.value
        },()=>{
            if (this.data.inputVal === '') {
                this.setData({
                    showResult: false
                });
            }
        });
    },

    /**
     * 提交搜索事件
     */
    commitSearch: function () {
        this.searchMovies();
    },

    /**
     * 输入框获取焦点
     */
    inputFocus: function () {
        this.setData({
            isFocus: true
        });
    },

    /**
     * 输入框失去焦点
     */
    inputBlur: function () {
        this.setData({
            isFocus: false
        });
    },

    /**
     * 清除按钮点击事件
     */
    clearText: function () {
        this.setData({
            inputVal: '',
            showResult: false,
            searchResult: []
        });
        start = 0;
        count = 10;
        total = 0;
    },

    /**
     * 搜索影片
     */
    searchMovies: function (loading = false) {
        let _this = this;
        if (!this.data.inputVal) { return }
        if (!loading) {
            start = 0;
            count = 10;
            total = 0;
        }
        if (start > total) { return }
        loading && this.setData({ loading });
        wx.showNavigationBarLoading();
        
        wx.request({
            url: `${app.globalData.baseURL}/v2/movie/search?apikey=${app.globalData.apiKey}&q=${this.data.inputVal}&start=${start}&count=${count}`,
            method: 'GET',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                _this.setData({
                    searchResult: loading ? [..._this.data.searchResult, ...res.data.subjects] : [...res.data.subjects],
                    showResult: true
                });
                start += count;
                total = res.data.total;
            },
            complete: function () {
                wx.hideNavigationBarLoading();
                _this.setData({ loading: false });
            }
        });
    },

    getFocus: function () {
        this.setData({
            isFocus: true
        });
    },

    // 请求热映数据
    getHotPlayMovie: function () {
        let _this = this;
        wx.showNavigationBarLoading();
        wx.request({
            url: `${app.globalData.baseURL}/v2/movie/in_theaters?apikey=${app.globalData.apiKey}&city=${wx.getStorageSync('city')}&start=0&count=10`,
            method: 'GET',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                wx.hideNavigationBarLoading();
                _this.setData({
                    hotMovies: res.data.subjects
                });
              
                wx.setStorageSync('hotMovies', _this.data.hotPlay.map(item => {
                    return { id: item.id, title: item.title }
                }));
            }
        })
    },

    // 打开电影详情页面
    openMovieDetail: function(e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: `../movie_detail/MovieDetail?id=${id}`
        })
    }

})