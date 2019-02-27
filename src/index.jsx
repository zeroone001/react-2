require('../app/lib/base.scss');
import React from 'react';
import ReactDOM from 'react-dom';

import ZdmSearch from '../app/components/zdm-search.jsx';
import Swiper from '../app/components/swiper.jsx';
import Feed from '../app/components/feed.jsx';
console.log('React', React);
ReactDOM.render(
	<div>
		<ZdmSearch />
		<Swiper source="http://localhost:3000/data/swiper" />
		<Feed source="http://localhost:3000/data/feed" />
	</div>,
	document.querySelector("#myApp")
);
