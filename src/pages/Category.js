import React, { useCallback, memo, useState } from 'react';

import { Container, Row } from 'reactstrap';
import '../styles/pageTitle.css';
const Category = memo(() => {
	console.log('category render ne');
	return (
		<Container fluid>
			<Row className="title-container">
				<p className="page-title">Category</p>
			</Row>
		</Container>
	);
});
export default Category;
