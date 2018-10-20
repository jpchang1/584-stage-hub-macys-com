import React from "react";

const p15 = (props) => {
    return(
        <div className="p-body">
            <h1 className="support-title">
                Snapchat
            </h1>
            <div className="p-body">
                <ul className="l-decimal">
                    <li>Share a Link to a Shoppable Video or Photo
                        <br/>
                        To obtain the link to any shoppable video or photo, simple click the Snapchat Icon in your video and/or photo details view. This will bring up a panel to copy the link to the shoppable content.
                        <div className="image-container ml-20">
                            <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/ShareScreens/ShareSnapChat1.png"} alt="Share SnapChat"/>
                        </div>
                    </li>
                    <li>Link to your Style Crew Channel. You can always share the link to your Style Crew Channel on your Snapchat.
                        <div className="image-container ml-20">
                            <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/btn_snapChatUpdated.png"} alt="Share SnapChat"/>
                        </div>
                    </li>
                    <li>Link to a Product Page. This is particularly powerful when uploading the corresponding video or photo directly to Snapchat, and sending the customers directly to the Product Page alongside such content.
                        <div className="image-container ml-20">
                            <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/ShareScreens/ShareSnapChat3Updated.png"} alt="Share SnapChat"/>
                        </div>
                    </li>
                    <li>You can always upload your videos and photos directly to Snapchat (you can download these assets anytime from your Style Crew account). In such case, using your Style Crew Channel link, matching product links or links to the shoppable content on the Style Crew Experience are great strategies to get your customers into the purchase funnel. <br/>NOTE: Native uploading to Snapchat from your Style Crew account will be available soon.</li>
                </ul>
            </div>
        </div>
    );
}
export default p15;