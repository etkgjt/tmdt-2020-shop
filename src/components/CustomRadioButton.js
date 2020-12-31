import { MDBContainer } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { Button, Row } from 'reactstrap';
const CustomRadioButton = ({ items, initValue, checkedFunc = () => {} }) => {
	const [radio, setRadio] = useState(initValue ? initValue : 0);
	useEffect(() => {
		checkedFunc && checkedFunc(radio);
	}, [radio]);
	return (
		<MDBContainer className="m-0 pl-0 pt-3 d-flex flex-column justify-content-around bg-white">
			{items && items.length ? (
				items.map((v, i) => (
					<Row className="ml-1 pl-3 mt-1" key={`${i}-${v?.value}`}>
						<Button
							className="custom-radio-button"
							style={{
								backgroundColor:
									radio === v?.value ? '#2962FF' : 'white',
								borderWidth: radio === v?.value ? 0 : 1,
								outline: 'none',
								marginRight: 10,
							}}
							onClick={() => radio !== v?.value && setRadio(v?.value)}
						/>
						<p style={{ fontSize: 14 }}>{v.label}</p>
					</Row>
				))
			) : (
				<div></div>
			)}
		</MDBContainer>
	);
};
export default CustomRadioButton;
