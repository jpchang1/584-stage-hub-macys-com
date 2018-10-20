import React from "react";
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

class Suggestions extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			suggestionIndex: null,
			mouseOnTop: false
		};

		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	handleKeyDown(event){
		const props = this.props;
		const arrowCodes = props.arrowCodes;
		const keyCode = event.keyCode;

		if(-1 !== Object.values(arrowCodes).indexOf(keyCode) && !this.state.mouseOnTop){
			document.activeElement.blur();

			this.setState(prevState => {
				let suggestionIndex = prevState.suggestionIndex;

				const suggestionsLength = this.props.suggestions.length;

				function backToZero() {
					suggestionIndex = 0;
				}

				function handleArrowDown(){
					suggestionIndex = ++suggestionIndex;

					if(suggestionIndex > suggestionsLength)
						suggestionIndex = suggestionsLength;
				}

				function handleArrowUp(){
					suggestionIndex = --suggestionIndex;

					if(suggestionIndex < 0)
						backToZero();
				}

				if(suggestionIndex === null){
					backToZero();
				}else if(keyCode === arrowCodes.up){
					handleArrowUp();
				}else if(keyCode === arrowCodes.down){
					handleArrowDown();
				}

				return {
					suggestionIndex: suggestionIndex
				}
			});
		}else if(13 === keyCode){
			const selectedSuggestionSelector = `.${props.suggestionClassName}.${props.suggestionSelectedClassName}`;

			window.location.href = this.refs.suggestions.querySelector(selectedSuggestionSelector).href;
		}
	}

	mouseOnTop(){
		this.setState({
			suggestionIndex: null,
			mouseOnTop: true
		})
	}

	handleMouseLeave(){
		this.setState({
			suggestionIndex: null,
			mouseOnTop: false
		})
	}

	handleMouseEnter(){
		this.mouseOnTop();
		this.mouseOnTop();
	}

	handleMouseMove(){
		this.mouseOnTop();
	}

	componentDidMount(){
		window.addEventListener('keydown', this.handleKeyDown);
	}

	componentWillUnmount(){
		window.removeEventListener('keydown', this.handleKeyDown);
	}

	getsuggestionClassName(linkIndex){
		const suggestionIndex = this.state.suggestionIndex;

		let className = this.props.suggestionClassName;

		if(suggestionIndex !== null && suggestionIndex === linkIndex)
			className += ' ' + this.props.suggestionSelectedClassName;

		return className;
	}

	renderSuggestion(suggestion, i) {
		const query = this.props.query;
		const searchPageUrl = this.props.searchPageUrl;

		let suggestionTerms = suggestion.split(query);
		let isLastSuggestionTerm;

		return (
			<a className={this.getsuggestionClassName(i)} key={i} href={searchPageUrl(suggestion)}>
				{
					suggestionTerms.map(function (term, j) {
						isLastSuggestionTerm = (j + 1) === suggestionTerms.length;

						return (
							<span key={j}>
								{term}{isLastSuggestionTerm ? '' :<span className={this.props.queryHighlightClassName}>{query}</span>}
							</span>
						);
					}, this)
				}
			</a>
		);
	}

	render() {
		const query = this.props.query;

		return (
			<Scrollbars>
				<div
					ref="suggestions"
					className={this.props.className}
					onMouseMove={this.handleMouseMove.bind(this)}
					onMouseEnter={this.handleMouseEnter.bind(this)}
					onMouseLeave={this.handleMouseLeave.bind(this)}>
					<a className={this.props.suggestionClassName} href={this.props.searchPageUrl(query)}>{query}</a>
					{this.props.suggestions.map(this.renderSuggestion, this)}
				</div>
			</Scrollbars>
		);
	}
}

Suggestions.propTypes = {
	className: PropTypes.string,
	arrowCodes: PropTypes.object,
	suggestionClassName: PropTypes.string,
	suggestionSelectedClassName: PropTypes.string,
	queryHighlightClassName: PropTypes.string
};

Suggestions.defaultProps = {
	className: 'tvp-search-suggestions',
	arrowCodes: {
		up: 38,
		down: 40
	},
	suggestionClassName: 'tvp-suggestion-link',
	suggestionSelectedClassName: 'hovered',
	queryHighlightClassName: 'highlight'
};

export default Suggestions;