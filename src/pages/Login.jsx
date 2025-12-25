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
  const screens = useBreakpoint(); // 👈 breakpoint detector

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://3.111.36.255:8080/api/users/login",
        {
          email: values.username,
          pswd: values.password,
        }
      );

      const successMsg =
        response.data?.message || "Login successful";

      localStorage.setItem(
        "loggedUser",
        JSON.stringify(response.data)
      );

      message.success(successMsg);
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
      {/* ✅ LEFT BRAND SECTION (ONLY md+) */}
      {screens.md && (
        <Col
          span={12}
          style={{
            background: "#1677ff",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ padding: "0 80px" }}>
            <Title style={{ color: "#fff", marginBottom: 8 }}>
              PeopleiX
            </Title>
            <Text style={{ color: "#e6f4ff", fontSize: 18 }}>
              Employee Experience,
              <br />
              Simplified
            </Text>
          </div>
        </Col>
      )}

      {/* RIGHT LOGIN SECTION */}
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
        <Card
          style={{
            width: "100%",
            maxWidth: 380,
            borderRadius: 12,
          }}
        >
          <Flex vertical gap={8} align="center">
            <Title level={4}>Login to your account</Title>
          </Flex>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email or Phone"
              name="username"
              rules={[
                {
                  required: true,
                  message:
                    "Please enter email or phone number",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email or phone number"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message:
                    "Please enter your password",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              size="large"
            >
              Login now
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}