<z-xtable ref="zxtable" config={config}>
    <xtable_cols>
        <col width="10%"/>
        <col width="20%"/>
        <col />
    </xtable_cols>
    <xtable_hd>
        <tr>
            <th>工号</th>
            <th>姓名</th>
            <th>职位名称</th>
        </tr>
    </xtable_hd>
    <xtable_bd>
        {#list items as item}
        <tr>
            <td>工号</td>
            <td>姓名</td>
            <td>职位名称</td>
        </tr>
        {/list}
    </xtable_bd>
</z-xtable>