import React, {useEffect, useState} from "react";
import {Card} from "antd";
import Suggestion from "./Suggestion";
// import Axios from "axios";
// import useAxios from "axios-hooks";
import {useAxios, axiosInstance} from "api";
import {useAppContext} from "store";

export default function SuggestionList({style}) {
    const [user_list, setUserList] = useState([]);
    const {store: {jwt_token}} = useAppContext();
    const headers = {Authorization: `JWT ${jwt_token}`};
    // third party (axios 대신 사용 -> fetchUserList 기능)
    // refetch 호출했을때 다시 요청 보내기
    const [{data: origin_user_list, loading, error}, refetch] = useAxios({
        url: `/api/account/suggestions/`,
        headers: headers
    });


    //함수형은 매번 렌더시마다 매핑을 한다는 단점이 존재 (비효율적) -> 해결방안 useMemo()
    // const user_list = origin_user_list && origin_user_list.map(user => ({...user, isFollow: false}));
    // const user_list = useMemo(() => {
    useEffect(() => {
        if (!origin_user_list) {
            setUserList([]);
        } else {
            setUserList(origin_user_list.map(user => ({...user, is_follow: false})));
        }
    }, [origin_user_list]); // 해당 use_list가 바뀔때만 호출

    // useEffect(() => {
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
    // }, []);

    const onFollowUser = (username) => {
        axiosInstance.post("/api/account/follow/",
            {username: username}, // === {username}
            {headers: headers}
        ).then(data => {
            setUserList(prevUserList => {
                return prevUserList.map(user => {
                    if (user.username === username) {
                        return {...user, is_follow: true}
                    } else {
                        return user;
                    }
                })
            })
        }).catch(error => {

        })
    }

    return (
        <div style={style}>
            {loading && <div>...loading</div>}
            {error && <div>로딩중 에러가 발생하였습니다.</div>}
            {/* request again call */}
            {/*<Button onClick={() => refetch()}>Reload</Button>*/}
            <Card title="Suggestion for u" size="small">
                {user_list && user_list.map((suggesion_user, index) => {
                    return (
                        <Suggestion key={index} suggestion_user={suggesion_user} onFollowUser={onFollowUser}/>
                    )
                })}
            </Card>
        </div>
    );
}
