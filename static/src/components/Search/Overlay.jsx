import React from "react";
import PropTypes from 'prop-types';

class Overlay extends React.Component {
	constructor(props) {
		super(props);
	}

	getClassName(){
		const props = this.props;

		return props.id + ' ' + (props.active ? props.showClassName : props.hideClassName);
	}

	handleClick(){
		this.props.clear();
	}

	render() {
		return <div className={this.getClassName()} onClick={this.handleClick.bind(this)}></div>
	}
}

Overlay.propTypes = {
	id: PropTypes.string,
	hideClassName: PropTypes.string,
	showClassName: PropTypes.string,
	clear: PropTypes.func
};

Overlay.defaultProps = {
	id: 'tvp-search-overlay',
	hideClassName: 'hide',
	showClassName: 'show'
};

export default Overlay;