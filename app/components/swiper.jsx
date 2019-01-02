require('../lib/swiper.min.css');
require('./swiper.scss');
import React from 'react';
let Swipe = require('../lib/swiper.min.js');

var Swiper = React.createClass({
	getInitialState: function() {
		return {
			imgUrls: ['https://tp-eimg.smzdm.com/201812/23/5c1f6bb447d515180.png','https://tp-eimg.smzdm.com/201812/21/5c1cbe574f77c932.png','https://tp-eimg.smzdm.com/201812/23/5c1f6acd583d7198.png']
		}
	},
	componentDidMount: function() {
		new Swipe ('.swiper-container', {
					    loop: true,
					    pagination: '.swiper-pagination',
					    paginationClickable: true,
					    autoplay : 3000,
						  autoplayDisableOnInteraction : false,
					});
	},
	render:function (argument) {
		var countId = 0;
		return <div className="swiper-container">
			    <div className="swiper-wrapper">
			    	{
			    		this.state.imgUrls.map((url) => {
			    			return (<div className="swiper-slide" key={"header" + countId++} >
			    						<img className="img" src={url} />
			    				   </div>);
			    		})
			    	}
			    </div>
			</div>
	}
})

module.exports = Swiper;
