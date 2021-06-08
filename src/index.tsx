import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import rootStore from "./store/store";
// 引入i18n配置
import "./i18n/config";
import axios from "axios";
import { PersistGate } from "redux-persist/integration/react";

axios.defaults.headers["x-icode"] = "qKhDxI15yz";

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={rootStore.store}>
    <PersistGate loading={null} persistor={rootStore.persistor}>
      <App />
    </PersistGate>
  </Provider>,
  // </React.StrictMode>
  document.getElementById("root")
);
