export const getNumberWithDot = (x = 0) =>
	x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
