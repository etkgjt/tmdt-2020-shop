import React from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import {
  Home,
  Contact,
  Category,
  Cart,
  SingleProduct,
  Checkout,
  Confirmation,
  PaymentMethod,
  SignIn,
  SignUp,
  UserInfo,
  SmartPhone,
  Laptop,
  Accessories,
  Tablet,
  Finish,
  Search,
  Verify,
  ForgotPassword,
  ScrollToTop,
} from "./pages";

import { Provider } from "react-redux";
import store from "./redux/store";
import { Header, Footer, Layout } from "./components";
import { Container, Row } from "reactstrap";
import "./styles/footer.css";
import "./styles/appRoute.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import MyModal from "./components/MyModal";
import MessengerCustomerChat from "react-messenger-customer-chat";
// import ReactGA from "react-ga";
import { HelmetProvider } from "react-helmet-async";
const AppRoute = () => {
  let location = useLocation();
  // console.log = () => {};
  React.useEffect(() => {
    // ReactGA.initialize("G-8Z69VMY55M");
    // ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <React.Fragment>
      <Provider store={store}>
        <HelmetProvider>
          <header>
            <Header />
          </header>
          <MyModal />
          <Route>
            <ScrollToTop />
            <Switch>
              <Route exact={true} path="/" component={Home} />
              <Route path="/single_product" component={SingleProduct} />
              <Route path="/smart_phone/:id" component={SingleProduct} />
              <Route path="/laptop/:id" component={SingleProduct} />
              <Route path="/tablet/:id" component={SingleProduct} />
              <Route path="/accessories/:id" component={SingleProduct} />
              <Route path="/cart" component={Cart} />
              <Route path="/contact" component={Contact} />
              <Route path="/category" component={Category} />
              <Route path="/confirmation" component={Confirmation} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/payment" component={PaymentMethod} />
              <Route path="/sign_in" component={SignIn} />
              <Route path="/sign_up" component={SignUp} />
              <Route path="/user_info" component={UserInfo} />
              <Route path="/smart_phone" component={SmartPhone} />
              <Route path="/laptop" exact component={Laptop} />
              <Route path="/tablet" component={Tablet} />
              <Route path="/accessories" component={Accessories} />
              <Route path="/finish" component={Finish} />
              <Route path="/search" component={Search} />
              <Route path="/verify/:username/:password" component={Verify} />
              <Route
                path="/forget_password/:token"
                component={ForgotPassword}
              />
            </Switch>
          </Route>
          <footer
            className="box-shadow footer-background"
            style={{ color: "white" }}
          >
            <div className="footer-containter">
              <Footer />
            </div>
            <Row
              style={{
                width: "100%",
                height: "50px",
              }}
              className="justify-content-center align-items-center small-footer m-0 p-0"
            >
              <p
                style={{
                  textAlign: "center",
                  color: "white",
                  paddingTop: 15,
                }}
              >
                © 2020 Copyright: Techworld.com
              </p>
            </Row>
          </footer>
        </HelmetProvider>
      </Provider>
      <div
        style={{
          position: "fixed",
          bottom: 100,
          right: 20,
          width: 100,
          height: 100,
        }}
      >
        <MessengerCustomerChat
          pageId="101159682236047"
          appId="657246228332033"
        />
      </div>
    </React.Fragment>
  );
};
export default AppRoute;
