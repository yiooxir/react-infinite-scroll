'use strict';

import React from 'react'
import Display from './react.display.jsx!'

var objects = (function() {
    var objs = [];

    for (var a = 1; a<300; a++) {
        objs.push({name: 'name' + a})
    }
    return objs;
})();

React.render(<Display labelOn="On" labelOff="Off" contacts = {objects} />, document.getElementById('view'));