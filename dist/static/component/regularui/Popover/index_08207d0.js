define("component/regularui/Popover/index",["require","exports","module","static/js/regular"],function(t,e,n){var o=t("static/js/regular"),i=o.util,s=o.dom,r=o.extend({template:'<div class="m-popover {class}">\n    <div class="popover_placeholder"></div>\n    <div class="popover_arrow"></div>\n    <div class="popover_cnt">\n        {#inc content}\n    </div>\n</div>',config:function(t){var e={"class":"",content:"",debug:!1};i.extend(t,e)},init:function(){var t=this;this.$on("$inject",function(e){var n=s.element(t),o=document.createElement("div");o.innerHTML=this.data.content,o.textContent.trim()||this.destroy(),"static"==getComputedStyle(e).position&&(e.style.position="relative");var i=-(n.offsetHeight-e.offsetHeight)/2,r=e.offsetWidth-10;n.style.top=i+"px",n.style.left=r+"px",t.data.debug||s.on(e,"mouseleave",function(){t.destroy()})})}});n.exports=r});