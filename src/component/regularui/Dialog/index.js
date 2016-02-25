var Regular = require('/static/js/regular');
var _tpl =  __inline('index.tpl');
var Component = Regular.extend({
	template: _tpl,
	name: "dialog",
	data:{
		title:"提示",
		type:"alert"//alert,confirm,dialog
	},
	init: function(){
		this.$on('$inject', function () {
			this.__calPosition();
		});
		this.$inject(document.body);
		this.$refs.dialogFocus.focus();
	},
	config: function(){
	},
	close: function(){
		this.$emit('close');
		this.destroy();
	},
	confirm: function(){
		if(typeof this.data.callback == "function"){
			this.data.callback.call(this);
			this.close();
		}
	},
	__calPosition: function () {
		var pagebox = document.body,
			screenEl = document.documentElement,
			cW = screenEl.clientWidth,
			cH = screenEl.clientHeight,
			sT = pagebox.scrollTop,
			sL = pagebox.scrollLeft;
		var	panel = this.$refs.panel,
			rect = panel.getBoundingClientRect(),
			width = rect.right - rect.left,
			height = rect.bottom - rect.top;

		var top = Math.max(sT + (cH - height) / 2, sT),
			left = Math.max(sL + (cW - width) / 2, sL);
		this.data.style = {
			"top": top + 'px',
			"left": left + 'px'
		};
		this.$update();
	},
	__evClickBtn: function (ev, index) {
		var self = this,
			target = ev.origin,
			btns = self.data.btns,
			callback = btns[index] && btns[index].callback;

		

		if (typeof callback != 'function') {
			return;
		}

		callback.call(self, ev, index);
	}
});

 module.exports = Component;
