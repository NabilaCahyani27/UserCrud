import React, { useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Typography,
  Row,
  Col,
  notification,
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const HandleRegister = ({ name, email, password }) => {
    axios
      .post("http://127.0.0.1:8000/api/auth/register", { name, email, password })
      .then((response) => {
          console.log(response.data);
          notification.success({
              message: "Regiter Successful",
              description: "You have successfully Register.",
            });
            navigate('/')
      })
      .catch((error) => {
        console.error(error);
        notification.error({
          message: "Regsiter Failed",
        //   description: "Please check your email and password and try again.",
        });
      });
  };
  
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#D1E9F6",
        padding: "0 20px",
      }}
    >
      <Row justify="center" style={{ width: "100%" }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={8}>
          <Card
            style={{
              width: "100%",
              maxWidth: 500,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "20px",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <Title level={3}>Selamat Datang</Title>
              <Text>Silahkan Register terlebih dahulu</Text>
            </div>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={HandleRegister}
              autoComplete="off"
              style={{ marginTop: 20 }}
              layout="vertical"
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
