import React from "react";
import {Avatar, Card} from "antd";
import {HeartOutlined, UserOutlined} from "@ant-design/icons";

const Post = ({post}) => {
    const {caption, photo, tag_set, like_uset_set, author} = post;
    const {author_name, username, avatar_url} = author;
    return (
        <div>
            <Card
                hoverable
                cover={<img src={photo} alt={caption}/>}
                actions={[<HeartOutlined/>]}
            >
                <Card.Meta
                    // avatar={<Avatar size="large" icon={<UserOutlined/>}/>}
                    avatar={
                        <Avatar size="large"
                                icon={
                                    <img src={process.env.REACT_APP_API_URL + avatar_url}
                                         alt={username}/>
                                }/>
                    }
                    title={caption} description={caption}/>
            </Card>
            {/*<img alt={caption} src={photo} style={{width: '400px'}}/>*/}
            {/*{caption}*/}
        </div>
    )
}

export default Post;