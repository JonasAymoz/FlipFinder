import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Header extends Component {

    render() {

        return (
            <header className="App-header">
                <div className="titleDiv"> <Link to="/">  <h2 className="App-title">Flip Finder</h2></Link></div>
                <div className="headerLink">

                    <Link to="/flippers" className="link">  <span className="addLink"> Ajouter </span> </Link>
                    <Link to="/contact" className="link">  <span className="listLink "> Contact </span> </Link>
                </div>

            </header>
        )}

}

export default Header;