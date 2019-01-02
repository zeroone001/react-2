require('./tabbar.scss');
import React from 'react';
let jsonp = require('../../util/jsonp.js');

var TabBar = React.createClass({
	getInitialState: function() {
		return {
			tabs: ['首页', '国内好价', '海淘好价', '海淘好价', '海淘好价', '海淘好价', '海淘好价', '海淘好价']
		}
	},
	componentDidMount: function() {
		// jsonp(this.props.source, "", "callback", (data) => {
		// 	if(data.status) {

		// 		if(this.isMounted()) {
		// 			this.setState({
		// 				more1: data.data.slice(0,3),
		// 				more2: data.data.slice(3,5),
		// 				more3: data.data.slice(5,7),
		// 			})
		// 		    new Swiper ('.more_bottom .swiper-container', {
		// 			    loop: true,
		// 			    pagination: '.swiper-pagination',
		// 			    paginationClickable: true,
		// 			    autoplay : 2000,
		// 				autoplayDisableOnInteraction : false,
		// 			})
		// 		}
		// 	}else {
		// 		alert(data.msg);
		// 	}
		// });
	},
	render: function () {
		return <div className="header-tab">
    <div className="header-inner">
        <div className="channel-list">
            <ul>
                {
                	this.state.tabs.map((item, index) => {
                		if (index === 0) {
                			return <li><a className="cur-tab" href="#">{item}</a></li>
                		} else {
                			return <li><a href="#">{item}</a></li>
                		}
                	})
                }
            </ul>
        </div>

        <div className="all-tabs">
            <a href="#">
                <i className="icon-tab-list"></i>
                <span>分类</span>
            </a>
        </div>
    </div>
</div>
	}
});

module.exports = TabBar;

