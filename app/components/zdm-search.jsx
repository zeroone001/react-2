
import React from 'react';
import Logo from './logo/logo.jsx';
import TabBar from './tab/tabbar.jsx';

var ZdmSearch = React.createClass({
	render: function () {
		return <header className="head_banner header-top" id="J_header_top">
  					<div className="header-in">
  						<Logo />
  						<TabBar />
  					 </div>
					</header>
	}
});

module.exports = ZdmSearch;


