import React from "react";
import Results from "./Results.jsx";

export default class Content extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const loading = this.props.loading;

		return (
			<div className='tvp-search-content'>
				{loading && <div className="tvp-search-spinner"></div>}
				{!loading && this.props.results !== null && <Results {...this.props}/>}
			</div>
		);
	}
}