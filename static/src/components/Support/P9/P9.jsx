import React from "react";

const p9 = (props) => {
    return(
        <div className="p-body">
            <h1 className="support-title">
                Sharing to Social Networks
            </h1>
            {/* {<div className="video-holder">
                <iframe frameborder="0" 
                allowfullscreen="true" 
                width="100%" 
                height="100%" 
                src="//mktg.tvpage.com/tvpembed/163926488/?play_button_background_color=rgba(18,18,18,0.8)"></iframe>
            </div>} */}
            <div className="p-body col-xs-12">
                <ul className="l-decimal">
                    <li>Sharing and Promoting your Style Crew Channel
                        <ul className="l-lower-roman">
                            <li>Your Style Crew Channel is the home for all of your Videos and Photos. It is the place a customer will go to check out new products from you, and learn about the products from your Videos and Photos. It is the place where you are always selling Macy’s products digitally.
                                <div className="image-container ml-20">
                                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/Channels.png"} alt="Channels"/>
                                </div>
                            </li>
                            <li>Make sure to share the link to your channel openly and freely with your customers. You can obtian this link by clicking on your porfile image anywhere on the Style Crew experience on Macy’s.com.</li>
                        </ul>
                    </li>
                    <li>Sharing to Facebook
                        <ul className="l-lower-roman">
                            <li>To share a Video or Photo to Facebook, simply click into any Video or Photo and then click the Facebook icon under the Video Thumbnail or Photo.
                                <div className="image-container ml-20">
                                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/ShareScreens/ShareFacebook1.png"} alt="Share Facebook"/>
                                </div>
                            </li>
                            <li>A panel will slide out that shows you the video/photo and matching products. Click “Share to Facebook”.
                                <div className="image-container ml-20">
                                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/ShareScreens/ShareFacebook2.png"} alt="Share Facebook"/>
                                </div>
                            </li>
                            <li>A page will come up in a separate window offering you the opportunity to add any text to your Facebook post (if you are not logged into Facebook it will ask you to log in). Once you have inputted your text, as desired, click to proceed.
                                <div className="image-container ml-20">
                                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/ShareScreens/ShareFacebook3.png"} alt="Share Facebook"/>
                                </div>
                            </li>
                            <li>As you can see in the diagram below, the video thumbnail or photo will appear in your Facebook post, linking directly to your Video/Photo Page on the Style Crew Experience on Macys.com.
                                <div className="image-container ml-20">
                                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/ShareScreens/_FBtoHub.png"} alt="Share Facebook"/>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>Sharing to Twitter
                        <ul className="l-lower-roman">
                            <li>To share a Video or Photo to Twitter, simply click into any Video or Photo and then click the Twitter icon under the Video Thumbnail or Photo.
                                <div className="image-container ml-20">
                                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/ShareScreens/ShareTwitter1.png"} alt="Share Twitter"/>
                                </div>
                            </li>
                            <li>A panel will slide out that shows you the video/photo and matching products. Click “Share to Twitter”.
                                <div className="image-container ml-20">
                                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/ShareScreens/ShareTwitter2.png"} alt="Share Twitter"/>
                                </div>
                            </li>
                            <li>A page will come up in a separate window offering you the opportunity to add any text to your tweet (if you are not logged into Twitter, it will ask you to log in). Once you have inputted your text, as desired, click to proceed.
                                <div className="image-container ml-20">
                                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/ShareScreens/ShareTwitter3.png"} alt="Share Twitter"/>
                                </div>
                            </li>
                            <li>As you can see in the diagram below, the video thumbnail or photo will appear in your Twitter tweet, linking directly to your Video/Photo Page on the Style Crew Experience on Macys.com.
                                <div className="image-container ml-20">
                                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/ShareScreens/_TwittertoHub.png"} alt="Share Twitter"/>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>Sharing to Pinterest
                        <ul className="l-lower-roman">
                            <li>To share a Video or Photo to Pinterest, simply click into any Video or Photo and then click the Pinterest icon under the Video Thumbnail or Photo.
                                <div className="image-container ml-20">
                                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/ShareScreens/SharePinterest1.png"} alt="Share Pinterest"/>
                                </div>
                            </li>
                            <li>A panel will slide out that shows you the video/photo and matching products. Click “Share to Pinterest”.
                                <div className="image-container ml-20">
                                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/ShareScreens/SharePinterest2.png"} alt="Share Pinterest"/>
                                </div>
                            </li>
                            <li>A page will come up in a separate window offering you the opportunity to add any text to your pin (if you are not logged into Pinterest, it will ask you to log in). Once you have inputted your text, as desired, click to proceed.
                                <div className="image-container ml-20">
                                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/ShareScreens/SharePinterest3.png"} alt="Share Pinterest"/>
                                </div>
                            </li>
                            <li>As you can see in the diagram below, the video thumbnail or photo will appear in your Pinterest pin, linking directly to your Video/Photo Page on the Style Crew Experience on Macys.com.
                                <div className="image-container ml-20">
                                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/ShareScreens/_PinteresttoHub.png"} alt="Share Pinterest"/>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>Sharing to Instagram
                        <ul className="l-lower-roman">
                            <li>Instagram only allows one link placed on your Instagram account. This is the link on your Instagram Profile. You can place any one of the following links on your Instagram Profile:
                                <ul className="l-lower-decimal">
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
                    </li>
                    <li>Snapchat
                        <ul className="l-lower-roman">
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
                    </li>
                    <li>Whatsapp
                        <ul className="l-lower-roman">
                            <li>Share a Link to a Shoppable Video or Photo
                                <br/>
                                To obtain the link to any shoppable video or photo, simply click the Whatsapp Icon in your video and/or photo details view. This will bring up a panel to copy the link to the shoppable content.
                                <div className="image-container ml-20">
                                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/ShareScreens/ShareWhatsApp2.png"} alt="Share WhatsApp"/>
                                </div>
                            </li>
                            <li>Link to your Style Crew Channel. You can always share the link to your Style Crew Channel on your Whatsapp.
                                <div className="image-container ml-20">
                                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/btn_whatsAppUpdated.png"} alt="Share WhatsApp"/>
                                </div>
                            </li>
                            <li>Link to a Product Page. This is particularly powerful when uploading the corresponding video or photo directly to Whatsapp, and sending the customers directly to the Product Page alongside such content.
                                <div className="image-container ml-20">
                                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/ShareScreens/ShareWhatsApp3Updated.png"} alt="Share WhatsApp"/>
                                </div>
                            </li>
                            <li>You can always upload your videos and photos directly to Whatsapp (you can download these assets anytime from your Style Crew account). In such case, using your Style Crew Channel link, matching product links or links to the shoppable content on the Style Crew Experience are great strategies to get your customers into the purchase funnel.</li>
                        </ul>
                    </li>
                    <li>Other (Email, Chat, Text/SMS)
                        <ul className="l-lower-roman">
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
                    </li>
                    <li>Native Social Integrations.
                        <br/>
                        Native integrations for Youtube, Facebook and other networks will soon be available on your Style Crew account. This will enable you to upload videos directly to such networks, along with matching products. This will also enable you to gain additional insights from such social channels (See Analytics & Payments).</li>
                </ul>
            </div>
        </div>
    );
}
export default p9;