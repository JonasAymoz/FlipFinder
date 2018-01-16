import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import accessToken from '../config';

var token = accessToken;
mapboxgl.accessToken = 'pk.eyJ1IjoiamF5bW96IiwiYSI6ImNqODM2aHV4ajdmemgyd250YnVreHJvMnIifQ.11wkla2CzMuBfaQFn5gdZg';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lat: 44.812171799999994,
            lng: -0.5566673,
            zoom: 12
        };

    }

    componentDidMount() {
        const { lng, lat, zoom } = this.state;

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [lng, lat],
            zoom
        });

        map.on('move', () => {
            const { lng, lat } = map.getCenter();

            this.setState({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });
    }

    render() {
        const { lng, lat, zoom } = this.state;

        return (
            <div>
                <div className="inline-block top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
                    <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
                </div>
                <div ref={el => this.mapContainer = el} className="map" />
            </div>
        );
    }
}

export default Home;