define("component/Header/index",["require","exports","module","component/BaseComponent/index"],function(n,e,s){var a=n("component/BaseComponent/index"),o=a.util,t=a.extend({template:'<div class="m-header clearfix">\r\n    <div class="u-logo-wrap">\r\n        <span class="i-logo">&nbsp;</span>\r\n        <span>任职资格系统</span>\r\n    </div>\r\n    <div class="account-sign-status">\r\n        <span class="loginName">{name}</span>\r\n        <a href="/logout.do" class="logout">退出</a>\r\n    </div>\r\n</div>',config:function(n){var e={};o.extend(n,e)},init:function(){var n=this;this.$request({url:"/users/cur.do",method:"GET",success:function(e){n.data.name=e.data.userName}})}});s.exports=t});