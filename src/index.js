
import React, {propTypes} from 'react'

export default React.createClass({

    getDefaultProps: function() {
        return {
            page: 1,
            pages: 1,
            shift: 2,
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
        return (
            <div>{this.props.children}</div>
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
            var reqPageNum = null;

            if (isBreakDown() && cached[cached.length-1] < pages && !prev) {
                insertLeft = false;
                reqPageNum = cached[cached.length-1] + 1;
                cached.push(reqPageNum);
            }

            if (isBreakUp() && cached[0] > 1 && !prev) {
                insertLeft = true;
                reqPageNum = cached[0] - 1;
                cached.unshift(reqPageNum);
            }

            if (reqPageNum) load(reqPageNum, insertLeft);
            prev = !!reqPageNum;
        };
    },

    shift: function (lines) {
        if (this.props.page != 1) {
            this.scrollBox.scrollByLines(lines || this.props.shift, 0);
        }
    }
});


