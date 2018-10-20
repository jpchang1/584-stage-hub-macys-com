import React from "react";

const p2 = (props) => {
    return(
        <div className="p-body">
            <h1 className="support-title">
                Account Settings
            </h1>
            <div className="p-body">
                <ul className="l-decimal">
                    <li ><span>Change your Profile Image</span>
                    <ul className="l-lower-roman">
                        <li >To change your Profile Image, click on the Image.</li>
                        <li >You will then be guided to upload your Profile Image on your device.</li>
                    </ul>
                    </li>
                    <li ><span>View your Ambassador Status and Incentive Amount</span>
                        <ul className="l-lower-roman">
                            <li>For Ambassador Status, an Approved indication means your account is in good standing and are free to proceed.
                                <div className="image-container ml-40">
                                    <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/AccountStatus.png"} alt="Account Status"/>
                                </div>
                            </li>
                            <li>
                            Your Incentive Amount is the percentage to which you are entitled from your qualified transactions, as reported in your Account.
                            </li>
                        </ul>
                    </li>
                    <li ><span>Enter your Personal Information</span>
                        <ul className="l-lower-roman">
                            <li>Edit the fields that you wish to change and click on the save button that appears.</li>
                        </ul>
                        <div className="image-container ml-20">
                            <img onClick={ (el)=> props.openViewver(el) } src={TVSite.baseUrl + "images/support/AccountInformation.png"} alt="Account Information"/>

                        </div>
                    </li>
                    <li ><span>Reset your Password</span>
                        <ul className="l-lower-roman">
                            <li>At the bottom of your Account Details screen, click reset password</li>
                            <li>Input and confirm a new password</li>
                            <li>Click on Save Changes</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default p2;