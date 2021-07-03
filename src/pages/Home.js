import React, { useCallback, memo, useState, useEffect } from "react";

import { Button, Col, Container, Row } from "reactstrap";
import { CustomCarousel } from "../components";
import logo from "../assets/newLogo.png";
import {
  popular1,
  popular2,
  popular3,
  popular4,
  popular5,
  popular6,
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  newProduct1,
  newProduct2,
  newProduct3,
  watch,
} from "../assets";

import "../styles/pageTitle.css";
import "../styles/home.css";
import "../styles/shopPage.css";
import "../styles/material.css";
import Icon from "@material-ui/core/Icon";
import { Rating } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import MyModal from "../components/MyModal";
import { Link, useHistory } from "react-router-dom";
import { getNumberWithDot } from "../untils/numberFormater";
import { addToCart } from "../redux/actions/cartAction";
import { CircularProgress } from "@material-ui/core";
import { loadShopDataSync } from "../redux/actions/shopAction";
import { Helmet } from "react-helmet";
const data = [
  {
    name: "Thermo Ball Etip Gloves",
    price: 20,
    img: popular1,
    dateArrive: "2019-05-29",
    buyingTimes: 9,
  },
  {
    name: "Thermo Ball Etip Gloves",
    price: 30.5,
    img: popular2,
    dateArrive: "2020-10-12",
    buyingTimes: 20,
  },

  {
    name: "Thermo Ball Etip Gloves",
    price: 292,
    img: popular3,
    dateArrive: "2020-01-12",
    buyingTimes: 18,
  },

  {
    name: "Thermo Ball Etip Gloves",
    price: 421,
    img: popular4,
    dateArrive: "2019-12-02",
    buyingTimes: 5,
  },

  {
    name: "Thermo Ball Etip Gloves",
    price: 220,
    img: popular5,
    dateArrive: "2020-03-25",
    buyingTimes: 2,
  },

  {
    name: "Thermo Ball Etip Gloves",
    price: 201,
    img: popular6,
    dateArrive: "2020-10-08",
    buyingTimes: 80,
  },
];
const ShopMethod = () => (
  <Container className="justify-content-center">
    <Helmet>
      <title>Home</title>
      <meta
        name="og:description"
        content="this is web selling technology product"
      />
      <meta name="og:title" content="Long-web-ne" />
      <meta
        name="og:image"
        content="https://www.hydrocarbons-technology.com/wp-content/uploads/sites/9/2020/09/shutterstock_1152185600-1440x1008-1-857x600.jpg"
      />
    </Helmet>
    <h4 className="text-center" style={{ fontWeight: "bold", fontSize: 40 }}>
      Dịch vụ của chúng tôi
    </h4>
    <h4 className="text-center my-4" style={{ fontWeight: "200" }}>
      Với việc mua hàng tại TechWorld, chúng tôi tin rằng quý khách luôn có
      những trải nghiệm mua hàng an toàn và tuyệt vời.
    </h4>
    <Row className="my-5 py-5">
      <Col xl="3" lg="6" className="px-3">
        <Col
          className="button-hover-depth3 pt-3"
          style={{
            backgroundColor: "#00C851",
            color: "white",
            height: "400px",
          }}
        >
          <Row className="px-5 mt-2 justify-content-center ">
            <Icon style={{ fontSize: 70, color: "white" }}>
              local_shipping_rounded
            </Icon>
          </Row>
          <Row className="px-5 mt-4">
            <h5>Vận chuyển</h5>
          </Row>
          <Row className="px-5 mt-2">
            <p>
              Quy mô vận chuyển khắp cả nước, đáp ứng nhu cầu của mọi khác hàng
              từ mọi vùng miền.
            </p>
            <br />
          </Row>
        </Col>
      </Col>
      <Col xl="3" lg="6" className="px-3">
        <Col
          className="button-hover-depth3 pt-3"
          style={{
            backgroundColor: "#ff4444",
            color: "white",
            height: "400px",
          }}
        >
          <Row className="px-5 mt-2 justify-content-center">
            <Icon style={{ fontSize: 70 }}>verified_user</Icon>
          </Row>
          <Row className="px-5 mt-4">
            <h5>Bảo mật</h5>
          </Row>
          <Row className="px-5 mt-2">
            <p>
              Bảo mật là một trong những phương châm hàng đầu của chúng tôi. Với
              công nghệ tiên tiến nhất, chúng tôi tin rằng sẽ mang lại cho khách
              hàng cảm giác an toàn khi mua hàng
            </p>
          </Row>
        </Col>
      </Col>
      <Col xl="3" lg="6" className="px-3">
        <Col
          className="button-hover-depth3 pt-3"
          style={{
            color: "white",
            backgroundColor: "#ffbb33",
            height: "400px",
          }}
        >
          <Row className="px-5 mt-2 justify-content-center">
            <Icon style={{ fontSize: 70 }}>headset_mic_rounded</Icon>
          </Row>
          <Row className="px-5 mt-4">
            <h5 style={{ textAlign: "center" }}>Hỗ trợ tận tình</h5>
          </Row>
          <Row className="px-5 mt-2">
            <p style={{ textAlign: "center" }}>
              Chúng tôi có đội ngũ hỗ trợ tận tình, luôn giải đáp mọi thắc mắc
              của quý khách
            </p>
            <br />
            <br />
          </Row>
        </Col>
      </Col>
      <Col xl="3" lg="6" className="px-3">
        <Col
          className="button-hover-depth3 pt-3"
          style={{
            backgroundColor: "#7E57C3",
            color: "white",
            height: "400px",
          }}
        >
          <Row className="px-5 mt-2 justify-content-center">
            <Icon style={{ fontSize: 70 }}>cached_two_tone</Icon>
          </Row>
          <Row className="mt-4 text-center w-100">
            <h5
              style={{
                textAlign: "center",
                width: "100%",
              }}
            >
              Hoàn trả
            </h5>
          </Row>
          <Row className="px-4 mt-2">
            <p style={{ textAlign: "center" }}>
              Mọi sản phẩm sẽ được đổi trả trong vòng 30 ngày kể từ ngày nhận
              hàng nếu khách hàng không hài lòng hoặc sản phậm không đúng với mô
              tả.
            </p>
          </Row>
        </Col>
      </Col>
    </Row>
  </Container>
);
const MyRating = ({ value }) => {
  return (
    <Rating size="large" name="size-large" precision={0.5} value={value} />
  );
};
const _renderItems = () => {
  const history = useHistory();
  const productsDataRedux = useSelector(
    (state) => state?.shopReducer?.products
  );

  const dispatch = useDispatch();
  const [data, setData] = useState(productsDataRedux ? productsDataRedux : []);
  let tempArr = [...data].sort((a, b) => b.rating - a.rating);
  useEffect(() => {
    // if (productsDataRedux && productsDataRedux.length)
    // 	setData(productsDataRedux);
    // else dispatch(loadShopDataSync());
  }, [productsDataRedux]);

  return tempArr && tempArr.length ? (
    tempArr.splice(0, 6).map((item, idx) => (
      <Col
        className="p-3 mt-1"
        xl="4"
        lg="12"
        md="12"
        sm="12"
        key={`${item.name}-${idx}`}
      >
        <Col className="button-container-box-shadow">
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
                  onClick={() => addToCart(dispatch, item)}
                >
                  Thêm
                </Button>
              </Col>
              <Col className="p-0 w-50 px-2">
                <Button
                  onClick={() => history.push("/single_product", item)}
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
    ))
  ) : (
    <CircularProgress />
  );
};

