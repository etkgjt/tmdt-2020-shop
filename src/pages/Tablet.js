import React, { useCallback, memo, useState, useEffect } from "react";

import { Col, Container, Row } from "reactstrap";

import { TopAdCarousel, MyFilterPanel } from "../components";

import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartAction";

import {
  SMART_PHONE_BRAND,
  SMART_PHONE_BRAND_LOGO,
} from "../constants/constants";
import { Button, CircularProgress } from "@material-ui/core";

import withPages from "../components/withPage";

import "../styles/pageTitle.css";
import "../styles/shopPage.css";
import "../styles/forAll.css";
import { useHelmetMeta } from "../untils/useHelmet";

const Tablet = memo(
  ({
    renderItem = () => {},
    initialData = () => {},
    onFilterClick = () => {},
  }) => {
    console.log("shopage render ne");
    const dispatch = useDispatch();
    const productsDataRedux = useSelector(
      (state) => state?.shopReducer?.tablet
    );
    const [data, setData] = useState(
      productsDataRedux ? productsDataRedux : []
    );

    const [orderBy, setOrderBy] = useState(0);
    // const [categoryFilter, setCategoryFilter] = useState([]);
    const [brandFilter, setBrandFilter] = useState([]);
    const [priceFilter, setPriceFilter] = useState({ min: -1, max: -1 });
    const [colorFilter, setColorFilter] = useState([]);

    const [numberOfItem, setNumberOfItem] = useState(12);
    useEffect(() => {
      console.log("Long chay lan dau thoi ne", productsDataRedux);

      if (!productsDataRedux || !productsDataRedux.length) {
        initialData(dispatch);
      }
    }, []);
    useEffect(() => {
      console.log("data ne", productsDataRedux);
      if (productsDataRedux && productsDataRedux.length) {
        setData(productsDataRedux);
      }
    }, [productsDataRedux]);

    return (
      <Container fluid className="gradient-background p-0">
        {/* <CustomCarousel /> */}
        {useHelmetMeta("tablet page")}
        <TopAdCarousel />
        <section className="shop-container">
          <Container fluid className="w-75">
            <Row>
              <Col lg="3" md="6">
                <MyFilterPanel
                  onFilterClick={() =>
                    onFilterClick(
                      productsDataRedux,
                      brandFilter,
                      priceFilter,
                      orderBy,
                      (v) => setData(v)
                    )
                  }
                  brands={SMART_PHONE_BRAND}
                  orderBy={orderBy}
                  brandFilter={brandFilter}
                  priceFilter={priceFilter}
                  colorFilter={colorFilter}
                  setOrderBy={setOrderBy}
                  // setCategoryFilter={setCategoryFilter}
                  setBrandFilter={setBrandFilter}
                  setPriceFilter={setPriceFilter}
                  setColorFilter={setColorFilter}
                />
              </Col>
              <Col lg="9" md="6" classNam="p-0">
                <Row className="justify-content-center p-0">
                  {SMART_PHONE_BRAND_LOGO.map((v, i) => (
                    <Col
                      lg="2"
                      md="2"
                      key={i}
                      className="m-2 p-2 d-flex flex-column border bg-white justify-content-center align-items-center"
                    >
                      <img src={v} />
                    </Col>
                  ))}
                </Row>
                <Row className="m-0 p-0 pt-5 justify-content-center">
                  {data && data.length ? (
                    renderItem(dispatch, data, numberOfItem)
                  ) : (
                    <CircularProgress />
                  )}
                </Row>
                {data && data.length > numberOfItem ? (
                  <Row className="justify-content-center align-items-center">
                    <Button
                      color="primary"
                      border
                      onClick={() => setNumberOfItem((old) => old + 10)}
                    >
                      Hiển thị thêm...
                    </Button>
                  </Row>
                ) : (
                  <div />
                )}
              </Col>
            </Row>
            {/* <ShopMethod /> */}
          </Container>
        </section>
      </Container>
    );
  }
);

export default withPages(Tablet);
