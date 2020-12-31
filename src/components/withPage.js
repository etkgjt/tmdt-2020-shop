import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/actions/cartAction';
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
import ShopItem from './ShopItem';
import moment from 'moment';

const withPages = (OriginalComponent = <div />) => {
	// useEffect(() => {
	// 	console.log('Price filter', priceFilter);
	// }, [priceFilter]);

	const newComponent = () => {
		const _renderItems = (dispatch, data, maxNum, favorite = []) => {
			console.log('favorite list ne', favorite);
			let tempArr = [...data];

			return tempArr.map((item, idx) => {
				if (idx < maxNum)
					return (
						<ShopItem
							favoriteList={favorite}
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
		const initialData = async (dispatch) => {
			// try {
			// console.log('init data ne');
			// const dataRes = await getShopData();
			// console.log('data lay duoc ne', dataRes);
			// const {
			// 	smartPhone,
			// 	laptop,
			// 	tablet,
			// 	accessories,
			// 	all,
			// } = dataSplitter(dataRes);
			// console.log('smart phone ne', smartPhone);
			// updateReduxShopData(dispatch, all);
			// updateReduxLaptopItems(dispatch, laptop);
			// updateReduxSmartPhoneItems(dispatch, smartPhone);
			// updateReduxTabletItems(dispatch, tablet);
			// updateReduxAccessoriesItems(dispatch, accessories);
			dispatch(loadShopDataSync());
			// } catch (err) {
			// console.log('Sync data err', err);
			// }
		};
		const _onFilterClick = (
			productsDataRedux,
			brandFilter,
			priceFilter,
			orderBy,
			onDoneFunc
		) => {
			console.log('brand ne', brandFilter);
			let temp = [...productsDataRedux];
			if (brandFilter && brandFilter.length) {
				let newBrandFilterList = brandFilter.reduce((a, b) => {
					return [...a, ...temp.filter((v) => v.brand?.id === b.value)];
				}, []);
				temp = newBrandFilterList;
			}
			// if (colorFilter && colorFilter.length) {
			// 	let newBrandFilterList = temp.reduce((a, b) => {
			// 		return [...a, ...temp.filter((v) => v.brand === b.value)];
			// 	}, []);
			// 	temp = newBrandFilterList;
			// }
			const x =
				priceFilter?.[0] <= priceFilter[1]
					? priceFilter?.[0]
					: priceFilter[1];
			const y =
				priceFilter?.[0] >= priceFilter[1]
					? priceFilter?.[0]
					: priceFilter[1];
			if ((x && y) || x || y) {
				temp = temp.filter(
					(v) => v?.price >= x * 1000000 && v?.price <= y * 1000000
				);
			}
			switch (orderBy) {
				case 0:
					temp = temp.sort((a, b) => b.price * 1 - a.price * 1);
					break;
				case 1:
					temp = temp.sort((a, b) => a.price * 1 - b.price * 1);
					break;
				case 2:
					temp = temp.sort((a, b) => {
						console.log(
							'Date arr',
							a.dateArrive,
							b.dateArrive,
							moment(a.dateArrive),
							moment(b.dateArrive),
							'/n'
						);
						if (
							moment(
								a.dateArrive ? a.dateArrive : '2000-01-01'
							).isBefore(
								moment(b.dateArrive ? b.dateArrive : '2000-01-01')
							)
						)
							return -1;
						if (
							moment(a.dateArrive ? a.dateArrive : '2000-01-01').isAfter(
								moment(b.dateArrive ? b.dateArrive : '2000-01-01')
							)
						)
							return 1;
						if (
							moment(a.dateArrive)
								? a.dateArrive
								: '2020-01-01'.isSame(
										moment(b.dateArrive ? b.dateArrive : '2020-01-01')
								  )
						)
							return 0;
					});
					break;
				case 3:
					temp = temp.sort(
						(a, b) => b.buyingTimes * 1 - a.buyingTimes * 1
					);
					break;
				default:
					break;
			}
			onDoneFunc(temp);
		};
		return (
			<OriginalComponent
				renderItem={_renderItems}
				initialData={(dispatch) => initialData(dispatch)}
				onFilterClick={(
					productsDataRedux,
					brandFilter,
					priceFilter,
					orderBy,
					onDoneFunc = () => {}
				) =>
					_onFilterClick(
						productsDataRedux,
						brandFilter,
						priceFilter,
						orderBy,
						onDoneFunc
					)
				}
			/>
		);
	};
	return newComponent;
};

export default withPages;
