<ol class="u-menu">
	{#list menuList as aMenu}
		<li class="menuTab {aMenu.selected? 'selected' :''}">
			<a href="/menus/{aMenu.menuCode}" {#if aMenu.hasChildren} on-click={this.__clickMenu($event, aMenu_index)}{/if}>
				<i class={aMenu.className}></i>
				{aMenu.menuName}
			</a>
			{#if aMenu.hasChildren}
				<ul class="u-submenu" r-hide={!aMenu.showChildren}>
				{#list aMenu.children as sMenu}
					<li class="submenu {sMenu.selected?'selected' : ''}">
						<a href="/menus/{sMenu.menuCode}">{sMenu.menuName}</a>
					</li>
				{/list}
				</ul>
			{/if}
		</li>
	{/list}
</ol>

<div class="m-cprt">xxx版权所有</div>