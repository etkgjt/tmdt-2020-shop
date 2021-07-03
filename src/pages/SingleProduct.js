import React, { useCallback, memo, useState, useEffect } from "react";
import { Container, Row, Col, ButtonGroup, Input, Button } from "reactstrap";
import "../styles/pageTitle.css";
import {
  Card,
  Collapse,
  Icon,
  Button as Buttons,
  CircularProgress,
  LinearProgress,
  TextField,
} from "@material-ui/core";
import { Progress } from "reactstrap";

import { MDBContainer, MDBInput } from "mdbreact";
import {
  MyRating,
  MyModal,
  SignInModal,
  DescriptionDetailsForm,
  ShopItem,
  IndicatorModal,
  AlertModal,
} from "../components";

import "../styles/singleProduct.css";
import "../styles/material.css";
import { useLocation, useHistory } from "react-router-dom";
import { addToCart } from "../redux/actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import { getNumberWithDot } from "../untils/numberFormater";
import { Rating } from "@material-ui/lab";
import Cart from "./Cart";
import moment from "moment";
import {
  sendCommentToServer,
  removeFromFavorite,
  addToFavorite,
  updateReduxFavoriteList,
} from "../redux/actions/shopAction";
import socket from "../untils/socket";
import { useHelmetMeta } from "../untils/useHelmet";

const SingleProduct = memo(() => {
  console.log("product render ne");
  let { state } = useLocation();
  console.log("state ne", state);
  const [itemInfo, setItemInfo] = useState(
    state
      ? state
      : {
          name: "Fantasy T-shirt",
          category: "Shirt",
          price: 122,
          model: "Shirt 5407X",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, sapiente illo. Sit error voluptas repellat rerum quidem, soluta enim perferendis voluptates laboriosam. Distinctio, officia quis dolore quos sapiente tempore alias",
          color: "Black",
          delivery: "USE, Europe",
          rating: 4.5,
          img: [
            "https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12a.jpg",
            "https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12a.jpg",
            "https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12a.jpg",
            "https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12a.jpg",
          ],
        }
  );
  useEffect(() => {
    console.log("state ne", state, itemInfo);
    setItemInfo(state);
  }, [state]);
  console.log("state ne", state);
  return (
    <Container fluid className="gradient-background mb-5">
      {useHelmetMeta(
        `this is ${itemInfo.name}`,
        itemInfo.name,
        itemInfo.images[0].url
      )}
      <Row className="title-container mt-5">
        <p className="page-title">Chi tiết sản phẩm</p>
      </Row>
      <Container>
        <h2 className="mt-5">Chi tiết sản phẩm</h2>
        <ProductDetails productInfo={itemInfo} setInfo={setItemInfo} />
      </Container>
    </Container>
  );
});

