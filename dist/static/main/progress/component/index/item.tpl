<tr>
    <td>{item.empId}</td>
    <td>{item.empName}</td>
    <td>{item.pPositionName}{item.pPositionName && item.mPositionName?' / ':''}{item.mPositionName}</td>
    <td>{item.deptName}</td>
    <td>{item.pLevelNow}{item.pLevelNow && item.mLevelNow?' / ':''}{item.mLevelNow}</td>
    <td>{item.pLevelNew}{item.pLevelNew && item.mLevelNew?' / ':''}{item.mLevelNew}</td>
    <td>{item.pUpType}{item.pUpType && item.mUpType?' / ':''}{item.mUpType}</td>
    <td>{item.postL1NameNew}{item.postL1NameNew && item.postL2NameNew?' > ':''}{item.postL2NameNew}{item.postL2NameNew && item.postL3NameNew?' > ':''}{item.postL3NameNew}</td>
    <td>
        {item.pReviewType==1?'初审':(item.pReviewType==2?'答辩':(item.pReviewType==3?'内部评审':(item.pReviewType==4?'任职HR直接给结果':'')))} {item.pReviewType && item.mReviewType?' / ':''} {item.mReviewType==1?'初审':(item.mReviewType==2?'答辩':(item.mReviewType==3?'内部评审':(item.mReviewType==4?'任职HR直接给结果':'')))}
    </td>
    <td>
        {#if item.pResult1St || item.pResult2nd}
        <p>
            <span on-mouseenter={this.popover(item.pResult2nd==3,$event,item.pLevelNow,item.pLevelAdjust)}>
                {#if item.pResult2nd}
                {item.pResult2nd==1?'通过':(item.pResult2nd==2?'不通过':(item.pResult2nd==3?'调整':''))}
                {#else}
                {item.pResult1St==1?'通过':(item.pResult1St==2?'不通过':(item.pResult1St==3?'答辩':''))}
                {/if}
            </span>
        </p>
        {/if}
        {#if item.mResult1St || item.mResult2nd}
        <p>
            <span on-mouseenter={this.popover(item.mResult2nd==3,$event,item.mLevelNow,item.mLevelAdjust)}>
                {#if item.mResult2nd}
                {item.mResult2nd==1?'通过':(item.mResult2nd==2?'不通过':(item.mResult2nd==3?'调整':''))}
                {#else}
                {item.mResult1St==1?'通过':(item.mResult1St==2?'不通过':(item.mResult1St==3?'答辩':''))}
                {/if}
            </span>
        </p>
        {/if}
    </td>
    <td>{item.pResult}{item.pResult && item.mResult?' / ':''}{item.mResult}</td>
    <td><a href="#detail" on-click={this.jump()}>查看</a></td>
</tr>