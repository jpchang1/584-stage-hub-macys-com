import React, { PureComponent } from  "react";
import store from "../store";
import Dotdotdot from "react-dotdotdot";
import * as actionType from "../actions";
import Api from "../utils/api_calls";
import "../../sass/components/product-modal.css";

class ProductModal extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            macysProduct : []
        }
    }
    componentDidMount(){
        const that = this;
        Api.macys(this.props.reference).done( data =>{
            console.log(data.product);
            that.setState({
                macysProduct : data.product
            });
		});
    }
    closeModal(){
        store.dispatch({
            type : actionType.CLOSE_MODAL
        });
    }
    render(){
        const hasProduct = this.state.macysProduct.length > 0 ? true : false;
        const product = hasProduct ? this.state.macysProduct[0] : [];
        const imageBase = "https://slimages.macysassets.com/is/image/MCY/products/6/optimized/";
        return(
            <div className="modal-backface">
                <div className="modal-container">
                    <div onClick={this.closeModal} className="close-modal">
                        X
                    </div>
                    <div className="modal-body">
                    { hasProduct &&
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="modal-product-image">

                                      <img src={imageBase+product.productDetails.primaryImage.imagename} alt=""/>  
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <Dotdotdot clamp={2} className="modal-product-title">
                                    {product.Reviews.productName}
                                </Dotdotdot>
                                <div className="modal-product-review">
                                    
                                </div>
                            </div>
                        </div>
                    }
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductModal;