import React from "react";

const p1 = (props) => {
    return(
        <div className="p-body">
            <h1 className="support-title">
                Creating Your Account
            </h1>
            <div className="p-body">
                <ul className="l-decimal">
                    <li>To create your account, visit <a className="hub-link" href="https://www.macys.com/style-crew/signin">Macy's Style Crew sign in page</a></li>
                    <li>You will be asked to provide your first name, last name, email address, and password.</li>
                    <li>Read the Terms of Service, and check the box indicating that you agree.</li>
                    <li>Click Sign Up.</li>
                    <li className="p-image-full-width"></li>
                </ul>
                <div className="image-container">
                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/CreateAccount.png"} alt="Create Account"/>
                </div>
            </div>
        </div>
    );
}
export default p1;