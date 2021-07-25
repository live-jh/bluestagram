import React, {useEffect, useRef, useState} from "react";
import {Input, Alert} from "antd";
import {useHistory} from "react-router-dom";
import Axios from "axios";


const api_url = 'http://localhost:8000';
export default function ExampleSignUp() {
    const history = useHistory();

    // 함수형 컴포넌트에서 사용하는 useState는 항상 obj단위로 써야함 (이전값 꼭 참조)
    const [inputs, setInputs] = useState({username: "", password: ""});
    const [errors, setErrors] = useState({});
    const [form_disabled, setFormDisabled] = useState(false); //isDisabled 사용하면 false
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // 아래와 같음
        const isEnabled = Object.values(inputs).every(s => s.length > 0);
        // const isDisabled = (inputs.username.length === 0 || inputs.password.length === 0); ! 사용 x
        // const isEnabled = (inputs.username.length > 0 && inputs.password.length > 0);
        setFormDisabled(!isEnabled)
        return () => {
            setFormDisabled(false);
        }
    }, [inputs])

    const onSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);
        Axios.post(
            `${api_url}/api/account/signup`,
            inputs
        ).then((response) => {
            console.log("response: ", response)
            history.push("/account/login")
        }).catch(error => {
            if (error.response) {
                setErrors({
                    username: (error.response.data.username || []).join(" "),
                    password: (error.response.data.password || []).join(" ")
                })
                console.log(error.response)
            }
        }).finally(() => {
            setLoading(false);
        });
    }

    const onChange = (e) => {
        const {name, value} = e.target;
        setInputs(prevState => ({
            ...prevState,
            [name]: value
        }))
    }


    return (
        <div>
            {JSON.stringify(inputs)}
            <form onSubmit={onSubmit}>
                <div>
                    <Input type="text" name="username" onChange={onChange}/>
                    {errors.username && <Alert type="error" message={errors.username}/>}
                </div>
                <div>
                    <Input type="password" name="password" onChange={onChange}/>
                    {errors.password && <Alert type="error" message={errors.password}/>}
                </div>
                <Input type="submit" value="회원가입" disabled={loading || form_disabled}/>
            </form>
        </div>
    )
}