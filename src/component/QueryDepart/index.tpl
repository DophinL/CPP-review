<div class="query-wrap">
    <label>所属部门:</label>
    <xSelect data="1" ref="depart1" on-select={this.select($event)}>请选择一级部门</xSelect>
    <xSelect data="2" ref="depart2" on-select={this.select($event)}>请选择二级部门</xSelect>
    <xSelect data="3" ref="depart3" on-select={this.select($event)}>请选择三级部门</xSelect>
    <div class="select-input {type==2?'f-rt':''}">
        <select r-model={option}>
            <option value="empId">工号</option>
            <option value="empName">姓名</option>
        </select>
        <input on-enter={this.search()} r-model={text} class="search" type="text"/>
        <span class="icon_search" on-click={this.search()}></span>
    </div>
</div>