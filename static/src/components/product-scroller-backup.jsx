import React, { PureComponent } from "react";
import Products from "./products";
import store from "../store";
import Simplebar from "../libs/simplebar";
import "../../sass/components/_product-scroller.scss";
import * as actionType from "../actions";

export default class ProductScroller extends PureComponent{
	constructor(props){
		super(props);
		var vertical = window.innerWidth > 991 ? true : false;
		this.state = {
			isVertical : vertical,
			height : null,
			iScrollInitialized : false,
			simpleBarInitialized : false
		}
		this.mapProducts = this.mapProducts.bind(this);
		this.initializeSimpleBar = this.initializeSimpleBar.bind(this);
		
	}
	mapProducts(product, index){
		const isVertical = this.state.isVertical;
		return (<div key={product.id}><Products isVertical={isVertical} index={index} product={product} /></div>);
	}
	componentDidMount(){
		var that = this;
		var player = document.getElementById("tvpageplayer");
		that.setState({
			height : player.offsetHeight
		});
		window.addEventListener("resize",function(e){
			var vertical = window.innerWidth > 991 ? true : false;
			var player = document.getElementById("tvpageplayer");
			that.setState({
				isVertical : vertical,
				height : player.offsetHeight
			});
			
		},false);

		that.initializeSimpleBar();
		
	}
	initializeSimpleBar(){
		const that = this;
		setTimeout(function(){
			const scroller = document.getElementById("tvp-scroller");
			var simplebar = new Simplebar(scroller);
		},300);
	}
	onScroll(value){
		store.dispatch({
			type : actionType.SCROLL
		});
	}
	render(){
		const contentWidth = (this.props.products.length*136)+"px";
		const isVertical = this.state.isVertical;
		let styles = {
			width : "100%",
			overflow : "hidden",
			height : null
		};
		if(isVertical){
			styles ={
				width : null,
				height : this.state.height,
				overflow : "hidden"
			}
		}
		
		return (
		<div>
			<div id="tvp-scroller" className={this.state.isVertical ? "tvp-scroller-y" : "tvp-scroller" } style={styles}>
				<div className={this.state.isVertical ? "tvp-scroller" : "tvp-scroller-x" } style={this.state.isVertical ? null : {width:contentWidth}}>
					{
						this.props.products.map(this.mapProducts.bind(this))
					}
				</div>
			</div>
		</div>)
	}

}