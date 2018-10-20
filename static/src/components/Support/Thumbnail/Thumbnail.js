import React from "react";

const Thumbnail = (props) => {
    return(
        <div className="p-body">
            <h1 className="support-title">
                Thumbnails
            </h1>
            <div className="p-body">
                <ul className="l-decimal">
                    <li >Your video thumbnail is an important part of your video search strategy as it is the first thing a prospective viewer sees when searching on Google or on Macys.com. Use a thumbnail that is indicative of your video content and the product(s) that you are selling. Your thumbnail image should be at least 480p (480 x 360) and should maintain a 16 x 9 aspect ratio to avoid black bars on the sides.</li>
                    <li>When you upload a video, a thumbnail is automatically generated. You can then replace the default thumbnail with a different image by selecting one of the options offered from your video, or by uploading a custom video thumbnail image from your computer.</li>
                </ul>
                <div className="image-container ml-20">
                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/thumbnail/00_Video_Details.png"} alt="Video Details"/>
                </div>
                <div className="image-container ml-20">
                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/thumbnail/01_Select_Thumbnail.png"} alt="Select Thumbnail"/>
                </div>
                <div className="image-container ml-20">
                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/thumbnail/02_Custom_Select.png"} alt="Custom Select"/>
                </div>
                <div className="image-container ml-20">
                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/thumbnail/03_Custom_Upload.png"} alt="Custom Upload"/>
                </div>
                <div className="image-container ml-20">
                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/thumbnail/04_Custom_Crop.png"} alt="Custom Crop"/>
                </div>
                <div className="image-container ml-20">
                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/thumbnail/05_Custom_Done.png"} alt="Custom Done"/>
                </div>
                <div className="image-container ml-20">
                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/thumbnail/06_Custom_Thumbnail_Applied.png"} alt="Custom Thumbnail Applied"/>
                </div>
            </div>
        </div>
    );
}

export default Thumbnail;