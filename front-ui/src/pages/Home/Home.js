import React from 'react';
import ReactMapboxGl, {Layer, Feature} from "react-mapbox-gl";
import FlipperWs from "../../services/FlipperWs";
import Geocode from "../../components/Autocomplete";
import FlipperCard from "../../components/FlipperCard";

const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoiamF5bW96IiwiYSI6ImNqY2h2cHh0bTI3N3kyd28yNDVyNmZxYTEifQ.R0SDBN2Vc924YYjQYPh4Qw",

});



class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lat: 44.812171799999994,
            lng: -0.5566673,
            zoom: [12],
            items : [],
            isOpen : false,
            wideOpen : false,
            flip : {},
            showResearchBar : true,
        };

    }

    componentDidMount() {
        FlipperWs.getFlippers().then(response => {
            console.log(response.data);
            this.setState({'items' : response.data});
        })


    }

    onSelect = (searchRes) => {
        this.setState({
            lng : searchRes.geometry.coordinates[0],
            lat: searchRes.geometry.coordinates[1],
            address : searchRes.address + ' ' + searchRes.text,
            postalCode : searchRes.context[0].text,
            city :searchRes.context[1].text,
            zoom: [12]
        });
        console.log('Résultat: ' + searchRes.text + '  // coord : ' + searchRes.geometry.coordinates );
        //todo :  geocode:
    }

    openFlipper = (flip, e) => {
        const { map } = this.state;
        //e.originalEvent.preventDefault();
        console.log('-> click flip ' + flip.flipName);
        this.setState(prevState => ({
            flip : flip,
            isOpen : (prevState.flip.id === flip.id)? !prevState.isOpen : true,
            lat : flip.lat,
            lng :flip.lng,
            showResearchBar : (prevState.flip.id === flip.id)? !prevState.showResearchBar : false,
        }));




    }

    onStyleLoad = (map) => {
        this.setState({
            map
        });
    };


    //todo click on marker avec hover / cursor pointer

    render() {
        const { lng, lat, zoom, items } = this.state;

        return (
            <div className='homeScreen'>
                <Map style="mapbox://styles/jaymoz/cjchxjfwu7nhw2rk9emmti7j8?optimize=true"
                     center={[lng, lat]}
                     zoom={zoom}
                     containerStyle={{ }}
                     onStyleLoad={this.onStyleLoad}
                     >
                    <div className="searchMap container">
                        {this.state.showResearchBar && <Geocode
                        accessToken='pk.eyJ1IjoiamF5bW96IiwiYSI6ImNqY2h2cHh0bTI3N3kyd28yNDVyNmZxYTEifQ.R0SDBN2Vc924YYjQYPh4Qw'
                        onSelect={(res)=> this.onSelect(res) }
                        types={'address,place'}
                        noLabel={true}
                        resultsClass={'homeResultList'}
                        inputPlaceholder={'Recherche un lieu pour flipper'}
                    ></Geocode>}
                    </div>
                    <Layer
                        type="symbol"
                        id="someId"
                        layout={{ 'icon-image': 'flipMarker2' }}>
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
                </Map>
                <FlipperCard flip={this.state.flip} isOpen={this.state.isOpen} closeFunction={this.openFlipper}/>

            </div>
        );
    }
}

export default Home;