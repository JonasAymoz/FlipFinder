import React, { Component } from 'react';
import FlipperForm from "./FlipperForm";

class Flippers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            flippers: [],
        };
    }

    componentDidMount = () => {

    }




    render() {
        return <FlipperForm  onSubmit={this.onSubmit}/>
    }

}

export default Flippers ;