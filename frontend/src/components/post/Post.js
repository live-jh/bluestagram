import React from "react";
import {Avatar, Card, Comment} from "antd";
import {HeartOutlined, HeartTwoTone, UserOutlined} from "@ant-design/icons";
import CommentList from "components/comment/CommentList";

const Post = ({post, handlePostLike}) => {
    const {caption, photo, tag_set, author, is_like} = post;
    const {author_name, username, avatar_url} = author;

    return (
        <div>
            <Card
                hoverable
                cover={<img src={photo} alt={caption}/>}
                actions={[
                    (is_like ?
                        <HeartTwoTone twoToneColor="#eb2f96" onClick={() => handlePostLike({post, is_like: false})}/> :
                        <HeartOutlined onClick={() => handlePostLike({post, is_like: true})}/>)
                ]}
            >
                <Card.Meta
                    // avatar={<Avatar size="large" icon={<UserOutlined/>}/>}
                    avatar={
                        <Avatar size="large"
                                icon={
                                    <img src={avatar_url}
                                         alt={username}/>
                                }/>
                    }
                    title={caption}
                    description={caption}
                    style={{marginBottom: '0.5em'}}
                />
            <CommentList post={post}/>
            </Card>
        </div>
    )
}

export default Post;