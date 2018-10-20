import React, { PureComponent } from "react";
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
			hover : false
		};
		this.handleClick = this.handleClick.bind(this);
		this.activeHover = this.activeHover.bind(this);
		this.removeHover = this.removeHover.bind(this);
		this.subscribeStore = this.subscribeStore.bind(this);
		store.subscribe(this.subscribeStore);
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
		if(storeState.event === actionType.CLOSE_MODAL){
			var reference = this;
			this.fixModal(false);
			setTimeout(function(){
				reference.setState({
					show : false
				});
			},0);
		}
	}
	fixModal(fix){
		const el = document.getElementById("player-container");
		if(el){
			if(fix){
				el.style.zIndex = "3";
			}else{
				el.style.zIndex = null;
			}
		}
	}
	handleClick(){
		Analytics.productClick(this.props.product);
		this.fixModal(true);
		this.setState({
			show : true
		});
	}
	activeHover(e){
		this.setState({
			hover : true
		});
	}
	removeHover(e){
		this.setState({
			hover : false
		});
	}
	render(){
		const product = this.props.product;
		const price = product.price ? (product.price.indexOf("$") >= 0 ? product.price : ("$"+product.price)) : product.price  
		const productThumbnail = (
				<div className="content">
					<img src={product.imageUrl} alt={product.title} />
				</div>
			);
		let thumbnailClass = "tvp-product-thumbnail";
		if(this.state.hover || this.state.show)
			thumbnailClass =  thumbnailClass+" tvp-hover";
		return(
			<div>
				<div onClick={this.handleClick} onMouseEnter={this.activeHover} onMouseLeave={this.removeHover} className={thumbnailClass}>
						{productThumbnail}
						<div className="product-overlay">

						</div>
				</div>
				{/* this.state.show && <ProductModal reference={product.referenceId} /> */}
			</div>
			);
	}
}
