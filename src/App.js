import React from 'react';
import logo from './logo.svg';
import { Provider } from 'react-redux';
import store from './redux/store';

import './App.css';
import { Route } from 'react-router-dom';
import SingleProduct from './pages/SingleProduct';
import Home from './pages/Home';

function App() {
	return (
		<Provider store={store}>
			<Route path="/" component={Home} />
			<Route path="/single_product" component={SingleProduct} />
		</Provider>
	);
}

export default App;
