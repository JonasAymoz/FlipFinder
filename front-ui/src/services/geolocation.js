import React, { Component } from 'react';




  class Location extends Component {
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
          <h3>Ma Position : </h3>
          <div>Latitude: <span>{this.state.lat}</span></div>
          <div>Longitude: <span>{this.state.lng}</span></div>
        </div>
      );
    }
  }

export default Location; 