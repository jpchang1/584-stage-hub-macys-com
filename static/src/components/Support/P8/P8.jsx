import React from "react";

const p8 = (props) => {
    return(
        <div className="p-body">
            <h1 className="support-title">
            Product Matching & Links
            </h1>
            <div className="p-body col-xs-12">
                <ul className="l-decimal">
                    <li>Matching Products to Content.
                        <ul className="l-lower-roman">
                            <li>All products that are matched to your videos and photos will come up on your Channel, and searchable on the Style Crew experience.</li>
                            <li>Create an engaging shopping experience for your customer by dressing up your content with matching products!
                                Matching the right products to your content is important. Remember, these are products that you’re presenting to your customers while they engage with your videos and photos. They can be the specific products in the video/photo, accessories for such products and/or any related products that you feel could stimulate their interest. 
                            </li>
                            <li>Use the searching, browsing and recommendation functions (further outlined below) in order to find and match the right products to your content.</li>
                            <li>We suggest linking 2-3 products / video.</li>
                        </ul>
                    </li>
                    <li>Searching & Browsing the Catalog
                        <ul className="l-lower-roman">
                            <li>Searching the catalog renders results for any term, keyword, SKU, brand or other identifying parameter.
                                <div className="image-container ml-20">
                                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/Searching.png"} alt="Searching"/>
                                </div>
                            </li>
                            <li>Browsing the catalog enables you to filter on categories of choice. You can filter on any level in order to get more targeted with your product search.
                                <div className="image-container ml-20">
                                    <img src={TVSite.baseUrl + "images/support/ProductMatchingCategories.png"} alt="Product Matching Categories"/>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>Recommendations
                        <ul className="l-lower-roman">
                            <li>Browse Recommendations to check for any recommended matches for your video and/or photo that you may wish to match.</li>
                            <li>Recommendations will present products that are likely to be purchased, given applicable video/photo inputs (frames, title, description, transcript, category), and customer behavioral learnings. The more precise and descriptive your title, descriptions, and category classifications, the more data available to fuel and optimize the Recommendations.
                                <div className="image-container ml-20">
                                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/MatchProductsRecommened.png"} alt="Match Products Recommened"/>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>Accessing & Navigating Products without Matching
                        <ul className="l-lower-roman">
                            <li>You can access all Products separate from the content matching process. This enables you to obtain a link for any product that you may wish to share and paste into any social posting, tweet, email, chat or text message. Communicate with many customers or just one at any given time and provide a quick shortened link to buy and generate Incentive on the sale (see more information below on Analytics & Payments).</li>
                            <li>To access products directly, simply go to the Products section and search the catalog as you wish. You can also filter into any category or sub-category in the manner explained above when matching products to content.
                                <div className="image-container ml-20">
                                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/NavigationProducts.png"} alt="Navigation Products"/>
                                </div>
                            </li>
                            <li>To copy a link for any product, simply click “Copy Link” as shown below.
                                <div className="image-container ml-20">
                                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/ProductDetailsCopyLink.png"} alt="Product Details Copy Link"/>
                                </div>
                            </li>
                            <li>Remember, only clicks on products on your videos and photos on the Style Crew Experience on Macys.com or on direct product links obtained from your Style Crew account (per above) generate your Incentive Payments (read more below in Analytics & Payments). You must therefore always ensure that your customers are either engaging with your videos and photos on the Style Crew Experience (which already contain the right matching links) or clicking on direct product links that you obtained in the manner noted above.</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default p8;