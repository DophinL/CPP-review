/**
 * Created by hzliuzongyuan on 2015/12/21.
 * @description: Z代表该组件由独立组件（即可复用到其它项目的组件）继承，并用于本次业务
 */

var XTable = require('/component/regularui/XTable');

var ZXTable = XTable.extend({
    name:'z-xtable',
    config:function(data){
        data.config = data.config || {};
        data.config.emptyTemplate = '<tr> ' +
            '<td colspan="1000" height="250"> ' +
            '<div class="tip-box">没有找到符合条件的用户</div> ' +
            '</td> ' +
            '</tr>';
        data.config.errorTemplate = '<tr> ' +
            '<td colspan="1000" height="250"> ' +
            '<div class="tip-box"> ' +
            '<i class="u-face-cry"></i><br/>' +
            '出错啦，{config.status.msg} [{config.status.code}] ' +
            '</div> ' +
            '</td> ' +
            '</tr>';
        data.config.loadingTemplate = '<tr> ' +
            '<td colspan="1000" height="250"> ' +
            '<div class="tip-box"> ' +
            '<i class="u-loading"></i><br/>' +
            '正在获取列表... ' +
            '</div> ' +
            '</td> ' +
            '</tr>';
        this.supr(data);
    }
})

module.exports = ZXTable;

