define("component/ZXTable/index",["require","exports","module","component/regularui/XTable/index"],function(i,t,e){var n=i("component/regularui/XTable/index"),o=n.extend({name:"z-xtable",config:function(i){i.config=i.config||{},i.config.emptyTemplate='<tr> <td colspan="1000" height="250"> <div class="tip-box">没有找到符合条件的用户</div> </td> </tr>',i.config.errorTemplate='<tr> <td colspan="1000" height="250"> <div class="tip-box"> <i class="u-face-cry"></i><br/>出错啦，{config.status.msg} [{config.status.code}] </div> </td> </tr>',i.config.loadingTemplate='<tr> <td colspan="1000" height="250"> <div class="tip-box"> <i class="u-loading"></i><br/>正在获取列表... </div> </td> </tr>',this.supr(i)}});e.exports=o});