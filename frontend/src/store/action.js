import {
    SET_TOKEN,
    DELETE_TOKEN
} from "./action_type"

export const setToken = (token) => ({type: SET_TOKEN, payload: token});
export const deleteToken = () => ({type: DELETE_TOKEN});