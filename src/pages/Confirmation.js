import React, { useCallback, memo, useState } from "react";
import { NavLink, useHistory, Link, useParams } from "react-router-dom";
import { Button, Container, Row } from "reactstrap";
import Header from "../components/Header";
import TitleBackground from "../assets/slider_background.png";
import "../styles/pageTitle.css";
import "../styles/confirmation.css";
import { Col } from "reactstrap";
import { Table } from "reactstrap";
import { AlertModal, IndicatorModal, MyStepper } from "../components";
import "../styles/material.css";
import { Divider } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getNumberWithDot } from "../untils/numberFormater";
import { clearCart, sendOrder } from "../redux/actions/cartAction";
import { Alert } from "reactstrap/lib/Alert";
import MyModal from "../components/MyModal";
// import socket from "../untils/socket";
import {
  sendNoti,
  useCoupon as usingCoupon,
} from "../redux/actions/userAction";
import moment from "moment";

import HMACSHA256 from "crypto-js/hmac-sha256";
import {
  ACCESS_KEY,
  MOMO_ENDPOINT,
  PARTNER_CODE,
  SECRET_KEY,
} from "../constants/constants";
import Axios from "axios";

import queryString from "query-string";

const Confirmation = memo(() => {
  const params = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const { payment, shippingInfo, items } = useSelector(
    (state) => state.cartReducer
  );
  const { id, token } = useSelector((state) => state.userReducer.userInfo);
  const { coupon } = useSelector((state) => state?.userReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const { method, cardName, cardNumber, cvv, expireDate } = payment;
  const {
    first_name,
    last_name,
    address,
    secondAddr,
    phone_number,
    city,
    district,
    username,
    note,
    voucher,
  } = shippingInfo;

  const papalRef = React.useRef();

  console.log("voucher ne", voucher);
  console.log("load ne", payment, shippingInfo, items);
  let param = queryString.parse(history.location.search);

  console.log("PRAMS", param);
  const toggle = () => setIsOpen(!isOpen);
  const formatPlaceOrderData = () => {
    const cartDetails = [...items]?.map((v) => ({
      productId: v?.id,
      quantity: v?.amount,
    }));
    let total = [...items].reduce((x, y) => (x += y?.price * y?.amount), 0);
    if (voucher && voucher.discountPercent) {
      total -= (total / 100) * voucher.discountPercent;
    }
    total += 50000;
    return {
      CustomerId: id,
      ShippingAddress: address,
      Note: note,
      StatusId: 1,
      Total: total,
      OrderDetails: cartDetails,
      PaymentMethod: payment.method,
      Discount:
        voucher && voucher.discountPercent ? voucher.discountPercent : 0,
      PaymentInfo: "AHAHHAHA",
    };
  };

  const randomId = Date.now().toString();

  const paymentMomo = async () => {
    let decrypStr =
      "partnerCode=" +
      "MOMOJLJ120210715" +
      "&accessKey=" +
      "7Bnrs3yGlDjHyB6U" +
      "&requestId=" +
      randomId +
      "&amount=" +
      "1000" +
      "&orderId=" +
      randomId +
      "&orderInfo=" +
      "LONG NGUYEN" +
      "&returnUrl=" +
      "https://shop-cnweb.herokuapp.com/finish" +
      "&notifyUrl=" +
      "https://momo.vn" +
      "&extraData=" +
      "email=abc@gmail.com";

    let saveStr = JSON.stringify(formatPlaceOrderData());
    localStorage.setItem("ORDER", saveStr);
    localStorage.setItem("ORDER_ID", randomId);
    localStorage.setItem("TOKEN", token);

    let signature = HMACSHA256(decrypStr, SECRET_KEY).toString();
    let data = JSON.stringify({
      accessKey: "7Bnrs3yGlDjHyB6U",
      partnerCode: "MOMOJLJ120210715",
      requestType: "captureMoMoWallet",
      notifyUrl: "https://momo.vn",
      returnUrl: "https://shop-cnweb.herokuapp.com/finish",
      orderId: randomId,
      amount: "1000",
      orderInfo: "LONG NGUYEN",
      requestId: randomId,
      extraData: "email=abc@gmail.com",
      signature: signature,
    });
    const res = await Axios({
      method: "post",
      url: "https://test-payment.momo.vn/gw_payment/transactionProcessor",
      data: data,
    });
    // const res = await api.post("", JSON.stringify(data));

    window.location.replace(res.data.payUrl);
  };
  const paypalPayment = async () => {};

  const _onCheckoutPress = async () => {
    if (payment.method === "paypal") {
      paypalPayment();
      return;
    }
    paymentMomo();
  };

  const saveOrder = async (data) => {
    try {
      MyModal.show(() => {}, <IndicatorModal title="Order sending..." />);
      const orderInfo = JSON.stringify({
        ...formatPlaceOrderData(),
        PaymentInfo: JSON.stringify(data),
      });
      console.log(orderInfo);
      const res = await sendOrder(token, orderInfo);
      console.log("order success", res);
      // MyModal.show(() => {}, <AlertModal title="Order Successfully !" />);
      if (voucher && voucher.discountPercent) {
        dispatch(usingCoupon(id, voucher.code, coupon, token));
      }

      MyModal.hide();
      localStorage.setItem("ORDER", "");
      localStorage.setItem("ORDER_ID", "");
      clearCart(dispatch);
      history.push("/finish");
    } catch (err) {
      MyModal.hide();
      console.log("Place Order Err", err);
    }
  };
  const sendMomoOrder = async (data) => {
    try {
      MyModal.show(() => {}, <IndicatorModal title="Order sending..." />);
      const ORDER = await JSON.parse(data);
      ORDER.PaymentInfo = JSON.stringify(param);
      console.log("ORDER", ORDER);
      const orderInfo = JSON.stringify(ORDER);
      const savedToken = localStorage.getItem("TOKEN");
      const res = await sendOrder(savedToken, orderInfo);
      if (voucher && voucher.discountPercent) {
        dispatch(usingCoupon(id, voucher.code, coupon, token));
      }
      localStorage.setItem("ORDER", "");
      localStorage.setItem("ORDER_ID", "");
      MyModal.hide();
      clearCart(dispatch);
      history.push("/finish");
    } catch (err) {
      MyModal.hide();
      console.log("Place Order Err", err);
    }
  };
  React.useEffect(() => {
    if (payment.method === "paypal") {
      window.paypal
        .Buttons({
          createOrder: (data, actions, err) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: "Dien Thoai",
                  amount: {
                    currency_code: "USD",
                    value: 15.0,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            saveOrder(order);
          },
          onError: (err) => {
            console.log("ERROR ORDER LOG", err);
          },
        })
        .render(papalRef.current);
    }
  }, []);
  React.useEffect(() => {
    if (
      Object.keys(param).length > 4 &&
      param.orderId === localStorage.getItem("ORDER_ID")
    ) {
      sendMomoOrder(localStorage.getItem("ORDER"));
    }
  }, []);

  return (
    <Container fluid style={{ backgroundColor: "#F4FAFE" }} className="pb-5">
      <Row className="title-container mt-5">
        <p class="page-title">Xác nhận</p>
      </Row>
      <MyStepper activeStep={3} />
      <Container className="pb-5">
        <Row className="w-100 justify-content-center">
          <h3>Kiểm tra lại thông tin</h3>
        </Row>
        <Container className="z-depth2 p-5 bg-white">
          <Row>
            <Col lg="6" md="10">
              <Row className="justify-content-between px-4">
                <h6>Người mua</h6>
                <p style={{ color: "#4489FD" }}></p>
              </Row>
              <p
                style={{
                  letterSpacing: 8,
                  color: "#D1D6DA",
                  fontWeight: "bold",
                  overflow: "hidden",
                  display: "block",
                  lineHeight: "0.5 rem",
                  textAlign: "center",
                }}
              >
                ----------------------------------
              </p>
              <Row className="justify-content-between px-4">
                <h6>Tên: </h6>
                <p>{`${first_name} ${last_name}`}</p>
              </Row>
              <Row className="justify-content-between px-4">
                <h6>Email: </h6>
                <p>{username}</p>
              </Row>
              <Row className="justify-content-between px-4">
                <h6>Số điện thoại: </h6>
                <p>{`${phone_number}`}</p>
              </Row>
              <Row className="justify-content-between px-4">
                <h6>Ghi chú: </h6>
                <p>{`${note}`}</p>
              </Row>
            </Col>
            <Col lg="6" md="10">
              <Row className="justify-content-between px-4">
                <h6>Địa chỉ nhận hàng</h6>
                <p style={{ color: "#4489FD" }}></p>
              </Row>
              <p
                style={{
                  letterSpacing: 8,
                  color: "#D1D6DA",
                  fontWeight: "bold",
                  overflow: "hidden",
                  display: "block",
                  lineHeight: "0.5 rem",
                  textAlign: "center",
                }}
              >
                --------------------------------
              </p>
              <Row className="justify-content-between px-4">
                <h6>Thành phố: </h6>
                <p>{city}</p>
              </Row>
              <Row className="justify-content-between px-4">
                <h6>Quận: </h6>
                <p>{district}</p>
              </Row>
              <Row className="justify-content-between px-4">
                <h6>Địa chỉ </h6>
                <p>{address}</p>
              </Row>
              <Row className="justify-content-between px-4">
                <h6>Địa chỉ 2</h6>
                <p>{secondAddr}</p>
              </Row>
            </Col>
          </Row>
          <Row className="mt-3">
            {method !== "delivery" ? (
              <Col lg="6" md="10">
                <Row className="justify-content-between px-4">
                  <h6>Thanh toán</h6>
                  <p style={{ color: "#4489FD" }}></p>
                </Row>
                <p
                  style={{
                    letterSpacing: 8,
                    color: "#D1D6DA",
                    fontWeight: "bold",
                    overflow: "hidden",
                    display: "block",
                    lineHeight: "0.5 rem",
                    textAlign: "center",
                  }}
                >
                  --------------------------------
                </p>
                <Row className="justify-content-between px-4">
                  <h6>Phương thúc thanh toán: </h6>
                  <p>{method}</p>
                </Row>
                <Row className="justify-content-between px-4">
                  <h6>Tên chủ thẻ: </h6>
                  <p>{cardName ? cardName : "None"}</p>
                </Row>
                <Row className="justify-content-between px-4">
                  <h6>Số thẻ: </h6>
                  <p>{cardNumber ? cardNumber : "None"}</p>
                </Row>
                <Row className="justify-content-between px-4">
                  <h6>CVV: </h6>
                  <p>{cvv ? cvv : "None"}</p>
                </Row>
                <Row className="justify-content-between px-4">
                  <h6>Ngày hết hạn: </h6>
                  <p>{expireDate ? expireDate : "None"}</p>
                </Row>
              </Col>
            ) : (
              <Col lg="6" md="10">
                <Row className="justify-content-between px-4">
                  <h6>Thanh toán</h6>
                  <p style={{ color: "#4489FD" }}></p>
                </Row>
                <p
                  style={{
                    letterSpacing: 8,
                    color: "#D1D6DA",
                    fontWeight: "bold",
                    overflow: "hidden",
                    display: "block",
                    lineHeight: "0.5 rem",
                    textAlign: "center",
                  }}
                >
                  --------------------------------
                </p>
                <Row className="justify-content-between px-4">
                  <h6>Phương thức: </h6>
                  <p>{method}</p>
                </Row>
              </Col>
            )}

            <Col lg="6" md="10">
              <Row className="justify-content-between px-4">
                <h6>Đơn hàng</h6>
                <p style={{ color: "#4489FD" }}></p>
              </Row>
              <p
                style={{
                  letterSpacing: 8,
                  color: "#D1D6DA",
                  fontWeight: "bold",
                  overflow: "hidden",
                  display: "block",
                  lineHeight: "0.5 rem",
                  textAlign: "center",
                }}
              >
                --------------------------------
              </p>
              {items?.map((v, i) => (
                <Row className="justify-content-between px-4">
                  <h6>{`${v?.name}`} </h6>
                  <p>{`${getNumberWithDot(v?.price * v?.amount)} vnđ`}</p>
                </Row>
              ))}
            </Col>
          </Row>
        </Container>
        <Row className="w-100 justify-content-center p-5">
          <Button
            onClick={() => history.goBack()}
            className="button-container-box-shadow mt-5 w-25 mr-4"
            style={{
              marginTop: 10,
              color: "white",
              backgroundColor: "#4285f4",
              color: "white",
              borderWidth: 0,
              borderRadius: 25,
              width: "100%",
              height: 50,
            }}
          >
            Trở về
          </Button>
          {payment.method === "paypal" ? (
            <div ref={papalRef} />
          ) : (
            <Button
              onClick={_onCheckoutPress}
              className="button-container-box-shadow mt-5 w-25"
              style={{
                marginTop: 10,
                color: "white",
                backgroundColor: "#4285f4",
                color: "white",
                borderWidth: 0,
                borderRadius: 25,
                width: "100%",
                height: 50,
              }}
            >
              Thanh toán
            </Button>
          )}
        </Row>
      </Container>
    </Container>
  );
});
export default Confirmation;
