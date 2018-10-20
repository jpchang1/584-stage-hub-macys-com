import React from "react";
import Dotdotdot from "react-dotdotdot";
import ResultProducts from "./ResultProducts.jsx";

function Thumbnail(props) {
	return (
		<div className='tvp-video-thumbnail'>
			<div className='tvp-video-thumbnail-image' style={{backgroundImage: 'url(' + props.imageUrl + ')'}}></div>
			<Dotdotdot clamp={2} className="tvp-video-thumbnail-title">
				{props.title}
			</Dotdotdot>
		</div>
	);
}

export default class Result extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const item = this.props.item;

		return (
			<a href={item.url}>
				<div className='tvp-search-result clearfix'>
					<Thumbnail title={item.title} imageUrl={item.asset.thumbnailUrl}/>
					<ResultProducts videoId={item.id} loginId={this.props.loginId}/>
				</div>
			</a>
		)
	}
}