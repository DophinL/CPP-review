// @require index.less

var BaseComponent = require('/component/BaseComponent/');

var _ = BaseComponent.util;

var Header = BaseComponent.extend({
    template:__inline('index.tpl'),
    config:function(data){
        var _default={}
        _.extend(data,_default);

    },
    init:function(){
        var self = this;

        this.$request({
            url:'/users/cur.do',
            method:'GET',
            success:function(result){
                //填充姓名
                self.data.name = result.data.userName;
            }
        })
    }
})

module.exports = Header;