/**
 * Created by hzliuzongyuan on 2015/12/1.
 */

//@require app.less

require('/component/ZXTable/');
require('/component/QueryDepart/');
var Popover = require('/component/regularui/Popover')

var BaseComponent = require('/component/BaseComponent/');

var _ = BaseComponent.util;

var App = BaseComponent.extend({
    template: __inline('app.tpl'),
    config: function (data) {
        var _default = {
            status: 'index',
            items: [],
            currentPage: 1,
            totalPages: 1,
            detail: {},
            tableConfig:{}
        }

        _.extend(data, _default);
    },
    init: function () {
        var self = this;
        this.$refs.queryDepart.search();//触发一次搜索

        //TODO: 兼容
        window.onhashchange = function () {
            var hash = location.hash;
            if (!hash) {
                self.$update('status', 'index');
            } else if (hash === '#detail') {
                self.$update('status', 'detail');
            }
        }

    },
    search: function (e) {
        var self = this,data={};

        //获取请求所需参数
        e.empId && (data.empId = e.empId);
        e.empName && (data.empName = e.empName)
        data.deptId = e.deptId;
        data.flag = 'progress';
        data.currentPage = this.data.currentPage;

        this.data.tableConfig.status = 'loading';

        this.$request({
            url:'/nom/getEmpList.do',
            method: 'GET',
            data: data,  //[Q](what is flag)
            dataType: 'json',
            success: function (result) {
                var flag = result.data.data && result.data.data.length,
                    status = '',
                    items = flag?formatB2M(result.data.data):[];

                if(flag)
                    status = 'normal';
                else
                    status = 'empty';

                self.$update({
                    'tableConfig.status':status,
                    'tableConfig.items':items,
                    items:items,
                    //currentPage: result.data.currentPage,
                    totalPages: result.data.totalPages
                });
                function formatB2M(arr) {
                    var ret = [];
                    for (var i = 0; i < arr.length; i++) {
                        ret[i] = {};
                        ret[i].empId = arr[i].empId;    //工号
                        ret[i].empName = arr[i].empName;    //姓名
                        ret[i].deptName = arr[i].deptName;  //所属部门
                        ret[i].pPositionName = arr[i].pPositionName;    //职位名称
                        ret[i].mPositionName = arr[i].mPositionName;
                        ret[i].pLevelNow = arr[i].pLevel;   //现级别
                        ret[i].mLevelNow = arr[i].mLevel;
                        ret[i].postL1NameNew = arr[i].empUpInfo && arr[i].empUpInfo.postL1NameNew;      //拟调整职位类别
                        ret[i].postL2NameNew = arr[i].empUpInfo && arr[i].empUpInfo.postL2NameNew;
                        ret[i].postL3NameNew = arr[i].empUpInfo && arr[i].empUpInfo.postL3NameNew;
                        ret[i].pLevelNew = arr[i].empUpInfo && arr[i].empUpInfo.lineP && arr[i].empUpInfo.lineP.levelNew;   //拟调整级别
                        ret[i].mLevelNew = arr[i].empUpInfo && arr[i].empUpInfo.lineM && arr[i].empUpInfo.lineM.levelNew;
                        ret[i].pLevelAdjust = arr[i].empUpInfo && arr[i].empUpInfo.lineP && arr[i].empUpInfo.lineP.levelAdjust;     //级别调整
                        ret[i].mLevelAdjust = arr[i].empUpInfo && arr[i].empUpInfo.lineM && arr[i].empUpInfo.lineM.levelAdjust;
                        ret[i].pUpType = arr[i].empUpInfo && arr[i].empUpInfo.lineP && arr[i].empUpInfo.lineP.upType;   //调整属性
                        ret[i].mUpType = arr[i].empUpInfo && arr[i].empUpInfo.lineM && arr[i].empUpInfo.lineM.upType;
                        ret[i].pReviewType = arr[i].empUpInfo && arr[i].empUpInfo.lineP && arr[i].empUpInfo.lineP.reviewType;   //评审方式
                        ret[i].mReviewType = arr[i].empUpInfo && arr[i].empUpInfo.lineM && arr[i].empUpInfo.lineM.reviewType;
                        ret[i].pResult1St = arr[i].empUpInfo && arr[i].empUpInfo.lineP && arr[i].empUpInfo.lineP.result1St;     //评审结果
                        ret[i].pResult2nd = arr[i].empUpInfo && arr[i].empUpInfo.lineP && arr[i].empUpInfo.lineP.result2nd;
                        ret[i].mResult1St = arr[i].empUpInfo && arr[i].empUpInfo.lineM && arr[i].empUpInfo.lineM.result1St;
                        ret[i].mResult2nd = arr[i].empUpInfo && arr[i].empUpInfo.lineM && arr[i].empUpInfo.lineM.result2nd;
                        ret[i].pResult = arr[i].empUpInfo && arr[i].empUpInfo.lineP && arr[i].empUpInfo.lineP.result;   //最新状态
                        ret[i].mResult = arr[i].empUpInfo && arr[i].empUpInfo.lineM && arr[i].empUpInfo.lineM.result;
                    }
                    return ret;
                }
            },
            error: function (err) {
                self.data.tableConfig.status = {type:'error',code: err.code, msg: err.msg};
            }
        })
    },
    nav: function (page) {
        this.data.currentPage = page;
        this.$refs.queryDepart.search();
    },
    jump: function (item) {
        this.data.detail = {empId: item.empId}
        this.data.status = "detail";
    },
    goback: function () {
        history.go(-1);
    }
})

var Item = BaseComponent.extend({
    template: __inline('item.tpl'),
    popover: function (flag,e,level,levelAdjust) {
        if(!flag)
            return;

        new Popover({
            data:{
                class:'m-popover-s',
                content:'<p><span style="color: orange;font-weight:700">调整前:</span>' + level + '</p><p><span style="color: orange;font-weight:700">调整后:</span>' + levelAdjust + '</p>',
                //debug:true
            }
        }).$inject(e.target);
    },
    jump: function () {
        this.$emit('jump', this.data.item);
    }
})

App.component('item', Item);
App.component('pager', require('/component/regularui/pager/'));
//App.component('detail', require('../detail/app'));

module.exports = App;