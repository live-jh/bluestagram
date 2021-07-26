import React, {useEffect, useState} from "react";
import Axios from "axios";
import Post from "components/post/Post";
import {useAppContext} from "store";
import {Alert} from "antd";

const PostList = () => {
    const {store: {jwt_token}} = useAppContext();
    const [post_list, setPostList] = useState([]);

    useEffect(() => {
        const headers = {Authorization: `JWT ${jwt_token}`};
        Axios.get(`${process.env.REACT_APP_API_URL}/api/posts`, {
            headers: headers
        }).then(response => {
            const {data} = response;
            setPostList(data);
        }).catch(error => {
            console.log(error.response)
        });
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            {post_list.length > 0 ? post_list.map((post) => <Post key={post.id} post={post}/>) :
                <Alert type="warning" message="포스팅이 없습니다."/>}
        </div>
    )
}

export default PostList;