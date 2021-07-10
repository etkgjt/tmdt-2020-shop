// import React from 'react';
// import { Container, UncontrolledCarousel } from 'reactstrap';
// import background from '../assets/slider_background.png';
// import '../styles/pageTitle.css';
// const items = [
// 	{
// 		src:
// 			'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
// 		altText: 'Slide 1',
// 		caption: 'Slide 1',
// 		header: 'Slide 1 Header',
// 		key: '1',
// 	},
// 	{
// 		src:
// 			'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
// 		altText: 'Slide 2',
// 		caption: 'Slide 2',
// 		header: 'Slide 2 Header',
// 		key: '2',
// 	},
// 	{
// 		src:
// 			'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
// 		altText: 'Slide 3',
// 		caption: 'Slide 3',
// 		header: 'Slide 3 Header',
// 		key: '3',
// 	},
// ];

// const CustomCarousel = (props) => (
// 	<Container className={`my-5 ${props?.className}`} {...props}>
// 		<UncontrolledCarousel items={items} />
// 	</Container>
// );
// export default CustomCarousel;

import { Icon } from "@material-ui/core";
import React, { memo, useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Row,
  Col,
  Container,
  Button,
} from "reactstrap";
import "../styles/carousel.css";
import { useRef } from "react";
import { useEffect } from "react";
import "../styles/forAll.css";
import "../styles/material.css";
const items = [
  {
    src:
      "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
    altText: "Slide 1",
    caption: "Slide 1",
  },
  {
    src:
      "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
    altText: "Slide 2",
    caption: "Slide 2",
  },
  {
    src:
      "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
    altText: "Slide 3",
    caption: "Slide 3",
  },
];

const Example = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  return (
    <Container className="mt-5 pt-5">
      <Container fluid>
        <Row className="justify-content-center align-items-center mt-5">
          <h3 className="text-center">Our Best Seller</h3>
        </Row>
        <Row className="justify-content-center align-items-center mt-3">
          <p className="text-center w-75">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit fugit,
            error amet numquam iure provident voluptate esse quasi nostrum
            quisquam eum porro a pariatur veniam.
          </p>
        </Row>
        <CustomCarousetButton onNextPress={next} onPreviousPress={previous} />
        <Carousel
          className="mt-5 pt-5 h-100"
          activeIndex={activeIndex}
          next={next}
          previous={previous}
        >
          {items.map((item) => (
            <CarouselItem
              onExiting={() => setAnimating(true)}
              onExited={() => setAnimating(false)}
              key={item.altText}
            >
              <CustomCarouselItem item={item} />
            </CarouselItem>
          ))}
        </Carousel>
        <CustomIndicator onSelected={goToIndex} value={activeIndex} />
      </Container>
    </Container>
  );
};
const CustomCarouselItem = ({ item }) => {
  return (
    <Row className="carousel-container p-3 pt-5">
      <Col lg="4" md="4" sm="12" fluid className="carousel-item-container pt-3">
        <Col className="p-2 pt-5 shadow4dp h-100 border justify-content-center bg-white">
          <Col className="carousel-item-container mt-3">
            <Row className="justify-content-center align-items-center mt-4 w-100 m-0">
              <p
                style={{
                  fontSize: 30,
                  color: "#0276D8",
                  textAlign: "center",
                }}
              >
                {item.caption}
              </p>
            </Row>
            <Row className="justify-content-center align-items-center w-100 m-0">
              <p style={{ textAlign: "center" }}>Summer Hat</p>
            </Row>
            <Row className="justify-content-center align-items-center px-5">
              <p
                className="text-center"
                style={{
                  fontWeight: "300",
                  color: "#787777",
                }}
              >
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci.
              </p>
            </Row>
          </Col>
        </Col>
        <img
          alt="image"
          className="carousel-item-image shadow9dp"
          src={
            "https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/16.jpg"
          }
          fluid
          alt={"item.altText"}
        />
      </Col>
      <Col lg="4" md="4" sm="12" fluid className="carousel-item-container pt-3">
        <Col className="p-2 pt-5 shadow4dp h-100 border justify-content-center bg-white">
          <Col className="carousel-item-container mt-3">
            <Row className="justify-content-center align-items-center mt-4 w-100 m-0">
              <p
                style={{
                  fontSize: 30,
                  color: "#0276D8",
                  textAlign: "center",
                }}
              >
                {item.caption}
              </p>
            </Row>
            <Row className="justify-content-center align-items-center w-100 m-0">
              <p style={{ textAlign: "center" }}>Summer Hat</p>
            </Row>
            <Row className="justify-content-center align-items-center px-5">
              <p
                className="text-center"
                style={{
                  fontWeight: "300",
                  color: "#787777",
                }}
              >
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci.
              </p>
            </Row>
          </Col>
        </Col>
        <img
          alt="image"
          className="carousel-item-image shadow9dp"
          src={
            "https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/16.jpg"
          }
          fluid
          alt={item.altText}
        />
      </Col>
      <Col lg="4" md="4" sm="12" fluid className="carousel-item-container pt-3">
        <Col className="p-2 pt-5 shadow4dp h-100 border justify-content-center bg-white">
          <Col className="carousel-item-container mt-3">
            <Row className="justify-content-center align-items-center mt-4 w-100 m-0">
              <p
                style={{
                  fontSize: 30,
                  color: "#0276D8",
                  textAlign: "center",
                }}
              >
                {item.caption}
              </p>
            </Row>
            <Row className="justify-content-center align-items-center w-100 m-0">
              <p style={{ textAlign: "center" }}>Summer Hat</p>
            </Row>
            <Row className="justify-content-center align-items-center px-5">
              <p
                className="text-center"
                style={{
                  fontWeight: "300",
                  color: "#787777",
                }}
              >
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci.
              </p>
            </Row>
          </Col>
        </Col>
        <img
          alt="image"
          className="carousel-item-image shadow9dp"
          src={
            "https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/16.jpg"
          }
          fluid
          alt={item.altText}
        />
      </Col>
    </Row>
  );
};

