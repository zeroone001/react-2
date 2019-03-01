require('../app/lib/base.scss');
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import todoApp from '../app/store/reducers/index.js';

import ZdmSearch from '../app/components/zdm-search.jsx';
import Swiper from '../app/components/swiper.jsx';
import Feed from '../app/components/feed.jsx';

console.log('React', React);
let store = createStore(todoApp);
ReactDOM.render(
	<Provider store={store}>
		<ZdmSearch />
		<Swiper source="http://localhost:3000/data/swiper" />
		<Feed source="http://localhost:3000/data/feed" />
	</Provider>,
	document.querySelector("#myApp")
);
