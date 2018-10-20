import React from "react";
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import jsonp from "./jsonp.js";

class ResultProducts extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			products: [],
			holderWidth: 0
		}
	}

	getHolderWidth(itemsLength){
		const productSize = this.props.productSize;

		return itemsLength * (
			productSize.width + productSize.marginLeft + productSize.marginRight
		);
	}

	componentDidMount() {
		jsonp(this.props.apiBaseUrl(this.props.videoId),{
			'X-login-id': this.props.loginId
		}).then(((response) => {
			if(this.cancelStateUpdate)
				return;

			this.setState({
				holderWidth: this.getHolderWidth(response.length),
				products: response
			})
		}).bind(this));
	}

	componentDidUpdate(){
		const lazyClassName = this.props.lazyImage.className;

		let imgEls = this.refs.products.querySelectorAll(`.${lazyClassName}`);

		setTimeout(function () {
			[].forEach.call(imgEls, function (imgEl) {
				imgEl.src = imgEl.getAttribute('data-img-url');
				imgEl.classList.remove(lazyClassName);
			})
		},this.props.lazyImage.delayTime);
	}

	componentWillUnmount(){
		this.cancelStateUpdate = true;
	}

	renderProduct(product, productIndex){
		const props = this.props;
		const imageUrl = product.imageUrl;

		let productProps = {
			key: productIndex,
			style: props.productSize,
			alt: product.title
		};

		if(productIndex < props.lazyImage.startIndex)
			productProps.src = imageUrl;
		else
			productProps = Object.assign(productProps, {
				className: props.lazyImage.className,
				'data-img-url': imageUrl
			});

		return <img {...productProps}/>
	}

	render() {
		return (
			<div className="tvp-video-products">
				<Scrollbars style={{
					width:'100%',
					height:this.props.productSize.height
				}}>
					<div style={{
						width: this.state.holderWidth
					}} ref='products'>
						{this.state.products.map(this.renderProduct, this)}
					</div>
				</Scrollbars>
			</div>
		)
	}
}

ResultProducts.propTypes = {
	videoId: PropTypes.string,
	apiBaseUrl: PropTypes.func,
	lazyImage: PropTypes.object,
  productSize: PropTypes.object
};

ResultProducts.defaultProps = {
	apiBaseUrl: (videoId)=>{
		return `//stage.tvpage.com/api/videos/${videoId}/products`;
	},
	lazyImage: {
		className: 'lazy',
		startIndex: 4,
		delayTime: 500
	},
	productSize: {
		width: 100,
		height: 100,
		marginLeft: 8,
		marginRight: 8
	}
};

export default ResultProducts;
