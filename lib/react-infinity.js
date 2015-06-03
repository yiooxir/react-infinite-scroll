'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

window.React = _react2['default'];

exports['default'] = _react2['default'].createClass({
    displayName: 'index',

    getInitialState: function getInitialState() {
        return {
            blockHeight: 1000
        };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            shift: 1,
            load: function load() {},
            children: this.children,
            threshold: 50,
            loader: _react2['default'].DOM.div('load...'),
            hasMore: false
        };
    },

    componentDidMount: function componentDidMount() {
        var _props = this.props;
        var scrollBoxId = _props.scrollBoxId;
        var containerId = _props.containerId;

        /* get dom element */
        this.scrollBox = document.getElementById(scrollBoxId);
        this.component = _react2['default'].findDOMNode(this);
        this.container = document.getElementById(containerId);

        this.setState({
            blockHeight: this.scrollBox.offsetHeight
        });

        this.shift();
        this.scrollTop();
        this.attachScrollHandler();

        void 0;
    },

    scrollTop: function scrollTop() {
        var scrollBox = this.scrollBox;
        var component = this.component;

        component.cached = component.cached || {};
        component.cached.f = component.cached.f || false;

        if (component.cached.f) {
            scrollBox.scrollTop = component.offsetHeight - component.cached.height;
            component.cached.f = false;
        }

        component.cached.height = component.offsetHeight;
    },

    componentDidUpdate: function componentDidUpdate() {
        this.scrollTop();
        void 0;
    },

    componentWillUnmount: function componentWillUnmount() {

        void 0;
    },

    render: function render() {
        var style = { overflow: 'hidden' };

        var preDivStyle = {
            height: '1px'
        };

        var postDivStyle = {
            height: this.state.blockHeight,
            display: this.props.hasMore ? 'block' : 'none'
        };

        return _react2['default'].createElement(
            'div',
            { style: style },
            _react2['default'].createElement('div', { style: preDivStyle }),
            this.props.children,
            _react2['default'].createElement('div', { style: postDivStyle })
        );
    },

    attachScrollHandler: function attachScrollHandler() {
        var _this = this;

        var _props2 = this.props;
        var threshold = _props2.threshold;
        var load = _props2.load;
        var scrollBox = this.scrollBox;
        var container = this.container;

        var isBreakUp = function isBreakUp() {
            return threshold > scrollBox.scrollTop;
        };

        var isBreakDown = function isBreakDown() {
            return container.getBoundingClientRect().bottom - scrollBox.getBoundingClientRect().bottom - _this.state.blockHeight < threshold;
        };
        scrollBox.onscroll = function () {

            if (isBreakDown()) {
                _this.component.cached.f = false;
                load('down');
            }

            if (isBreakUp()) {
                _this.component.cached.f = true;
                load('up');
            }
        };
    },

    shift: function shift(px) {
        this.scrollBox.scrollTop = px || this.props.shift;
    }
});
module.exports = exports['default'];