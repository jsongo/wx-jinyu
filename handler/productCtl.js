var net = require('../common/net.js'),
    conf = require('../conf/conf.js');

module.exports = class {
    constructor() {
        this.products = null;
    }

    fetchNrender(api, data, callback) {
        net.post({
            url: conf.apiPrefix + api,
            data: data,
            success: (data)=> {
                callback && callback.call(null, data);
            }
        });
    }

    renderList(callback) {
        if (!this.products) {
            this.products = wx.getStorageSync(conf.storeKey.prodList);
        }
        if (!this.products) {
            this.fetchNrender(conf.api.prodList, null, (data)=>{
                callback && callback.call(null, data);
                wx.setStorage({
                    key: conf.storeKey.prodList,
                    data: data
                });
            });
        }
        else {
            callback && callback.call(null, this.products);
        }
    }

    renderInfo(id, callback) {
        this.fetchNrender(conf.api.prodInfo, {id: id}, (data)=>{
            callback && callback.call(null, data);
        });
    }
}