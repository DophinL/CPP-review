/**
 * Created by Dophin on 16/2/25.
 */
new Popover({
    data:{
        class:'m-popover-s',
        content:'<p><span style="color: orange;font-weight:700">调整前:</span>' + level + '</p><p><span style="color: orange;font-weight:700">调整后:</span>' + levelAdjust + '</p>',
        debug:true
    }
}).$inject(element);