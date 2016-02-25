/**
 * Created by hzliuzongyuan on 2016/1/14.
 */
//@require 'index.less'
var BaseComponent = require('/component/BaseComponent/');

var _ = BaseComponent.util;

;(function(){
    var preVal = '';
    BaseComponent.event('enter', function(elem, fire){
        var dom = BaseComponent.dom;
        dom.on(elem, "keypress", update);
        return function destroy(){ // return a destroy function
            dom.off(elem, "keypress", update);
        }

        function update(ev){
            var nowVal = elem.value;
            if(ev.which == 13){ // ENTER key
                if(preVal !== nowVal){
                    ev.preventDefault();
                    fire(ev); // if key is enter , we fire the event;
                }
            }
            preVal = nowVal;
        }
    });
})()

var QueryDepart = BaseComponent.extend({
    name:'queryDepart',
    template:__inline('index.tpl'),
    config:function(data){
        var _default={
            nowDeptId:'',
            option:'empId',
            text:'',
            type:1  //1搜索框贴在选择框附近，2搜索框向右浮动
        }
        _.extend(data,_default);
    },
    init:function(){
        var self = this;

        this.$request({
            url:'/dept/getUserDeptList.do',
            method: 'GET',
            data: {depth: 1},
            dataType: 'json',
            success: function (result) {
                var arr = [];
                for (var i = 0; i < result.data.length; i++) {
                    arr.push(_.extend({text:result.data[i].deptName},result.data[i]));
                }
                self.$refs.depart1.$update('items', arr);
            }
        })
    },
    select:function (selected) {
        var departArr = ['depart1', 'depart2', 'depart3'];
        var nextDept = this.$refs[departArr[selected.data]];

        //清空后面的部门
        for (var i = selected.data-0; i < departArr.length; i++) {
            this.$refs[departArr[i]].clear();
        }

        //若选择空
        if(!selected.deptId){
            if(selected.data == '1'){   //一级部门
                this.data.nowDeptId = undefined;
            }else{
                //获取上级部门选择的deptId
                var preDept = this.$refs[departArr[selected.data-2]];
                this.data.nowDeptId = preDept.data.value.deptId;
            }
        }else{
            this.data.nowDeptId = selected.deptId;
            if(selected.data!='3'){
                this.$request( {
                    url:'/dept/getUserDeptList.do',
                    method: 'GET',
                    data: {parentId: selected.deptId},
                    dataType: 'json',
                    success: function (result) {
                        var arr = [];
                        for (var i = 0; i < result.data.length; i++) {
                            arr.push(_.extend({text:result.data[i].deptName},result.data[i]));
                        }
                        nextDept.$update('items', arr);
                    }
                })
            }
        }

        this.$emit('select',selected);
        this.search();
    },
    search: function () {
        var data = {};
        this.data.nowDeptId && (data.deptId = this.data.nowDeptId);
        this.data.text && (data[this.data.option] = this.data.text);
        this.$emit('search',data);
    }
});

var XSelect = BaseComponent.extend({
    template: '<select on-change={this.select($event)}>' +
    '<option>{#include this.$body}</option>' +
    '{#list items as item}' +
    '<option value={item_index}>{item.text}</option>' +
    '{/list}' +
    '</select>',
    config: function (data) {
        var _default = {
            items: [],   //[{text:''...}]
            data:null, //附加的数据，可能为任何类型,
            value:{}
        }
        _.extend(data,_default);
    },
    select: function (e) {
        this.data.value = _.extend({data:this.data.data},this.data.items[e.target.value]);
        this.$emit('select',this.data.value );
    },
    clear:function(){
        this.data.items = [];
        this.data.value = {};
    }
})

QueryDepart.component('xSelect',XSelect);

module.exports = QueryDepart;
