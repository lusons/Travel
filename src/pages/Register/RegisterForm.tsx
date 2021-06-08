import { Form, Input, Button, Checkbox, Space, message } from "antd";
import axios from "axios";
import styles from "./RegisterForm.module.css";
import { useHistory } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const history = useHistory();

  const onFinish = async ({ username, password, confirm }: any) => {
    try {
      await axios.post("http://123.56.149.216:8080/auth/register", {
        email: username,
        password: password,
        confirmPassword: confirm,
      });
      message.success("注册成功");
      history.push("/Login");
    } catch {
      message.error("注册失败");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      // {...layout}
      labelCol={{ span: 4 }}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className={styles["register-form"]}
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: "请输入用户名！" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: "请输入密码！" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="确认密码"
        name="confirm"
        hasFeedback
        rules={[
          { required: true, message: "请输入确认密码！" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("密码确认不一致！");
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>记住密码</Checkbox>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
          <Button type="primary" onClick={() => history.push("/Login")}>
            返回登陆
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
