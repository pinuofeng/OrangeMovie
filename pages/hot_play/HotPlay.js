// pages/hot_play/HotPlay.js

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
    hotPlay: [],
    refreshing: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getHotPlayMovie();
  },

  // 请求热映数据
  getHotPlayMovie: function (refreshing=false){
      if(start > total){return}
      let _this = this;
      refreshing && this.setData({refreshing});
      wx.showNavigationBarLoading();
      wx.request({
          url: `${app.globalData.baseURL}/v2/movie/in_theaters?apikey=${app.globalData.apiKey}&city=${wx.getStorageSync('city')}&start=${start}&count=${count}`,
          method: 'GET',
          header: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
              wx.hideNavigationBarLoading();
              _this.setData({
                  hotPlay: [..._this.data.hotPlay, ...res.data.subjects]
              });
              start += count;
              total = res.data.total;
          },
          complete: function () {
              _this.setData({ refreshing: false });
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
      this.getHotPlayMovie(true);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  movieClick: function (e) {
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
          url: `../movie_detail/MovieDetail?id=${id}`
      })
  }

})