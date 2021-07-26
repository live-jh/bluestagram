import React from "react";
import {Avatar, Button} from "antd";

export default function Suggestion({suggestion_user}) {
    const {username, author_name, avatar_url} = suggestion_user;
    return (
        <div className="suggetion">
            <div className="avatar">
                <Avatar
                    size="small"
                    icon={
                    <img src={process.env.REACT_APP_API_URL + avatar_url} alt={author_name}/>
                }/>
                {/*<UserOutlined/>*/}
            </div>
            <div className="username">
                {username}
            </div>
            <div className="follow-btn">
                <Button size="small">Follow</Button>
            </div>
        </div>
    )
}