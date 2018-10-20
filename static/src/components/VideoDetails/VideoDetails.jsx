import React from "react";
import Twitter from  "../../ui/twitter";
import Facebook from  "../../ui/facebook";
import ShareLink from  "../../ui/shareLink";
import Common from "../../utils/common";



const facebook = (url) => {
    let videoUrl = window.location.protocol +'//' + window.location.host + url;
	const newurl = 'https://www.facebook.com/sharer/sharer.php?u=' + videoUrl;
	window.open(newurl, "_new");
}

const twitter = (url) => {
    const newurl = 'https://twitter.com/share?url=' + window.location.protocol +'//' + window.location.host + url;
	window.open(newurl, "_new");
}

const copyToClipboard = (url) => {
    const input = document.createElement("textarea");
    input.value = window.location.protocol +'//' + window.location.host + url;
    //input.className = "tvp-hide";
    input.style.position = 'fixed';
    input.style.top = 0;
    input.style.left = 0;
    input.style.width = '2em';
    input.style.height = '2em';

    // We don't need padding, reducing the size if it does flash render.
    input.style.padding = 0;

    // Clean up any borders.
    input.style.border = 'none';
    input.style.outline = 'none';
    input.style.boxShadow = 'none';

    // Avoid flash of white box if rendered for any reason.
    input.style.background = 'transparent';

    document.body.appendChild(input);
    input.focus();
    input.select();
    const successful = document.execCommand('copy');
    
    if(successful){
        const tooltipText = document.getElementById("tooltip-text");
        tooltipText.classList.remove("tvp-hide");
        setTimeout(()=>{
            tooltipText.classList.add("tvp-hide");
        },3000);
    }
    document.body.removeChild(input);
}

const activeHover = (e) => {
    if(e.target.localName === "span")
        e.target.classList.add("tvp-hover");
}
const removeHover = (e) => {
    if(e.target.localName === "span")
        e.target.classList.remove("tvp-hover");
}

const evaluateAmbassadorProfilePicture =(image) =>{
    let picture = TVSite.baseUrl + "images/logo.png";
    const avoidDefault = "//sitecdn.tvpage.com/player/logos/default_profile.jpg";
    if(image && image !== avoidDefault){
        picture = "https://api.tvpage.com"+image;
    }
    return picture;
}

const videoDetails = (props) => {
    const url = props.url;
    const video = props.video.hasOwnProperty("id") ? props.video : false;
    let hasAmbassador = props.ambassador.hasOwnProperty("user_id");
    const ambassador = props.ambassador;
    const ambassadorId = hasAmbassador ? (ambassador.id || ambassador.user_id ) : undefined;
    const ambassadorUrl = hasAmbassador? (TVSite.baseUrl + "a/" +(ambassador.user_slug || ambassador.titleTextEncoded)+"/"+ambassadorId+"/") : undefined;
    const ambassadorPhoto = hasAmbassador ? evaluateAmbassadorProfilePicture(ambassador.profile_picture) : TVSite.baseUrl + "images/logo.png";
    return(
        <div className="video-info">
						
				<div className="details-wrapper">
                <span className="tvp-published">
                    Published on {video && <span>{Common.getDateFromUnix(video.date_created)}</span>}
                </span>
                {video && video.asset && <span className="tvp-duration">Duration <span>{video.asset.prettyDuration}</span></span>}
                <span className="tvp-social"> Share 
                    <span onClick={ () => facebook(url)} 
                    onMouseEnter={activeHover} 
                    onMouseLeave={removeHover} 
                    className="tvp-social-facebook">
                        <Facebook />
                    </span> 
                    <span onClick={ ()=> twitter(url)} 
                    onMouseEnter={activeHover} 
                    onMouseLeave={removeHover} 
                    className="tvp-social-twitter">
                        <Twitter />
                    </span>
                    <span 
                    onClick={ ()=> copyToClipboard(url) }
                    onMouseEnter={activeHover} 
                    onMouseLeave={removeHover} 
                    className="tvp-social-twitter share-link">
                        <ShareLink />
                        <span id="tooltip-text" className="tooltip-text tvp-hide">Copied to clipboard.</span>
                    </span>
                </span>
            
                </div>
                { hasAmbassador && <div className="ambassador-profile"> 
                <a href={ambassadorUrl} alt={ambassador.first_name}>
                    <div className="tvp-author">
                    
                    <div className="tvp-author-thumbnail" style={{backgroundImage: "url("+ambassadorPhoto+")"}}>
                        <img src={ambassadorPhoto} alt={ambassador.first_name}/>
                    </div>
                    <div className="ambassador-details">
                        <span className="ambassador-name">{ambassador.first_name+" "+ambassador.last_name}</span>
    { ambassador.videos_count && <span className="ambassador-videos">{ambassador.videos_count || 0} Videos</span> }
                    </div>
                    
                </div> 
                </a>
                </div>}
            
        </div>
    );
}
export default videoDetails;