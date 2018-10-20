import React,{ PureComponent } from "react";
import Popover from "../libs/popover";
import Dotdotdot from "react-dotdotdot";
import Analytics from "../libs/analytics";
import store from "../store";
import * as actionType from "../actions";
import "../../sass/components/_product.scss";

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export default class Products extends PureComponent{
	constructor(props) {
		super(props);
		this.state = {
			show : false,
			overPopup : false
		};
		this. handleClick = this.handleClick.bind(this);
		store.subscribe(this.subscribeStore.bind(this));
	}
	popoverIn(el){
		if(isMobile)return;
		var reference = this;
		reference.setState({
			show : true
		});
		
	}
	popoverOut(){
		var reference = this;
		setTimeout(function(){
			if(!reference.state.overPopup){
				reference.setState({
					show : false
				});
			}
		},50);
	}
	handleInPopup(){
		var reference = this;
		reference.setState({
			overPopup : true
		});
	}
	handleOutPopup(){
		var reference = this;
		setTimeout(function(){
			reference.setState({
				overPopup : false,
				show : false
			});
		});
	}
	subscribeStore(){
		const storeState = store.getState();
		if(storeState.event === actionType.SCROLL){
			var reference = this;
			setTimeout(function(){
				reference.setState({
					show : false
				});
			},0);
		}
	}
	handleClick(e){
		Analytics.productClick(this.props.product);
		//const link = this.productUrl();
		//window.open(link,"_blank");
		return e;
	}
	productUrl = () => {
		const product = this.props.product;
		const ambassador = this.props.ambassador || {};
		let link = product.linkUrl;
		if("shortUrl" in product){
			const suffix = "hashId" in ambassador ? ambassador.hashId : "";
			link = product.shortUrl + suffix;
		}
		return link;
	}
	handleClickMobile(){
		if(isMobile){
			var show = this.state.show;
			this.setState({
				show : !show
			});
		}else{
			this.handleClick();
		}
	}
	activeHover(e){
		e.target.classList.add("tvp-hover");
	}
	removeHover(e){
		e.target.classList.remove("tvp-hover");
	}
	
	render(){
		const product = this.props.product;
		const productLink = this.productUrl();
		const price = product.price ? (product.price.indexOf("$") >= 0 ? product.price : ("$"+product.price)) : product.price  
		const productThumbnail = (
				<div className="content">
					<img src={product.imageUrl} alt={product.title} />
				</div>
			);
		
		const popoverHoverFocus = (
		  <div className="tvp-product" onMouseEnter={this.handleInPopup.bind(this)} onMouseLeave={this.handleOutPopup.bind(this)} id="popover-trigger-hover-focus">
		  	<a href={productLink} target="_blank" onClick={this.handleClick} className="tvp-product-thumbnail">
		  		{productThumbnail}
		    </a>
		    <Dotdotdot className="tvp-product-title" clamp={2}>
		    	<span>{product.title}</span>
		    </Dotdotdot>
		    <span className="tvp-product-price">
				{price}
				</span>
			<a onClick={this.handleClick} href={productLink} 
			onMouseEnter={this.activeHover} 
			onMouseLeave={this.removeHover}
			target="_blank"
			className="tvp-product-details">BUY NOW</a>
		  </div>
		);
		
		var player =  document.getElementById("tvpageplayer-container");
		
		const popUp = (<a key={1} href={productLink} onClick={this.handleClickMobile.bind(this)} ref="el" onMouseEnter={this.popoverIn.bind(this)} onMouseLeave={this.popoverOut.bind(this)}>{productThumbnail}</a>);
		
		const slickItem = (
			<a href={productLink} target="_blank" onClick={this.handleClick} className="product-mobile">
				<div className="product-mobile-image">
					<div className="tvp-product-thumbnail">
						{productThumbnail}
					</div>
				</div>
				<div className="product-mobile-details">
					<div className="top">
						<Dotdotdot clamp={1}>
							<div className="title">{product.title}</div>
						</Dotdotdot>
						<Dotdotdot clamp={2}>
							<div className="description">{product.description}</div>
						</Dotdotdot>
						<div className="rate">{product.rate}</div>
					</div>
					<div className="bottom">
						<div className="price">
						{price}
						</div>
						<div className="shop">
							<button>SHOP NOW</button>
						</div>
					</div>
				</div>
			</a>
		);

		return(
			<div className={ this.props.isVertical ? null : "product-slick"} >
				{ this.props.isVertical ? 
					<Popover player={player} tipSize={10} enterExitTransitionDurationMs={300} isOpen={this.state.show} place="left" body={popoverHoverFocus} children={popUp}  />
					:
					slickItem
				}
			</div>
			);
	}
}