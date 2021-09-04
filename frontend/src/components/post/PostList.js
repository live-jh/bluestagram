import React, {useEffect} from "react";
// import Axios from "axios";
import Post from "components/post/Post";
import {useAppContext} from "store";
import useAxios from "axios-hooks";
import {Alert} from "antd";

const PostList = () => {
    const {store: {jwt_token}} = useAppContext();
    const headers = {Authorization: `JWT ${jwt_token}`};

    const [{data: post_list, loading, error}, refetch] = useAxios({
        url: `${process.env.REACT_APP_API_URL}/api/posts/`,
        headers: headers
    });

    // useEffect(() => {
        // Axios.get(`${process.env.REACT_APP_API_URL}/api/posts/`, {
        //     headers: headers
        // }).then(response => {
        //     const {data} = response;
        //     setPostList(data);
        // }).catch(error => {
        //     console.log(error.response)
        // });
        // eslint-disable-next-line
    // }, []);

    return (
        <div>
            {post_list ? post_list.map((post) => <Post key={post.id} post={post}/>) :
                <Alert type="warning" message="포스팅이 없습니다."/>}
        </div>
    )
}

export default PostList;