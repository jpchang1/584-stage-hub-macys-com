import React from "react";

const p6 = (props) => {
    return(
        <div className="p-body">
            <h1 className="support-title">
            Publishing to the Macy’s Style Crew Experience
            </h1>
            <div className="p-body col-xs-12">
                <ul className="l-decimal">
                    <li>Each video is published to its dedicated page the and can be shared with anyone and on your social network. Each video (along with its matched products) is published automatically after it is successfully uploaded (please allow a few minutes for publishing). You will always be able to view the status of any uploaded video in your account. When the video is published, that means that it is now accessible on Macys.com/stylecrew and can be shared.
                        <div className="image-container ml-20">
                            <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/VideoDetailsStatusProductcount.png"} alt="Upload Video"/>
                        </div>
                    </li>
                    <li>Each video will contain the products that are matched to the video, as managed by you on your Style Crew account.
                        <div className="image-container ml-20">
                            <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/HubPlaybackMatchedProducts.png"} alt="Upload Video"/>
                        </div>
                    </li>
                    <li>You are encouraged to share your videos on the Style Crew Experience as pervasively as possible (see further guidance on social sharing below).</li>
                </ul>
            </div>
        </div>
    );
}

export default p6;