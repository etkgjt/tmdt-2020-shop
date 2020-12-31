import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Col } from 'reactstrap';
import Alert from 'reactstrap/lib/Alert';
import Container from 'reactstrap/lib/Container';
import mainLogo from '../assets/newLogo6.png';

import '../styles/footer.css';
const Footer = () => {
	const height = window.innerHeight;
	return (
		<Container className="bg-black">
			<Row
				className="d-flex justify-content-between p-3"
				style={{ height: '100%' }}
			>
				<Col className=" mx-4 my-1">
					<Row className="mb-3">
						<img src={mainLogo} className="img-fluid"></img>
					</Row>
					<Row className="footer-description">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit.
						Perferendis sunt id doloribus vero quam laborum quas alias
						dolores blanditiis iusto consequatur.
					</Row>
				</Col>
				<Col className=" mx-4 my-1">
					<Row>
						<h4>Quick Links</h4>
					</Row>

					<Row className="mt-4">
						<Link className="footer-description" to="/">
							Abouts
						</Link>
					</Row>
					<Row>
						<Link className="footer-description" to="/">
							Offers & Discounts
						</Link>
					</Row>
					<Row>
						<Link className="footer-description" to="/">
							Get Coupon
						</Link>
					</Row>
					<Row>
						<Link className="footer-description" to="/">
							Contact Us
						</Link>
					</Row>
				</Col>
				<Col className=" mx-4 my-1">
					<Row>
						<h4>New Products</h4>
					</Row>

					<Row className="mt-4">
						<Link className="footer-description" to="/">
							Woman Cloth
						</Link>
					</Row>
					<Row>
						<Link className="footer-description" to="/">
							Fashion Accessories
						</Link>
					</Row>
					<Row>
						<Link className="footer-description" to="/">
							Man Accessories
						</Link>
					</Row>
					<Row>
						<Link className="footer-description" to="/">
							Rubber made Toys
						</Link>
					</Row>
				</Col>
				<Col className=" mx-4 my-1">
					<Row>
						<h4>Support</h4>
					</Row>

					<Row className="mt-4">
						<Link className="footer-description" to="/">
							Frequently Asked Questions
						</Link>
					</Row>
					<Row>
						<Link className="footer-description" to="/">
							Terms & Conditions
						</Link>
					</Row>
					<Row>
						<Link className="footer-description" to="/">
							Privacy Policy
						</Link>
					</Row>
					<Row>
						<Link className="footer-description" to="/">
							Report a Payment Issue
						</Link>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};
export default Footer;
