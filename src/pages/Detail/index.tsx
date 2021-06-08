import React, { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { RouteComponentProps, useParams } from "react-router-dom";
import Comments from "../../components/Comments";
import ProductIntro from "../../components/ProductIntro";
import { commentMockData } from "./mock";
import MainLayout from "../../layouts/MainLayout";
import {
  Col,
  Row,
  Spin,
  DatePicker,
  Divider,
  Typography,
  Anchor,
  Menu,
  Button,
  message,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addShoppingCart } from "../../store/toolkit/shoppingCart";
import styles from "./index.module.css";
import { getDetail } from "../../store/toolkit/detail";
import { RootState } from "../../store/store";

const { RangePicker } = DatePicker;

interface MatchParams {
  touristRouteId: string;
}

const Detail: React.FC<RouteComponentProps<MatchParams>> = (props) => {
  const { touristRouteId } = useParams<MatchParams>();
  // const [loading, setLoading] = useState<boolean>(true);
  // const [product, setProduct] = useState<any>(null);

  const dispatch = useDispatch();
  const { loading, product, token, shopiingCartLoading } = useSelector(
    (state: RootState) => {
      return {
        loading: state.detail.loading,
        product: state.detail.data,
        error: state.detail.error,
        token: state.user.token as string,
        shopiingCartLoading: state.shoppingCart.loading,
      };
    },
    shallowEqual
  );

  useEffect(() => {
    (async () => {
      // // setLoading(() => true);
      // dispatch(detailSlice.actions.fetchStart());
      // const { data } = await axios.get(
      //   `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
      // );
      // // setProduct(() => data);
      // // setLoading(() => false);
      // dispatch(detailSlice.actions.fetchSuccess(data));
      dispatch(getDetail(touristRouteId));
    })();
  }, [dispatch, touristRouteId]);

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
      <MainLayout>
        {/* 产品简介 与 日期选择 */}
        <div
          className={styles["product-intro-container"]}
          style={{ marginBottom: 20 }}
        >
          <Row>
            <Col span={13}>
              <ProductIntro
                title={product.title}
                shortDescription={product.shortDescription}
                price={product.price}
                coupons={product.coupons}
                points={product.points}
                discount={product.discount}
                rating={product.rating}
                pictures={product.touristRoutePictures.map((p) => p.url)}
              />
            </Col>
            <Col span={11}>
              <Button
                style={{ marginTop: 50, marginBottom: 30, display: "block" }}
                type="primary"
                danger
                loading={shopiingCartLoading}
                onClick={() => {
                  console.log(token);

                  if (!token)
                    return message.warning("您还没有登陆，请先登录！！！");
                  dispatch(
                    addShoppingCart({ token, touristRouteId: product.id })
                  );
                }}
              >
                <ShoppingCartOutlined />
                加入购物车
              </Button>
              <RangePicker open style={{ marginTop: 20 }} />
            </Col>
          </Row>
        </div>
        {/* 锚点菜单 */}
        <Anchor className={styles["product-detail-anchor"]}>
          <Menu mode="horizontal">
            <Menu.Item key={1}>
              <Anchor.Link href="#feature" title="产品特色"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key={2}>
              <Anchor.Link href="#fees" title="产品费用"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key={3}>
              <Anchor.Link href="#notes" title="预订须知"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key={4}>
              <Anchor.Link href="#comments" title="用户评价"></Anchor.Link>
            </Menu.Item>
          </Menu>
        </Anchor>
        {/* 产品特色 */}
        <div id="feature" className={styles["product-detail-container"]}>
          <Divider orientation="center">
            <Typography.Title level={3}>产品特色</Typography.Title>
          </Divider>
          {/* 渲染html字符串 必须使用react提供的Api  dangerouslySetInnerHTML 防止注入攻击*/}
          <div
            dangerouslySetInnerHTML={{ __html: product.features }}
            style={{ margin: 50 }}
          ></div>
        </div>
        {/* 费用 */}
        <div id="fees" className={styles["product-detail-container"]}>
          <Divider orientation="center">
            <Typography.Title level={3}>产品费用</Typography.Title>
          </Divider>
          {/* 渲染html字符串 必须使用react提供的Api  dangerouslySetInnerHTML 防止注入攻击*/}
          <div
            dangerouslySetInnerHTML={{ __html: product.fees }}
            style={{ margin: 50 }}
          ></div>
        </div>
        {/* 预订须知 */}
        <div id="notes" className={styles["product-detail-container"]}>
          <Divider orientation="center">
            <Typography.Title level={3}>预订须知</Typography.Title>
          </Divider>
          {/* 渲染html字符串 必须使用react提供的Api  dangerouslySetInnerHTML 防止注入攻击*/}
          <div
            dangerouslySetInnerHTML={{ __html: product.notes }}
            style={{ margin: 50 }}
          ></div>
        </div>
        {/* 商品评价*/}
        <div id="comments" className={styles["product-detail-container"]}>
          <Divider orientation="center">
            <Typography.Title level={3}>用户评价</Typography.Title>
          </Divider>
          <div style={{ margin: 40 }}>
            <Comments data={commentMockData} />
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Detail;
