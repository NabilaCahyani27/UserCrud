
import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  Form,
  Input,
  Typography,
  message
} from "antd";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

export default function FormData() {
    const { id } = useParams();
    const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(()=>{
    axios
    .get(`http://127.0.0.1:8000/api/auth/users/${id}`)
    .then((response) => {
        form.setFieldsValue(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  },[[id, form]])

  const HandleSubmit = (values) => {
    axios
      .put(`http://127.0.0.1:8000/api/auth/users/${id}`, values)
      .then((response) => {
          console.log(response.data);
          message.success('User updated successfully');
            navigate('/data')
      })
      .catch((error) => {
        console.error(error);
        message.error('Failed to update user');
      });
  };
  
  return (
    <div style={{ padding: 20 }}>
      <h2>Update User</h2>
      <Form form={form} onFinish={HandleSubmit} layout="vertical">
        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the name' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter the email' }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

