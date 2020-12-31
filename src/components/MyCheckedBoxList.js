import { Checkbox } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
const MyCheckboxList = ({ items, initValues, onCheckedFunc = () => {} }) => {
	const [checked, setChecked] = useState(initValues ? [...initValues] : []);
	const _handleCheck = (val) => {
		let idx = checked.findIndex((v) => val.value === v.value);
		if (idx === -1) {
			setChecked([...checked, val]);
			onCheckedFunc([...checked, val]);
		} else {
			let tmp = [...checked];
			tmp.splice(idx, 1);
			setChecked([...tmp]);
			onCheckedFunc([...tmp]);
		}
	};
	return (
		<Col className="m-0 pl-0 pt-3 bg-white">
			{items && items.length ? (
				items.map((val, idx) => (
					<Row
						className="ml-3 mt-1 align-items-center"
						key={`${val}-${idx}`}
					>
						<Checkbox
							checked={
								checked?.findIndex((v) => v.value === val.value) !== -1
							}
							// onChange={() => setChecked(val)}
							onClick={() => _handleCheck(val)}
							name="checkedB"
							color="primary"
						/>
						<p
							style={{
								fontSize: 14,
								paddingTop: 15,
								textAlign: 'center',
							}}
						>
							{val?.label}
						</p>
					</Row>
				))
			) : (
				<div></div>
			)}
		</Col>
	);
};
export default MyCheckboxList;
