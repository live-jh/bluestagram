import React from "react";
import {Route} from "react-router-dom";
import AppLayout from "components/layouts/AppLayout";
import About from "./About";
import Home from "./Home";
import AccountRoutes from "./account";

const Root = (props) => {
    return (
        <AppLayout>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/account" component={AccountRoutes}/>
        </AppLayout>
    )
}

export default Root;