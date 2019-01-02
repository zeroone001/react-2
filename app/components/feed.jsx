require('./feed.scss');

import React from 'react';
import FeedList from './feeditem.jsx';

var Feed = React.createClass({
	getInitialState: function () {
		return {
			listData: []
		}
	},
	componentDidMount: function () {
		jsonp(this.props.source, "", "callback", (data) => {
			if(data.status) {
				if(this.isMounted()) {
					console.log('woshi', data);
					this.setState({
						listData: data.data
					});
				}
			}else {
				alert(data.msg);
				reject("get data error!")
			}
		})
	},
	render: function () {
		return (
			<div className="wrap-content" id="wrapper">
				<ul id="J_scroll_ul" className="card-group-ul">
					{
						this.state.listData.map((item) => {
							return <FeedList data={item} />
						})
					}
				</ul>
				<div className="loading" id="J_loading">
	        <img src="https://res.smzdm.com/activity/img/iphone_active/loading.gif" />
	    	</div>
	    	<div className="pagination">
				    <div className="prev">
				    </div>
				    <span>第3页</span>
				    <div className="next">
				        <a href="#">
				            <i className="zm-icon-arrow-right"></i>
				        </a>
				    </div>
				</div>
				<div className="loaded-end" id="J_loaded_end">
		        没有了哦
		    </div>
			</div>
		)
	}
});

module.exports = Feed;

