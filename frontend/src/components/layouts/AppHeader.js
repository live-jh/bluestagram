import React from "react";
import {Input, Menu} from "antd";

const AppHeader = (props) => {
    return (
        <div className="app-header">
            <h1 className="page-title">BlueStagram</h1>
            <div className="search">
                <Input.Search placeholder={"Header Input"}/>
            </div>
            <div className="topnav">
              <Menu mode="horizontal">
                  <Menu.Item key={1}>Menu 1</Menu.Item>
                  <Menu.Item key={2}>Menu 2</Menu.Item>
                  <Menu.Item key={3}>Menu 3</Menu.Item>
              </Menu>
            </div>
        </div>
    );
}

export default AppHeader;