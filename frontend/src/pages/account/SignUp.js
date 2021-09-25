import React, {useState} from "react";
import {Input, Form, Button, notification} from "antd";
import {useHistory} from "react-router-dom";
// import Axios from "axios";
import {FrownOutlined, SmileOutlined} from "@ant-design/icons";
import {axiosInstance} from "api";


// antd 는 하나의 Col을 24개로 구분
export default function SignUp() {
    const history = useHistory();
    const [field_errors, setFieldErrors] = useState({});

    // 값이 그냥 객체 그대로 넘어오나봄
    const onSubmit = async (values) => {
        // const {username, password} = values;

        setFieldErrors({});
        try {
            await axiosInstance.post(
                "/api/account/signup/",
                values
            )
            notification.open({
                message: "회원가입을 성공하였습니다.",
                description: "로그인 페이지로 이동합니다.",
                icon: <SmileOutlined style={{color: "#108ee9"}}/>
            })
            history.push("/account/login")
        } catch (error) {
            if (error.response) {
                notification.open({
                    message: "회원가입을 실패하였습니다.",
                    description: "아이디와 비밀번호를 확인해주세요.",
                    icon: <FrownOutlined style={{color: "#ff3333"}}/>
                })
                const {data: field_error_message} = error.response;
                console.log(field_error_message)
                setFieldErrors(
                    //object -> key, value 분리 acc는 함수 -> python items()
                    Object.entries(field_error_message).reduce((acc, [field_name, errors]) => {
                        //errors: ['str1', 'str2'].join(" ") => "m1 m2"
                        // field_name => key, errors => value
                        acc[field_name] = {
                            validateStatus: "error",
                            help: errors.join(" ")
                        }
                        return acc;
                    }, {}) //누적의 초기화 값 빈 obj
                )
            }
        }

    }


    return (
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
    )
}