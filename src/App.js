import React from "react";
import logo from "./logo.svg";
import { Provider } from "react-redux";
import store from "./redux/store";

import "./App.css";
import { Route } from "react-router-dom";
import SingleProduct from "./pages/SingleProduct";
import Home from "./pages/Home";
import MessengerCustomerChat from "react-messenger-customer-chat";
import { HelmetProvider } from "react-helmet-async";
console.log = () => {};
console.warn = () => {};
function App() {
  return (
    <Provider store={store}>
      {/* <Route path="/" component={Home} />
      <Route path="/single_product" component={SingleProduct} /> */}
      <HelmetProvider>
        <Route path="/" component={Home} />
        <Route path="/single_product" component={SingleProduct} />
      </HelmetProvider>
    </Provider>
  );
}

export default App;
