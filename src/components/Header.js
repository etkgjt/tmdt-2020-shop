import React, { useCallback, memo, useState, useEffect } from "react";
import { BrowserRouter, Link, NavLink, useHistory } from "react-router-dom";

import "../styles/header.css";

import {
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavbarText,
  Collapse,
  Nav,
  NavItem,
  Col,
  Row,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Button,
} from "reactstrap";
import mainLogo from "../assets/newLogo6.png";
import { Badge, Icon } from "@material-ui/core";
import { useSelector } from "react-redux";
import "../styles/material.css";
import reducers from "../redux/reducer/index";
import { login } from "../redux/actions/userAction";
import { MyModal, LoginRequestModal, SignInModal } from "../components";

import SearchBar from "./SearchBar";
const data = [
  {
    path: "/",
    title: "Trang chủ",
  },
  {
    path: "/laptop",
    title: "Laptop",
  },
  {
    path: "/smart_phone",
    title: "Điện thoại",
  },
  {
    path: "/tablet",
    title: "Máy tính bảng",
  },
  {
    path: "/accessories",
    title: "Phụ kiện",
  },
  {
    path: "/contact",
    title: "Liên hệ",
  },
];
const _renderNavItem = (data) => (
  <NavItem className="nav-link mx-2" key={data?.title}>
    <NavLink
      exact
      to={data?.path}
      className="nav-link-title hvr-grow"
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: 25,
        padding: 0,
        paddingBottom: 10,
      }}
    >
      <Button
        activeStyle={{ borderColor: "white" }}
        className="header-button button-hover-depth0"
        style={{
          backgroundColor: "transparent",
        }}
        color="white"
      >
        <p
          className="button-hover-depth0"
          style={{
            margin: 0,
            fontSize: 16,

            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data?.title}
        </p>
      </Button>
    </NavLink>
  </NavItem>
);
const _renderDropDownItems = (data) => (
  <DropdownItem
    className="nav-link"
    style={{
      backgroundColor: "#4285F4",
      color: "white",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    }}
    key={data?.title}
  >
    <NavLink
      exact
      to={data?.path}
      className="nav-link-title hvr-grow"
      activeStyle={{ fontWeight: "900" }}
    >
      {data?.title}
    </NavLink>
  </DropdownItem>
);
const NavigationBar = ({ setShow }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartBadgeNum, setCartBadgeNum] = useState(0);
  const data1 = useSelector((state) => state?.cartReducer?.items);

  const [items, setItems] = useState([]);
  useEffect(() => {
    setCartBadgeNum(items?.reduce((x, y) => (x += y?.amount), 0));
  }, [items]);
  useEffect(() => {
    setItems(data1);
  }, [data1]);

  const toggle = () => setIsOpen(!isOpen);
  const { loggedIn } = useSelector((state) => state.userReducer);
  console.log("loggedIn", loggedIn);

  return (
    <Navbar expand="md" light>
      <NavLink exact to="/">
        <img
          src={mainLogo}
          className="img-fluid"
          style={{ height: 80, width: 120 }}
        ></img>
      </NavLink>

      <Collapse navbar className="justify-content-center ">
        <div className="ml-sm-auto navbar-nav main-menu">
          <Nav navbar>{data.map((item) => _renderNavItem(item))}</Nav>
        </div>
      </Collapse>
      <Container className="icon_wrapper">
        <Icon
          onClick={() => setShow(true)}
          className="_icon"
          style={{ fontSize: 30 }}
        >
          search
        </Icon>
        {loggedIn ? (
          <NavLink
            exact
            to="/user_info"
            style={{ color: "white" }}
            activeStyle={{ color: "black" }}
          >
            <Icon
              // onClick={() =>
              // 	MyModal.show(
              // 		() => console.log('show ne'),
              // 		<LoginRequestModal />
              // 	)
              // }
              className="_icon"
              style={{ fontSize: 30 }}
            >
              person
            </Icon>
          </NavLink>
        ) : (
          <Icon
            onClick={() =>
              MyModal.show(() => console.log("show ne"), <SignInModal />)
            }
            className="_icon"
            style={{ fontSize: 30 }}
          >
            person
          </Icon>
        )}

        <NavLink
          exact
          to="/cart"
          style={{ color: "white" }}
          activeStyle={{ color: "black" }}
        >
          <Badge
            badgeContent={cartBadgeNum}
            color="secondary"
            style={{ marginRight: "20px" }}
          >
            <Icon onClick={() => {}} className="_icon" style={{ fontSize: 30 }}>
              shopping_cart_outlined
            </Icon>
          </Badge>
        </NavLink>
      </Container>
      <Dropdown isOpen={isOpen} toggle={toggle}>
        <DropdownToggle className="navbar-toggler">
          <ion-icon name="menu-outline"></ion-icon>
        </DropdownToggle>
        <DropdownMenu right className="p-0">
          {data.map((item) => _renderDropDownItems(item))}
        </DropdownMenu>
      </Dropdown>
      {/* <NavbarToggler onClick={toggle} /> */}
    </Navbar>
  );
};

const Header = () => {
  console.log("header render ??");
  const [show, setShow] = useState(false);
  const history = useHistory();
  const onSearchSubmit = (key) => {
    history.push("/search", { keyword: key });
  };
  return (
    <Container
      fluid
      className="header-area header-container slideIn header-gradient-bg z-depth3"
      style={{ color: "white" }}
    >
      <div>
        {show ? (
          <SearchBar
            onUnfocusFunc={() => setShow(false)}
            onSubmitFunc={(v) => onSearchSubmit(v)}
          />
        ) : (
          <NavigationBar setShow={setShow} />
        )}
      </div>
    </Container>
  );
};

export default Header;
