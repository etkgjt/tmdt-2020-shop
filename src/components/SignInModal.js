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
import { MyModal, IndicatorModal } from '../components';
import axios from 'axios';
import { CheckBox } from '@material-ui/icons';
import AlertModal from './AlertModal';
import {
	getFavoriteList,
	updateReduxFavoriteList,
} from '../redux/actions/shopAction';

import { GoogleLogin } from 'react-google-login';
import { CLIENT_ID } from '../constants/constants';

function parseJwt(token) {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jsonPayload = decodeURIComponent(
		atob(base64)
			.split('')
			.map(function (c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join('')
	);

	return JSON.parse(jsonPayload);
}

const SignInModal = ({ onSignInSuccess = () => {} }) => {
	const dispatch = useDispatch();
	const [isForget, setIsForget] = useState(false);
	const [email, setEmail] = useState(localStorage.getItem('tech_world_acc'));
	const [password, setPassword] = useState(
		localStorage.getItem('tech_world_pass')
	);
	// useEffect(() => {
	// 	if (localStorage.getItem('tech_world_acc'))
	// 		setEmail(localStorage.getItem('tech_world_acc'));
	// 	if (localStorage.getItem('tech_world_pass'))
	// 		setPassword(localStorage.getItem('tech_world_pass'));
	// }, [
	// 	localStorage.getItem('tech_world_acc'),
	// 	localStorage.getItem('tech_world_pass'),
	// ]);
	const [remember, setRemember] = useState(true);
	const history = useHistory();
	const _handleSignInClick = async () => {
		try {
			MyModal.show(() => {}, <IndicatorModal title="Sign in..." />);
			const { token, user } = await login(email, password);
			const {
				id,
				userName,
				// password,
				role,
				firstname,
				lastname,
				gender,

				phone,
				address,
				verified,
				// roleNavigation,
				// carts,
				// comments,
				// favorites,
				// orders,
			} = user;

			// console.log('token', access_token);

			// console.log('long token', parseJwt(access_token));
			// const { sub } = parseJwt(access_token);
			// const res = await getUserInfo(sub, access_token);
			// const {
			// 	address,
			// 	id,
			// 	fullname,
			// 	username,
			// 	phone_number,
			// 	gender,
			// 	first_name,
			// 	last_name,
			// 	verified,
			// } = res;

			// if (!verified) {
			// 	MyModal.hide(() => {});
			// 	MyModal.show(() => {},
			// 	<AlertModal title="Your account was not verified !" color="#F12849" />);
			// 	setTimeout(() => MyModal.hide(() => {}), 1000);
			// 	return;
			// }

			console.log(
				'user Info',
				address,
				id,

				userName,
				phone,
				gender,
				firstname,
				lastname
			);
			// const favorite = await getFavoriteList(id);
			// console.log('favorite ne', favorite);
			// updateReduxFavoriteList(dispatch, favorite);
			distpatchLoginToRedux(dispatch);
			updateUserInfoRedux(dispatch, {
				address,
				id,
				first_name: firstname,
				last_name: lastname,
				username: email || userName,
				phone_number: phone,
				gender,
				token,
			});
			localStorage.setItem('tech_world_acc', email);
			localStorage.setItem('tech_world_pass', password);
			onSignInSuccess();
			MyModal.hide();
		} catch (err) {
			console.log('long signin err', err);
			MyModal.hide();
			MyModal.show(() => {},
			<AlertModal title="Invalid Email or Password !" color="#F12849" />);
			setTimeout(() => MyModal.hide(() => {}), 1000);
		}
	};
	const validateEmail = (email) => {
		const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return regex.test(email);
	};
	const validatePassword = (pass) => {
		const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
		return regex.test(pass);
	};
	const gotoProfile = () => {
		history.push('/user_info');
	};
	const [recoveryEmail, setRecoveryEmail] = useState('');
	const _handleRecover = async () => {
		try {
			MyModal.show(() => {}, <IndicatorModal title="Đang gửi..." />);
			const sendData = JSON.stringify({ email: recoveryEmail });
			const res = await sendEmailToRecoveryPassword(recoveryEmail);
			console.log('send success ', res);
			onSignInSuccess();
			MyModal.hide(() => {});
			MyModal.show(() => {},
			<AlertModal title="Send success !" color="#458AFF" />);
			setTimeout(() => MyModal.hide(() => {}), 1000);
			// MyModal.hide();
		} catch (err) {
			MyModal.hide();
			MyModal.show(() => {},
			<AlertModal title="Send failed !" color="#F12849" />);
			setTimeout(() => MyModal.hide(() => {}), 1000);
			console.log('recovery err', err);
		}
	};
	return (
		<Container className="d-flex justify-content-center align-items-center w-75">
			{!isForget ? (
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
								color={validateEmail(email) ? 'primary' : 'secondary'}
								onChange={(e) => setEmail(e?.target?.value)}
								value={email}
							/>
						</Row>
						<Row className="d-flex justify-content-around align-items-center mt-3">
							<TextField
								label="Mật khẩu"
								className="w-100"
								color={
									validatePassword(password) ? 'primary' : 'secondary'
								}
								type="password"
								onChange={(e) => {
									setPassword(e?.target?.value);
								}}
								value={password}
							/>
						</Row>

						<Row className="mt-3 justify-content-around align-items-center">
							<Row className="align-content-center">
								<Checkbox
									checked={remember}
									onChange={() => setRemember(!remember)}
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
								onClick={() => setIsForget(!isForget)}
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
									onClick={_handleSignInClick}
									className="button-container-box-shadow"
									style={{
										marginTop: 10,
										color: 'white',
										backgroundColor:
											validateEmail(email) &&
											validatePassword(password)
												? '#4285f4'
												: '#7a7a7a',
										color: 'white',
										borderWidth: 0,
										borderRadius: 25,
										width: '100%',
										height: 50,
									}}
								>
									Đăng nhập
								</Button>

								<GoogleLogin
									buttonText="Login"
									clientId={CLIENT_ID}
									onSuccess={(res) => {
										console.log('Success res', res);
									}}
									onFailure={(fail) => {
										console.log('Fail res', fail);
									}}
								>
									{/* <Button
										// disabled={
										// 	validateEmail(email) && validatePassword(password)
										// 		? false
										// 		: true
										// }
										onClick={_handleSignInClick}
										className="button-container-box-shadow"
										style={{
											marginTop: 10,
											color: 'white',
											backgroundColor:
												validateEmail(email) &&
												validatePassword(password)
													? '#4285f4'
													: '#7a7a7a',
											color: 'white',
											borderWidth: 0,
											borderRadius: 25,
											width: '100%',
											height: 50,
										}}
									>
										Đăng nhập Google
									</Button> */}
								</GoogleLogin>
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
			) : (
				<Col
					lg="5"
					md="10"
					sm="10"
					className="mt-5 z-depth3 bg-white w-50 d-flex flex-column p-5"
				>
					<h3
						style={{ textAlign: 'center', color: '#4F4F4F' }}
						className="mt-2 mb-2"
					>
						Quên mật khẩu
					</h3>
					<TextField
						varian="contained"
						className="mb-3"
						label="Emal"
						onChange={(e) => setRecoveryEmail(e?.target?.value)}
					/>
					<Button
						variant="contained"
						className="mt-2 mb-3"
						onClick={() => _handleRecover()}
						color="primary"
					>
						Khôi phục mật khẩu
					</Button>
				</Col>
			)}
		</Container>
	);
};

export default SignInModal;
