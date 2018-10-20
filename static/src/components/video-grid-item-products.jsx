import api from "../utils/api_calls";
import React, { PureComponent } from "react";
import LazyImg from 'react-lazyload-image';
class ItemProducts extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            products : []
        }
    }
    componentDidMount(){
        const that = this;
        api.products(this.props.id).done(function(data){
            if(data.length > 0)
                that.setState({products:data})
        });
    }
    render(){
        const productsQty = this.state.products.length;
        const products = productsQty > 0 ? this.state.products.slice(0,4) : [];
        const moreThanFour = productsQty > 4 ? true : false;
        return(
            <div className="row-custom product-container">
                {products.map( (product, index) =>{
                    const isLastItem = index === 3 ? true : false;
                    const containerClass =  isLastItem && moreThanFour ? "product-in-video-counter" : "product-in-video";
                    const bodyForLastItem = <span>{productsQty - 3} <br/> MORE</span>;
                    const bodyNormal = <LazyImg src={product.imageUrl} alt={product.title} />;
                    const bodyToDisplay = isLastItem && moreThanFour ? bodyForLastItem : bodyNormal;
                    return <div key={product.id} className={"col-custom product-in "+containerClass}>
                        <div>
                            {bodyToDisplay}
                        </div>
                    </div>
                })}
            </div>
        );
    }
    
}
export default ItemProducts;