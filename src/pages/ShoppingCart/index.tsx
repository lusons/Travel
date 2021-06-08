import React from "react";
import styles from "./ShoppingCart.module.css";
import MainLayout from "../../layouts/MainLayout";
import { Row, Col, Affix, message } from "antd";
import { ProductList } from "../../components/productList";
import { PaymentCard } from "../../components/paymentCard";
import { useDispatch, useSelector } from "react-redux";
import { clearShoppingCart, checkOut } from "../../store/toolkit/shoppingCart";
import { RootState } from "../../store/store";
import { useHistory } from "react-router-dom";

const ShoppingCart: React.FC = (props) => {
  const { token, shoppingCartItems, loading } = useSelector(
    (state: RootState) => {
      return {
        token: state.user.token as string,
        shoppingCartItems: state.shoppingCart.items,
        loading: state.shoppingCart.loading,
      };
    }
  );

  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <MainLayout>
      <Row>
        {/* 购物车清单 */}
        <Col span={16}>
          <div className={styles["product-list-container"]}>
            <ProductList data={shoppingCartItems.map((s) => s.touristRoute)} />
          </div>
        </Col>
        {/* 支付卡组件 */}
        <Col span={8}>
          <Affix>
            <div className={styles["payment-card-container"]}>
              <PaymentCard
                loading={loading}
                originalPrice={shoppingCartItems
                  .map((s) => s.originalPrice)
                  .reduce((a, b) => a + b, 0)}
                price={shoppingCartItems
                  .map(
                    (s) =>
                      s.originalPrice *
                      (s.discountPresent ? s.discountPresent : 1)
                  )
                  .reduce((a, b) => a + b, 0)}
                onCheckout={() => {
                  if (shoppingCartItems.length <= 0)
                    return message.warning("您的购物车中还没有商品!!!");
                  dispatch(checkOut(token));
                  history.push("/PlaceOrder");
                }}
                onShoppingCartClear={() => {
                  if (shoppingCartItems.length <= 0)
                    return message.warning("您的购物车中还没有商品!!!");
                  dispatch(
                    clearShoppingCart({
                      token,
                      itemIDs: shoppingCartItems.map((s) => s.id),
                    })
                  );
                }}
              />
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default ShoppingCart;
