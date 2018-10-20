import React, { PureComponent } from "react";
import Api from  "../utils/api_calls";
import Common from "../utils/common";
import Dotdotdot from "react-dotdotdot";
import Simplebar from "../libs/simplebar";
import "../../sass/components/live-search-result.css";

class LiveItem extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            products : []
        }
        this.getProducts = this.getProducts.bind(this);
        this.initializeScroller = this.initializeScroller.bind(this);
    }
    getProducts(){
        const that = this;
        Api.products(this.props.video.id).done( data => {
            if(data.length > 0)
                that.setState({
                    products : data
                });
        });
    }
    componentDidMount(){
        this.getProducts();
        this.initializeScroller();
    }
    initializeScroller(){
        const that = this;
		setTimeout(function(){
            const elString = "live-products-"+that.props.identifier;
			const scroller = document.getElementById(elString);

			if(scroller){
                var simplebar = new Simplebar(scroller);
            }
        },300);
    }
    render(){
        let videoData = JSON.parse( this.props.video.data); 
        const video =  this.props.video;
        videoData.id = video.id;
        const productsQty = this.state.products.length;
        const products = productsQty > 0 ? this.state.products : [];
        const moreThanFour = productsQty > 3 ? true : false;
        const url = Common.getVideoPageUrl(videoData);
        const contentWidth = (115 * productsQty)+"px";
        return(
            <div>
            <div className="live-item-container row">
                <a href={url} className="live-item col-sm-4">
                    <div className="live-item-thumbnail">
                        <img src={videoData.asset.thumbnailUrl} alt={video.title}/>
                        <div className="live-item-play">
                            <svg className="tvp-play-icon-svg" viewBox="0 0 200 200">
                                <polygon fill="#FFFFFF" points="70, 55 70, 145 145, 100"></polygon>
                            </svg>
                        </div>
                    </div>
                    <Dotdotdot clamp={2} className="live-item-title">
                        {video.title}
                    </Dotdotdot>
                </a>
                <div className="col-sm-8">
                <div id={"live-products-"+this.props.identifier}>
                <div className="live-products-container" style={{width : contentWidth}}>
                {products.map( (product, index) =>{
                    
                    const containerClass =  "product-in-live";
                    
                    const bodyNormal = <img src={product.imageUrl} alt={product.title} />;
                    const bodyToDisplay = bodyNormal;
                    return <a href={url} key={product.id+index} className={containerClass}>
                        <div className="product-in-thumbnail">
                            {bodyToDisplay}
                        </div>
                    </a>
                })}
                </div>
                </div>
                </div>
            </div>
            </div>
        )
    }
}

export default LiveItem;