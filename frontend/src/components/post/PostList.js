import React, {useEffect, useState} from "react";
// import Axios from "axios";
// import useAxios from "axios-hooks";
import {axiosInstance, useAxios} from "api";
import {useAppContext} from "store";
import Post from "components/post/Post";
import {Alert} from "antd";

const PostList = () => {
    const {store: {jwt_token}} = useAppContext();
    const headers = {Authorization: `JWT ${jwt_token}`};
    const [post_list, setPostList] = useState();

    const [{data: origin_post_list, loading, error}, refetch] = useAxios({
        url: "/api/posts/",
        headers: headers
    });

    //refetch 사용시 작성 안해도 됌
    useEffect(() => {
        setPostList(origin_post_list);
    }, [origin_post_list])


    const handlePostLike = async ({post, is_like}) => {
        const api_url = `/api/posts/${post.id}/like/`;
        const method = is_like ? "POST" : "DELETE";
        try {
            const response = await axiosInstance({url: api_url, method, headers}); //예외 post or delete때문에 method 분리
            console.log(response);
            // refetch(); #refetch로 아래 코드를 대체할 수 있음 재호출
            setPostList(prevState => {
                return prevState.map((current_post) => current_post === post ? {
                    ...current_post,
                    is_like: is_like
                } : current_post)
            })
        } catch (error) {
            console.log(error);
        }
    }
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
            {post_list ? post_list.map((post) => <Post key={post.id} post={post} handlePostLike={handlePostLike}/>) :
                <Alert type="warning" message="포스팅이 없습니다."/>}
        </div>
    )
}

export default PostList;