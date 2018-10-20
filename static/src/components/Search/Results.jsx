import React from "react";
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import Result from "./Result.jsx";

class Results extends React.Component {
	constructor(props) {
		super(props);
	}

	handleScrollbarsUpdate(values){
		const { scrollTop, scrollHeight, clientHeight } = values;

		if((scrollTop / (scrollHeight - clientHeight)) === 1)
			this.props.loadMore();
	}

	render() {
		const query = this.props.query;
		const results = this.props.results;
		const topSpace = this.props.topSpace;
		const scrollBarsStyle = {
			marginTop: topSpace,
			height: `calc(100% - ${topSpace}px)`
		};

		if(results.length){
			return (
				<React.Fragment>
					<h4 className='tvp-search-results-title'>Results for: {query}</h4>
					<Scrollbars ref='scrollbars' onUpdate={this.handleScrollbarsUpdate.bind(this)} style={scrollBarsStyle}>
						{
							results.map(function (result, i) {
								return <Result key={i} item={result} loginId={this.props.loginId}/>;
							}, this)
						}
					</Scrollbars>
				</React.Fragment>
			)
		}else{
			return <h4 className='tvp-search-not-found-text'>No results found for: {query}</h4>
		}
	}
}

Results.propTypes = {
	topSpace: PropTypes.number
};

Results.defaultProps = {
	topSpace: 33
};

export default Results;