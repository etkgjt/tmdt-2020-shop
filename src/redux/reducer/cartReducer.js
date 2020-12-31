import { REDUX } from '../../redux/store/type';
const initialState = {
	cartId: '',
	items: [],
	payment: {},
	shippingInfo: {},
};
const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case REDUX.CLEAR_DATA: {
			return initialState;
		}
		case REDUX.CLEAR_CART: {
			return initialState;
		}
		case REDUX.ADD_TO_CART: {
			let idx = [...state.items].findIndex(
				(v) => v.id === action.payload.id
			);
			if (idx === -1) {
				return {
					...state,
					items: [...state.items, { ...action.payload, amount: 1 }],
				};
			}
			let tmpArr = [...state.items];
			tmpArr.splice(idx, 1, {
				...action.payload,
				amount: tmpArr[idx].amount + 1,
			});
			return { ...state, items: [...tmpArr] };
		}
		case REDUX.REMOVE_FROM_CART: {
			let { id } = action.payload;
			let tempArr = [...state.items].filter((v) => v.id !== id);
			return { ...state, items: tempArr };
		}
		case REDUX.UPDATE_ITEM: {
			let tmpArr = [...state.items];
			let idx = state.items.findIndex((v) => v.id === action.payload.id);
			tmpArr.splice(idx, 1, { ...action.payload });
			return {
				...state,
				items: [...tmpArr],
			};
		}
		case REDUX.GET_CART_LIST: {
			return { ...state };
		}
		case REDUX.UPDATE_PAYMENT_METHOD: {
			return {
				...state,
				payment: action.payload,
			};
		}
		case REDUX.UPDATE_SHIPPING_INFO: {
			return {
				...state,
				shippingInfo: action.payload,
			};
		}
		default: {
			return state;
		}
	}
};
export default cartReducer;
