
var ProductCtl = require('../../handler/productCtl');
//获取应用实例
var app = getApp();
Page({
    data: {
        winH: 0,
        descImgHeight: 0,
        product: []
    },
    winW: 0,
    onLoad: function(opt) {
        wx.getSystemInfo({
            success: (res)=>{
                this.setData({
                    winH: res.windowHeight
                });
                this.winW = res.windowWidth;
            }
        });
        let productCtl = new ProductCtl();
        let id = opt && opt.id || 0;
        if (id) {
            productCtl.renderInfo(id, (data)=>{
                wx.setNavigationBarTitle({
                    title: data.name
                });
                let gallery = data.gallery;
                let desc = data.desc;
                let m = desc.match(/(\/[^&]+)&/);
                if (m.length > 1) {
                    data.descImg = m[1];
                }
                data.gallery = gallery.split(',');
                this.setData({
                    product: data
                });
            });
        }
    },
    descImgLoaded: function(event) {
        var width = event.detail.width,
            height = event.detail.height,
            descImgHeight = height*1.0/width*this.winH;
        this.setData({
            descImgHeight: parseInt(descImgHeight)
        })
    }
});