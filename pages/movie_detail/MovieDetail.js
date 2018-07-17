// pages/movie_detail/MovieDetail.js

var app = getApp(),
    movieId = 0,
    start = 0, // 起始索引位置
    count = 20, // 每次查询数量
    total = 0; // 总数

Page({

    /**
     * 页面的初始数据
     */
    data: {
        movieDetail: {},
        commentList: [],
        unfoldDrama: false,
        loading: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        movieId = options.id;
        this.getMovieDetail();
        this.getCommentList();
    },

    // 获取详情数据
    getMovieDetail: function() {
        let _this = this;
        wx.showNavigationBarLoading();
        wx.request({
            url: `${app.globalData.baseURL}/v2/movie/subject/${movieId}?apikey=${app.globalData.apiKey}`,
            method: 'GET',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                wx.hideNavigationBarLoading();
                let data = res.data;
                if (data.summary.substr(data.summary.length - 3) === '©豆瓣'){
                    data.summary = data.summary.substr(0, data.summary.length - 3);
                }
                _this.setData({
                    movieDetail: data
                });
            }
        })
    },

    //获取影评列表
    getCommentList: function(loading = false) {
        if (start > total) {
            return
        }
        let _this = this;
        loading && this.setData({
            loading
        });
        wx.showNavigationBarLoading();
        wx.request({
            url: `${app.globalData.baseURL}/v2/movie/subject/${movieId}/comments?apikey=${app.globalData.apiKey}&start=${start}&count=${count}`,
            method: 'GET',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                wx.hideNavigationBarLoading();
                _this.setData({
                    commentList: [..._this.data.commentList, ...res.data.comments]
                });
                start += count;
                total = res.data.total;
            },
            complete: function() {
                _this.setData({
                    loading: false
                });
            }
        })
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
        count = 20;
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
        this.getCommentList(true);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    /**
     * 剧情简介文字展开
     */
    dramaTap: function() {
        !this.data.unfoldDrama && this.data.movieDetail.summary.length > 85 && this.setData({
            unfoldDrama: !this.data.unfoldDrama
        });
    },

    /**
     * 监听page滚动，改变状态栏标题
     */
    onPageScroll: function(e) {
        if (e.scrollTop >= 410) {
            wx.setNavigationBarTitle({
                title: this.data.movieDetail.title,
            })
        }
        if (e.scrollTop < 320) {
            wx.setNavigationBarTitle({
                title: '电影',
            })
        }
    }
})