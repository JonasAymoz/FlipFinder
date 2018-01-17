import React, { Component } from 'react';
import './css/style.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import Routes from "./routes";
import Header from "./components/Header";
import {BrowserRouter as Router} from 'react-router-dom'

class App extends Component {
  render() {
    return (

      <Router>
          <div className="App">
              <Header/>

              <div className="container">
                    <Routes/>
              </div>

              <div className="footer">
                  Da copyright
              </div>
          </div>
      </Router>

    );
  }
}

export default App;
