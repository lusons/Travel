import React from "react";
import styles from "./UserLayout.module.css";
import { Link } from "react-router-dom";
import { CaretDownOutlined } from "@ant-design/icons";
import { Layout, Menu, Dropdown, Button } from "antd";
const { Header, Footer, Content } = Layout;

export const UserLayout: React.FC = (props) => {
  const menu = (
    <Menu>
      <Menu.Item key={1}>中文</Menu.Item>
      <Menu.Item key={2}>English</Menu.Item>
    </Menu>
  );

  return (
    <Layout className={styles["user-layout-container"]}>
      <Header className={styles["header"]}>
        <div className={styles["lang"]}>
          <Dropdown overlay={menu}>
            <Button>
              {" "}
              选择语言 <CaretDownOutlined />
            </Button>
          </Dropdown>
        </div>
      </Header>
      <Content className={styles["content"]}>
        <div className={styles["top"]}>
          <div className={styles["content-header"]}>
            <Link to="/">
              {/* <img alt="logo" className={styles["logo"]} src={logo} /> */}
              <span className={styles["title"]}>React 旅游网</span>
            </Link>
          </div>
          <div className={styles["desc"]}>让旅游更幸福</div>
          <div style={{ margin: "0 auto" }}>{props.children}</div>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>这里是Footer</Footer>
    </Layout>
  );
};
