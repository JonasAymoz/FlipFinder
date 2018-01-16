// src/routes.js
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

import Flippers from "./pages/Flippers";
import Home from "./pages/Home";

const Routes = (props) => (
    <Router {...props}>
        <div>
            <Route path="/" exact component={Home} />
            <Route path="/flippers" component={Flippers} />
        </div>
    </Router>
);

export default Routes;