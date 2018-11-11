import React from 'react';
import ReactMapboxGl, {Layer, Feature} from "react-mapbox-gl";
import FlipperWs from "../../services/FlipperWs";
import Geocode from "../../components/Autocomplete";

export default class HomeMap extends React.Component {




    render() {
        const { lng, lat, zoom, items } = this.state;
        const Map = ReactMapboxGl({
            accessToken: "pk.eyJ1IjoiamF5bW96IiwiYSI6ImNqY2h2cHh0bTI3N3kyd28yNDVyNmZxYTEifQ.R0SDBN2Vc924YYjQYPh4Qw",

        });

        return (
            <Map style="mapbox://styles/jaymoz/cjchxjfwu7nhw2rk9emmti7j8?optimize=true" center={[lng, lat]} zoom={zoom} containerStyle={{ width: '100%', height: '100%'}}>
                <div className="searchMap container">
                    <Geocode
                        accessToken='pk.eyJ1IjoiamF5bW96IiwiYSI6ImNqY2h2cHh0bTI3N3kyd28yNDVyNmZxYTEifQ.R0SDBN2Vc924YYjQYPh4Qw'
                        onSelect={(res)=> this.onSelect(res) }
                        types={'address,place'}
                        noLabel={true}
                        resultsClass={'homeResultList'}
                    ></Geocode>
                </div>
                <Layer
                    type="symbol"
                    id="someId"
                    layout={{ 'icon-image': 'flipMarker3' }}>
                    {
                        items.map(k => (
                            <Feature
                                onClick={(e) => this.openFlipper(k, e)}
                                coordinates={[k.lng, k.lat]}
                                key={k.id}
                            />
                        ))
                    }
                </Layer>
                <div className='flipDetails'>
                    yo this is a flipper : {this.state.flip.flipName}
                </div>

            </Map>
        );
    }


}