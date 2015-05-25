
import React from 'react'
import Infinity from 'components/react.infinity'
import $ from 'jquery'

export default React.createClass({

    getInitialState: function() {
        return {
            filtered: this.props.contacts.splice(0, 20)
        }
    },


    load(page) {
        console.log('+++', page);
        this.setState({
            filtered: this.state.filtered.concat(this.props.contacts.splice(page * 20, 20))
        })
    },

    render: function() {
        var list = this.state.filtered.map((e) => {
            return (<li> e.name </li>)
        });

        var wrapStyle = {height: "300px", width: "300px", overflow: "auto"};

        return (< div className={"wrap"} style={wrapStyle} >
            <ul className={"box"}>
                <Infinity
                    scrollBoxId = {".wrap"}
                    containerId = {".box"}
                    load = {this.load}
                > {list} </Infinity>
            </ul>
        </div>
        )}


})