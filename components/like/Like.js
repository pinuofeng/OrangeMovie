// components/like/Like.js
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },

    /**
     * 组件的初始数据
     */
    data: {
        likeCount: 0,
        isLike: false
    },
    /**
     * 输入属性
     */
    properties: {
        // 点赞数
        likeNum: { // 属性名
            type: Number, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: 0, // 属性初始值（可选），如果未指定则会根据类型选择一个
            observer: function(newData, oldData) { // 监听父组件传过来值的改变
                this.setData({
                    likeCount: newData
                });
            }
        }
    },

    /**
     * 生命周期函数(绑定后)
     */
    ready: function() {
        this.setData({
            likeCount: this.properties.likeNum
        });
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 点击事件
        _handerClick() {
            if (this.data.isLike) {
                wx.showToast({
                    title: '你已经赞过啦',
                    icon: 'none'
                })
                return
            }
            this.setData({
                isLike: true,
                likeCount: this.data.likeCount + 1
            })
        }
    }


})