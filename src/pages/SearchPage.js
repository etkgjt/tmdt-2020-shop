import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import '../styles/pageTitle.css';
import '../styles/shopPage.css';
import '../styles/forAll.css';
import { useSelector, useDispatch } from 'react-redux';
import { Button, CircularProgress } from '@material-ui/core';
import { ShopItem } from '../components';
import { addToCart } from '../redux/actions/cartAction';
import { nonAccentVietnamese } from '../untils/stringFormat';
import {
	dataSplitter,
	getShopData,
	loadShopDataSync,
	updateReduxAccessoriesItems,
	updateReduxLaptopItems,
	updateReduxShopData,
	updateReduxSmartPhoneItems,
	updateReduxTabletItems,
} from '../redux/actions/shopAction';
import { useLocation } from 'react-router-dom';
const filterKeyWord = (keyword, data) => {
	let lowerKeyword = keyword.toLowerCase();
	let newState = [...data].filter((v) => {
		let arr = nonAccentVietnamese(v?.name).split(' ');
		let arr2 = lowerKeyword.split(' ');
		console.log('arr ne', arr, arr2);
		let flag = 0;
		for (let j = 0; j < arr2.length; j++) {
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].indexOf(arr2[j]) !== -1) {
					flag++;
					break;
				}
			}
		}
		if (flag === arr2.length) return true;
		return false;
	});
	return newState;
};

const SearchPage = () => {
	let { state } = useLocation();
	useEffect(() => {
		setKeyWord(state?.keyword);
	}, [state?.keyword]);
	const [keyword, setKeyWord] = useState(state?.keyword || 'iphone');
	const productsDataRedux = useSelector(
		(state) => state?.shopReducer?.products
	);
	const [data, setData] = useState(
		productsDataRedux ? filterKeyWord(keyword, productsDataRedux) : []
	);
	const [numberOfItem, setNumberOfItem] = useState(10);
	const dispatch = useDispatch();
	const initialData = async (dispatch) => {
		dispatch(loadShopDataSync());
	};

	useEffect(() => {
		if (productsDataRedux && productsDataRedux.length)
			setData(filterKeyWord(keyword, productsDataRedux));
	}, [productsDataRedux, keyword]);
	useEffect(() => {
		if (productsDataRedux && productsDataRedux.length)
			setData(filterKeyWord(keyword, productsDataRedux));
		else initialData(dispatch);
	}, [keyword]);
	useEffect(() => {
		if (!productsDataRedux || !productsDataRedux.length)
			initialData(dispatch);
	}, []);
	const _renderItems = (dispatch, data, maxNum) => {
		let tempArr = [...data];

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
	return (
		<Container fluid className="gradient-background p-0">
			<Row className="title-container mt-5">
				<p className="page-title">Tìm kiếm</p>
			</Row>
			<section className="shop-container">
				<Container
					fluid
					className="w-75 justify-content-center d-flex flex-column"
				>
					<h5 className="text-center text-black-50 my-5">{`${data.length} kết quả cho ${keyword}`}</h5>
					<Row className="m-0 p-0 pt-5 justify-content-center">
						{data && data.length ? (
							_renderItems(dispatch, data, numberOfItem)
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
				</Container>
			</section>
		</Container>
	);
};
export default SearchPage;
