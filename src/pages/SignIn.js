import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import "../styles/material.css";
import { login, saveUserInfoRedux } from "../redux/actions/userAction";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { MyModal, IndicatorModal } from "../components";
import { useHelmetMeta } from "../untils/useHelmet";
const SignIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const _handleSignInClick = async () => {
    try {
      MyModal.show(() => {}, <IndicatorModal />);
      // const token = await login(email, password);
      // saveUserInfoRedux(dispatch, {});
      // console.log('long token', token);

      MyModal.hide(gotoProfile());
    } catch (err) {
      MyModal.hide(() => alert("wrong"));
      console.log("long signin err", err);
    }
  };
  const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };
  const validatePassword = (pass) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(pass);
  };
  const gotoProfile = () => {
    history.push("/user_info");
  };
  return (
    <Container className="py-5">
      {useHelmetMeta("sign in page")}
      <Container
        fluid
        className="d-flex flex-column justify-content-center align-items-center mb-5"
      >
        <Row className="my-5" />

        <Col lg="5" md="10" sm="10" className="mt-5 z-depth3">
          <form className="m-5">
            <Row className="justify-content-center p-0 m-0">
              <h3 style={{ color: "#4F4F4F" }}>Sign In</h3>
            </Row>
            <Row className="d-flex justify-content-around align-items-center mt-3">
              <TextField
                label="Email"
                className="w-100"
                color={validateEmail(email) ? "primary" : "secondary"}
                onChange={(e) => setEmail(e?.target?.value)}
              />
            </Row>
            <Row className="d-flex justify-content-around align-items-center mt-3">
              <TextField
                label="Password"
                className="w-100"
                color={validatePassword(password) ? "primary" : "secondary"}
                type="password"
                onChange={(e) => {
                  setPassword(e?.target?.value);
                }}
              />
            </Row>

            <Row className="mt-3 justify-content-around align-items-center">
              <p
                style={{
                  fontSize: 14,
                  color: "black",
                  marginRight: 10,
                  fontWeight: "300",
                }}
              >
                Remember me
              </p>
              <p
                style={{
                  fontSize: 14,
                  color: "#949494",
                  fontWeight: "300",
                }}
              >
                forgot your password ?
              </p>
            </Row>

            <Row className="justify-content-around align-items-center">
              <Col lg="5" md="5">
                <Button
                  // disabled={
                  // 	validateEmail(email) && validatePassword(password)
                  // 		? false
                  // 		: true
                  // }
                  onClick={_handleSignInClick}
                  className="button-container-box-shadow"
                  style={{
                    marginTop: 10,
                    color: "white",
                    backgroundColor:
                      validateEmail(email) && validatePassword(password)
                        ? "#4285f4"
                        : "#7a7a7a",
                    color: "white",
                    borderWidth: 0,
                    borderRadius: 25,
                    width: "100%",
                    height: 50,
                  }}
                >
                  Sign In
                </Button>
              </Col>
            </Row>
            <Row className="justify-content-center align-items-center mt-3">
              <p style={{ color: "#949494", fontWeight: "300" }}>
                Not a member ?{" "}
              </p>
              <NavLink exact to="/sign_up">
                <p
                  style={{
                    marginLeft: 10,
                    color: "#4285f4",
                    fontWeight: "300",
                  }}
                >
                  register
                </p>
              </NavLink>
            </Row>
          </form>
        </Col>
      </Container>
    </Container>
  );
};
const MyDropdownPicker = ({ items, title }) => {
  const [value, setValue] = useState(0);
  return (
    <Col
      md="6"
      className=" d-flex flex-column justify-content-center align-items-start p-0"
    >
      <InputLabel id="label">{title}</InputLabel>
      <FormControl variant="outlined" className="w-75">
        <Select labelId="label" id="select" value={value}>
          {items?.map((v, i) => (
            <MenuItem key={`${v}-${i}`} value={i} onClick={() => setValue(i)}>
              {v}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Col>
  );
};
export default SignIn;
