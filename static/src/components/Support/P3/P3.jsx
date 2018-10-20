import React from "react";

const p3 = (props) => {
    return(
        <div className="p-body">
            <h1 className="support-title">
                Uploading Videos
            </h1>
            {/* {<div className="video-holder">
                <iframe frameborder="0" 
                allowfullscreen="true" 
                width="100%" 
                height="100%" 
                src="//mktg.tvpage.com/tvpembed/163926110/?play_button_background_color=rgba(18,18,18,0.8)"></iframe>
            </div>} */}
            <div className="p-body">
                <ul className="l-decimal">
                    <li ><span>To upload a video, navigate to the “Videos” section of the dashboard and click the 
                        red plus sign (add video button) in the upper left area.</span>
                    
                    </li>
                    <div className="image-container ml-20">
                        <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/UploadVideo.png"} alt="Upload Video"/>
                    </div>
                    <li >The video uploading process begins. Please allow up to a few minutes for the video 
                        to upload and process. Once the video has completed processing, you will be able to update the video details (title and description)
                        
                    </li>
                    <div className="image-container ml-20">
                        <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/Processing.png"} alt="Processing"/>
                    </div>
                    <li >Make sure to enter a title and description for the video that clearly represents the product category, 
                        brand or unique characteristics associated with the video and products that you are selling.
                        
                    </li>
                    <li >Please note that the video is not yet published onto www.macys.com/style-crew until the Video 
                        has a green “Published” indication. Please allow up to a few minutes for publishing.
                        
                    </li>
                    <div className="image-container ml-20">
                        <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/Publishing.png"} alt="Publishing"/>
                    </div>
                </ul>
            </div>
        </div>
    );
}
export default p3;