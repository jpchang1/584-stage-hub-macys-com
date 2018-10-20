import React from "react";
import Suggestions from "./Suggestions.jsx";

export default class Sidebar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='tvp-search-sidebar'>
				<Suggestions {...this.props}/>
			</div>
		);
	}
}