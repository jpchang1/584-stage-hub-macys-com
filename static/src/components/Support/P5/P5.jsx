import React from "react";

const p5 = (props) => {
    return(
        <div className="p-body">
            <h1 className="support-title">
                Matching Videos and Photos to Products
            </h1>
            {/* {<div className="video-holder">
            <iframe frameborder="0" 
            allowfullscreen="true" width="100%" height="100%" 
            src="//mktg.tvpage.com/tvpembed/163926481/?play_button_background_color=rgba(18,18,18,0.8)">
            </iframe>
            </div>} */}
            <div className="p-body">
                <ul className="l-decimal">
                    <li >To match videos and/or photos to products, click on the “Products” tab from within the Video or Photo details page.
                    
                    </li>
                    <div className="image-container ml-20">
                        <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/MatchProducts.png"} alt="Match Products"/>
                    </div>
                    <li >You can search for any to match from the All Products section. Note that you can click
                         into the category grid icon in the upper left to filter on any particular category. 
                    </li>
                    <div className="image-container ml-20">
                        <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/ProductMatching.png"} alt="Product Matching"/>
                    </div>
                    <li >You can also consider matching Recommended Products by clicking on the Recommended Products button.

                    </li>
                    <div className="image-container ml-20">
                        <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/ProductMatchingAll.png"} alt="Product Matching All"/>
                    </div>
                    <li >To match products, simply select the product(s) you wish to match. Then, 
                        click “Match”. You will then see the products appear in the “Matched” products section in the upper right.
                    </li>
                    
                </ul>
            </div>
        </div>
    );
}
export default p5;