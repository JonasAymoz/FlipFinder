import React, { Component } from 'react';
import logo from './logo.svg';
import './css/style.css';
import Home from "./pages/Home";
import 'mapbox-gl/dist/mapbox-gl.css';
import Routes from "./routes";



class App extends Component {
  render() {
    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Flip Finder</h1>
        </header>
        <Routes/>
      </div>
    );
  }
}

export default App;
