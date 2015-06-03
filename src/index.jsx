
import React, {propTypes} from 'react'

window.React = React;

export default React.createClass({

    getInitialState: function() {
        return {
            blockHeight: 1000
        }
    },

    getDefaultProps: function() {
        return {
            shift: 1,
            load: () => {},
            children: this.children,
            threshold: 50,
            loader: React.DOM.div('load...'),
            hasMore: false
        }
    },

    componentDidMount: function () {
        var {scrollBoxId, containerId} = this.props;

        /* get dom element */
        this.scrollBox = document.getElementById(scrollBoxId);
        this.component = React.findDOMNode(this);
        this.container = document.getElementById(containerId);

        this.setState({
            blockHeight: this.scrollBox.offsetHeight
        });

        this.shift();
        this.scrollTop();
        this.attachScrollHandler();

        console.log('componentDidMount')
    },

    scrollTop: function() {

        var {scrollBox, component} = this;

        component.cached = component.cached || {};
        component.cached.f = component.cached.f || false;

        if (component.cached.f) {
            scrollBox.scrollTop = component.offsetHeight - component.cached.height;
            component.cached.f = false;
        }

        component.cached.height = component.offsetHeight;
    },

    componentDidUpdate: function() {
        this.scrollTop();
        console.log('componentDidUpdate')
    },

    componentWillUnmount: function() {

        console.log('componentWillUnmount')
    },

    render: function() {
        var style = {overflow: 'hidden'};

        var preDivStyle = {
            height: '1px'
        };

        var postDivStyle = {
            height: this.state.blockHeight,
            display: this.props.hasMore ? 'block': 'none'
        };

        return (
            <div style={style}>
                <div style = {preDivStyle}></div>
                {this.props.children}
                <div style = {postDivStyle}></div>
            </div>
        )
    },

    attachScrollHandler: function() {
        var {threshold, load} = this.props;
        var {scrollBox, container} = this;

        var isBreakUp = () => {
            return threshold > scrollBox.scrollTop
        };

        var isBreakDown = () => {
            return (container.getBoundingClientRect().bottom - scrollBox.getBoundingClientRect().bottom - this.state.blockHeight) < threshold;
        };
        scrollBox.onscroll = () => {

            if (isBreakDown()) {
                this.component.cached.f = false;
                load('down');
            }

            if (isBreakUp()) {
                this.component.cached.f = true;
                load('up');
            }
        };
    },

    shift: function (px) {
        this.scrollBox.scrollTop = px || this.props.shift;
    }
});


