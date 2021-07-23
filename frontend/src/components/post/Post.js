import React from "react";
import {Avatar, Card} from "antd";
import {HeartOutlined, UserOutlined} from "@ant-design/icons";

const Post = ({post}) => {
    const {caption, photo} = post;
    return (
        <div>
            <Card
                hoverable
                cover={<img src={photo} alt={caption}/>}
                actions={[<HeartOutlined/>]}
            >
                <Card.Meta
                    avatar={<Avatar size="large" icon={<UserOutlined/>}/>}
                    title={caption} description={caption}/>
            </Card>
            {/*<img alt={caption} src={photo} style={{width: '400px'}}/>*/}
            {/*{caption}*/}
        </div>
    )
}

export default Post;