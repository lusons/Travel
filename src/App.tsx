import React from "react";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Rigister from "./pages/Rigister";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import styles from "./App.module.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        {/* Switch开启单一匹配,匹配到一个就不会继续往下匹配 */}
        <Switch>
          {/* exact开启路由匹配严格模式 */}
          <Route exact path="/" component={Home} />
          <Route exact path="/Home" component={Home} />
          <Route exact path="/SignIn" component={SignIn} />
          <Route exact path="/Rigister" component={Rigister} />
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