const CustomIndicator = ({ onSelected, value }) => {
  // console.log('value ne', value);
  return (
    <Row className="justify-content-center align-items-center mt-5 h-25">
      <Button
        className={`indicator-custom ${
          value === 0 ? "indicator-custom-active" : ""
        }`}
        onClick={() => onSelected(0)}
      />
      <Button
        className={`indicator-custom ${
          value === 1 ? "indicator-custom-active" : ""
        }`}
        onClick={() => onSelected(1)}
      />
      <Button
        className={`indicator-custom ${
          value === 2 ? "indicator-custom-active" : ""
        }`}
        onClick={() => onSelected(2)}
      />
    </Row>
  );
};
const CustomCarousetButton = ({ onNextPress, onPreviousPress }) => {
  return (
    <Row className="justify-content-center">
      <Button
        onClick={onPreviousPress}
        className="mx-3 shadow6dp"
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          paddingTop: 10,
          backgroundColor: "#4285F4",
          borderWidth: 0,
        }}
      >
        <Icon
          style={{
            fontSize: 25,
            color: "white",

            margin: 0,
            paddingLeft: 3,
          }}
        >
          arrow_back_ios
        </Icon>
      </Button>
      <Button
        onClick={onNextPress}
        className="mx-3 rotate-icon shadow6dp"
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          paddingTop: 14,
          backgroundColor: "#4285F4",
          borderWidth: 0,
        }}
      >
        <Icon
          style={{
            fontSize: 25,
            color: "white",

            margin: 0,
            paddingLeft: 3,
            textAlign: "center",
          }}
        >
          arrow_back_ios
        </Icon>
      </Button>
    </Row>
  );
};

export default Example;
