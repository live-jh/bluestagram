import React from "react";
import {Route} from "react-router-dom";
import About from "pages/About";
import Home from "pages/Home";
import PostNew from "pages/PostNew";
import AccountRoutes from "pages/account";
import LoginRequiredRoute from "../utils/LoginRequiredRoute";

const Root = (props) => {
    return (
        <>
            {/*로그인을 확인해야하는 route를 쓸때는 loginRequired로 사용하기*/}
            <LoginRequiredRoute exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <LoginRequiredRoute exact path="/post/new" component={PostNew}/>
            <Route path="/account" component={AccountRoutes}/>
        </>
    )
}

export default Root;