import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  Row,
  Col,
  message,
  Flex,
  Grid,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import "../styles/login.css";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export default function Login() {
  const [loading, setLoading] = useState(false);
  const screens = useBreakpoint() || {};

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const response = await axios.post(
        "https://peopleix.duckdns.org/api/users/login",
        {
          email: values.username,
          pswd: values.password,
        }
      );

      localStorage.setItem(
        "loggedUser",
        JSON.stringify(response.data)
      );

      message.success(
        response.data?.message || "Login successful"
      );
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row style={{ minHeight: "100vh" }}>
      {/* LEFT BRAND (Desktop only) */}
      {screens.md === true && (
        <Col
          span={12}
          style={{
            background: "#1677ff",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ padding: "0 80px" }}>
            <Title style={{ color: "#fff" }}>
              PeopleiX
            </Title>
            <Text style={{ color: "#e6f4ff" }}>
              Employee Experience,
              <br />
              Simplified
            </Text>
          </div>
        </Col>
      )}

      {/* LOGIN */}
      <Col
        xs={24}
        md={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
        }}
      >
        <Card style={{ width: "100%", maxWidth: 380 }}>
          <Title level={4} align="center">
            Login to your account
          </Title>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email or Phone"
              name="username"
              rules={[{ required: true }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email or phone"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Button
              type="primary"
              block
              size="large"
              htmlType="submit"
              loading={loading}
            >
              Login
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
