'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _user   = require('service/user.js');
var _mm     = require('util/mm.js');

// 表单里的错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('p').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('p').text('');
    }
};

// page 逻辑部分
var page = {
    init: function(){
        this.onload()
        this.bindEvent();
    },
    onload: function() {
        this.loadStepUsername()
    },
    bindEvent : function(){
        var _this = this;
        // 登录按钮的点击
        $('#submit').click(function(){
            _this.submit();
        });
        // 如果按下回车，也进行提交
        $('.user-content').keyup(function(e){
            // keyCode == 13 表示回车键
            if(e.keyCode === 13){
                _this.submit();
            }
        });
    },
    submit: function() {

    },
    loadStepUsername: function() {
        $('.step-username').show()
    },
    loadStepQuestion: function() {

    },
    loadStepPassword: function() {

    }
};
$(function(){
    page.init()
});