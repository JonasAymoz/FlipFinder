import React, { Component } from 'react';
import FlipperWs from "../../services/FlipperWs";
import FlipperList from "./FlipperList";

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            flippers: [],
        };
    }

    componentDidMount(){
        FlipperWs.getFlippers().then(response => {
            console.log(response.data);
            this.setState({'flippers' : response.data});
        });

    }

    render() {
        return <div>
            <FlipperList items={this.state.flippers} />
        </div>
    }

}

export default List ;