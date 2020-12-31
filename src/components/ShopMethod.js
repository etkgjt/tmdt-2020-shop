import { Container, Icon } from '@material-ui/core';
import React from 'react';
import { Col, Row } from 'reactstrap';

const ShopMethod = () => (
	<Container className="mt-5 pt-5 justify-content-center">
		<h3 className="text-center">Our services</h3>
		<h4 className="text-center my-4">
			Join thousands of satisfied customers using our template globally.
		</h4>
		<Row className="my-5 py-5">
			<Col xl="3" lg="6" className="px-3">
				<Col
					className="button-container-box-shadow pt-3"
					style={{ backgroundColor: '#1E88E5', color: 'white' }}
				>
					<Row className="px-5 mt-2 justify-content-center ">
						<Icon style={{ fontSize: 70, color: 'white' }}>
							local_shipping_rounded
						</Icon>
					</Row>
					<Row className="px-5 mt-4">
						<h5>Shipping</h5>
					</Row>
					<Row className="px-5 mt-2">
						<p>
							aorem ixpsacdolor sit ameasecur adipisicing elitsf edasd.
						</p>
					</Row>
				</Col>
			</Col>
			<Col xl="3" lg="6" className="px-3">
				<Col
					className="button-container-box-shadow pt-3"
					style={{ backgroundColor: '#1E88E5', color: 'white' }}
				>
					<Row className="px-5 mt-2 justify-content-center">
						<Icon style={{ fontSize: 70 }}>verified_user</Icon>
					</Row>
					<Row className="px-5 mt-4">
						<h5>Security</h5>
					</Row>
					<Row className="px-5 mt-2">
						<p>
							aorem ixpsacdolor sit ameasecur adipisicing elitsf edasd.
						</p>
					</Row>
				</Col>
			</Col>
			<Col xl="3" lg="6" className="px-3">
				<Col
					className="button-container-box-shadow pt-3"
					style={{ color: 'white', backgroundColor: '#1E88E5' }}
				>
					<Row className="px-5 mt-2 justify-content-center">
						<Icon style={{ fontSize: 70 }}>headset_mic_rounded</Icon>
					</Row>
					<Row className="px-5 mt-4">
						<h5>Good Support</h5>
					</Row>
					<Row className="px-5 mt-2">
						<p>
							aorem ixpsacdolor sit ameasecur adipisicing elitsf edasd.
						</p>
					</Row>
				</Col>
			</Col>
			<Col xl="3" lg="6" className="px-3">
				<Col
					className="button-container-box-shadow pt-3"
					style={{ backgroundColor: '#1E88E5', color: 'white' }}
				>
					<Row className="px-5 mt-2 justify-content-center">
						<Icon style={{ fontSize: 70 }}>cached_two_tone</Icon>
					</Row>
					<Row className="px-5 mt-4">
						<h5>Exchanges</h5>
					</Row>
					<Row className="px-5 mt-2">
						<p>
							aorem ixpsacdolor sit ameasecur adipisicing elitsf edasd.
						</p>
					</Row>
				</Col>
			</Col>
		</Row>
	</Container>
);
export default ShopMethod;
