import React, { Component } from 'react';
import Location from "../services/geolocation";
import FlipperWs from "../services/FlipperWs";
import FlipperList from "./FlipperList";

class FlipperForm extends Component {


    constructor(props) {
        super(props);
        document.title = 'Ajoute un flipper';
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {items: [], text: ''};
    }
    componentDidMount(){
        FlipperWs.getFlippers().then(response => {
            console.log(response.data);
            this.setState({'items' : response.data});
        })
    }

    render() {
        return (
            <div>
                <h3>Les flippers de Panam</h3>
                <form onSubmit={this.handleSubmit}>
                    <label> Nom du flip </label><br/>
                    <input onChange={this.handleChange} name="flipName" value={this.state.flipName} /><br/>

                    <label> Nom du bar </label><br/>
                    <input onChange={this.handleChange} name="placeName" value={this.state.placeName} /><br/>

                    <label> Adresse</label><br/>
                    <input onChange={this.handleChange} name="address" value={this.state.address} /><br/>

                    <label> Code Postal</label><br/>
                    <input onChange={this.handleChange} name="postalCode" value={this.state.postalCode} /><br/>

                    <label> Ville</label><br/>
                    <input onChange={this.handleChange} name="city" value={this.state.city} /><br/>

                    <label> Horaires</label><br/>
                    <input onChange={this.handleChange} name="schedule" value={this.state.schedule} /><br/>

                    <label> Parties pour 1€</label><br/>
                    <input onChange={this.handleChange} name="price1" value={this.state.price1} /><br/>

                    <label> Parties pour 2€</label><br/>
                    <input onChange={this.handleChange} name="price2" value={this.state.price2} /><br/>

                    <label> Missions </label><br/>
                    <input onChange={this.handleChange} name="missions" value={this.state.missions} /><br/>

                    <button className="btn btn-primary">Ajoute ce flip !</button>
                </form>
                    <Location  setLocation={this.setLocation} />
                <div>Latitude form: <span>{this.state.lat}</span></div>
                <div>Longitude form: <span>{this.state.lng}</span></div>
                <FlipperList items={this.state.items} />
            </div>
        );
    }


    setLocation = (lat, lng) => {
        this.setState({
            lat : lat,
            lng : lng
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
        };
        this.setState((prevState) => ({
            items: prevState.items.concat(newItem),
            text: ''
        }));
        FlipperWs.add(newItem);
    }

}

export default FlipperForm ;