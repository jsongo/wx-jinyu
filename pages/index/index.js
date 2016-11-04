
var ProductCtl = require('../../handler/productCtl');
//获取应用实例
var app = getApp();
Page({
    data: {
        products: []
    },
    onLoad: function() {
        let productCtl = new ProductCtl();
        productCtl.renderList((data)=>{
            this.setData({
                products: data
            });
        });
        wx.setNavigationBarTitle({
            title: '黄金商品'
        });
    }
});