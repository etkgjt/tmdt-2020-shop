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
import { CheckBox, VerifiedUserRounded } from '@material-ui/icons';
import AlertModal from './AlertModal';
import {
	getFavoriteList,
	updateReduxFavoriteList,
} from '../redux/actions/shopAction';

import { GoogleLogin } from 'react-google-login';
import { CLIENT_ID } from '../constants/constants';

import firebase from '../untils/firebase.js';

const VerifyPhoneNumberModal = (props) => {
	const dispatch = useDispatch();
	const [timeOut, setTimeOut] = useState(60);
	const [count, setCount] = useState(5);
	const [otp, setOTP] = useState();
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
	} = props.user;
	useEffect(() => {
		window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha',{
            'size': 'invisible',
        });
		_handleSendOTP();
	},[])
	useEffect(()=>{
		const interval = setInterval(()=>{
            if(timeOut > 0){
                setTimeOut(timeOut - 1);
				console.log(timeOut);
            } else {
                return;
            }
        }, 1000);
		return ()=> clearInterval(interval);
	},[timeOut])

	const _handleSendOTP = async () => {
		let phoneNumber = getPhoneNumber(props.user.phone);
		const recaptchaVerifier = window.recaptchaVerifier;

		await firebase.auth().signInWithPhoneNumber(phoneNumber, recaptchaVerifier).then( (e) => {
			window.confirmationResult = e;
			setTimeOut(60);

		})
		.catch(function (error) {
			MyModal.show(() => {},
			<AlertModal title="Gửi mã OTP thất bại!" color="#F12849" />);
			setTimeout(() => MyModal.hide(() => {}), 1000);
			throw error;
		});
	}
	const getPhoneNumber = (num) => {
		let phoneNumber = "+84" + num.substring(1);
		return phoneNumber;
	}
	const getCodeFromUserInput = () => {
		return otp;
	}
	const verifyCode = () => {
		try{
			const code = getCodeFromUserInput();
			console.log(code);
			window.confirmationResult
			.confirm(code)
			.then( result => {
				//alert("Đăng nhập thành công")
				distpatchLoginToRedux(dispatch);
				updateUserInfoRedux(dispatch, {
					address,
					id,
					first_name: firstname,
					last_name: lastname,
					username: userName,
					phone_number: phone,
					gender,
					token: props.token,
				});

				MyModal.hide();
				MyModal.show(() => {},
				<AlertModal title="Đăng nhập thành công!" color="#458AFF" />);
				setTimeout(() => MyModal.hide(() => {}), 1000);
			})
			.catch(() => {
				alert("Mã OTP không hợp lệ. Vui lòng kiểm tra và thử lại.")
			})
		} catch (err) {
			alert("Mã OTP không hợp lệ. Vui lòng kiểm tra và thử lại.")
		}

	}
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
						<h3 style={{ color: '#4F4F4F' }}>Nhập mã OTP</h3>
					</Row>
					<Row className="d-flex justify-content-around align-items-center mt-3">
						<span>Mã OTP đã được gửi đến số điện thoại {props.user.phone}.</span>
					</Row>
					<Row className="d-flex justify-content-around align-items-center mt-3">
						<TextField
							label="Mã OTP"
							className="w-100"
							//color={validateEmail(email) ? 'primary' : 'secondary'}
							onChange={(e) => setOTP(e?.target?.value)}
							//value={email}
						/>
					</Row>
					<Row className="justify-content-around align-items-center mt-3">
						{timeOut === 0 ?
						<Button
							onClick={_handleSendOTP}
							style={{
								color: '#4285f4'
							}}
						>
							Gửi lại mã OTP
						</Button>
						:
						<p>Vui lòng chờ {timeOut} giây trước khi yêu cầu mã OTP mới.</p>
						}
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
								onClick={verifyCode}
								className="button-container-box-shadow"
								style={{
									marginTop: 10,
									color: 'white',
									backgroundColor: '#4285f4',
									// backgroundColor:
									// 	validateEmail(email) &&
									// 	validatePassword(password)
									// 		? '#4285f4'
									// 		: '#7a7a7a',
									//color: 'white',
									borderWidth: 0,
									borderRadius: 25,
									width: '100%',
									height: 50,
								}}
							>
								Xác nhận
							</Button>
						</Col>
					</Row>

				</form>
			</Col>
		</Container>
	)
}
export default VerifyPhoneNumberModal