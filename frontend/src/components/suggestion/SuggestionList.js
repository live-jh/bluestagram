import React, {useEffect, useState} from "react";
import {Button, Card} from "antd";
import Suggestion from "./Suggestion";
import useAxios from "axios-hooks";
import {useAppContext} from "../../store";

export default function SuggestionList({style}) {
    // const [userList, setUserList] = useState([]);
    const {store: {jwt_token}} = useAppContext();
    const headers = {Authorization: `JWT ${jwt_token}`};
    const [{data: user_list, loading, error}, refetch] = useAxios({
        url: `${process.env.REACT_APP_API_URL}/api/account/suggestions`,
        headers: headers
    })
    useEffect(() => {
        // async function fetchUserList() {
            // try {
            //     const {data} = await Axios.get(
            //         `${process.env.REACT_APP_API_URL}/api/account/suggestions`,
            //         {headers}
            //     )
            //     setUserList(data)
            // } catch (error) {
            //     console.log(error);
            // }
        // }
        // fetchUserList();

        // eslint-disable-next-line
    }, []);
    return (
        <div style={style}>
            {loading && <div>...loading</div>}
            {error && <div>로딩중 에러가 발생하였습니다.</div>}
            {/* request again call */}
            {/*<Button onClick={() => refetch()}>Reload</Button>*/}
            <Card title="Suggestion for u" size="small">
                {user_list && user_list.map((suggesion_user, index) => {
                    return (
                        <Suggestion key={index} suggestion_user={suggesion_user}/>
                    )
                })}
            </Card>
        </div>
    );
}
