import MainLayout from "../../layouts/MainLayout";
import { PaymentForm } from "../../components/paymentForm";
import { useState } from "react";
import { CheckOutCard } from "../../components/checkOutCard";
import { Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../../store/toolkit/pacldeOrder";
import { RootState } from "../../store/store";
import { useHistory } from "react-router";

const PlaceOrder: React.FC = () => {
  const [Time, setTime] = useState(8);
  const history = useHistory();
  const { loading, currentOrder, error } = useSelector((state: RootState) => {
    return {
      currentOrder: state.order.currentOder,
      loading: state.order.loading,
      error: state.order.error,
    };
  });

  const dispatch = useDispatch();

  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>
          <CheckOutCard
            time={Time}
            loading={loading}
            order={currentOrder}
            onCheckout={() => {
              dispatch(placeOrder(currentOrder.id));
              if (!error) {
                let timer = setInterval(() => {
                  setTime((value) => --value);
                }, 1000);
                setTimeout(() => {
                  clearInterval(timer);
                  history.push("/");
                }, 8000);
              }
            }}
          />
        </Col>
      </Row>
    </MainLayout>
  );
};

export default PlaceOrder;
