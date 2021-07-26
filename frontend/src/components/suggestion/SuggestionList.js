import React, {useEffect, useState} from "react";
import {Card} from "antd";
import Suggestion from "./Suggestion";
import Axios from "axios";
import {useAppContext} from "../../store";

export default function SuggestionList({style}) {
    const [userList, setUserList] = useState([]);
    const {store: {jwt_token}} = useAppContext();
    useEffect(() => {
        async function fetchUserList() {
            const headers = {Authorization: `JWT ${jwt_token}`};
            try {
                const {data} = await Axios.get(
                    `${process.env.REACT_APP_API_URL}/api/account/suggestions`,
                    {headers}
                )
                setUserList(data)
            } catch (error) {
                console.log(error);
            }
        }

        fetchUserList();
    // eslint-disable-next-line
    }, []);
    return (
        <div style={style}>
            <Card title="Suggestion for u" size="small">
                {userList.map((suggesion_user, index) => {
                    return (
                        <Suggestion key={index} suggestion_user={suggesion_user}/>
                    )
                })}
            </Card>
        </div>
    );
}
