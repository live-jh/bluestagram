import React from "react";
import {Route, Redirect} from "react-router-dom";
import {useAppContext} from "../store";

export default function LoginRequiredRoute({component: Compontent, ...attributes}) {
    const {store: {is_authenticated}} = useAppContext();
    if (is_authenticated) {

    } else {

    }
    return (
        //render: route 렌더의 속성값 props
        <Route {...attributes} render={props => {
            if (is_authenticated) {
                return <Compontent {...props} />
            } else {
                //to: 이동 path, state: 임의의 객체를 전달 가능 (이전 페이지 던지기) props: {match, location 등)
                return <Redirect to={{pathname: "/account/login", state: {from: props.location}}} />
            }
        }}
        />
    )
}