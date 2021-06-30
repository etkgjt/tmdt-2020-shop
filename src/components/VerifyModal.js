import {
	Button,
	Checkbox,
	Divider,
	FormControl,
	Icon,
	Input,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import '../styles/material.css';
import {
	getUserInfo,
	login,
	updateUserInfoRedux,
	distpatchLoginToRedux,
	sendEmailToRecoveryPassword,
} from '../redux/actions/userAction';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MyModal, IndicatorModal } from '.';
import axios from 'axios';
import { CheckBox } from '@material-ui/icons';
import AlertModal from './AlertModal';
import {
	getFavoriteList,
	updateReduxFavoriteList,
} from '../redux/actions/shopAction';

import { GoogleLogin } from 'react-google-login';
import { CLIENT_ID } from '../constants/constants';

import firebase from '../firebase.js'

const VerifyModal = () => {
	return (
		<Container className="d-flex justify-content-center align-items-center w-75">
			<div id="recaptcha"></div>
			<Col lg="5" md="10" sm="10" className="mt-5 z-depth3 bg-white w-50">
				<Icon
					onClick={() => MyModal.hide()}
					className="_icon"
					style={{
						fontSize: 30,
						position: 'absolute',
						right: -30,
						top: -30,
						color: 'white',
					}}
				>
					highlight_off_outlined
				</Icon>
				<form className="m-5">
					<Row className="justify-content-center p-0 m-0">
						<h3 style={{ color: '#4F4F4F' }}>Đăng nhập</h3>
					</Row>
					<Row className="d-flex justify-content-around align-items-center mt-3">
						<TextField
							label="Tài khoản"
							className="w-100"
							//color={validateEmail(email) ? 'primary' : 'secondary'}
							//onChange={(e) => setEmail(e?.target?.value)}
							//value={email}
						/>
					</Row>
					<Row className="d-flex justify-content-around align-items-center mt-3">
						<TextField
							label="Mật khẩu"
							className="w-100"
							// color={
							// 	validatePassword(password) ? 'primary' : 'secondary'
							// }
							type="password"
							onChange={(e) => {
								//setPassword(e?.target?.value);
							}}
							//value={password}
						/>
					</Row>

					<Row className="mt-3 justify-content-around align-items-center">
						<Row className="align-content-center">
							<Checkbox
								//checked={remember}
								//onChange={() => setRemember(!remember)}
							/>
							<p
								style={{
									paddingTop: 10,
									fontSize: 14,
									color: 'black',
									marginRight: 10,
									fontWeight: '300',
								}}
							>
								Nhớ tài khoản
							</p>
						</Row>
						<Button
							//onClick={() => setIsForget(!isForget)}
							style={{
								borderWidth: 0,
								backgroundColor: 'transparent',
							}}
						>
							<p
								style={{
									fontSize: 10,
									color: '#949494',
									fontWeight: '300',
									paddingTop: 10,
									textDecoration: 'underline',
								}}
							>
								quên mật khẩu ?
							</p>
						</Button>
					</Row>

					<Row className="justify-content-around align-items-center">
						<Col lg="10" md="10">
							<Button
								// disabled={
								// 	validateEmail(email) && validatePassword(password)
								// 		? false
								// 		: true
								// }
								//onClick={_handleSignInClick}
								className="button-container-box-shadow"
								style={{
									marginTop: 10,
									color: 'white',
									// backgroundColor:
									// 	validateEmail(email) &&
									// 	validatePassword(password)
									// 		? '#4285f4'
									// 		: '#7a7a7a',
									color: 'white',
									borderWidth: 0,
									borderRadius: 25,
									width: '100%',
									height: 50,
								}}
							>
								Đăng nhập
							</Button>
						</Col>
					</Row>
					<Row className="justify-content-center align-items-center mt-3">
						<p style={{ color: '#949494', fontWeight: '300' }}>
							Chưa có tài khoản ?{' '}
						</p>
						<NavLink
							exact
							to="/sign_up"
							onClick={() => MyModal.hide()}
						>
							<p
								style={{
									marginLeft: 10,
									color: '#4285f4',
									fontWeight: '300',
								}}
							>
								đăng ký
							</p>
						</NavLink>
					</Row>
				</form>
			</Col>
		</Container>
	)
}
export default VerifyModal