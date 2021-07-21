import React from "react";
import StoryList from "../StoryList";
import SuggestionList from "../SuggestionList";

const SideBar = (props) => {
    return (
        <div className="side-bar">
            <StoryList/>
            <SuggestionList/>
        </div>
    )
}

export default SideBar;