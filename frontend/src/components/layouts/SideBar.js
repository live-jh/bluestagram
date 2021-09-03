import React from "react";
import StoryList from "../story/StoryList";
import SuggestionList from "../suggestion/SuggestionList";
import {Button} from "antd";
import {useHistory} from "react-router-dom";

const SideBar = (props) => {
    const history = useHistory()
    const onClickNewPost = () => {
        history.push("/post/new")
    }
    return (
        <div className="side-bar">
            <Button block type="primary" onClick={onClickNewPost} style={{marginBottom: "1rem"}}>새 포스팅 쓰기</Button>
            <StoryList style={{marginBottom: "1rem"}}/>
            <SuggestionList/>
        </div>
    )
}

export default SideBar;