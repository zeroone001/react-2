import React from 'react';

var FeedList = React.createClass({
	getInitialState: function () {
		return {

		}
	},
	componentDidMount: function () {
		console.log('test:', this.props.data);
	},
	render: function (argument) {
		var _data = this.props.data;
		return (
			<li className="card-group-list" data-timesort={_data.time_sort} >
			    <a href="#" target="_blank">
			        <div className="zm-card">
			            <div className="zm-card-media">
			                <img src={_data.article_pic} alt="历史新低、防霾必备：MI 小米 除甲醛增强版滤芯（1代 2代通用）" />
			                <div className="card-label card-label-guonei">国内</div>
			            </div>
			            <div className="zm-card-content">
			                <div className="zm-card-title">{_data.article_title}</div>
			                <div className="card-price">{_data.article_price}</div>
			                <div className="zm-card-actions">
			                    <div className="zm-card-actions-left">
			                        <span>
			                            <span className="card-mall">{_data.article_mall}</span>
			                            <span>{_data.article_format_date}</span>
			                        </span>
			                    </div>
			                    <div className="zm-card-actions-right">
			                        <span className="icon-group">
			                            <i className="zm-icon-comments-o"></i>199
			                        </span>
			                        <span className="icon-group">
			                            <i className="zm-icon-zhi-char"></i>89%
			                        </span>
			                    </div>
			                </div>
			            </div>
			        </div>
			    </a>
			</li>
		)
	}
});

module.exports = FeedList;
