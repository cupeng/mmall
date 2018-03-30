'use strict'

import Hogan from 'hogan'

var conf = {
    serverHost: ''
}
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
    //获取服务器地址
    getServerUrl: function(path) {
        return conf.serverHost + path
    },
    // 获取URL参数
    getUrlParam: function(name) {
        var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)')
        var result = window.location.search.substr(1).match(reg)
        return result ? decodeURIComponent(result[2]) : null
    },
    renderHtml: function(htmlTemplate,data) {
        var template = Hogan.compile(htmlTemplate)
        var result = template.render(data)
        return result
    },
    successTips: function(msg) {
        alert(msg || '操作成功')
    },
    errorTips: function(msg) {
        alert(msg || '哪里不对了~~')
    },
    validate: function(val,type) {
        var val = $.trim(val)
        if('require' === type) {
            return !!val
        }
        if('phone' === type) {
            return /^1\d{10}$/.test(val)
        }
        if('email' === type) {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(val)
        }
    },
    goHome: function() {
        return window.location.href = '/'
    },
    //统一登录处理
    doLogin: function() {
        window.location.href = './login.html?redirect=' + encodeURLComponent(window.location.href)
    }
}

module.exports = _mm