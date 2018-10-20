import api from "../../utils/api_calls";
import React, { PureComponent } from "react";
import LazyImg from 'react-lazyload-image';
import Simplebar from "../../libs/simplebar";

class ItemProducts extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            products : []
        }
        this.initializeScroller = this.initializeScroller.bind(this);
    }
    componentDidMount(){
        const that = this;
        api.products(this.props.id).done(function(data){
            if(data.length > 0){
                that.initializeScroller();
                that.setState({products:data});
            }
        });
        
    }
    initializeScroller(){
        const that = this;
		setTimeout(function(){
            const elString = "scroller-search"+that.props.index;
			const scroller = document.getElementById(elString);
            var simplebar = new Simplebar(scroller);
        },300);
    }
    render(){
        const productsQty = this.state.products.length;
        const products = productsQty > 0 ? this.state.products : [];
        const moreThanFour = productsQty > 4 ? true : false;
        const contentWidth = (productsQty * 95) + "px";
        return(
            <div id={"scroller-search"+this.props.index} className="row-custom product-container">
                <div className="scroller-search" style={{width : contentWidth}}>
                {products.map( (product, index) =>{
                    const isLastItem = index === 3 ? true : false;
                    const containerClass =  "product-in-video";
                    const bodyForLastItem = <span>{productsQty - 3} <br/> MORE</span>;
                    const bodyNormal = <LazyImg src={product.imageUrl} alt={product.title} />;
                    const bodyToDisplay =  bodyNormal;
                    return <div key={product.id} className={"col-custom product-in "+containerClass}>
                        <div>
                            {bodyToDisplay}
                        </div>
                    </div>
                })}
                </div>
            </div>
        );
    }
    
}
export default ItemProducts;