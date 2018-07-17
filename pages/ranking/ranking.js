// pages/ranking/ranking.js

var
    app = getApp(),
    start = 0, // 起始索引位置
    count = 10, // 每次查询数量
    total = 0; // 总数

Page({

    /**
     * 页面的初始数据
     */
    data: {
        movies: [],
        loading: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getRankingMovies();
    },

    // 请求热映数据
    getRankingMovies: function (loading = false) {
        if (start > total) { return }
        let _this = this;
        loading && this.setData({ loading });
        wx.showNavigationBarLoading();
        wx.request({
            url: `${app.globalData.baseURL}/v2/movie/top250?apikey=${app.globalData.apiKey}&start=${start}&count=${count}`,
            method: 'GET',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                console.log(res.data);
                _this.setData({
                    movies: [..._this.data.movies, ...res.data.subjects]
                });
                start += count;
                total = res.data.total;
            },
            complete: function () {
                wx.hideNavigationBarLoading();
                _this.setData({ loading: false });
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
        this.getRankingMovies(true);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    openMovieDetail: function (e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: `../movie_detail/MovieDetail?id=${id}`
        })
    }

})