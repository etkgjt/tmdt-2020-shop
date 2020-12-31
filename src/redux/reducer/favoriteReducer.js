import { REDUX } from '../store/type';
const initialState = {
	favoriteItems: [],
};
 const favoriteReducer = (state = initialState, action) => {
	switch (action.type) {
		case REDUX.CLEAR_DATA: {
			return {
				...state,
				favoriteItems: [],
			};
		}
		case REDUX.ADD_TO_FAVORITE: {
			return { ...state };
		}
		case REDUX.REMOVE_FROM_FAVORITE: {
			return { ...state };
		}
		default: {
			return state;
		}
	}
};
export default favoriteReducer;