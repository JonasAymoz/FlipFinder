import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Header extends Component {

    render() {

        return (
            <header className="App-header">
                <Link to="/">  <h2 className="App-title">Flip Finder</h2></Link>
                <div className="headerLink">
                    <Link to="/list">  <span className="listLink"> List   | </span> </Link>
                    <Link to="/flippers">  <span className="addLink"> Ajouter </span> </Link>
                </div>

            </header>
        )}

}

export default Header;