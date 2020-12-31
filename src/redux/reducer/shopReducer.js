import { REDUX } from '../store/type';

const initialState = {
	products: [],
	laptop: [],
	smartPhone: [],
	tablet: [],
	accessories: [],
	favorite: [],
	// loading: false,
	// error: false,
};

const shopReducer = (state = initialState, action) => {
	switch (action.type) {
		case REDUX.LOADING: {
			return {
				...state,
				loading: true,
			};
		}
		case REDUX.LOAD_ERROR: {
			return {
				...state,
				error: true,
			};
		}
		case REDUX.LOAD_SUCCESS: {
			return {
				...state,
				loading: false,
				error: false,
			};
		}
		case REDUX.UPDATE_SHOP_DATA: {
			return {
				...state,
				products: action.payload,
			};
		}
		case REDUX.CLEAR_SHOP_DATA: {
			return { ...initialState };
		}
		case REDUX.UPDATE_LAPTOP_DATA: {
			return {
				...state,
				laptop: action.payload,
			};
		}
		case REDUX.UPDATE_ACCESSORIES_DATA: {
			return {
				...state,
				accessories: action.payload,
			};
		}
		case REDUX.UPDATE_SMART_PHONE_DATA: {
			return {
				...state,
				smartPhone: action.payload,
			};
		}
		case REDUX.UPDATE_TABLET_DATA: {
			return {
				...state,
				tablet: action.payload,
			};
		}
		case REDUX.UPDATE_FAVORITE_LIST: {
			return {
				...state,
				favorite: action.payload,
			};
		}
		default: {
			return {
				...state,
			};
		}
	}
};
export default shopReducer;
