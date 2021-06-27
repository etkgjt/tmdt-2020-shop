import { MDBBtn, MDBBtnGroup } from "mdbreact";
import React, { useCallback, memo, useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Input,
  ListGroup,
  ListGroupItem,
  Fade,
  Carousel,
  CarouselItem,
} from "reactstrap";
import "../styles/pageTitle.css";
import "../styles/cart.css";
import { Icon, TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import useDebounce from "../untils/debounce";
import _ from "lodash";
import { NavLink, useHistory } from "react-router-dom";
import "../styles/forAll.css";
import { MyStepper } from "../components";
import visa from "../assets/visa.svg";
import mastercard from "../assets/mastercard.svg";
import paypal from "../assets/paypal.svg";
import pay from "../assets/pay.svg";
import { updatePaymentMethod } from "../redux/actions/cartAction";
import moment from "moment";
const PaymentMethod = () => {
  const history = useHistory();
  console.log("cart render ne");
  const dispatch = useDispatch();
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCVV] = useState("");

  const [expireDate, setExpireDate] = useState("20/2/2020");
  const [method, setMethod] = useState("credit");
  useEffect(() => {
    setCardName("");
    setCardNumber("");
    setCVV("");

    setExpireDate("");
  }, [method]);

  const papalRef = useRef();
  useEffect(() => {
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
          console.log("APPROVE ORDER", order);
        },
        onError: (err) => {
          console.log("ERROR ORDER", err);
        },
      })
      .render(papalRef.current);
  }, []);

  return (
    <Container fluid className="pb-5" style={{ backgroundColor: "#F9F9FF" }}>
      <Row className="title-container mt-5">
        <p class="page-title">Phương thức thanh toán</p>
      </Row>
      <MyStepper activeStep={2} />
      <Container
        className="mt-5"
        style={{
          backgroundColor: "#F9F9FF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row>
          <div ref={papalRef}></div>
        </Row>
      </Container>
      <Container>
        {/* {method !== "delivery" ? (
          <Container fluid className="p-0">
            <Row className="d-flex justify-content-around align-items-center mt-5">
              <TextField
                label="Tên chủ thẻ"
                className="w-100"
                variant="outlined"
                onChange={(e) => setCardName(e?.target?.value)}
              />
            </Row>
            <Row className="pl-0 justify-content-between align-items-center justify-content-center mt-3">
              <Col md="6" className="m-0 p-0 pr-5">
                <TextField
                  label="Số thẻ"
                  className="w-100"
                  variant="outlined"
                  onChange={(e) => setCardNumber(e?.target?.value)}
                />
              </Col>
              <Col md="6" className="p-0">
                <TextField
                  label="CVV"
                  className="w-100"
                  variant="outlined"
                  onChange={(e) => setCVV(e?.target?.value)}
                />
              </Col>
            </Row>
            <Row className="d-flex justify-content-around align-items-center mt-1">
              <TextField
                onChange={(e) => setExpireDate(e?.target?.value)}
                label="Ngày hết hạn"
                className="w-100"
                variant="outlined"
                type="date"
                defaultValue={moment().format("YYYY-MM-DD")}
              />
            </Row>
          </Container>
        ) : (
          <div />
        )} */}
        <Row className="justify-content-center w-100">
          <Button
            onClick={() => history.goBack()}
            className="button-container-box-shadow w-25 mr-4"
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
          <Button
            onClick={() => {
              updatePaymentMethod(dispatch, {
                method,
                cardName,
                cardNumber,
                cvv,
                expireDate,
              });
              history.push("/confirmation");
            }}
            disabled={
              method !== "delivery" &&
              (!cardName || !cardNumber || !cvv || !expireDate)
            }
            className="button-container-box-shadow w-25 "
            style={{
              marginTop: 10,
              color: "white",
              backgroundColor: "#4285f4",
              color: "white",
              borderWidth: 0,
              borderRadius: 25,
              height: 50,
            }}
          >
            Tiếp tục
          </Button>
        </Row>
      </Container>
    </Container>
  );
};
export default PaymentMethod;
