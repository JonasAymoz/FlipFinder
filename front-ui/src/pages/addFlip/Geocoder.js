import { Component } from 'react';
import PropTypes from 'prop-types';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

class Geocoder extends Component {

    componentDidMount() {
        const { map } = this.context;

        map.addControl(
            new MapboxGeocoder({
                accessToken: 'pk.eyJ1IjoiamF5bW96IiwiYSI6ImNqODM2aHV4ajdmemgyd250YnVreHJvMnIifQ.11wkla2CzMuBfaQFn5gdZg'
            })
        );
    }

    render() {
        return null;
    }

    static contextTypes = {
        map: PropTypes.object.isRequired
    };
}

export default Geocoder;