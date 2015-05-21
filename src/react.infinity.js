
import React from 'react'

var Infinity = React.createClass({

    componentDidMount: function() {
        var {scrollBoxClass, container} = this.props;
        this.$scrollBox = $('.' + scrollBoxClass);
        this.$container = $('.' + container);
        if (!this.$scrollBox.length || !this.$container.length) throw new Error('$elements not found');
        this.attachScrollHandler();


    },

    render: function() {
        return (
            <div>{this.props.children}</div>
        )
    },

    attachScrollHandler: function() {
        var self = this;

        this.$scrollBox.scroll(function() {
            var top = self.$scrollBox.scrollTop(),
                max = self.$container.height() - self.$scrollBox.height();
            console.log(top/max * 100);
        });
    }
});

export default Infinity