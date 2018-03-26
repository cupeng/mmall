'use strict'

import './index.css'

import _mm from 'util/mm.js'
_mm.request({
    url: '/product/list.do?keyword=1',
    dataType: 'json',
    success: function(res) {
        console.log(res)
    },
    error: function(e) {
        console.log(e)
    }
})

