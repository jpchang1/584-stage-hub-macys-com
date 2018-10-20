import React, {PureComponent} from "react";
import Products from "./products";
import store from "../store";
import Simplebar from "../libs/simplebar";
import Slider from "react-slick";
import "../../sass/vendor/_slick.scss";
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
		return (<div key={product.id}><Products ambassador={this.props.ambassador} isVertical={isVertical} index={index} product={product} /></div>);
	}
	componentDidMount(){
		var that = this;
		var player = document.getElementById("tvpageplayer-wrapper");
		
		window.addEventListener("resize",function(e){
			var vertical = window.innerWidth > 991 ? true : false;
			let state = {
				isVertical : vertical,
				height : player.offsetHeight
			}
			if(vertical && !that.state.simpleBarInitialized){
				that.initializeSimpleBar();
				state = {
					isVertical : vertical,
					height : player.offsetHeight,
					simpleBarInitialized : true
				}
			}else if(!vertical){
				state = {
					isVertical : vertical,
					height : player.offsetHeight,
					simpleBarInitialized : false
				}
			}
			that.setState(state);
			
		},false);

		let state = {
			height : player.offsetHeight
		}

		if(this.state.isVertical){
			that.initializeSimpleBar();
			state = {
				height : player.offsetHeight,
				simpleBarInitialized : true
			}
		}
		
		that.setState(state);
		
	}
	initializeSimpleBar(){
		const that = this;
		setTimeout(function(){
		const scroller = document.getElementById("tvp-scroller");
		var simplebar = new Simplebar(scroller);
		simplebar.getScrollElement().addEventListener("scroll", function(e){
            that.onScroll();
          });
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
		let styles = null;
		if(isVertical){
			styles ={
				width : null,
				height : this.state.height,
				overflow : "hidden"
			}
		}else{
			styles ={
				width : "100%",
				overflow : "hidden",
				height : null
			}
		}
		
		const productsRendered = this.props.products.map(this.mapProducts);

		const settings = {
			arrows : false,
			dots: false,
			infinite:false,
			initialSlide: 0,
			slidesToScroll : 2,
			slidesToShow : 2,
			responsive : [
				{
					breakpoint : 480,
					settings: {
						centerMode: true,
						slidesToScroll : 1,
						slidesToShow : 1,
						centerPadding : "15px"
					}
				}
			]
		}
		const Slick = (<Slider className="slick-container" {...settings}>
				{
					productsRendered
				}	
				</Slider>);
		return <div>
			{ isVertical ?
			<div id="tvp-scroller" className={ isVertical ? "tvp-scroller-y" : "tvp-scroller" } style={styles}>
				<div id="tvp-slick" className={isVertical ? "tvp-scroller" : "tvp-scroller-x" } style={isVertical ? null : {width:contentWidth}}>
					{
						productsRendered
					}
				</div>
			</div>
			:
			
				Slick
			
			
			}
		</div>
	}

}