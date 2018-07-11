//app.js

// 获取经纬度
function getLocation() {
    wx.getLocation({
        type: 'wgs84',   //默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标 
        success: function (res) {
            loadCity(res.longitude, res.latitude)
        },
        fail: function () {
            wx.setStorageSync('北京')
        }
    })
}

// 根据经纬度获取详细位置信息
function loadCity(longitude, latitude) {
    wx.request({
        url: `https://api.map.baidu.com/geocoder/v2/?ak=ZoDAfZ1Ul7G74Myw8g8mLSPlfcVeBAel&location=${latitude},${longitude}&output=json`,
        method: 'GET',
        header: {
            'Content-Type': 'application/json'
        },
        success: function (res) {
            var city = res.data.result.addressComponent.city;
            wx.setStorageSync('city', city);
        }
    })
}

App({
    globalData: {
        apiKey: '0b2bdeda43b5688921839c8ecb20399b',
        bMapKey: 'ZoDAfZ1Ul7G74Myw8g8mLSPlfcVeBAel'
    },
    onLaunch: function() {
        // 获取定位信息
        getLocation();
    }
    
})