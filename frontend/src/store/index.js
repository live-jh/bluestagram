import React, {createContext, useContext} from "react";
import useReducerWithSideEffects from "use-reducer-with-side-effects";
import {Reducer} from "./reducer";
import {getStorageItem} from "utils/useLocalStorage";

// const initialState = {
// "jwt_token": ""
// }
// const AppContext = createContext(initialState);

const AppContext = createContext();

export const AppProvider = ({children}) => {
    // const [store, dispatch] = useReducer(reducer, initialState, () => ({
    const jwt_token = getStorageItem("jwt_token", "");
    const [store, dispatch] = useReducerWithSideEffects(Reducer, {
        jwt_token: jwt_token,
        is_authenticated: jwt_token.length > 0,
    }); //(reducer 함수, 초기값)
    return (
        <AppContext.Provider value={{store, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext); //사용시 읽어오기
