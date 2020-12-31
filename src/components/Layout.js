import React from 'react';
import Container from 'reactstrap/lib/Container';

const Layout = (props) => (
	<Container fluid style={{ padding: 0 }}>
		{props.children}
	</Container>
);

export default Layout;
