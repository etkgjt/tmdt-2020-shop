import React, { useCallback, memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Row } from 'reactstrap';
import Header from '../components/Header';
import TitleBackground from '../assets/slider_background.png';
import '../styles/pageTitle.css';
import '../styles/confirmation.css';
import { Col } from 'reactstrap';
import { Table } from 'reactstrap';
import { MyStepper } from '../components';
import '../styles/material.css';
import { Divider } from '@material-ui/core';
import { useSelector } from 'react-redux';

const Finish = memo(() => {
	return (
		<Container fluid style={{ backgroundColor: '#F4FAFE' }} className="pb-5">
			<Row className="title-container mt-5">
				<p class="page-title">Thành công</p>
			</Row>
			<MyStepper activeStep={4} />
			<Container className="pb-5">
				<Row className="w-100 justify-content-center">
					<h3>Đặt hàng thành công!</h3>
				</Row>
				<NavLink
					exact
					to={{
						pathname: '/smart_phone',
					}}
					style={{
						color: 'white',
						textDecoration: 'none',
					}}
				>
					<Button
						className="button-container-box-shadow"
						style={{
							marginTop: 10,
							color: 'white',
							backgroundColor: '#4285f4',
							color: 'white',
							borderWidth: 0,
							borderRadius: 25,
							width: '100%',
							height: 50,
						}}
					>
						Tiếp tục mua hàng!
					</Button>
				</NavLink>
			</Container>
		</Container>
	);
});
export default Finish;
