<div class="index" r-hide="status !== 'index'">
    <queryDepart type="2" ref="queryDepart" on-search={this.search($event)} />

    <z-xtable config={tableConfig}>
        <xtable_cols>
            <col width="6.5%"/>
            <col width="6.5%"/>
            <col width="12%"/>
            <col width="10%"/>
            <col width="6.5%"/>
            <col width="6.5%"/>
            <col width="6.5%"/>
            <col width="16%"/>
            <col width="10%"/>
            <col width="6.5%"/>
            <col width="8%"/>
            <col/>
        </xtable_cols>
        <xtable_hd>
            <tr>
                <th>工号</th>
                <th>姓名</th>
                <th>职位名称</th>
                <th>所属部门</th>
                <th>现级别</th>
                <th>拟调整级别</th>
                <th>调整属性</th>
                <th>拟调整职位类别</th>
                <th>评审方式</th>
                <th>评审结果</th>
                <th>最新状态</th>
                <th>详情</th>
            </tr>
        </xtable_hd>
        <xtable_bd>
            {#list items as item}
            <item on-jump={this.jump($event)} item={item}></item>
            {/list}
        </xtable_bd>
    </z-xtable>

    <pager total={totalPages} on-nav={this.nav($event)}></pager>
</div>

<!--详情页面-->
<!--{#if status === 'detail'}
<div class="detail">
    <detail empId={detail.empId} on-goback={this.goback()}></detail>
</div>
{/if}-->
