'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

exports['default'] = _react2['default'].createClass({
    displayName: 'index',

    getDefaultProps: function getDefaultProps() {
        return {
            shift: 1,
            load: function load() {},
            children: this.children,
            threshold: 50,
            loader: _react2['default'].DOM.div('load...')
        };
    },

    componentDidMount: function componentDidMount() {
        var _props = this.props;
        var scrollBoxId = _props.scrollBoxId;
        var containerId = _props.containerId;

        /* get dom element */
        this.scrollBox = document.getElementById(scrollBoxId);
        this.container = document.getElementById(containerId);

        this.shift();
        this.attachScrollHandler();

        console.log('componentDidMount');
    },

    componentDidUpdate: function componentDidUpdate() {
        console.log('componentDidUpdate');
    },

    componentWillUnmount: function componentWillUnmount() {
        console.log('componentWillUnmount');
    },
    render: function render() {
        var style = { overflow: 'hidden' };

        return _react2['default'].createElement(
            'div',
            { style: style },
            this.props.children
        );
    },

    attachScrollHandler: function attachScrollHandler() {
        var _props2 = this.props;
        var page = _props2.page;
        var pages = _props2.pages;
        var threshold = _props2.threshold;
        var load = _props2.load;
        var scrollBox = this.scrollBox;
        var container = this.container;

        /* pages which has been loaded  { array of number } */
        var cached = [page],

        /* if previous step was loaded */
        prev = false,

        /* sign for load function */
        insertLeft = false;

        var isBreakUp = function isBreakUp() {
            return threshold > scrollBox.scrollTop;
        };

        var isBreakDown = function isBreakDown() {
            return container.getBoundingClientRect().bottom - scrollBox.getBoundingClientRect().bottom < threshold;
        };

        scrollBox.onscroll = function () {
            if (isBreakDown()) load('down');
            if (isBreakUp()) load('up');
        };
    },

    shift: function shift(px) {
        this.scrollBox.scrollTop = px || this.props.shift;
    }
});
module.exports = exports['default'];