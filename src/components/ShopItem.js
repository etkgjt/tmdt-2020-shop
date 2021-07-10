import React from "react";
import { Button, Col, Row } from "reactstrap";
import MyRating from "./MyRating";
import "../styles/material.css";
import "../styles/pageTitle.css";
import "../styles/shopPage.css";
import { useHistory } from "react-router-dom";
import { getNumberWithDot } from "../untils/numberFormater";
import { Icon, IconButton } from "@material-ui/core";
import ReactGA from "react-ga";

const ShopItem = ({ addToCart, item, idx, dispatch, favoriteList = [] }) => {
  const history = useHistory();
  return (
    <Col
      className="p-3 mt-1"
      xl="4"
      lg="12"
      md="12"
      sm="12"
      key={`${item.name}-${idx}`}
    >
      <Col className="button-container-box-shadow">
        <IconButton>
          {favoriteList.filter((v) => v === item?.id).length === 1 ? (
            <Icon style={{ fontSize: 30, color: "#f73378" }}>favorite</Icon>
          ) : (
            <Icon style={{ fontSize: 30 }}>favorite_border</Icon>
          )}
        </IconButton>
        <div
          className="mb-50 text-center single_items pt-5"
          style={{ maxHeight: "400px" }}
        >
          <img src={item.images?.[0]?.url}></img>
        </div>
        <Col
          style={{ borderRadius: 5 }}
          className="py-4 d-flex flex-column justify-content-center align-items-center mt-4"
        >
          <p
            className="text-center m-0 my-1"
            style={{
              fontSize: 16,
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
              whiteSpace: "nowrap",
            }}
          >
            {item?.name}
          </p>
          <p className="text-center m-0 my-1">{`${getNumberWithDot(
            item?.price
          )}`}</p>
          {/* <p className="text-center m-0 my-1">{`Brand-${item?.brand}`}</p>
					<p className="text-center m-0 my-1">{`Category-${item?.category}`}</p>
					<p className="text-center m-0 my-1">{`Color-${item?.color}`}</p>
					<p className="text-center m-0 my-1">{`Date-${item?.dateArrive}`}</p>
					<p className="text-center m-0 my-1">{`BuyingTimes-${item?.buyingTimes}`}</p> */}

          <MyRating value={item?.rating} />
          <Row className="justify-content-around p-0 w-100">
            <Col className="p-0 w-50 px-2">
              <Button
                className="button-thin-shadow w-100"
                style={{
                  borderRadius: 20,
                  backgroundColor: "#4285F4",
                  color: "white",
                  borderWidth: 0,
                  fontSize: 15,
                }}
                onClick={() => {
                  // ReactGA.event({
                  //   category: "Button",
                  //   action: "User click add to cart",
                  // });
                  addToCart(dispatch, item);
                }}
              >
                Thêm
              </Button>
            </Col>
            <Col className="p-0 w-50 px-2">
              <Button
                onClick={() => {
                  // ReactGA.event({
                  //   category: "Button",
                  //   action: "User click details",
                  // });
                  history.push(
                    `/${item?.category?.name
                      ?.toLowerCase()
                      ?.replace(" ", "_")}/${item?.id}`,
                    item
                  );
                }}
                className="button-thin-shadow w-100"
                style={{
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: "#4285F4",
                  backgroundColor: "white",
                  color: "#4285F4",
                  fontSize: 15,
                }}
              >
                Chi tiết
              </Button>
            </Col>
          </Row>
        </Col>
      </Col>
    </Col>
  );
};
export default ShopItem;
