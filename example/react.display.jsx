
import React from 'react'
import Infinity from 'src/index.jsx!'
//import Infinity from 'lib/react-infinity'

export default React.createClass({

    getInitialState: function() {
        this.pages = [8];
        this.total = 20;
        this.perPage = 10;

        return {
            filtered: this.props.contacts.splice(80, 100)
        }
    },

    load(edge) {

        var {pages, total, perPage} = this, current, next;

        var self = this;

        if (edge == 'up') {
            current = pages[0];
            next = current == 1 ? null : current - 1;
            if (next) pages.unshift(next);
        }
        else {
            current = pages[pages.length-1];
            next = current < total ? current + 1 : null;
            if (next) pages.push(next);
        }



        if (!next) return;

        var page =  this.props.contacts.slice((next-1) * perPage, (next * perPage));

        var concate = {
            up() {return (page).concat(self.state.filtered)} ,
            down() {return self.state.filtered.concat(page)}
        };

        this.setState({filtered: concate[edge]()})
    },

    render: function() {
        var list = this.state.filtered.map((e) => (<li key={Math.random()}> {e.name} </li>));


        var wrapStyle = {height: "300px", width: "300px", overflow: "auto"};

        return (< div id="wrap" style={wrapStyle} >
            <ul id="box">
                <Infinity
                    scrollBoxId = {"wrap"}
                    containerId = {"box"}
                    load = {this.load}
                    shift={30}
                > {list} </Infinity>
            </ul>
        </div>
        )}


})