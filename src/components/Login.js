import React from "react";
import {Form, Input, Button, message} from "antd";
import {UserOutlined, LockOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../constants";

function Login(props) {
    const {handleLoggedIn} = props;

    const onFinish = (values) => {
        const {Email, UserPwd} = values;

        const opt = {
            method: "POST",
            url: `${BASE_URL}/signin`,
            data: {
                Email: Email,
                UserPwd: UserPwd,
            },
            headers: {"Content-Type": "application/json"}
        };
        //以这个config发出请求，resp交给.then()
        axios(opt)
            .then((res) => {
                if (res.status === 200) {
                    const {data} = res;
                    handleLoggedIn(data);
                    message.success("Login succeed! ");
                }
            })
            .catch((err) => {
                console.log("login failed: ", err.message);
                message.error("Login failed!");
            });
    };

    return (
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
            <Form.Item
                name="Email"
                rules={[
                    {
                        required: true,
                        message: "Please input your Email!"
                    }
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon"/>}
                    placeholder="Email"
                />
            </Form.Item>
            <Form.Item
                name="UserPwd"
                rules={[
                    {
                        required: true,
                        message: "Please input your Password!"
                    }
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <Link to="/register">register now!</Link>
            </Form.Item>
        </Form>
    );
}

export default Login;