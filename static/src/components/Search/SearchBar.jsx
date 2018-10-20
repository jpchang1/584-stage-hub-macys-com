import React from "react";
import isMobile from "./isMobile.js";
import SearchImage from './search.svg';
import ClearImage from './clear.svg';

export default class SearchBar extends React.Component {
	constructor(props) {
		super(props);

		this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
		this.handleKeyup = this.handleKeyup.bind(this);
	}

	handleKeyup(event){
		if (13 === event.keyCode)
			window.location.href = this.props.searchPageUrl(this.refs.input.value);
	}

	componentDidMount(){
		if(isMobile)
			this.refs.input.addEventListener('keyup', this.handleKeyup);
	}

	componentWillUnmount(){
		if(isMobile)
			this.refs.input.removeEventListener('keyup', this.handleKeyup);
	}

	clearInput(){
		this.refs.input.value = '';
	}

	onCloseButtonClick(){
		this.clearInput();

		this.props.clear();
	}

	renderButton(){
		const active = this.props.active;

		return <button type="button" {...active && {onClick: this.onCloseButtonClick}} className='tvp-searchbar-button'>
			{active ? <ClearImage/> : <SearchImage/>}
		</button>
	}

	render() {
		return (
			<div className='tvp-searchbar'>
				<input type="text" ref='input' onChange={this.props.search} placeholder='Search Videos' className='tvp-searchbar-input'/>
				{this.renderButton()}
			</div>
		);
	}
}