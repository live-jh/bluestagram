import React, {useState} from "react";
import {Input, Form, Button, notification, Card} from "antd";
import {useHistory, useLocation} from "react-router-dom";
import Axios from "axios";
import {FrownOutlined, SmileOutlined} from "@ant-design/icons";
import {useAppContext} from "store";
import {setToken} from "store/action";
import {parseErrorMessages} from "utils/ErrorMessage";

export default function Login(props) {
    const history = useHistory();
    const {dispatch} = useAppContext();
    const location = useLocation(); // location obj
    // const [jwt_token, setJwtToken] = useLocalStorage("jwt_token", "");
    const [field_errors, setFieldErrors] = useState({});

    const {from: loginRedirectUrl} = location.state || {from: {pathname: "/"}}; //전에 있던 페이지 이동
    // console.log(props);
    const onSubmit = async (values) => {
        setFieldErrors({});
        try {
            const {data: {token: jwt_token}} = await Axios.post(
                `${process.env.REACT_APP_API_URL}/api/account/token/`,
                values
            )
            notification.open({
                message: "로그인 성공",
                description: "환영합니다.",
                icon: <SmileOutlined style={{color: "#108ee9"}}/>
            })
            dispatch(setToken(jwt_token))
            // setJwtToken(jwt_token)
            history.push(loginRedirectUrl)
        } catch (error) {
            if (error.response) {
                notification.open({
                    message: "로그인을 실패하였습니다.",
                    description: "아이디와 비밀번호를 확인해주세요.",
                    icon: <FrownOutlined style={{color: "#ff3333"}}/>
                })
                const {data: field_error_message} = error.response;
                //drf에선 두개 이상의 필드에 대해 걸쳐 에러가 발생하면 non_field_errors 발생
                setFieldErrors(parseErrorMessages(field_error_message));
            }
        }
    }
    return (
        <Card title={"로그인"}>
            <Form
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onSubmit}
                // onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                        {
                            min: 5,
                            message: "5글자 이상 입력해주세요."
                        }
                    ]}
                    hasFeedback
                    {...field_errors.username}
                    {...field_errors.non_field_errors}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    {...field_errors.password}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

;