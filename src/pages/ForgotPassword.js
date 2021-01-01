import { Card, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { Row, Container } from 'reactstrap';
import { AlertModal, IndicatorModal, MyModal } from '../components';
import { sendRecoveryPassWord, verifyEmail } from '../redux/actions/userAction';

import '../styles/checkout.css';
import '../styles/forAll.css';
import '../styles/material.css';
import '../styles/pageTitle.css';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}
const ForgotPassword = () => {
	const history = useHistory();
	// let query = useQuery();
	const { token } = useParams();
	console.log('new token ne', token);
	//const token = query.get('token');
	const [state, setState] = useState({
		password: '',
		confirm_password: '',
	});
	useEffect(() => {
		ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
			// console.log('value ne', value, 'state ne', state);
			if (value !== state?.password) {
				return false;
			}
			return true;
		});
		// return ValidatorForm.removeValidationRule('isPasswordMatch');
	});
	const _handleChange = (e) => {
		e.persist();
	console.log(e.target.name, e.target.value);
		setState({ ...state, [e.target.name]: e.target.value });
	};
	const _handleSubmit = async () => {
		try {
			MyModal.show(() => {}, <IndicatorModal />);

			const sendData = JSON.stringify({
				password: state.password,
				token: token,
			});
			console.log('send Data', sendData);
			const res = await sendRecoveryPassWord(state.password, token);
			console.log('', res);
			MyModal.hide(() => {});
			MyModal.show(
				() => history.push('/'),
				<AlertModal title="Đổi mật khẩu thành công !" color="#458AFF" />
			);
			setTimeout(() => MyModal.hide(), 1000);
		} catch (err) {
			console.log('Update info err', err);
			MyModal.hide(() => {});
			MyModal.show(() => {},
			<AlertModal title="Đổi mật khẩu thất bại !" color="#F12849" />);
			setTimeout(() => MyModal.hide(), 1000);
		}
	};
	return (
		<Container
			fluid
			className="p-0 pb-5 d-flex flex-column justify-content-center align-items-center w-100"
		>
			<Row className="title-container">
				<p class="page-title">Đổi mật khẩu</p>
			</Row>
			<Card
				className="mt-5 p-2 d-flex flex-row justify-content-center align-content-center w-50"
				elevation={3}
			>
				<ValidatorForm
					className="p-3 w-75 justify-content-center"
					onSubmit={() => _handleSubmit()}
				>
					<TextValidator
						variant="outlined"
						label="Mật khẩu"
						className="mb-4 w-100"
						type="password"
						value={state?.password}
						name="password"
						validators={['required', 'minStringLength: 6']}
						errorMessages={['This field is required']}
						onChange={_handleChange}
					/>
					<TextValidator
						variant="outlined"
						label="Xác nhận mật khẩu"
						className="mb-4 w-100"
						type="password"
						value={state?.confirm_password}
						name="confirm_password"
						validators={['required', 'isPasswordMatch']}
						errorMessages={[
							'This field is required',
							"password didn't match",
						]}
						onChange={_handleChange}
					/>
					<Button
						type="submit"
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
						Đổi mật khẩu
					</Button>
				</ValidatorForm>
			</Card>
		</Container>
	);
};
// const ChangePassword = ({ id }) => {
// 	return (
// 		<Container fluid className="justify-content-center p-0 w-50">

// 		</Container>
// 	);
// };
export default ForgotPassword;
