import React from "react";
import "./SigninButton.css";
const signinButton = () => {
    const url = TVSite.baseUrl + "signin";
    return(
        <div className="container">
            <div className="signin-container">
                <a className="signin-link" href={url} alt="Ambassador Sign In">Ambassador Sign In</a>
            </div>
        </div>
    )
}

export default signinButton;