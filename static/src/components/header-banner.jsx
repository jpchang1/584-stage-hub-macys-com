import React from "react";
import "../../sass/components/header-banner.css";

const headerBanner = props =>{
    return(
        <div className="header-banner">
            <div className="header-bar">
                {/*<div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                        <div className="header-signup-container">
                            <div className="header-signup">
                                <span className="header-signup-title">Macy's Style Crew</span> 
                                <button onClick={ () => {
                                    window.location.href = TVSite.baseUrl + "signin";
                                }}
                                className="header-signup-button">SIGN IN</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="header-star">
                <img src={TVSite.baseUrl + "images/logo.png"} alt="Macy's"/>
            </div>
            <div className="text-center container">
                <span className="header-legend">
                The Macy’s Style Crew is a community of our very own colleagues who are passionate about sharing what they love most about fashion and style. 
                Browse their content below or follow #macysstylecrew on social media to stay updated on the latest trends!
                </span>
            </div>
        </div>
    );
}

export default headerBanner;