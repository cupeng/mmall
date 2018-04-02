'use strict'

var _mm = {
    request: function(param) {
        var _this = this
        $.ajax({
            type: param.method || 'GET',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function(res) {
                //请求成功
                if ( 0 === res.status ) {
                    typeof param.success == 'function' && param.success(res.data,res.msg)
                } else if ( 10 === res.status ) {
                    _this.doLogin()
                } else if ( 1 === res.status ) {
                    typeof param.error == 'function' && param.error(res.msg)
                }
            },
            error: function(err) {
                typeof param.error == 'function' && param.error(err.status)
            }
        })
    },
    //统一登录处理
    doLogin: function() {
        window.location.href = './login.html?redirect=' + encodeURLComponent(window.location.href)
    }
}

module.exports = _mm