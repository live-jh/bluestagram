import React from "react";
import {UserOutlined} from "@ant-design/icons";
import {Button} from "antd";

export default function Suggestion() {
    return (
        <div className="suggetion">
            <div className="avatar">
                <UserOutlined/>
            </div>
            <div className="username">
                UserName
            </div>
            <div className="follow-btn">
                <Button size="small">Follow</Button>
            </div>
        </div>
    )
}