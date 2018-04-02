'use strict'

import _mm from 'util/mm.js'
import './index.css'
import 'page/common/nav-simple/index.js'

$(function() {
    var type = _mm.getUrlParam('type') || 'default'
    var $ele = $('.' + type + '-success')

    $ele.show()


})