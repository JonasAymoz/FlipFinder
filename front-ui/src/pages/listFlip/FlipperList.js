import React, { Component } from 'react';


export class FlipperList extends Component {


  render() {
    return (
        <div>
            <h2>Ma liste de flip :</h2>
            <ul>
              {this.props.items.map(item => (
                <li key={item.id}><b>{item.flipName}</b> <small> au {item.placeName} </small></li>
              ))}
            </ul>
        </div>
    );
  }
}

export default FlipperList;