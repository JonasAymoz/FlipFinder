import React, { Component } from 'react';


export class FlipperList extends Component {


  render() {
    return (
        <div>
          Ma liste de flip :
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