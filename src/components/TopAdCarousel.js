import { Icon } from '@material-ui/core';
import React, { memo, useState } from 'react';
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
} from 'reactstrap';
import '../styles/carousel.css';
import { useRef } from 'react';
import { useEffect } from 'react';
import '../styles/forAll.css';
import '../styles/material.css';
const items = [
	{
		src: 'https://mdbootstrap.com/img/Photos/Others/ecommerce4.jpg',
		altText: 'Slide 1',
		caption: 'Slide 1',
	},
	{
		src: 'https://mdbootstrap.com/img/Photos/Others/ecommerce2.jpg',
		altText: 'Slide 2',
		caption: 'Slide 2',
	},
	{
		src: 'https://mdbootstrap.com/img/Photos/Others/ecommerce3.jpg',
		altText: 'Slide 3',
		caption: 'Slide 3',
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
		<Container className="mt-5 p-0" fluid>
			<Container fluid className="p-0">
				<Carousel
					className="mt-5 h-100 w-100 bg-primary"
					activeIndex={activeIndex}
					next={next}
					previous={previous}
				>
					{items.map((item) => (
						<CarouselItem
							className="p-0 bg-primary"
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
		<Container fluid className="p-0">
			<img src={item.src} />
		</Container>
	);
};

const CustomIndicator = ({ onSelected, value }) => {
	// console.log('value ne', value);
	return (
		<Row className="justify-content-center align-items-center mt-5 h-25">
			<Button
				className={`indicator-custom ${
					value === 0 ? 'indicator-custom-active' : ''
				}`}
				onClick={() => onSelected(0)}
			/>
			<Button
				className={`indicator-custom ${
					value === 1 ? 'indicator-custom-active' : ''
				}`}
				onClick={() => onSelected(1)}
			/>
			<Button
				className={`indicator-custom ${
					value === 2 ? 'indicator-custom-active' : ''
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
					backgroundColor: '#4285F4',
					borderWidth: 0,
				}}
			>
				<Icon
					style={{
						fontSize: 25,
						color: 'white',

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
					backgroundColor: '#4285F4',
					borderWidth: 0,
				}}
			>
				<Icon
					style={{
						fontSize: 25,
						color: 'white',

						margin: 0,
						paddingLeft: 3,
						textAlign: 'center',
					}}
				>
					arrow_back_ios
				</Icon>
			</Button>
		</Row>
	);
};

export default Example;
