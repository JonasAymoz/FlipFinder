import React, { Component } from 'react';
import {getCurrentLocation} from "../../services/geolocation";
import FlipperWs from "../../services/FlipperWs";
import InputText from "../../components/inputText";
import MapboxClient from 'mapbox';
import Geocode from "../../components/Autocomplete";
import Autocomplete from 'react-autocomplete';
import InputNumber from "../../components/InputNumber";
import {withRouter} from "react-router-dom";

class FlipperForm extends Component {


    constructor(props) {
        super(props);
        document.title = 'Ajoute un flipper';
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {items: [],
            flipModels : [],
            text: '',
            flipName : '',
            client : new MapboxClient('pk.eyJ1IjoiamF5bW96IiwiYSI6ImNqY2h2cHh0bTI3N3kyd28yNDVyNmZxYTEifQ.R0SDBN2Vc924YYjQYPh4Qw'),
            lat : '',
            lng :'',
            value: '',
            address: '',
            city : '',
            postalCode : '',
            gpsBtnText: 'Utiliser mon emplacement GPS',
            price1 : 1,
            price2 : 2,
            formSubmitted : false,
            formValid: true,
            invalidFlipName : false,
            invalidPlaceName : false,
            invalidAddress : false,
            invalidCity : false,
            invalidPostalCode : false,

        };
    }
    componentDidMount(){
        FlipperWs.getFlippers().then(response => {
            console.log(response.data);
            this.setState({'items' : response.data});
        });
        FlipperWs.getFlipModels().then(response =>{
            this.setState({'flipModels' : response.data});
        })
    }

    onSelect = (searchRes) => {
        this.setState({
            lng : searchRes.geometry.coordinates[0],
            lat: searchRes.geometry.coordinates[1],
            address : searchRes.address + ' ' + searchRes.text,
            postalCode : searchRes.context[0].text,
            city :searchRes.context[1].text,
        });
        console.log('Résultat: ' + searchRes.text + '  // coord : ' + searchRes.geometry.coordinates );
        //todo :  geocode:
    }

    getAdress = (address) => {
        return this.state.client.geocodeForward(address, {})
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
    };

