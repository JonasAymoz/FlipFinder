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
        return <div className="p-3">
            <FlipperForm  onSubmit={this.onSubmit}/>

        </div>
    }

}

export default Flippers ;