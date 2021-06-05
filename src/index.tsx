import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import store from "./store/store";
// 引入i18n配置
import "./i18n/config";
import axios from "axios";

axios.defaults.headers["x-icode"] = "08AFD72FD7F731DD";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