    setLocation = () => {
        this.setState({
            gpsBtnText: 'Localisation...'

        });
        getCurrentLocation( (lat, lng) => {
            this.setState({
                lat : lat,
                lng : lng,
                gpsBtnText: 'Succès!'
            }, () => {
                this.getAdressReverse(this.state.lat , this.state.lng)
            });
        })
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    handleAddressChange = (value) => {
        this.setState({'address': value});
    }

    handleImageChange = (data) => {
        console.log(data.file);
        this.setState({image: data.file});
    }

    verifyNotNull (value, name) {
        if (!value){
            console.log('Erreur dans le champ : ' + name);
            this.setState({ [name] : !value, formValid : false}, function(){return false;});
        }
    }

    validateCityOrPostalCode = (value) => {
       if (!/^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/.test(value)){
           this.setState({ invalidPostalCode : true, formValid : false});
       }
    }

    validateForm = (callback) => {
        var that = this;
        this.verifyNotNull( this.state.flipName, "invalidFlipName");
        this.verifyNotNull( this.state.placeName, "invalidPlaceName");
        this.verifyNotNull( this.state.postalCode, "invalidPostalCode");
        this.verifyNotNull( this.state.city, "invalidCity");
        this.validateCityOrPostalCode(this.state.postalCode);


        // Adress validation
        if (!this.state.lng && !this.state.lat) {
            this.getAdress(this.state.address + ', ' + this.state.city).then(function(res) {
                // res is the http response, including: status, headers and entity properties
                var data = res.entity; // data is the geocoding result as parsed JSON
                if (data.features && data.features[0]) {
                    that.setState({
                        address: data.features[0].address + ' ' + data.features[0].text,
                        postalCode: data.features[0].context[0].text,
                        city: data.features[0].context[1].text,
                        lat: data.features[0].center[1],
                        lng: data.features[0].center[0],
                        formvalid : true
                    })
                } else {
                    that.setState({ 'invalidAddress' : true, formValid : false },  callback());
                }
            })
            .catch(function(err) {
                console.log(err);
                that.setState({ 'invalidAddress' : true, formValid : false },  callback());
            });
        }
        else  {
            that.setState({formValid : true },  callback());
        }


    }


    handleSubmit(e) {
        e.preventDefault();
        //prevent re-submit
        if (!this.state.formSubmitted) {
            //validate
            this.validateForm(() => {

                if (this.state.formValid) {
                    var newItem = {
                        id: null,
                        flipName: this.state.flipName,
                        placeName: this.state.placeName,
                        address: this.state.address,
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
                        text: '',
                        formSubmitted: true
                    }));
                    FlipperWs.add(newItem);
                    var that = this;
                    setTimeout( ()=> {that.props.history.push("/")}, 1000)
                }
            })
        }
    }

    // Render du input d'autocomplete
    renderInput = (props) => {
        const { ref, ...rest } = props;
        return <InputText {...rest} innerRef={ref} id="flipName" label="Nom du flipper" placeHolder="nom" name="flipName" isValid={this.state.invalidFlipName} errorMsg="Veuillez renseigner un nom de flipper"
        />
    }

    setValue= (obj) =>{
        this.setState(obj);
    }



    // todo Add l'ajout d'une photo via le téléphone

    render() {
        return (
            <div className="p-3 w-100 addFlipper">
                <h3 className="title">Ajoute un flipper</h3>
                <form onSubmit={this.handleSubmit} className="addFlipForm container-fluid ">

                    <Autocomplete
                        getItemValue={(item) => item.name}
                        open={true}
                        items= {this.state.flipModels}
                        wrapperStyle={{display: 'inherit' }}
                        renderItem={(item, isHighlighted) =>
                            <div className={(isHighlighted ? 'highlighted ' : '' ) + " itemAutocomplete"}>
                               {item.name}
                            </div>
                        }
                        shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
                        value={this.state.flipName}
                        onSelect={(val) =>
                            this.setState({flipName :   val})}
                        onChange={(e) => this.setState({ flipName: e.target.value })}

                        renderInput={(props) => this.renderInput(props)}
                        renderMenu={(items, value) => (

                             <div className="menuAutocomplete offset-md-2 col-9">
                                {value === '' ? (
                                    <div className=""></div>
                                ) : this.state.loading ? (
                                    <div className="item">Loading...</div>
                                ) : items.length === 0 ? (
                                    <div className="item">Pas de résultat pour {value}, ajoutez le !</div>
                                ) : items.map((item) => {
                                    return item
                                })}
                            </div>
                        )}
                    />

                    <InputText id="placeName" label="Nom du lieu " placeHolder="lieu" name="placeName"
                               value={this.state.placeName}
                               onChange={this.handleChange}
                               isValid={this.state.invalidPlaceName}
                               errorMsg="Veuillez renseigner un nom de lieu"/>

                    <hr/>
                    <fieldset>
                        <legend>Adresse
                            {false && <div className=" gpsBtn">
                                <button type="button" className={ (this.state.lng === 'load'? 'btn-loading ' : '') + 'btn btn-primary text-right' }
                                        onClick={()=>this.setLocation()}> {this.state.gpsBtnText}
                                </button>
                            </div> }
                        </legend>

                        <Geocode
                            accessToken='pk.eyJ1IjoiamF5bW96IiwiYSI6ImNqY2h2cHh0bTI3N3kyd28yNDVyNmZxYTEifQ.R0SDBN2Vc924YYjQYPh4Qw'
                            onSelect={(res)=> this.onSelect(res) }
                            types={'address'}
                            defaultInputValue={this.state.address}
                            resultsClass="offset-sm-2 col-sm-10"
                            onInputChange={this.handleAddressChange}
                            resultFocusClass="onFocusAddress"
                            resultClass="addressResult"
                        />

                        {this.state.invalidAddress && <div className="row"> <div className="offset-sm-2 col-sm-10 errorField"> Adresse incorrecte </div></div>}
                        <InputText label="Code Postal" placeHolder="postalCode" name="postalCode"
                                   value={this.state.postalCode}
                                   onChange={this.handleChange}
                                   isValid={this.state.invalidPostalCode}
                                   errorMsg="Veuillez renseigner un code postal valide"/>

                        <InputText label="Ville" placeHolder="city" name="city"
                                   value={this.state.city}
                                   onChange={this.handleChange}
                                   isValid={this.state.invalidCity}
                                   errorMsg="Veuillez renseigner un nom de ville"/>

                    </fieldset>

                    <fieldset>
                        <legend>Infos</legend>

                        <div className="row">
                            <div className="offset-md-2 col-sm d-flex justify-content-center align-content-center">
                                <h3 className="d-flex align-self-center ">1€ = </h3>
                                <h3>
                                    <InputNumber valueNumber={this.state.price1} name='price1' setValue={this.setValue}/>
                                </h3>
                                <h3 className="d-flex align-self-center">parties</h3>
                            </div>
                            <div className="col-sm d-flex justify-content-center">
                                <h3 className="d-flex align-self-center ">2€ = </h3>
                                <h3>
                                    <InputNumber valueNumber={this.state.price2} name='price2' setValue={this.setValue}/>
                                </h3>
                                <h3 className="d-flex align-self-center">parties</h3>
                            </div>
                        </div>
                        <InputText label="Missions" placeHolder="missions" name="missions"
                                   value={this.state.missions}
                                   onChange={this.handleChange}/>

                        <InputText label="Horaires du lieu" placeHolder="schedule" name="schedule"
                                   value={this.state.schedule}
                                   onChange={this.handleChange}/>
                    </fieldset>


                    <div className="text-center">
                        <button type='submit' className={(this.state.formSubmitted ? 'clicked ' : ' ') + "btn btn-primary text-right btn-bordered"}>

                            {this.state.formSubmitted ? <div><span> C'est partit </span><span className="loader__dot">.</span><span className="loader__dot">.</span><span className="loader__dot">.</span></div> : 'Ajoute ce flip !'}
                        </button>
                    </div>
                </form>


            </div>
        );
    }



}

export default withRouter(FlipperForm) ;