<div style={_maxHeight?('max-height:'+_maxHeight+'px'):''} class="scrollTable_bd {_overflow?'overflow':''}">
    <table ref="table" class="u-table" style="table-layout: fixed;">
        <colgroup>
            {#inc this.$outer.data._cols}
        </colgroup>
        {#if config.status ==='normal' || config.status.type ==='normal'}
        <tbody>
        {#inc this.$body}
        </tbody>
        {/if}

        {#if config.status ==='loading' || config.status.type ==='loading'}
        <tbody>
        {#inc config.loadingTemplate}
        </tbody>
        {/if}

        {#if config.status ==='empty' || config.status.type ==='empty'}
        <tbody>
        {#inc config.emptyTemplate}
        </tbody>
        {/if}

        {#if config.status ==='error' || config.status.type ==='error'}
        <tbody>
        {#inc config.errorTemplate}
        </tbody>
        {/if}
    </table>
</div>