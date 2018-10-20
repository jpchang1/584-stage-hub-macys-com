import React from "react";

const p14 = (props) => {
    return(
        <div className="p-body">
            <h1 className="support-title">
                Instagram
            </h1>
            <div className="p-body">
                <ul className="l-decimal">
                    <li>Instagram only allows one link placed on your Instagram account. This is the link on your Instagram Profile. You can place any one of the following links on your Instagram Profile:
                        <ul className="l-decimal">
                            <li>Link to your Style Crew Channel. You can always maintain, by default, the link to your Style Crew Channel on your Instagram Profile.
                                <div className="image-container ml-20">
                                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/ShareScreens/ShareInstagram3bUpdated.png"} alt="Share Instagram"/>
                                </div>
                            </li>
                            <li>Link to a Video or Photo on Style Crew. Consider using the link allocation to promote particularly “hot” products that are gaining a lot of traction with your customers by inserting the link to the applicable video or photo on your Instagram profile. To obtain the link to any shoppable video or photo, simple click the Instagram Icon in your video and/or photo details view. This will bring up a panel to copy the link to the shoppable content.
                                <div className="image-container ml-20">
                                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/btn_instagramUpdated.png"} alt="Share Instagram"/>
                                </div>
                            </li>
                            <li>Link to a Product Page. Consider using the link allocation to promote particularly “hot” products directly on Instagram. This is particularly powerful when uploading the corresponding video or photo directly to Instagram.
                                <div className="image-container ml-20">
                                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/ShareScreens/ShareInstagram3aUpdated.png"} alt="Share Instagram"/>
                                </div><br/>
                                <div className="image-container ml-20">
                                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/ShareScreens/ShareInstagram1.png"} alt="Share Instagram"/>
                                </div>
                            </li>
                            <li>You can always upload your videos and photos directly to Instagram (you can download these assets anytime from your Style Crew account). In such case, using your Style Crew Channel link, matching product links or links to the shoppable content on the Style Crew Experience are great strategies to get your customers into the purchase funnel.
                                <br/>NOTE: Native uploading to Instagram directly from your Style Crew account will be available soon.
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default p14;