import * as React from "react";
import * as ReactDOM from "react-dom";
// import { render } from 'react-dom';
import { Provider } from "react-redux";
import App from "./src/components/App";
import "antd/dist/antd.css";
import configureStore from "./src/store/configureStore";

import "./i18n";

import AuthWrapper from "./src/components/context/AuthWrapper";

const store = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <AuthWrapper.AuthProvider>
      <App />
    </AuthWrapper.AuthProvider>
  </Provider>,
  document.getElementById("app")
);
