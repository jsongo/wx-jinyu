
var ProductCtl = require('../../handler/productCtl');
//获取应用实例
var app = getApp();
Page({
    data: {
        product: []
    },
    onLoad: function(opt) {
        let productCtl = new ProductCtl();
        let id = opt && opt.id || 0;
        if (id) {
            productCtl.renderInfo(id, (data)=>{
                wx.setNavigationBarTitle({
                    title: data.name
                });
                this.setData({
                    product: data
                });
            });
        }
    }
});