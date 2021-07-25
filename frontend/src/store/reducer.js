import {
    SET_TOKEN,
    DELETE_TOKEN
} from "./action_type"
import {UpdateWithSideEffect} from "use-reducer-with-side-effects";
import {setStorageItem} from "utils/useLocalStorage";


export const Reducer = (prevState, action) => {
    const {type} = action;
    if (type === SET_TOKEN) {
        const {payload: jwt_token} = action;
        const new_state = {
            ...prevState,
            jwt_token,
            is_authenticated: true
        }
        //file 저장, http통신시 SideEffects
        return UpdateWithSideEffect(new_state, (state, dispatch) => {
            setStorageItem("jwt_token", jwt_token);
        })
    } else if (type === DELETE_TOKEN) {
        const new_state = {
            ...prevState,
            jwt_token: "",
            is_authenticated: false
        }
        return UpdateWithSideEffect(new_state, (state, dispatch) => {
            setStorageItem('jwt_token', "");
        })
    }
    return prevState;
}