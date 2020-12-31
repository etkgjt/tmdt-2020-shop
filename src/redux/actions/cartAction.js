import { REDUX } from '../store/type';
import { API } from '../../untils/api';

export const addToCart = (dispatch, item) => {
	dispatch({ type: REDUX.ADD_TO_CART, payload: item });
};
export const removeFromCart = (dispatch, item) => {
	dispatch({ type: REDUX.REMOVE_FROM_CART, payload: item });
};
export const updateItem = (dispatch, item) => {
	dispatch({ type: REDUX.UPDATE_ITEM, payload: item });
};
export const clearCart = (dispatch) => {
	dispatch({ type: REDUX.CLEAR_CART });
};
export const updatePaymentMethod = (dispatch, method) => {
	dispatch({ type: REDUX.UPDATE_PAYMENT_METHOD, payload: method });
};
export const updateShippingInfo = (dispatch, info) => {
	dispatch({ type: REDUX.UPDATE_SHIPPING_INFO, payload: info });
};
export const sendOrder = (token, orderInfo) =>
	new Promise((resolve, reject) => {
		API.post('/orders', orderInfo, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err));
	});
