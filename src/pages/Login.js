import React, { useState } from "react";
import { Button, Card, Form, Input, Typography, Row, Col,notification, } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const CenteredCardForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const HandleLogin = ({ email, password }) => {
    axios
      .post("http://127.0.0.1:8000/api/auth/login", { email, password })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem('authToken', token);
          console.log(response.data);
          notification.success({
              message: "Login Successful",
              description: "You have successfully logged in.",
            });
            navigate('/data')
      })
      .catch((error) => {
        console.error(error);
        notification.error({
          message: "Login Failed",
          description: "Please check your email and password and try again.",
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
              <Text>Silahkan login terlebih dahulu</Text>
            </div>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={HandleLogin}
              autoComplete="off"
              style={{ marginTop: 20 }}
              layout="vertical"
            >
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
                  Submit
                </Button>
              </Form.Item>
              <Form.Item>
                <Button  block onClick={()=> navigate('/register')}>
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CenteredCardForm;

