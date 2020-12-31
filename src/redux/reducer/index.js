import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import favoriteReducer from './favoriteReducer';
import userReducer from './userReducer';
import shopReducer from './shopReducer';
const reducers = combineReducers({
	cartReducer,
	favoriteReducer,
	userReducer,
	shopReducer,
});
export default reducers;
