<div class="scrollTable_hd {_overflow?'overflow':''}">
    <table class="u-table" style="table-layout: fixed;">
        <colgroup>
            {#inc this.$outer.data._cols}
        </colgroup>
        <thead ref="thead">
        {#inc this.$body}
        </thead>
    </table>
</div>