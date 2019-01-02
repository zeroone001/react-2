require('../lib/swiper.min.css');
require('./swiper.scss');
import React from 'react';
let Swipe = require('../lib/swiper.min.js');

var Swiper = React.createClass({
	getInitialState: function() {
		return {
			imgUrls: []
		}
	},
	componentDidMount: function() {
		jsonp(this.props.source, "", "callback", (data) => {
			if(data.status) {
				//如果组件渲染到了 DOM 中，isMounted() 返回 true。
				//可以使用该方法保证 setState() 和 forceUpdate()
				//在异步场景下的调用不会出错。
				if(this.isMounted()) {
					console.log('data::', data);
					this.setState({
						imgUrls: data.data,
					})
				  new Swipe ('.swiper-container', {
				    loop: true,
				    pagination: '.swiper-pagination',
				    paginationClickable: true,
				    autoplay : 3000,
					  autoplayDisableOnInteraction : false,
					});
				}
			}else {
				alert(data.msg);
			}
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
