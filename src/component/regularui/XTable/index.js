/**
 * Created by hzliuzongyuan on 2015/12/17.
 * @tips:
 * 1.maxHeight默认单位为px,你只需要传 200 or "200" 即可
 * 2.items中的每个项代表一行的数据，若设置了maxHeight，则每当items变化，会重新计算内容区高度
 * 3.status可以为String类型,如'normal'，也可以为Object类型{type:'normal'}
 *
 * @TODO:考虑没有$outer的情况
 */

//@require 'index.less'
var BaseComponent = require('/component/BaseComponent/');

var _ = BaseComponent.util;

var XTable = BaseComponent.extend({
    name: 'xtable',
    template: '{#inc this.$body}',
    config: function (data) {
        var _default = {
            config: {
                status: {type:'normal'},    //normal、loading、empty、error
                maxHeight: 0,   //若有值，内容区高度超过该值后会显示滚动条
                items:[],
                loadingTemplate:'', //template的上下文皆为XTableBd,而XTableBd可以在模板里通过config来取得XTable的config属性
                emptyTemplate:'',
                errorTemplate:''
            },
            _bdHeight: 0,    //内容区高度
            _cols:null  //xtable_cols的$body
        };
        data.config && _.extend(data.config, _default.config);
        _.extend(data, _default);
    }
})

var XTableCols = BaseComponent.extend({
    name:'xtable_cols',
    template:'',
    init: function () {
        this.$outer.data._cols = this.$body;
    }
})

var XTableHd = BaseComponent.extend({
    name: 'xtable_hd',
    template: __inline('hd.tpl'),
    computed: {
        _overflow:"this.$outer.data._bdHeight > (+this.$outer.data.config.maxHeight)"
    },
    init: function () {
        var scrollable = !!this.$outer.data.config.maxHeight,barWidth;

        //给最后一个th添加'th-last'类 TODO: 兼容性
        var ths = this.$refs.thead.querySelectorAll('th');
        ths[ths.length-1].classList.add('th-last');

        //计算浏览器滚动条宽度，根据此设置表格溢出时的样式
        if(scrollable){
            barWidth = getScrollbarWidth();
            appendStyleSheetToHead('<style>.scrollTable_hd.overflow{padding-right:'+barWidth+'px;}.scrollTable_hd.overflow:before{width:'+barWidth+'px;}</style>');
        }

        function appendStyleSheetToHead(css) {
            var head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style');

            style.type = 'text/css';
            if (style.styleSheet){
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }

            head.appendChild(style);
        }

        function getScrollbarWidth() {
            var outer = document.createElement("div");
            outer.style.visibility = "hidden";
            outer.style.width = "100px";
            outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

            document.body.appendChild(outer);

            var widthNoScroll = outer.offsetWidth;
            // force scrollbars
            outer.style.overflow = "scroll";

            // add innerdiv
            var inner = document.createElement("div");
            inner.style.width = "100%";
            outer.appendChild(inner);

            var widthWithScroll = inner.offsetWidth;

            // remove divs
            outer.parentNode.removeChild(outer);

            return widthNoScroll - widthWithScroll;
        }
    }
})

var XTableBd = BaseComponent.extend({
    name: 'xtable_bd',
    template: __inline('bd.tpl'),
    computed: {
        config: 'this.$outer.data.config',
        _overflow: '_bdHeight>_maxHeight',
        _bdHeight: '+this.$outer.data._bdHeight',
        _maxHeight: '+config.maxHeight'
    },
    init: function () {
        var self = this;
        var scrollable = !!this.$outer.data.config.maxHeight;
        if(scrollable){
            this.$watch('config.items', function () {
                setTimeout(function () {//items变化时，table高度未必是最终的高度
                    self.$outer.$update('_bdHeight', self.$refs.table.offsetHeight);
                },100)
            })
        }
    }
})

module.exports = XTable;
