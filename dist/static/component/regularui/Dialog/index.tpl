<!--
    @require "component/regularui/Dialog/index.less"
-->
<div class="u-mask"></div>
<div class="u-dialog" r-style={style} ref="panel">
	<div class="hd">
		<a href="javascript:void(0)" class="close" on-click={this.close()} data-dismiss="modal" aria-hidden="true"></a>
		
        <h4 class="ttl">{title}<a href="javascript:void(0)" class="u-dialogFocus" ref="dialogFocus">&nbsp;</a></h4>
	</div>
	<div class="ctn">
		<div ref="bd" class="body {(type == 'alert' || type == 'confirm')?'f-tc':''}">
			{#include content}
		</div>
		
		{#if btns.length}
		<div class="m-btns">
			{#list btns as btn}
			<button on-click="{this.__evClickBtn($event, btn_index)}" class="u-btn {btn.class}">{btn.txt}</button>
			{/list}
		</div>
		{/if}
		{#if type == "alert"}
			<div class="m-btns" style="text-align: center;">
				<button class="u-btn" on-click={this.close()}>确定</button>
			</div>
		{/if}
		{#if type == "confirm"}
			<div class="m-btns">
				<button class="u-btn" on-click={this.confirm()}>确定</button>
				<button class="u-btn" on-click={this.close()}>取消</button>
			</div>
		{/if}
	</div>
</div>