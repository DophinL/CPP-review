/**
 * Created by Dophin on 16/2/24.
 * @tips:
 * 1. 如果被插入元素没有定位(static),该组件会为其添加相对定位
 * 2. 如果options.content不存在text,则不会生成popover
 */
//@require index.less
var Regular = require('/static/js/regular.js');

var _ = Regular.util;
var dom = Regular.dom

var Popover = Regular.extend({
    template:__inline('index.tpl'),
    config:function(data){
        var _default={
            class:'',
            content:'',
            debug:false
        }
        _.extend(data,_default);
    },
    init:function(){
        var self = this;
        this.$on('$inject', function (node) {
            var selfdom = dom.element(self),
                div = document.createElement('div');

            div.innerHTML = this.data.content;

            if(!div.textContent.trim())
                this.destroy();

            // 为被插入元素添加定位
            getComputedStyle(node)['position'] == 'static' && (node.style.position = 'relative');

            var top = -(selfdom.offsetHeight - node.offsetHeight)/2,
                left = node.offsetWidth-10;

            selfdom.style.top = top+'px';
            selfdom.style.left = left+'px';

            if(!self.data.debug){
                dom.on(node,'mouseleave', function (e) {
                    self.destroy();
                })
            }
        })
    }
})

module.exports = Popover;