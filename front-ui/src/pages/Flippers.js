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
        var that = this;

    }

    render() {
        return <div>
            Hello this is flipper bean !
            <FlipperForm/>

        </div>
    }

}

export default Flippers ;