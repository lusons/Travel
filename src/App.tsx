import React from "react";
import styles from "./App.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Row, Col } from "antd";
import SideMenu from "./components/SideMenu";
import Carousel from "./components/Carousel";

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <Header />
      <div className={styles["page-content"]}>
        <Row style={{ marginTop: 20 }}>
          <Col span={6}>
            <div>
              <SideMenu />
            </div>
          </Col>
          <Col span={18}>
            <Carousel />
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default App;
