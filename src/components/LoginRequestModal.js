import { Button, Container } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row } from 'reactstrap';

const LoginRequestModal = ({ onClose }) => {
	return (
		<Container className="justify-content-center align-items-center d-flex flex-column bg-white w-25 p-5">
			<Row className="justify-content-center mt-5 mb-3">
				<h4>Sign In</h4>
			</Row>
			<Row className="justify-content-center align-items-center d-flex w-75">
				<p className="text-center">
					Sign in to enjoy the benefits of shop account. If you haven’t
					already created an account, you will be prompted to do so after
					signing in.
				</p>
			</Row>

			<NavLink
				exact
				// to="/checkout"
				to={{
					pathname: '/sign_in',
				}}
				className="w-100"
				style={{
					color: 'white',
					textDecoration: 'none',
				}}
			>
				<Button
					onClick={() => onClose()}
					className="button-container-box-shadow mb-5"
					style={{
						marginTop: 10,
						color: 'white',
						backgroundColor: '#4285f4',
						color: 'white',
						borderWidth: 0,
						width: '100%',
						height: 50,
						borderRadius: 25,
					}}
				>
					Sign In
				</Button>
			</NavLink>
		</Container>
	);
};
export default LoginRequestModal;
