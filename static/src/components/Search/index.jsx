import React from "react";
import PropTypes from 'prop-types';
import {debounce} from 'throttle-debounce';
import Overlay from "./Overlay.jsx";
import SearchBar from "./SearchBar.jsx";
import FloatingPanel from "./FloatingPanel.jsx";
import isMobile from "./isMobile.js";
import jsonp from "./jsonp.js";

import "./search.scss";

class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			active: false,
			loading: false,
			results: null,
			page: 0,
			suggestions: []
		};

		this.search = this.search.bind(this);
		this.clear = this.clear.bind(this);
		this.onLoadResultsDone = this.onLoadResultsDone.bind(this);

		const debounceTime = this.props.requestDebounceTime;

		this.loadResults = debounce(debounceTime, this.loadResults);
		this.loadSuggestions = debounce(debounceTime, this.loadSuggestions);
	}

	mapResultsResponse(resultsObj){
		return resultsObj.result.map((result) => {
			return Object.assign(result, JSON.parse(result.data || '{}'));
		}).map((result)=>{
			result.url = this.props.resultUrl(result);

			return result;
		}, this)
	}

	onLoadResultsDone(response){
		let newState = {
			loading: false,
			results: null
		};

		if(this.state.query){
			this.setState(prevState => {
				let results = this.mapResultsResponse(response);
				let prevResults = prevState.results;

				if(prevState.page > 0 && Array.isArray(prevResults))
					results = prevResults.concat(results)

				newState.results = results;

				return newState;
			});
		}else{
			this.setState(newState);
		}
	}

	loadResults(query, page) {
		jsonp(this.props.resultsEndpoint, {
			p: page,
			s: query,
			n: this.props.resultsPerPage,
			'X-login-id': this.props.loginId
		})
		.then(this.onLoadResultsDone)
		.catch(() => {
			this.setState({
				loading: false,
				results: []
			});
		});
	}

	loadMoreResults(){
		this.loadResults(this.state.query, ++this.state.page);
	}

	loadSuggestions(query) {
		jsonp(this.props.suggestionsEndpoint, {
			s: query,
			'X-login-id': this.props.loginId
		}).then((response) => {
			this.setState({
				suggestions: response
			});
		}).catch(() => {
			this.setState({
				suggestions: []
			});
		});
	}

	search({ target: { value } }) {
		value = value.trim().toLowerCase();

		this.setState({
			active: true,
			loading: true,
			query: value
		}, () => {
			const query = this.state.query;

			if(query){
				this.loadResults(query, this.state.page);
				this.loadSuggestions(query);
			}else{
				this.clear();
			}
		});
	}

	clear(){
		this.setState({
			active: false,
			loading: false,
			results: null,
			page: 0,
			suggestions: []
		});

		this.refs.searchbar.clearInput();
	}

	render() {
		const floatingPanelProps = Object.assign(this.state, this.props, {
			loadMore: this.loadMoreResults.bind(this)
		});

		const searchBarProps = {
			search: this.search,
			clear: this.clear,
			searchPageUrl: this.props.searchPageUrl,
			active: this.state.active
		};

		return (
			<React.Fragment>
				<SearchBar ref='searchbar' {...searchBarProps}/>
				{!isMobile && <FloatingPanel {...floatingPanelProps}/>}
				{!isMobile && <Overlay {...{
					active: this.state.active,
					clear: this.clear
				}}/>}
			</React.Fragment>
		);
	}
}

Search.propTypes = {
	requestDebounceTime: PropTypes.number,
	resultsPerPage: PropTypes.number,
	resultsEndpoint: PropTypes.string,
	resultUrl: PropTypes.func,
	suggestionsEndpoint: PropTypes.string,
	searchPageUrl: PropTypes.func
};

Search.defaultProps = {
	requestDebounceTime: 400,
	resultsPerPage: 5,
	resultsEndpoint: '//stage.tvpage.com/api/videos/search/suggest/results',
	suggestionsEndpoint: '//stage.tvpage.com/api/videos/search/suggest'
};

export default Search;

