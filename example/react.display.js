
import React from 'react'
import Infinity from './react-infinity'

export default React.createClass({

    getInitialState: function() {
        return {
            filtered: this.props.contacts.splice(0, 20)
        }
    },

    load(page) {

        console.log(page);

        //this.setState({
        //    filtered: insertLeft ?
        //        this.props.contacts.splice(page * 20, 20).concat(this.state.filtered) :
        //        this.state.filtered.concat(this.props.contacts.splice(page * 20, 20))
        //})
    },

    render: function() {
        var list = this.state.filtered.map((e) => {
            return (<li> {e.name} </li>)
        });

        var wrapStyle = {height: "300px", width: "300px", overflow: "auto"};

        return (< div id="wrap" style={wrapStyle} >
            <ul id="box">
                <Infinity
                    scrollBoxId = {"wrap"}
                    containerId = {"box"}
                    load = {this.load}
                    page = {3}
                    pages = {9}
                > {list} </Infinity>
            </ul>
        </div>
        )}


})