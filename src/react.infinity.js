
import React, {propTypes} from 'react'

export default React.createClass({

    getDefaultProps: function() {
        return {
            page: 1,
            pages: 20,
            shift: 30,
            load: () => {},
            children: this.children,
            threshold: 30,
            loader: React.DOM.div('load...')
        }
    },

    init: function() {
        var {scrollBoxId, containerId, page} = this.props;
        var locals = {};

        locals.$scrollBox = $(scrollBoxId);
        locals.$container = $(containerId);

        if (!locals.$scrollBox.length || !locals.$container.length) throw new Error('$elements not found');

        locals.height = locals.$container.height() - locals.$scrollBox.height();
        locals.currentPage = page;

        this.locals = locals;
    },

    componentDidMount: function() {
        this.init();
        this.attachScrollHandler();
        this.shift();
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
        var {page, threshold, load, scrollBoxId, containerId} = this.props;

        var $scrollBox = $(scrollBoxId);
        var $container = $(containerId);

        var scroll = {};
        var cached = [page];


        scroll._btop = null;
        //scroll.toPercent = (top, height) => { return top/height * 100 };
        scroll.isThresholdUp = (top) => { return top < threshold };
        scroll.isThresholdDown = (containerRect, scrollBoxRect) => { return (containerRect.bottom - scrollBoxRect.bottom) < threshold };
        //scroll.isRollback = () => {if (scroll._btop)};

        $scrollBox.scroll(() => {
            var top = $scrollBox.scrollTop();

            var s = $scrollBox[0].getBoundingClientRect();
            var c = $container[0].getBoundingClientRect();
            console.log(scroll.isThresholdUp(top), scroll.isThresholdDown(c, s))

            //console.log($scrollBox.scrollTop(), $container.height(), $scrollBox.height() )
            //console.log($scrollBox.scrollTop(), $container.height() - $scrollBox.height() )
            //console.log(scroll.toPercent($scrollBox.scrollTop(), $container.height() - $scrollBox.height()) )
            //var ptop = scroll.toPercent($scrollBox.scrollTop(), $container.height() - $scrollBox.height());
            //var reqPageNum = null;
            //
            if (scroll.isThresholdDown(top)) {
                console.log('isThresholdDown')
                reqPageNum = cached[cached.length-1] + 1;
                cached.push(reqPageNum);
            }

            if (scroll.isThresholdUp(c,s)) {
                console.log('isThresholdUp')
                reqPageNum = cached[0] - 1;
                cached.unshift(reqPageNum);
            }

            console.log(cached);

            if (reqPageNum) load(reqPageNum);
        });
        /*---------------------------------- */
    },

    shift: function () {
        if (this.props.page != 1) {
            this.$scrollBox.scrollTop(this.props.shift);
        }
    }
});


