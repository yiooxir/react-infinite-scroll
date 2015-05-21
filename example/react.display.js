
import React from 'react'
import Infinity from 'components/react.infinity'
import $ from 'jquery'

export default React.createClass({

    getInitialState: function() {
        return {
            filtered: this.props.contacts
        }
    },

    render: function() {
        var list = this.state.filtered.map(function(e) {
            return (<li>e.name</li>)
        });

        var wrapStyle = {height: "300px", width: "300px", overflow: "auto"};

        console.log('+++++',this.node)
        return (< div className={"wrap"} style={wrapStyle} >
            <ul className={"box"}>
                <Infinity scrollBoxClass = {"wrap"} container = {"box"} >{ list }</Infinity>
            </ul>
        </div>
        )}


})