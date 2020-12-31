import { Rating } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';

const MyRating = ({ value, readOnly }) => {
	const [data, setData] = useState(value ? value : 0);
	return (
		<Rating
			size="large"
			name="size-large"
			precision={0.5}
			value={data}
			disabled={readOnly}
			onChange={(valye) => setData(value)}
		/>
	);
};
export default MyRating;
