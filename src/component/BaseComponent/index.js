/**
 * Created by Dophin on 16/2/16.
 */
var Regular = require('/static/js/regular.js');
var Dialog = require('/component/regularui/Dialog/index.js');
var _ = Regular.util;
var ajax = require('/static/js/ajax.js');

var BaseComponent = Regular.extend({
    $request: function (opts) {
        var self = this,
            success = opts.success || function () {
                },
            error = opts.error || function () {
                };

        opts.dataType || (opts.dataType = 'json');

        opts.success = function (result) {

            if (result.code != 200) {
                opts.error(result);

                return;
            }

            success.call(this, result);
            self.$update();
        }

        opts.error = function (err) {
            err.status && (err.code = err.status);
            err.statusText && (err.msg = err.statusText);

            error.call(this, err);
            self.$update();

            new Dialog({
                data: {
                    content: '[' + err.code + ':' + err.msg + '],' + '接口出现异常。',
                    type: 'alert'
                }
            })
        }

        ajax(opts);

    }
})

Regular.util.each = function(obj,cb){
    for(var i in obj){
        cb(i,obj[i]);
    }
}

Regular.util.trim = function(str){
    return str.trim();
}

_.extend(BaseComponent, Regular);

module.exports = BaseComponent;