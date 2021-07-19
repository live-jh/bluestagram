import React from "react";

const Post = ({post}) => {
    const {caption, photo} = post;
    return (
        <div>
            <div><img alt={caption} src={photo} style={{width: '400px'}}/></div>
            <div>{caption}</div>
        </div>
    )
}

export default Post;