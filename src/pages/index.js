import React, { useEffect, useState } from "react";
import { Table, Button, notification, Typography, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ReloadOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Title, Text } = Typography;

export default function Data() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    HandleGetUser();
  }, []);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const HandleGetUser = () => {
    axios
      .get("http://127.0.0.1:8000/api/auth/users")
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const HandleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/auth/users/${id}`) // Use backticks for template literals
      .then((response) => {
        console.log(response.data);
        notification.success({
          message: "Delete Success",
          description: "User has been successfully deleted.",
        });
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error(error);
        notification.error({
          message: "Delete Failed",
          description: "There was an error deleting the user.",
        });
      });
  };

  const onSearch = (value) => {
    setSearchQuery(value);
    if (value) {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([users]);
    }
  };

  const onRefresh = () => {
    HandleGetUser();
    setSearchQuery('')
  };
  const HandleLogout = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      notification.error({
        message: "No token found",
      });
      return;
    }
    axios
      .post(
        "http://127.0.0.1:8000/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Kirim token dalam header
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        notification.success({
          message: "Logout Success",
        });
        localStorage.removeItem("authToken");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        notification.error({
          message: "Logout Failed",
        });
      });
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      render: (text, record) => (
        <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
          <Button type="primary" onClick={() => navigate(`/edit/${record.id}`)}>
            Ubah
          </Button>
          <Button onClick={() => HandleDelete(record.id)} danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          padding: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          <Title
            level={3}
            style={{
              fontSize: "clamp(1.5rem, 2vw, 2rem)",
              margin: 0,
            }}
          >
            Daftar User
          </Title>
          <Button onClick={HandleLogout}>Logout</Button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "100%",
            }}
          >
            <Search
              placeholder="Search"
              onSearch={onSearch}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                maxWidth: "500px",
                marginBottom: 10,
              }}
            />
            <Button
              icon={<ReloadOutlined />}
              onClick={onRefresh}
              style={{ marginLeft: 10 }}
            >
            </Button>
            <Table
              dataSource={filteredUsers}
              columns={columns}
              scroll={{ x: "max-content" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
