import React, {useState} from "react"
import PostNewForm from "../components/post/PostNewForm";
import {Card} from "antd";

export default function PostNew() {
    return (
        // 컴포넌트 구별
        <div className="post-new">
            <Card title="새 포스팅 쓰기">
                <PostNewForm/>
            </Card>
        </div>
    )
}