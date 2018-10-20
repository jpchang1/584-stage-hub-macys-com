import React from "react";
import Sidebar from "./Sidebar.jsx";
import Content from "./Content.jsx";

export default class FloatingPanel extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={'tvp-search-floating-panel clearfix' + (this.props.active ? ' show' : '')}>
				<Sidebar {...this.props}/>
				<Content {...this.props}/>
			</div>
		);
	}
}