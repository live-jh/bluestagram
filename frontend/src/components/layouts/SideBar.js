import React from "react";
import StoryList from "../story/StoryList";
import SuggestionList from "../suggestion/SuggestionList";

const SideBar = (props) => {
    return (
        <div className="side-bar">
            <StoryList style={{marginBottom: "1rem"}}/>
            <SuggestionList/>
        </div>
    )
}

export default SideBar;