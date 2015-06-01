
import React, {propTypes} from 'react'

export default React.createClass({

    getDefaultProps: function() {
        return {
            shift: 1,
            load: () => {},
            children: this.children,
            threshold: 50,
            loader: React.DOM.div('load...')
        }
    },

    componentDidMount: function() {
        var {scrollBoxId, containerId} = this.props;

        /* get dom element */
        this.scrollBox = document.getElementById(scrollBoxId);
        this.container = document.getElementById(containerId);

        this.shift();
        this.attachScrollHandler();

        console.log('componentDidMount')
    },

    componentDidUpdate: function() {
        console.log('componentDidUpdate')
    },

    componentWillUnmount: function() {
        console.log('componentWillUnmount')
    },
    render: function() {
        var style = {overflow: 'hidden'};

        return (
            <div style={style}>{this.props.children}</div>
        )
    },

    attachScrollHandler: function() {
        var {page, pages, threshold, load} = this.props;
        var {scrollBox, container} = this;

        /* pages which has been loaded  { array of number } */
        var cached = [page],
        /* if previous step was loaded */
            prev = false,
        /* sign for load function */
            insertLeft = false;

        var isBreakUp = () => {
            return threshold > scrollBox.scrollTop
        };

        var isBreakDown = () => {
            return (container.getBoundingClientRect().bottom - scrollBox.getBoundingClientRect().bottom) < threshold;
        };

        scrollBox.onscroll = () => {
            if (isBreakDown()) load('down');
            if (isBreakUp()) load('up');
        };
    },

    shift: function (px) {
        this.scrollBox.scrollTop = px || this.props.shift;
    }
});


