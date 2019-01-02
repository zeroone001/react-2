require('../app/lib/base.scss');
import React from 'react';
import ReactDOM from 'react-dom';

import ZdmSearch from '../app/components/zdm-search.jsx';
import Swiper from '../app/components/swiper.jsx';
import Feed from '../app/components/feed.jsx';

ReactDOM.render(
	<div>
		<ZdmSearch />
		<Swiper />
		<Feed source="http://localhost:3000/data/feed" />
	</div>,
	document.querySelector("#myApp")
);