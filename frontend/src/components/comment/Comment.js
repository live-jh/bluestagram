import React from "react";
import {Avatar, Comment as AntdComment, Tooltip} from "antd";
import moment from "moment";

export default function Comment({comment}) {
    const {author: {username, author_name, avatar_url}, message, created_at} = comment;
    const display_name = author_name.length === 0 ? username : author_name;
    return (
        <AntdComment
            author={display_name}
            avatar={
                <Avatar
                    src={avatar_url}
                    alt={display_name}
                />
            }
            content={
                <p>{message}</p>
            }
            datetime={
                <Tooltip title={moment().format(created_at)}>
                    <span>{moment().fromNow()}</span>
                </Tooltip>
            }
        />
    )
}