const ProductImage = ({ data }) => {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  return (
    <Col lg="6" md="6" className="pr-2 mb-5 ">
      <Row
        className="m-0 p-0 z-depth1"
        style={{
          height: "500px",
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <img className="item-image w-100 " src={data?.[activeImgIndex]?.url} />
      </Row>
      <Row className="p-0 m-0 mt-2">
        {data.map((v, i) => (
          <Col
            lg="3"
            md="6"
            className="m-0 p-1"
            style={{ height: 100 }}
            onClick={() => setActiveImgIndex(i)}
          >
            <img
              key={`${i}`}
              className="z-depth1 h-100 img-fluid"
              src={v?.url}
            />
          </Col>
        ))}
      </Row>
    </Col>
  );
};

const ProductDetails = ({ productInfo, setInfo }) => {
  console.log("product info", productInfo);
  const {
    rating,
    name,
    category,
    price,
    brand,
    description,
    color,
    delivery,
    images = [],
    comments,
    id,
  } = productInfo;
  const { products, laptop, smartPhone, tablet, accessories, favorite } =
    useSelector((state) => state.shopReducer);
  const { loggedIn, userInfo } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const history = useHistory();
  const [amount, setAmount] = useState(1);
  const _add = () => {
    setAmount(amount + 1);
  };
  const _sub = () => {
    if (amount !== 0) setAmount(amount - 1);
  };
  const getTheSameProduct = () => {
    console.log("category ne", category);
    switch (category.id) {
      case 1: {
        return [...smartPhone].filter(
          (v) => v.name !== name && Math.abs(v.price - price) < 200000
        );
      }
      case 2: {
        return [...laptop].filter(
          (v) => v.price === price || Math.abs(v.price - price) < 1000000
        );
      }

      case 3: {
        return [...tablet].filter(
          (v) => v.price === price || Math.abs(v.price - price) < 200000
        );
      }
      case 4: {
        return [...accessories].filter(
          (v) => v.price === price || Math.abs(v.price - price) < 100000
        );
      }
      default: {
        return [];
      }
    }
  };
  const makeNewCommentFunc = (cmt) => {
    if (!loggedIn) {
      MyModal.show(() => {}, <SignInModal />);
    } else {
      sendComment(cmt);
    }
  };
  const sendComment = async (cmt) => {
    console.log("Send comment ne", cmt, userInfo);
    try {
      MyModal.show(() => {}, <IndicatorModal title="Send..." />);
      const sendData = {
        CustomerId: userInfo?.id,
        ProductId: id,
        Message: cmt?.message,
        Rating: cmt?.rate,
      };

      const res = await sendCommentToServer(
        JSON.stringify(sendData),
        userInfo.token
      );
      setInfo({
        rating,
        name,
        category,
        price,
        brand,
        description,
        color,
        delivery,
        images,
        comments: [
          ...comments,
          {
            bought: false,
            customer: {
              first_name: userInfo.first_name,
              id: userInfo?.id,
              last_name: userInfo.last_name,
              verified: true,
            },

            date: moment().toString(),
            id: Math.floor(Math.random() * 100),
            message: cmt.message,
            rate: cmt.rate,
          },
        ],
      });
      socket.emit("new-comment");

      console.log("Send thanh cong", res);
      MyModal.hide(() => {});
    } catch (err) {
      MyModal.hide(() => {});
      console.log("Send Comment err", err);
    }
  };
  const _renderItems = (dispatch, data, maxNum) => {
    let tempArr = [...data];
    console.log("data ne", data);
    return tempArr.map((item, idx) => {
      if (idx < maxNum)
        return (
          <ShopItem
            key={`${idx}-${item?.name}`}
            addToCart={addToCart}
            item={item}
            idx={idx}
            dispatch={dispatch}
          />
        );
      return <div />;
    });
  };
  const isFavorite = () => {
    let tempArr = [...favorite];
    let flag = tempArr.filter((v) => v === id);
    if (flag && flag.length) return true;
    return false;
  };
  const _handleFavoriteClick = async () => {
    try {
      const sendData = JSON.stringify({
        product_id: id,
        user_id: userInfo?.id,
      });
      if (!isFavorite()) {
        console.log("send data", sendData);
        const res = await addToFavorite(sendData);
        updateReduxFavoriteList(dispatch, [...favorite, id]);
        MyModal.show(() => {},
        <AlertModal title="Add to favorite success !" color="#458AFF" />);
        setTimeout(() => MyModal.hide(() => {}), 1000);
      } else {
        const res = await removeFromFavorite(sendData);
        const newFavorite = [...favorite].filter((v) => v !== id);
        updateReduxFavoriteList(dispatch, newFavorite);
        MyModal.show(() => {},
        <AlertModal title="Remove from favorite success !" color="#458AFF" />);
        setTimeout(() => MyModal.hide(() => {}), 1000);
      }
    } catch (err) {
      MyModal.show(() => {},
      <AlertModal title="Unknown Error !" color="#F12849" />);
      setTimeout(() => MyModal.hide(() => {}), 1000);
      console.log("Favorite err", err);
    }
  };
  return (
    <Row className="pt-4">
      <ProductImage data={images} />
      <Col lg="6" md="6" className="item">
        <p className="mb-2" style={{ fontSize: 20, fontWeight: "700" }}>
          {name}
        </p>
        <Row className="pl-3">
          <MyRating readOnly={false} value={rating ?? 4} />
        </Row>
        <small className="mb-2" style={{ fontSize: 16 }}>
          {category?.name}
        </small>

        <p className="mb-2">{`${getNumberWithDot(price)} vnđ`}</p>
        <p className="mb-2" style={{ fontWeight: "300" }}>
          {description?.introduction}
        </p>
        <Row
          className="d-flex justify-content-between align-items-center mb-2 px-3"
          style={{ width: "60%" }}
        >
          <p style={{ fontWeight: "bold" }}>Hãng</p>
          <p style={{ fontWeight: "300" }}>{brand?.name}</p>
        </Row>
        <Row
          className="d-flex justify-content-between align-items-center mb-2 px-3"
          style={{ width: "60%" }}
        >
          <p style={{ fontWeight: "bold" }}>Màu sắc</p>
          <p style={{ fontWeight: "300" }}>{description?.color}</p>
        </Row>
        <Row
          className="d-flex justify-content-between align-items-center mb-2 px-3"
          style={{ width: "60%" }}
        >
          <Button
            onClick={() =>
              MyModal.show(
                () => console.log("show ne"),
                <DescriptionDetailsForm description={description} name={name} />
              )
            }
            style={{
              backgroundColor: "#458AFF",
              color: "white",
              borderWidth: 0,
            }}
          >
            Xem thêm cấu hình chi tiết
          </Button>
        </Row>

        {/* <Row
					className="d-flex justify-content-between align-items-center mb-2 px-3"
					style={{ width: '60%' }}
				>
					<p style={{ fontWeight: 'bold' }}>Delivery</p>
					<p style={{ fontWeight: '300' }}>{delivery}</p>
				</Row> */}
        <div
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "#7F7F7F",
          }}
        />
        <Row className="mt-3">
          <Col className="p-0 pl-3 d-flex flex-column align-items-start justify-content-start">
            <p className="mb-0">Số lượng</p>

            <ButtonGroup className="mt-2">
              <Button
                onClick={_sub}
                style={{
                  width: 50,
                  height: 40,
                  justifyContent: "center",
                  flexDirection: "row",
                  borderColor: "#CED4DA",
                  backgroundColor: "white",
                  borderRight: 0,
                }}
              >
                <Icon
                  style={{
                    fontSize: 20,
                    color: "#C4D4DA",
                  }}
                >
                  remove
                </Icon>
              </Button>
              <Input
                style={{
                  width: 50,
                  borderRadius: 0,
                  height: 40,
                }}
                value={amount ? amount : 0}
              />
              <Button
                onClick={_add}
                style={{
                  width: 50,
                  height: 40,
                  justifyContent: "center",
                  flexDirection: "row",
                  borderColor: "#C4D4DA",
                  borderWidth: 1,
                  backgroundColor: "white",
                }}
              >
                <Icon
                  style={{
                    fontSize: 20,
                    color: "#CED4DA",
                  }}
                >
                  add
                </Icon>
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row className="p-3">
          <Button
            onClick={() => {
              for (let i = 0; i < amount; i++) addToCart(dispatch, productInfo);
              history.push("/cart");
            }}
            className="mr-2 d-flex flex-row justify-content-center align-content-between button-shadow"
            style={{
              backgroundColor: "#4285F4",

              width: 150,
              height: 50,
              borderRadius: 25,
            }}
          >
            <p className="m-0" style={{ fontSize: 10 }}>
              Mua ngay
            </p>
          </Button>

          <Button
            onClick={() => {
              for (let i = 0; i < amount; i++) addToCart(dispatch, productInfo);
            }}
            style={{
              backgroundColor: "#F2F2F2",
              width: 150,
              height: 50,
              borderRadius: 25,
            }}
            className="d-flex flex-row justify-content-center align-content-between button-shadow"
          >
            <Icon
              style={{
                fontSize: 16,
                color: "#4F4F4F",
                marginRight: 10,
              }}
            >
              shopping_cart
            </Icon>
            <p className="m-0" style={{ fontSize: 10, color: "#4F4F4F" }}>
              Thêm vào giỏ hàng
            </p>
          </Button>
          <Button
            onClick={() => {
              for (let i = 0; i < amount; i++)
                _handleFavoriteClick(dispatch, productInfo);
            }}
            style={{
              backgroundColor: isFavorite() ? "#f73378" : "#f2f2f2",
              width: 150,
              height: 50,
              borderRadius: 25,
              marginLeft: 10,
            }}
            className="d-flex flex-row justify-content-center align-content-between button-shadow"
          >
            <Icon
              style={{
                fontSize: 16,
                color: isFavorite() ? "#FFF" : "#f73378",
                marginRight: 10,
                // backgroundColor: '#f73378',
              }}
            >
              favorite
            </Icon>
            <p
              className="m-0"
              style={{
                fontSize: 10,
                color: isFavorite() ? "#FFF" : "#f73378",
              }}
            >
              Yêu thích
            </p>
          </Button>
        </Row>
      </Col>

      <Col>
        <h4 className="my-5">Sản phẩm tương tự</h4>
        <Row>{_renderItems(dispatch, getTheSameProduct(), 6)}</Row>
        <CommentArea
          data={comments}
          onSubmitMessage={(cmt) => makeNewCommentFunc(cmt)}
        />
      </Col>
    </Row>
  );
};
const CommentArea = ({ data, onSubmitMessage }) => {
  const [comments, setComments] = useState(data ? data : []);
  useEffect(() => {
    setComments(data);
  }, [data]);
  const [isOpen, setOpen] = useState(false);
  const [rate, setRate] = useState(5);
  const [message, setMessage] = useState("");

  return (
    <Container className="p-0">
      <h4 className="my-5">Đánh giá</h4>
      <Card className="mb-5 pb-3">
        <Collapse in={isOpen} collapsedHeight={250} className="w-100">
          <Row className="w-100 p-3 d-flex flex-row">
            <Col lg="3" md="3">
              <Row className="justify-content-centers align-items-center h-100 p-5">
                <Icon style={{ fontSize: 50, color: "#FD9827" }}>
                  star_rounded_icon
                </Icon>
                <h4
                  style={{
                    fontSize: 30,
                    color: "#FD9827",
                    marginLeft: 5,
                  }}
                >
                  {Math.round(
                    comments && comments.length
                      ? comments?.reduce((x, y) => (x += y?.rate), 0) /
                          comments?.length
                      : 0
                  )}{" "}
                  Star
                </h4>
              </Row>
            </Col>
            <Col
              lg="6"
              md="6"
              style={{
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderColor: "black",
              }}
            >
              <Row className="p-0 justify-content-around align-items-center">
                <Rating value={5} />
                <Progress
                  value={comments?.reduce(
                    (x, y) => (y?.rate === 5 ? (x += 1) : x),
                    0
                  )}
                  className="w-50"
                  color="danger"
                />
                <p
                  style={{
                    fontSize: 13,
                    marginTop: 9,
                  }}
                >
                  {comments?.reduce(
                    (x, y) => (y?.rate === 5 ? (x += 1) : x),
                    0
                  )}{" "}
                  người đánh giá
                </p>
              </Row>

              <Row className="p-0 justify-content-around align-items-center">
                <Rating value={4} />
                <Progress
                  value={comments?.reduce(
                    (x, y) => (y?.rate === 4 ? (x += 1) : x),
                    0
                  )}
                  className="w-50"
                  color="danger"
                />
                <p
                  style={{
                    fontSize: 13,
                    marginTop: 9,
                  }}
                >
                  {comments?.reduce(
                    (x, y) => (y?.rate === 4 ? (x += 1) : x),
                    0
                  )}{" "}
                  người đánh giá
                </p>
              </Row>
              <Row className="p-0 justify-content-around align-items-center">
                <Rating value={3} />
                <Progress
                  value={comments?.reduce(
                    (x, y) => (y?.rate === 3 ? (x += 1) : x),
                    0
                  )}
                  className="w-50"
                  color="danger"
                />
                <p
                  style={{
                    fontSize: 13,
                    marginTop: 9,
                  }}
                >
                  {comments?.reduce(
                    (x, y) => (y?.rate === 3 ? (x += 1) : x),
                    0
                  )}{" "}
                  người đánh giá
                </p>
              </Row>
              <Row className="p-0 justify-content-around align-items-center">
                <Rating value={2} />
                <Progress
                  value={comments?.reduce(
                    (x, y) => (y?.rate === 2 ? (x += 1) : x),
                    0
                  )}
                  className="w-50"
                  color="danger"
                />
                <p
                  style={{
                    fontSize: 13,
                    marginTop: 9,
                  }}
                >
                  {comments?.reduce(
                    (x, y) => (y?.rate === 2 ? (x += 1) : x),
                    0
                  )}{" "}
                  người đánh giá
                </p>
              </Row>
              <Row className="p-0 justify-content-around align-items-center">
                <Rating value={1} />
                <Progress
                  value={comments?.reduce(
                    (x, y) => (y?.rate === 1 ? (x += 1) : x),
                    0
                  )}
                  className="w-50"
                  color="danger"
                />
                <p
                  style={{
                    fontSize: 13,
                    marginTop: 9,
                  }}
                >
                  {comments?.reduce(
                    (x, y) => (y?.rate === 1 ? (x += 1) : x),
                    0
                  )}{" "}
                  người đánh giá
                </p>
              </Row>
            </Col>
            <Col
              lg="3"
              md="3"
              className="justify-content-center align-items-center "
            >
              <Row className="w-100 h-100 justify-content-center align-items-center">
                <Buttons
                  variant="contained"
                  color="primary"
                  onClick={() => setOpen(!isOpen)}
                  style={{ width: 100, height: 45 }}
                >
                  {isOpen ? "Ẩn" : "Hiện"}
                </Buttons>
              </Row>
            </Col>
          </Row>
          <Row className="px-5 py-3 w-50 align-content-center">
            <p>Chọn đánh giá của bạn</p>
            <Rating
              size="large"
              className="ml-5"
              onChange={(e, val) => setRate(val)}
            />
          </Row>
          <Col className="w-100 h-100 d-flex flex-column">
            <TextField
              variant="outlined"
              multiline
              onChange={(e) => setMessage(e?.target?.value)}
            />
            <Buttons
              onClick={() => onSubmitMessage({ message, rate })}
              variant="contained"
              color="primary"
              style={{
                width: 100,
                height: 50,
                marginTop: 20,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Icon>send</Icon>
            </Buttons>
          </Col>
        </Collapse>
      </Card>
      {comments && comments.length ? (
        <Card className="my-3 px-5 py-2">
          {comments?.map((v, i) => (
            <Row className="w-100 d-flex flex-column mb-3">
              <div
                className="d-flex flex-row align-content-center my-0 py-0"
                style={{ height: 20 }}
              >
                <p
                  // className="border"
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    marginRight: 10,
                  }}
                >
                  {v?.customer?.first_name} {v?.customer?.last_name}
                </p>
                <Rating
                  // className="border"
                  style={{ height: 15 }}
                  value={v?.rate}
                />
              </div>
              {v?.bought ? (
                <p
                  style={{
                    fontSize: 14,
                    marginRight: 10,
                    color: "#2CA932",
                  }}
                  className="p-0 m-0"
                >
                  Đã mua hàng tại TechWorld
                </p>
              ) : null}
              <p className="p-0 m-0" style={{ color: "#333333", fontSize: 15 }}>
                {v?.message}
              </p>
              <p className="p-0 m-0" style={{ fontSize: 10, color: "#999999" }}>
                {moment(v?.date ? v?.date : moment()).format(
                  "YYYY-MM-DD HH:mm:SS"
                )}
              </p>
            </Row>
          ))}
        </Card>
      ) : null}
    </Container>
  );
};

export default SingleProduct;
