// src/routes.js
import React from 'react';
import {
    Route,
} from 'react-router-dom'

import Flippers from "./pages/addFlip/Flippers";
import Home from "./pages/Home/Home";
import List from "./pages/listFlip/list";

const Routes = (props) => (

        <div className="content">
            <Route path="/" exact component={Home} />
            <Route path="/flippers" component={Flippers} />
            <Route path="/list" component={List} />
        </div>
);

export default Routes;