import React, { Component } from 'react';
import './css/style.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import Routes from "./routes";
import Header from "./components/Header";
import {BrowserRouter as Router} from 'react-router-dom'

class App extends Component {


    constructor(props) {
        super(props);
        this.state = {isLoading: true}
    }

    componentDidMount() { this.setState ({isLoading: false})}

  render() {
    return (
        this.state.isLoading?
            <div style={{'background' : 'red'}}> yoyololodeldeo </div> :
      <Router>
          <div className="App">
              <Header/>

              <div className="container funkyBg">
                    <Routes/>
              </div>

              <div className="footer">
                  Flip Finder 2018 ©
              </div>
          </div>
      </Router>

    );
  }
}

export default App;
