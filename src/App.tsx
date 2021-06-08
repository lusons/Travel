import React, { useEffect } from "react";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import ShoppingCart from "./pages/ShoppingCart";
import PlaceOrder from "./pages/PlaceOrder";
import styles from "./App.module.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getShoppingCart } from "./store/toolkit/shoppingCart";
import { RootState } from "./store/store";
import axios from "axios";

const App: React.FC = () => {
  const token = useSelector((state: RootState) => state.user.token);
  if (token) axios.defaults.headers.Authorization = `bearer ${token}`;

  const privateRoute = (component) => {
    if (token) return component;
    return Home;
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (token) dispatch(getShoppingCart(token));
  }, [token, dispatch]);

  return (
    <div className={styles.App}>
      <BrowserRouter>
        {/* Switch开启单一匹配,匹配到一个就不会继续往下匹配 */}
        <Switch>
          {/* exact开启路由匹配严格模式 */}
          <Route exact path="/" component={Home} />
          <Route exact path="/Home" component={Home} />
          <Route exact path="/SignIn" component={SignIn} />
          <Route exact path="/Register" component={Register} />
          <Route exact path="/Login" component={Login} />
          <Route
            exact
            path="/ShoppingCart"
            component={privateRoute(ShoppingCart)}
          />
          <Route
            exact
            path="/PlaceOrder"
            component={privateRoute(PlaceOrder)}
          />
          <Route path="/Detail/:touristRouteId" component={Detail} />
          <Route path="/Search/:keywords?" component={Search} />
          <Route render={() => <h1>404...</h1>} />
          {/* 所有路由都没匹配到的话,路由重定向到主页 */}
          <Redirect to="/Home" />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
