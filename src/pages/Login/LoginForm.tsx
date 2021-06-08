import { useEffect } from "react";
import { Form, Input, Button, Checkbox, Space, message } from "antd";
import styles from "./LoginForm.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Login } from "../../store/toolkit/userSlice";

const LoginForm: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, token } = useSelector((state: any) => {
    return {
      loading: state.user.loading,
      error: state.user.error,
      token: state.user.token,
    };
  }, shallowEqual);

  console.log(loading);

  useEffect(() => {
    if (token) {
      history.push("/");
    }
  }, [token, history]);

  const onFinish = async ({ username, password }: any) => {
    console.log(username, password);

    dispatch(
      Login({
        email: username,
        password: password,
      })
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error("请检查输入！！！");
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

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>记住密码</Checkbox>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={loading}>
            登陆
          </Button>
          <Button type="primary" onClick={() => history.push("/Register")}>
            注册
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
