import { BASE_URL } from '../../constants/constants';
import { API } from '../../untils/api';
import axios from 'axios';
import { REDUX } from '../store/type';
import { reject } from 'lodash';

export const sendNoti = (noti) =>
	new Promise((resolve, reject) => {
		API.post('/notifications', noti)
			.then((res) => resolve(res.data))
			.catch((err) => reject(err));
	});

export const login = (userName, password) => {
	const data = JSON.stringify({ UserName: userName, Password: password });
	console.log('Data', data);
	return new Promise((resolve, reject) => {
		console.log(data);
		API.post('/login/customer', data)
			.then((res) => resolve(res?.data))
			.catch((err) => {
				console.log('Error', err);
				reject(err);
			});
	});
};
export const getUserInfo = (username, token) =>
	new Promise((resolve, reject) => {
		API.get(`/user?value=${username}`, {
			headers: {
				Authorization: token,
			},
		})
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err));
	});
export const signUp = (userInfo) =>
	new Promise((resolve, reject) => {
		axios
			.post('https://localhost:44377/customers/add', userInfo, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err));
	});
export const distpatchLoginToRedux = (dispatch) => {
	dispatch({ type: REDUX.LOG_IN });
};
export const updateUserInfoRedux = (dispatch, payload) => {
	dispatch({ type: REDUX.UPDATE_USER_INFO, payload: payload });
};

export const sendInquiry = (data) =>
	new Promise((resolve, reject) => {
		API.post('/contacts', data)
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err));
	});

export const verifyEmail = (username, password) =>
	new Promise((resolve, reject) => {
		API.get(`customers/ConfirmMail/${username}/${password}`)
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err));
	});
export const updateUserInfo = (token, info, id) =>
	new Promise((resolve, reject) => {
		API.put(`/customers`, info, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err));
	});
export const getOrderHistorySync = (userId, token) => async (dispatch) => {
	try {
		const res = await API.get(`/orders/search?customerId=${userId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});
		console.log('Histore trong acion', res);
		dispatch(updateOrderHistoryCreator(res.data));
	} catch (err) {
		console.log('get order history sync err', err);
		dispatch(updateOrderHistoryCreator([]));
	}
};

export const useCoupon = (userId, voucherCode, oldArr = [], token) => async (
	dispatch
) => {
	try {
		const sendData = JSON.stringify({
			CodeVoucher: voucherCode,
			CustomerId: userId,
		});
		const res = await API.post('/usevouchers', sendData, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});
		const newArr = [...oldArr].filter((v) => v.code !== voucherCode);
		console.log('use voucher success', res);
		dispatch(updateCouponListCreator(newArr));
	} catch (err) {
		console.log('get list used voucher err', err);
		dispatch(updateCouponListCreator(oldArr));
	}
};

export const changePassword = (token, pass, id) =>
	new Promise((resolve, reject) => {
		API.put(`/customers/changepassword`, pass, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		})
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err));
	});
export const getAllCoupon = (userId) => async (dispatch) => {
	try {
		const { data } = await API.get(`/vouchers/customer/${userId}`);
		console.log('Voucher lay duowc ne', data);
		dispatch(updateCouponListCreator(data));
	} catch (err) {
		console.log('get coupon list err', err);
		dispatch(updateCouponListCreator([]));
	}
};
export const sendEmailToRecoveryPassword = (email) =>
	new Promise((resolve, reject) => {
		axios
			.get(`https://localhost:44377/customers/forgotpassword/${email}`)
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err));
	});
export const sendRecoveryPassWord = (pass, token) => {
	let formdata = new FormData();
	formdata.append('newpassword', pass);
	return new Promise((resolve, reject) => {
		API.put('/customers/ConfirmForgotPassword', formdata, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => resolve(res?.data))
			.catch((err) => reject(err));
	});
};

const updateOrderHistoryCreator = (payload) => ({
	type: REDUX.UPDATE_ORDER_HISTORY,
	payload,
});
const updateCouponListCreator = (payload) => ({
	type: REDUX.UPDATE_COUPON_LIST,
	payload,
});
export const logout = () => {};
