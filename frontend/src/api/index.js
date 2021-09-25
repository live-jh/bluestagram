import Axios from "axios";
import {makeUseAxios} from "axios-hooks";
import {API_URL} from "Constants";

// axios instance setting (baseUrl setting)
// axiosInstance를 사용하면 url은 제외하고 작성 가능
export const axiosInstance = Axios.create({
    baseURL: API_URL,
    // headers: he
});

// custom useAxios axios에 axiosInstance를 지정
export const useAxios = makeUseAxios({
    axios: axiosInstance
});