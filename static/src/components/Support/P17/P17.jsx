import React from "react";

const p17 = (props) => {
    return(
        <div className="p-body">
            <h1 className="support-title">
                Other (Email, Chat, Text/SMS)
            </h1>
            <div className="p-body">
                <ul className="l-decimal">
                    <li>To obtain the link to any shoppable video or photo, simple click the Copy Link icon in your video and/or photo details view. This will bring up a panel to copy the link to the shoppable content.
                        <div className="image-container ml-20">
                            <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/ShareScreens/ShareCopyLink1.png"} alt="Share Copy Link"/>
                        </div>
                    </li>
                    <li>Link to your Style Crew Channel. You can always share the link to your Style Crew Channel.
                        <div className="image-container ml-20">
                            <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/btn_copyLinkUpdated.png"} alt="Share Copy Link"/>
                        </div>
                    </li>
                    <li>Link to a Product Page. This is particularly powerful when and where you are able to share the corresponding video or photo, sending your customers directly to the Product Page alongside such content.</li>
                    <li>Using your Style Crew Channel link, matching product links or links to the shoppable content on the Style Crew Experience (see above) are all great strategies to get your customers into the purchase funnel.</li>
                </ul>
            </div>
        </div>
    );
}
export default p17;