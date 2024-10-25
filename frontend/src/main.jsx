import React from "react";
import ReactDOM from "react-dom";
// import './index.css';
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./components/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="84137165849-n5rpca9u1cfmerfb7um368peoc94doq5.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>,
  document.getElementById("root")
);
