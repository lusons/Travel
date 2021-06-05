import React, { useEffect } from "react";
import styles from "./index.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Row, Col, Typography, Spin } from "antd";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createAsyncProductAction } from "../../store/actions/product";
import SideMenu from "../../components/SideMenu";
import Carousel from "../../components/Carousel";
import Paterners from "../../components/Paterners";
import ProductCollection from "../../components/ProductCollection";
// import { productList1, productList2, productList3 } from "../../mock/mock";
import sideimg1 from "../../assets/images/sider_2019_02-04-2.png";
import sideimg2 from "../../assets/images/sider_2019_02-04.png";
import sideimg3 from "../../assets/images/sider_2019_12-09.png";
import { useTranslation, WithTranslation } from "react-i18next";

// 引入store类型接口
import { RootState } from "../../store/store";

const Home: React.FC<WithTranslation> = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // 函数式组件获取redux仓库值
  const { loading, ProductList } = useSelector((state: RootState) => {
    return {
      loading: state.products.loading,
      ProductList: state.products.productList,
    };
  }, shallowEqual);

  useEffect(() => {
    dispatch(createAsyncProductAction());
  }, [dispatch]);

  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          position: "absolute",
          width: "100%",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      ></Spin>
    );
  }

  return (
    <>
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
          products={ProductList[0]?.touristRoutes}
          title={
            <Typography.Title level={3} type="warning">
              {/* 爆款推荐 */}
              {t("home_page.hot_recommended")}
            </Typography.Title>
          }
        />

        <ProductCollection
          sideImage={sideimg2}
          products={ProductList[1]?.touristRoutes}
          title={
            <Typography.Title level={3} type="danger">
              {/* 新品上市 */}
              {t("home_page.new_arrival")}
            </Typography.Title>
          }
        />

        <ProductCollection
          sideImage={sideimg3}
          products={ProductList[2].touristRoutes}
          title={
            <Typography.Title level={3} type="success">
              {t("home_page.domestic_travel")}
            </Typography.Title>
          }
        />

        <Paterners />
      </div>
      <Footer />
    </>
  );
};

export default Home;
