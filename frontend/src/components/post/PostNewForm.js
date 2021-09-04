import React, {useState} from "react"
import {Button, Form, Input, Upload, Modal, notification} from "antd"
import "assets/Post.scss"
import {FrownOutlined, PlusOutlined} from "@ant-design/icons";
import getBase64FromFile from "utils/Base64";
import Axios from "axios";
import {useAppContext} from "store";
import {parseErrorMessages} from "utils/ErrorMessage";
import {useHistory} from "react-router-dom";

export default function PostNewForm() {
    const history = useHistory();
    const {store: {jwt_token}} = useAppContext();
    const [field_errors, setFieldErrors] = useState({})
    const [preview_photo, setPreviewPhoto] = useState({
        visible: false, //모달을 보여줄지 체크
        base64: null // base64 인코딩된 이미지를 모달에 보여줌
    });
    const [file_list, setFileList] = useState([]);

    const onSubmit = async (fileValues) => {
        const {caption, photo: {fileList}} = fileValues;
        const form_data = new FormData();
        // name: value
        form_data.append("caption", caption);
        //업로드하는 사진의 갯수만큼 form_data 추가
        fileList.forEach(file => {
            form_data.append("photo", file.originFileObj);
        })
        const headers = {Authorization: `JWT ${jwt_token}`};
        try {
            await Axios.post(`${process.env.REACT_APP_API_URL}/api/posts`, form_data, {headers: headers});
            history.push('/')
        } catch (error) {
            if (error.response) {
                const {status, data: field_error_message} = error.response;
                console.log(field_error_message)
                if (typeof field_error_message === "string") {
                    notification.open({
                        message: "서버 오류",
                        description: `[에러] ${status} response`,
                        icon: <FrownOutlined style={{color: "#ff3333"}}/>
                    })
                } else {
                    parseErrorMessages(field_error_message);
                }
            }
        }
    }

    const imageUploadChange = ({fileList}) => {
        setFileList(fileList);
    }
    const handlePreviewPhoto = async (file) => {
        if (!file.url && !file.preview) {
            //base 64 변경
            file.preview = await getBase64FromFile(file.originFileObj);
        }
        setPreviewPhoto({
            visible: true,
            base64: file.url || file.preview //url이 없을때 preview로 사용
        })
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
        >
            <Form.Item
                label="Caption"
                name="caption"
                rules={[
                    {
                        required: true,
                        message: 'Please enter a caption',
                    },
                ]}
                hasFeedback
                {...field_errors.caption}
                {...field_errors.non_field_errors}
            >
                <Input.TextArea/>
            </Form.Item>

            <Form.Item
                label="Photo"
                name="photo"
                rules={[
                    {
                        required: true,
                        message: 'upload to image',
                    },
                ]}
                hasFeedback
                {...field_errors.photo}
            >
                {/* 속성은 카멜케이스로 왠만하면 작성하기 */}
                <Upload
                    listType="picture-card"
                    fileList={file_list}
                    onChange={imageUploadChange}
                    onPreview={handlePreviewPhoto}
                    beforeUpload={() => {
                        return false;
                    }}
                >
                    <div>
                        <PlusOutlined/>
                        <div className="ant-upload-text">Upload</div>
                    </div>
                </Upload>
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
            <hr/>
            <Modal visible={preview_photo.visible} footer={null}
                   onCancel={() => setPreviewPhoto({visible: false})}>
                <img src={preview_photo.base64} style={{width: '100%'}} alt="Preview"/>
            </Modal>
            {JSON.stringify(file_list)}
        </Form>
    )
}