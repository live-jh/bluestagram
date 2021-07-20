import React from "react";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import "assets/AppLayout.scss";
import SideBar from "./SideBar";

const AppLayout = ({children}) => {
    return (
        <>
            <div className="app">
                <AppHeader/>
                <SideBar/>
                <div className="contents">{children}</div>
                <AppFooter/>
            </div>
        </>
    );
}

export default AppLayout;