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
import momo from "../assets/momo.png";

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
  const [method, setMethod] = useState("paypal");
  useEffect(() => {
    setCardName("");
    setCardNumber("");
    setCVV("");

    setExpireDate("");
  }, [method]);

  const papalRef = useRef();

  return (
    <Container fluid className="pb-5" style={{ backgroundColor: "#F9F9FF" }}>
      <Row className="title-container mt-5">
        <p class="page-title">Phương thức thanh toán</p>
      </Row>
      <MyStepper activeStep={2} />
      <Container className="mt-5" style={{ backgroundColor: "#F9F9FF" }}>
        <Row>
          <Col lg="6" md="6" sm="6" className="pt-2">
            <img
              alt="image"
              src={paypal}
              style={{ width: "40%", maxHeight: 100 }}
            />
            <Row className="justify-content-center mt-1">
              <Button
                onClick={() => setMethod("paypal")}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  backgroundColor: method === "paypal" ? "#458AFF" : "white",
                  borderWidth: method === "paypal" ? 0 : 1,
                  marginRight: 5,
                }}
              />
              <p>Thanh toán với Paypal</p>
            </Row>
          </Col>
          <Col lg="6" md="6" sm="6" className="pt-2">
            <img
              alt="image"
              src={momo}
              style={{ width: "auto", height: 100 }}
            />
            <Row className="justify-content-center mt-1">
              <Button
                onClick={() => setMethod("momo")}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  backgroundColor: method === "momo" ? "#458AFF" : "white",
                  borderWidth: method === "momo" ? 0 : 1,
                  marginRight: 5,
                }}
              />
              <p>Thanh toán bằng MOMO</p>
            </Row>
          </Col>
        </Row>
      </Container>
      <Container>
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
            disabled={!method}
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
