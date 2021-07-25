import React from "react";
import {Route} from "react-router-dom";
import Profile from "./Profile";
import Login from "./Login";
import ExampleSignUp from "./ExampleSignUp";
import SignUp from "./SignUp";

const Routes = ({match}) => {
    return (
        <>
            <Route exact path={`${match.url}/profile`} component={Profile}/>
            <Route exact path={`${match.url}/login`} component={Login}/>
            <Route exact path={`${match.url}/signup`} component={SignUp}/>
        </>
    )
}

export default Routes;