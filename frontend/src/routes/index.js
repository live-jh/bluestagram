import React from "react";
import {Route} from "react-router-dom";
import AppLayout from "components/layouts/AppLayout";
import About from "pages/About";
import Home from "pages/Home";
import AccountRoutes from "pages/account";

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