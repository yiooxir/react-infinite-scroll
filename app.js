'use strict';

import React from 'react'
import Display from 'components/react.display'
//import Server from 'components/server.mock'

//var api = new Server();

var objects = (function() {
    var objs = [];

    for (var a = 1; a<300; a++) {
        objs.push({name: 'name' + a})
    }
    return objs;
})();

React.render(<Display labelOn="On" labelOff="Off" contacts = {objects} />, document.getElementById('view'));