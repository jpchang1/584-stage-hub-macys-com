import React from "react";

const p7 = (props) => {
    return(
        <div className="p-body">
            <h1 className="support-title">
                Your Channel
            </h1>
            <div className="p-body col-xs-12">
                <ul className="l-decimal">
                    <li>Your Ambassador Channel on the Macy’s Style Crew Experience is updated with every new video or photo that you upload. Click on your Profile Image to the bottom right of any published video on the experience and you will be taken to your Channel. You are encouraged to grow and share your Channel pervasively (see further guidance on social sharing in Section 8 <a href="#" onClick={ () => props.setActive(9)}>below</a>).
                        <div className="image-container ml-20">
                            <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/Channels.png"} alt="Channels"/>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default p7;