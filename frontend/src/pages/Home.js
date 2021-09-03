import React from "react";
import PostList from "components/post/PostList";
import AppLayout from "components/layouts/AppLayout";

const Home = (props) => {
    return (
        <AppLayout>
            <PostList/>
        </AppLayout>
    );
}

export default Home;