const Intro = () => (
  <Container fluid className="p-0 intro-area-shadow">
    <Container className="intro-area-container w-100 mt-lg-5" fluid>
      <Row className="intro-area">
        <Col xl="6" lg="6" md="4" sm="4">
          <div
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          ></div>
        </Col>
        <Col
          xl="6"
          lg="6"
          md="8"
          sm="8"
          className="intro-title-container pt-lg-5"
        >
          <h1 className="hvr-grow">Select your partner</h1>
          <p className="hvr-grow w-75 text-center">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat is aute irure Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat is aute irure Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat is aute irure
          </p>
        </Col>
      </Row>
    </Container>
  </Container>
);
const NewArrival = () => (
  <Container className="section-padding">
    <Row className="w-100 section-title-container">
      <h2 style={{ textAlign: "center", fontWeight: "600" }}>Sản phẩm mới</h2>
    </Row>
    <Row className="w-100 justify-content-center align-items-center mb-5">
      <p className="text-center w-75" style={{ fontWeight: "200" }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit fugit, error
        amet numquam iure provident voluptate esse quasi nostrum quisquam eum
        porro a pariatur veniam.
      </p>
    </Row>
    <Row>
      <Col xl="4" lg="4" md="6" sm="6">
        <div
          className="z-depth5 p-5 bg-white"
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <img
            src={
              "https://cdn.tgdd.vn/Products/Images/42/153856/iphone-11-do-1-1-org.jpg"
            }
            style={{ backgroundSize: "contain" }}
            className="hvr-grow"
          />
        </div>
      </Col>
      <Col xl="4" lg="4" md="6" sm="6">
        <div
          className="z-depth5 p-5"
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          <img
            src={`https://cdn.tgdd.vn/Products/Images/44/220174/apple-macbook-air-2020-i3-1-5-org.jpg?fbclid=IwAR04zB163CLpT9Y7_PUWsWbMYIRRjn4ENeAHY9vLeWi-Kw9-hriBw-YzdNw`}
            className="hvr-grow"
          />
        </div>
      </Col>
      <Col xl="4" lg="4" md="6" sm="6">
        <div
          className="z-depth5 p-5 bg-white"
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <img
            src={`https://cdn.tgdd.vn/Products/Images/522/221776/ipad-pro-12-9-inch-wifi-cellular-128gb-2020-bac-1020x680-org.jpg?fbclid=IwAR30peiMHCqSXHGRxQKQaonrYZfvvzvkHBb_XRt7Jbvw6JirE56PGrV_b_s`}
            className="hvr-grow"
          />
        </div>
      </Col>
    </Row>
  </Container>
);
const Gallery = () => (
  <Container className="gallery-area p-0 fix mt-5">
    <Row className="w-100 section-title-container">
      <h2 style={{ textAlign: "center", fontWeight: "600" }}>
        Sản phẩm bán chạy
      </h2>
    </Row>
    <Row className="w-100 justify-content-center align-items-center mb-5">
      <p className="text-center w-75" style={{ fontWeight: "200" }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit fugit, error
        amet numquam iure provident voluptate esse quasi nostrum quisquam eum
        porro a pariatur veniam.
      </p>
    </Row>
    <Row className="gallery-container">
      <Col
        xl="6"
        lg="4"
        md="6"
        sm="6"
        className="justify-content-center align-items-center"
      >
        <div
          className="z-depth5"
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <div className="gallery1 hvr-shrink" />
        </div>
      </Col>
      <Col xl="3" lg="4" md="6" sm="6">
        <div
          className="z-depth5"
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <div className="gallery2 hvr-shrink" />
        </div>
      </Col>
      <Col
        xl="3"
        lg="4"
        md="12"
        className="d-flex flex-column justify-content-around"
      >
        <div
          className="z-depth5"
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <div className="gallery3 hvr-shrink" />
        </div>
        <div
          className="z-depth5"
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            marginTop: "20px",
          }}
        >
          <div className="gallery4 hvr-shrink" />
        </div>
      </Col>
    </Row>
  </Container>
);
const Popular = () => {
  const history = useHistory();
  return (
    <Container className="popular-section-padding">
      <Col className="popular-section-title-container">
        <div className="popular-section-title">
          <h4
            className="popular-section-big-title mb-3"
            style={{ fontSize: 40 }}
          >
            Sản phẩm được yêu thích
          </h4>
          <p
            style={{
              textAlign: "center",
              color: "#777777",
              fontWeight: "300",
              fontSize: "16px",
            }}
          >
            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Quis ipsum suspendisse ultrices
            gravida.
          </p>
        </div>
      </Col>
      <Row className="w-100 justify-content-center">{_renderItems(data)}</Row>
      <Row
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <Button
          onClick={() => history.push("/smart_phone")}
          className="view-more-button container-box-shadow w-25"
          style={{
            borderWidth: 0,
            width: 150,
            height: 70,
            borderRadius: 35,
          }}
        >
          <h4 style={{ textAlign: "center", fontWeight: "600" }}>
            View more product
          </h4>
        </Button>
      </Row>
    </Container>
  );
};
const VideoArea = () => (
  <Container fluid className="video-area p-0 my-5 pt-5">
    <div className="video-background">
      <div className="play-button border">
        <Icon style={{ fontSize: 50 }}>play_arrow_rounded</Icon>
      </div>
      <div className="more-info">
        <h5>NEXT VIDEO</h5>
        <Icon style={{ fontSize: 40 }}>arrow_forward</Icon>
      </div>
    </div>
  </Container>
);
const ChoseWatchAd = () => {
  const history = useHistory();
  return (
    <Container className="watch-area-padding">
      <Row className="choice-container z-depth3 p-5 bg-white">
        <Col lg="5" md="6" className="px-5">
          <h2 className="choice-title">Choose Your Best</h2>
          <p>
            Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse.
          </p>
          <Button
            onClick={() => history.push("/laptop")}
            style={{ borderWidth: 0, borderRadius: 50 }}
            className="view-more-button container-box-shadow"
          >
            <h4 style={{ textAlign: "center", fontWeight: "600" }}>
              View more product
            </h4>
          </Button>
        </Col>
        <Col lg="6" md="6" sm="10">
          <div className="choice-watch-img1" />
        </Col>
      </Row>
      <Row className="choice-container z-depth3 p-5 bg-white">
        <Col lg="6" md="6" sm="10">
          <div className="choice-watch-img2" />
        </Col>
        <Col lg="5" md="6" className="px-5">
          <h2 className="choice-title">Choose Your Best</h2>
          <p>
            Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse.
          </p>
          <Button
            style={{ borderWidth: 0, borderRadius: 50 }}
            className="view-more-button container-box-shadow"
          >
            <h4
              style={{
                textAlign: "center",

                fontSize: 20,
              }}
            >
              View more product
            </h4>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
const Home = memo(() => {
  console.log("homepage render ne");

  return (
    <Container fluid className="p-0 pb-5 gradient-background ">
      {/* <CustomCarousel fluid className = "large-margin" /> */}
      <Intro />
      <NewArrival />
      {/* <CustomCarousel /> */}
      <Gallery />
      <Popular />

      <ChoseWatchAd />
      <Container>
        <ShopMethod />
      </Container>
    </Container>
  );
});
export default Home;
