import React from "react";

const p10 = (props) => {
    return(
        <div className="p-body">
            <h1 className="support-title">
            Promoting your Style Crew Channel
            </h1>
            <div className="p-body">
                <ul className="l-decimal">
                    <li>Your Style Crew Channel is the home for all of your Videos and Photos. It is the place a customer will go to check out new products from you, and learn about the products from your Videos and Photos. It is the place where you are always selling Macy’s products digitally.
                        <div className="image-container ml-20">
                            <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/Channels.png"} alt="Channels"/>
                        </div>
                    </li>
                    <li>Make sure to share the link to your channel openly and freely with your customers. You can obtian this link by clicking on your porfile image anywhere on the Style Crew experience on Macy’s.com.</li>
                </ul>
            </div>
        </div>
    );
}
export default p10;