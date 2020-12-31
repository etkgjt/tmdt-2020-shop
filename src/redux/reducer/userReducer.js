import { REDUX } from '../../redux/store/type';

const initialState = {
	loggedIn: false,
	userInfo: {
		email: '',
		name: '',
		id: '',
		token: '',
	},
	history: [],
	coupon: [],
};
const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case REDUX.LOG_IN: {
			return { ...state, loggedIn: true };
		}
		case REDUX.LOG_OUT: {
			return { ...state, loggedIn: false };
		}
		case REDUX.CLEAR_DATA: {
			return initialState;
		}
		case REDUX.UPDATE_USER_INFO: {
			return {
				...state,
				userInfo: action.payload,
			};
		}
		case REDUX.UPDATE_ORDER_HISTORY: {
			return {
				...state,
				history: action.payload,
			};
		}
		case REDUX.UPDATE_COUPON_LIST: {
			return {
				...state,
				coupon: action.payload,
			};
		}
		default: {
			return state;
		}
	}
};
export default userReducer;
