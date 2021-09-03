import React from "react";
import {Card} from "antd";

export default function StoryList({style}) {
    return (
        <div style={style}>
            <Card title="Stories" size="small">Stories from people u follow will show up</Card>
        </div>
    );
}
