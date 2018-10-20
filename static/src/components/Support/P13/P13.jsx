import React from "react";

const p13 = (props) => {
    return(
        <div className="p-body">
            <h1 className="support-title">
                Pinterest
            </h1>
            <div className="p-body">
                <ul className="l-decimal">
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
            </div>
        </div>
    );
}
export default p13;