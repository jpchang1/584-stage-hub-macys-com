import React from "react";
import "./Header.css";

const open = () =>{
    const supportLeft = document.getElementById("support-left");
    const supportRight = document.getElementById("support-right");
    const hasOpen = supportLeft.classList.contains("open");
    if(!hasOpen){
        supportLeft.classList.add("open");
        supportRight.classList.add("open");
    }
}

const header = () => {

    return(
        <div className="header">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="header-container">
                        <div onClick={open} className="menu-mobile">
                        <svg fill="#C0C0C0" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                        </svg>
                        </div>
                        <a href={TVSite.baseUrl}>
                            <img className="logo" src={TVSite.baseUrl + "images/logo.png"} alt="Macys home"/>
                        </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default header;