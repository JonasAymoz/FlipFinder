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
            height: 0,
        };

    }

    componentDidMount() {
        FlipperWs.getFlippers().then(response => {
            // console.log(response.data);
            this.setState({'items' : response.data});
        });
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ height: window.innerHeight, clientHeight : document.documentElement.clientHeight });
    }

    onSelect = (searchRes) => {
        console.log(searchRes);
        this.setState({
            lng : searchRes.geometry.coordinates[0],
            lat: searchRes.geometry.coordinates[1],
            address : searchRes.address + ' ' + searchRes.text,
            postalCode : searchRes.context[0].text,
            city :searchRes.context[1] ? searchRes.context[1].text : searchRes.context[0].text  ,
            zoom: [12]
        });
        console.log('Résultat: ' + searchRes.text + '  // coord : ' + searchRes.geometry.coordinates );
        //todo :  geocode:
    }

    openFlipper = (flip, e) => {
        //const { map } = this.state;
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

    desactivateFlipper = (flip, e) => {
        FlipperWs.desactivateFlipper(flip.id).then(response => {
        // console.log(response.data);
            this.openFlipper(flip);
            this.setState({'items' : response.data});
        });

    }



    //todo click on marker avec hover / cursor pointer

    render() {
        const { lng, lat, zoom, items } = this.state;

        return (
            <div className='homeScreen' style={{'height' : (this.state.clientHeight - 40)+"px"}}>
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
                    />}
                    </div>
                    <Layer
                        type="symbol"
                        id="someId"
                        layout={{ 'icon-image': 'flipMarker2' }}>
                        {
                            items.filter(k => k.active ==="OK").map(k => (
                                <Feature
                                    onClick={(e) => this.openFlipper(k, e)}
                                    coordinates={[k.lng, k.lat]}
                                    key={k.id}
                                />
                            ))
                        }
                    </Layer>
                </Map>
                <FlipperCard flip={this.state.flip} isOpen={this.state.isOpen} closeFunction={this.openFlipper} desactivateFlipper={this.desactivateFlipper}/>

            </div>
        );
    }
}

export default Home;

/* TODO

constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
}

componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
}

componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
}

updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
}

*/