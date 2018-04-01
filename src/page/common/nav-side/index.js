'use strict'

import './index.css'
import _mm from 'util/mm.js'
import template from './index.string'

var navSide = {
    option: {
        name: '',
        navList: [
            {name: 'user-center',desc: '个人中心',href: './user-center.html'},
            {name: 'order-list',desc: '我的订单',href: './order-list.html'},
            {name: 'user-pass-update',desc: '修改密码',href: './user-pass-update.html'},
            {name: 'about',desc: '关于MMall',href: './about.html'}
        ]
    },
    init: function(option) {
        $.extend(this.option,option)
        this.renderNav()
    },
    renderNav: function () {
        for(var i=0,len = this.option.navList.length; i<len; i++) {
            if(this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true
            }
        }
        var navHtml = _mm.renderHtml(template,{
            navList: this.option.navList
        })

        $('.nav-side').html(navHtml)
    }
}

module.exports = navSide