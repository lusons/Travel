import React from "react";
import styles from "./App.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Row, Col, Typography } from "antd";
import SideMenu from "./components/SideMenu";
import Carousel from "./components/Carousel";
import Paterners from "./components/Paterners";
import ProductCollection from "./components/ProductCollection";
import { productList1, productList2, productList3 } from "./mock/mock";
import sideimg1 from "./assets/images/sider_2019_02-04-2.png";
import sideimg2 from "./assets/images/sider_2019_02-04.png";
import sideimg3 from "./assets/images/sider_2019_12-09.png";

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
        <ProductCollection
          sideImage={sideimg1}
          products={productList1}
          title={
            <Typography.Title level={3} type="warning">
              爆款推荐
            </Typography.Title>
          }
        />

        <ProductCollection
          sideImage={sideimg2}
          products={productList2}
          title={
            <Typography.Title level={3} type="danger">
              新品上市
            </Typography.Title>
          }
        />

        <ProductCollection
          sideImage={sideimg3}
          products={productList3}
          title={
            <Typography.Title level={3} type="success">
              国内游推荐
            </Typography.Title>
          }
        />
        <Paterners />
      </div>
      <Footer />
    </div>
  );
};

export default App;
