import React from 'react';
import ReactMapboxGl, {Layer, Feature} from "react-mapbox-gl";
import FlipperWs from "../services/FlipperWs";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lat: 44.812171799999994,
            lng: -0.5566673,
            zoom: [12],
            items : [],
        };

    }

    componentDidMount() {
        FlipperWs.getFlippers().then(response => {
            console.log(response.data);
            this.setState({'items' : response.data});
        })

    }

    render() {
        const { lng, lat, zoom, items } = this.state;
        const Map = ReactMapboxGl({
            accessToken: "pk.eyJ1IjoiamF5bW96IiwiYSI6ImNqY2h2cHh0bTI3N3kyd28yNDVyNmZxYTEifQ.R0SDBN2Vc924YYjQYPh4Qw",

        });

        return (
            <div>
                <Map style="mapbox://styles/jaymoz/cjchxjfwu7nhw2rk9emmti7j8" center={[lng, lat]} zoom={zoom} containerStyle={{ width: '100vw', height: '100vh'}}>

                    <Layer
                        type="symbol"
                        id="someId"
                        layout={{ 'icon-image': 'flipMarker2' }}>
                        {
                            items.map(k => (
                                <Feature
                                    onClick={console.log('-> click marker ' + k.lng + "  nom" + k.flipName)}
                                    coordinates={[k.lng, k.lat]}
                                    key={k.id}
                                />
                            ))
                        }
                    </Layer>

                </Map>
            </div>
        );
    }
}

export default Home;