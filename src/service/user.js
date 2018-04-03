import { request,getServerUrl } from 'util/mm.js'
var _user = {
    login: function(userInfo,resolve,reject) {
        request({
            url: getServerUrl('/user/login.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    register: function(userInfo,resolve,reject) {
        request({
            url: getServerUrl('/user/register.do'),
            data: userInfo,
            method:'POST',
            success: resolve,
            error: reject
        })
    },
    checkLogin: function(resolve,reject) {
        request({
            url: getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    checkUsername: function(username,resolve,reject) {
        request({
            url: getServerUrl('/user/check_valid.do'),
            data: {
                type: 'username',
                str: username
            },
            method: 'POST',
            success: resolve,
            error: reject
        })
    }

}

module.exports = _user