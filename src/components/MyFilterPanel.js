import { Slider } from '@material-ui/core';
import React from 'react';
import { Button, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import {
	CATEGORY_LIST,
	ITEMS_ORDER_LIST,
	ITEM_COLORS,
	PHONE_BRAND_LIST,
} from '../constants/constants';
import CustomRadioButton from './CustomRadioButton';
import MyCheckboxList from './MyCheckedBoxList';
import MyRating from './MyRating';
import '../styles/material.css';

const MyFilterPanel = ({
	orderBy = 0,
	categoryFilter = {},
	brandFilter = {},
	priceFilter = {},
	colorFilter = {},
	setOrderBy = () => {},
	setCategoryFilter = () => {},
	setBrandFilter = () => {},
	setPriceFilter = () => {},
	setColorFilter = () => {},
	brands,
	onFilterClick = () => {},
}) => {
	return (
		<Col className="pt-2">
			<h3>Bộ lọc</h3>
			<ListGroup className="z-depth1">
				<ListGroupItem
					style={{
						fontSize: 15,
						margin: 0,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#F5F5F5',
						color: '#4285F4',
					}}
				>
					<h6 className="text-start p-0 m-0">Sắp xếp theo</h6>
				</ListGroupItem>
				<CustomRadioButton
					items={ITEMS_ORDER_LIST}
					checkedFunc={setOrderBy}
				/>
			</ListGroup>
			<ListGroup className="mt-3 z-depth1">
				<ListGroupItem
					style={{
						fontSize: 15,
						margin: 0,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#F5F5F5',
						color: '#4285F4',
					}}
				>
					<h6 className="text-start p-0 m-0">Hãng</h6>
				</ListGroupItem>
				<MyCheckboxList
					items={brands ? brands : []}
					onCheckedFunc={setBrandFilter}
				/>
			</ListGroup>

			<ListGroup className="mt-3 z-depth1">
				<ListGroupItem
					style={{
						fontSize: 15,
						margin: 0,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#F5F5F5',
						color: '#4285F4',
					}}
				>
					<h6 className="text-start p-0 m-0">Giá</h6>
				</ListGroupItem>

				<ListGroupItem style={{ fontSize: 15, margin: 0 }}>
					<Slider
						valueLabelDisplay="on"
						aria-labelledby="range-slider"
						defaultValue={[0, 0]}
						max={50}
						onChangeCommitted={(e, v) => setPriceFilter(v)}
					/>
				</ListGroupItem>
			</ListGroup>
			{/* <ListGroup className="mt-3 z-depth1">
				<ListGroupItem
					style={{
						fontSize: 15,
						margin: 0,
						flexDirection: 'row',
						justifyContent: 'space-around',
						alignItems: 'center',
						backgroundColor: '#F5F5F5',
						color: '#4285F4',
					}}
				>
					<h6 className="text-start p-0 m-0">Color</h6>
				</ListGroupItem>
				<MyCheckboxList
					items={ITEM_COLORS}
					onCheckedFunc={setColorFilter}
				/>
			</ListGroup> */}
			{/* <ListGroup className="mt-3 z-depth1">
				<ListGroupItem
					style={{
						fontSize: 15,
						margin: 0,
						flexDirection: 'row',
						justifyContent: 'space-around',
						alignItems: 'center',
						backgroundColor: '#F5F5F5',
						color: '#4285F4',
					}}
				>
					<h6 className="text-start p-0 m-0">Đánh giá</h6>
				</ListGroupItem>
				<ListGroupItem style={{ fontSize: 15, margin: 0 }}>
					<Row className="align-items-center pl-3 pt-0">
						<MyRating value={5} readOnly={true} />
						<p
							style={{
								fontSize: 12,
								textAlign: 'center',

								marginLeft: 10,
								paddingTop: 10,
							}}
						>
							4 start and more
						</p>
					</Row>
					<Row className="align-items-center pl-3 pt-0">
						<MyRating value={4} readOnly={true} />
						<p
							style={{
								fontSize: 12,
								textAlign: 'center',

								marginLeft: 10,
								paddingTop: 10,
							}}
						>
							3 to 3.99
						</p>
					</Row>
					<Row className="align-items-center pl-3 pt-0">
						<MyRating value={3} readOnly={true} />
						<p
							style={{
								fontSize: 12,
								textAlign: 'center',

								marginLeft: 10,
								paddingTop: 10,
							}}
						>
							3.00 and less
						</p>
					</Row>
				</ListGroupItem>
			</ListGroup> */}
			<Button
				onClick={() => {
					console.log('filter click ne');
					onFilterClick();
				}}
				className="mt-3 button-hover-depth3"
				style={{
					width: '100%',
					height: 50,
					backgroundColor: 'white',
					borderColor: '#458AFF',
					color: '#458AFF',
					borderRadius: 25,
				}}
			>
				Lọc
			</Button>
		</Col>
	);
};
export default MyFilterPanel;
