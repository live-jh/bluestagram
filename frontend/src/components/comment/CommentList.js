import React, {useState} from "react";
import {Button, Input} from "antd";
import {useAppContext} from "store";
// import useAxios from "axios-hooks";
// import Axios from "axios";
import {axiosInstance, useAxios} from "api";
import Comment from "./Comment";

export default function CommentList({post}) {
    const {store: {jwt_token}} = useAppContext();
    const headers = {Authorization: `JWT ${jwt_token}`};
    const [commentContent, setCommentContent] = useState("");

    const [{data: comment_list, loading, error}, refetch] = useAxios({
        url: `/api/posts/${post.id}/comments/`,
        headers: headers
    });

    const handleCommentSave = async () => {
        setCommentContent("");
        // const api_url = `${process.env.REACT_APP_API_URL}/api/posts/${post.id}/comments/`; // before(Axios)
        const api_url = `/api/posts/${post.id}/comments/`; // after(axiosInstance)
        try {
            const response = await axiosInstance.post(
                api_url,
                {
                    message: commentContent
                },
                // {headers}
            )
            if (response.status === 201) setCommentContent(""); refetch();
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            {comment_list && comment_list.map(comment =>
                <Comment key={comment.id} comment={comment}/>
            )}
            <Input.TextArea
                style={{marginBottom: ".5em"}}
                value={commentContent}
                onChange={e => setCommentContent(e.target.value)}
            />
            <Button
                disabled={commentContent.length === 0}
                block
                type="primary"
                onClick={handleCommentSave}
            >댓글 작성</Button>
        </>
    )
}