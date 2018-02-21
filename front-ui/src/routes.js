// src/routes.js
import React from 'react';
import {
    Route,
} from 'react-router-dom'

import Flippers from "./pages/addFlip/Flippers";
import Home from "./pages/Home/Home";
import List from "./pages/listFlip/list";
import NotFound from "./components/NotFound";
import Switch from "react-router-dom/es/Switch";

const Routes = (props) => (

        <div className="content">
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/flippers" component={Flippers} />
                <Route path="/list" component={List} />
                <Route component={NotFound} />
            </Switch>
        </div>
);

export default Routes;