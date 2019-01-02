require('./logo.scss');
import React from 'react';

var Logo = React.createClass({
	render: function (argument) {
		return (<div className="header-white">
	    <div className="logo-img">
	    	<div id="logo">
	    		<a href="https://m.smzdm.com/"><img src="https://res.smzdm.com/mobile/wap_v2/dist/img/embed/logo.png" /></a>
	    	</div>
	    </div>
	    <div className="logo-search">
	    	<input type="text" name="search" placeholder="搜索分类/品牌/商品" id="J_enter_search" />
	    </div>
	    <div className="logo-download"><a target="_blank" href="#" className="J_ota" >下载</a></div>
	</div>);

	}
});

module.exports = Logo;
