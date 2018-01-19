import React, { Component } from 'react';

export var getCurrentLocation = (callback) => {
    //If brower supports HTML5 geoLocation
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition( function(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            callback(lat, lng);
        });
    }
    else {
        alert('This Browser doesn\'t support HTML5 geolocation');
    }
}




 export class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {lat: 0,
          lng : 0};
      }  
  
    componentWillMount() {
      this.getCurrentLocation();
    }

    getCurrentLocation = () => {
        //If brower supports HTML5 geoLocation
        if (navigator.geolocation) {
          
          navigator.geolocation.getCurrentPosition( (position) => { 
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            this.setState({
              'lat' : lat,
              'lng': lng});
            this.props.setLocation(lat, lng);
          });

        }
        else {
          alert('This Browser doesn\'t support HTML5 geolocation');
        }
      }  
    render() {
      return (
        <div>
        </div>
      );
    }
  }

