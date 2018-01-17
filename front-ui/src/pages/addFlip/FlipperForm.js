import React, { Component } from 'react';
import Location from "../../services/geolocation";
import FlipperWs from "../../services/FlipperWs";
import FlipperList from "../listFlip/FlipperList";
import InputText from "../../components/inputText";
import MapboxClient from 'mapbox';

class FlipperForm extends Component {



    constructor(props) {
        super(props);
        document.title = 'Ajoute un flipper';
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {items: [],
            text: '',
            flipName : '',
            client : new MapboxClient('pk.eyJ1IjoiamF5bW96IiwiYSI6ImNqY2h2cHh0bTI3N3kyd28yNDVyNmZxYTEifQ.R0SDBN2Vc924YYjQYPh4Qw'),
            lat : 'loading..',
            lng :'loading..',
        };
    }
    componentDidMount(){
        FlipperWs.getFlippers().then(response => {
            console.log(response.data);
            this.setState({'items' : response.data});
        });

    }

    onSelect = (value) => {
        this.setState({ value: value });
    }

    getAdress = (coord) => {
        var that = this;
        this.state.client.geocodeForward('Chester, NJ', {})
            .then(function(res) {
                // res is the http response, including: status, headers and entity properties
                var data = res.entity; // data is the geocoding result as parsed JSON
                console.log(data);
                that.setState({
                    geocode : data
                })
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    getAdressReverse = (lat, lng) => {
        var that = this;
        this.state.client.geocodeReverse(
            { 'latitude': lat, 'longitude': lng },{ 'options': { types: 'address', limit: 2, language : 'FR' }})
            .then(function(res) {
                // res is the http response, including: status, headers and entity properties
                var data = res.entity; // data is the geocoding result as parsed JSON
                console.log(data);
                that.setState({
                    address : data.features[0].address + ' '+ data.features[0].text,
                    postalCode : data.features[0].context[0].text,
                    city :data.features[0].context[1].text,
                })
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    // todo Add l'ajout d'une photo via le téléphone

    render() {
        return (
            <div>
                <h3>Ajoute un flipper</h3>
                <form onSubmit={this.handleSubmit}>

                    <InputText id="flipName" label="Nom du flipper" placeHolder="nom" name="flipName"
                               value={this.state.flipName}
                               onChange={this.handleChange}/>


                    <InputText id="placeName" label="Nom du bar " placeHolder="lieu" name="placeName"
                               value={this.state.placeName}
                               onChange={this.handleChange}/>

                    <InputText label="Adresse" placeHolder="address" name="address"
                               value={this.state.address}
                               onChange={this.handleChange}/>

                    <InputText label="Code Postal" placeHolder="postalCode" name="postalCode"
                               value={this.state.postalCode}
                               onChange={this.handleChange}/>

                    <InputText label="Ville" placeHolder="city" name="city"
                               value={this.state.city}
                               onChange={this.handleChange}/>

                    <InputText label="Horaires" placeHolder="schedule" name="schedule"
                               value={this.state.schedule}
                               onChange={this.handleChange}/>
                    <div className="row">
                        <div className="offset-md-2 col">
                            <InputText label="Parties pour 1€" placeHolder="price1" name="price1"
                                   value={this.state.price1}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className="col">
                        <InputText label="Parties pour 2€" placeHolder="price2" name="price2"
                                   value={this.state.price2}
                                   onChange={this.handleChange}/>
                        </div>
                    </div>
                    <InputText label="Missions" placeHolder="missions" name="missions"
                               value={this.state.missions}
                               onChange={this.handleChange}/>


                    <div className="text-right">
                        <button className="btn btn-primary text-right">Ajoute ce flip !</button>
                    </div>
                </form>

                <hr/>
                <Location  setLocation={this.setLocation} />
                <div>Latitude : <span>{this.state.lat}</span></div>
                <div>Longitude : <span>{this.state.lng}</span></div>


            </div>
        );
    }


    setLocation = (lat, lng) => {
        this.setState({
            lat : lat,
            lng : lng
        }, () => {
            this.getAdressReverse(this.state.lat , this.state.lng)
        });

    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleImageChange = (data) => {
        console.log(data.file);
        this.setState({image: data.file});
    }

    handleSubmit(e) {
        e.preventDefault();
        var newItem = {
            id: null,
            flipName: this.state.flipName,
            placeName: this.state.placeName,
            address:this.state.address,
            postalCode: this.state.postalCode,
            city: this.state.city,
            schedule: this.state.schedule,
            price1: this.state.price1,
            price2: this.state.price2,
            missions: this.state.missions,
            lat: this.state.lat,
            lng: this.state.lng
        };
        this.setState((prevState) => ({
            items: prevState.items.concat(newItem),
            text: ''
        }));
        FlipperWs.add(newItem);
    }

}

export default FlipperForm ;