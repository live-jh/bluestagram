import React from "react";
import {Input} from "antd";

const AppHeader = (props) => {
    return (
        <div className="app-header">
            <h1>BlueStagram</h1>
            <Input.Search placeholder={"Header Input"}/>
        </div>
    );
}

export default AppHeader;