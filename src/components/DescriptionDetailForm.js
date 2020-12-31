import React from 'react';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
const DescriptionDetailsForm = ({ description = {}, type, name }) => {
	const {
		cpu,
		ram,
		os,
		screenSize,
		battery,
		memory,
		color,
		introduction,
	} = description;
	return description && description.os ? (
		<Container className="w-50 bg-white p-5">
			<ListGroup>
				<ListGroupItem className="d-flex justify-content-between align-items-center border-top-0 border-left-0 border-right-0">
					<small style={{ fontSize: 16, fontWeight: 'bold' }}>Name</small>
					<small style={{ fontSize: 16 }}>{name ? name : 'Hihi'}</small>
				</ListGroupItem>
				<ListGroupItem className="d-flex justify-content-between align-items-center border-top-0 border-left-0 border-right-0">
					<small style={{ fontSize: 16, fontWeight: 'bold' }}>CPU</small>
					<small style={{ fontSize: 16 }}>{cpu}</small>
				</ListGroupItem>
				<ListGroupItem className="d-flex justify-content-between align-items-center border-top-0 border-left-0 border-right-0">
					<small style={{ fontSize: 16, fontWeight: 'bold' }}>RAM</small>
					<small style={{ fontSize: 16 }}>{ram} GB</small>
				</ListGroupItem>
				<ListGroupItem className="d-flex justify-content-between align-items-center border-top-0 border-left-0 border-right-0">
					<small style={{ fontSize: 16, fontWeight: 'bold' }}>OS</small>
					<small style={{ fontSize: 16 }}>{os}</small>
				</ListGroupItem>
				<ListGroupItem className="d-flex justify-content-between align-items-center border-top-0 border-left-0 border-right-0">
					<small style={{ fontSize: 16, fontWeight: 'bold' }}>
						Screen
					</small>
					<small style={{ fontSize: 16 }}>{screenSize} inch</small>
				</ListGroupItem>
				<ListGroupItem className="d-flex justify-content-between align-items-center border-top-0 border-left-0 border-right-0">
					<small style={{ fontSize: 16, fontWeight: 'bold' }}>
						Battery
					</small>
					<small style={{ fontSize: 16 }}>{`${battery}`}</small>
				</ListGroupItem>
				<ListGroupItem className="d-flex justify-content-between align-items-center border-top-0 border-left-0 border-right-0">
					<small style={{ fontSize: 16, fontWeight: 'bold' }}>
						Memory
					</small>
					<small style={{ fontSize: 16 }}>{memory} GB</small>
				</ListGroupItem>
				<ListGroupItem className="d-flex justify-content-between align-items-center border-top-0 border-left-0 border-right-0">
					<small style={{ fontSize: 16, fontWeight: 'bold' }}>Color</small>
					<small style={{ fontSize: 16 }}>{color}</small>
				</ListGroupItem>
			</ListGroup>
		</Container>
	) : (
		<div />
	);
};
export default DescriptionDetailsForm;
