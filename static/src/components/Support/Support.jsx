import React, { PureComponent } from "react";
import P1 from "./P1/P1";
import P2 from "./P2/P2";
import P3 from "./P3/P3";
import P4 from "./P4/P4";
import P5 from "./P5/P5";
import P6 from "./P6/P6";
import P7 from "./P7/P7";
import P8 from "./P8/P8";
import P9 from "./P9/P9";
import P10 from "./P10/P10";
import P11 from "./P11/p11";
import P12 from "./P12/P12";
import P13 from "./P13/P13";
import P14 from "./P14/P14";
import P15 from "./P15/P15";
import P16 from "./P16/P16";
import P17 from "./P17/P17";
import P18 from "./P18/P18";
import Thumbnail from "./Thumbnail/Thumbnail";
import Tongal from "./Tongal/Tongal";
import Faq from "./Faq/Faq";
import "./Support.css";

class Support extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            page : 1,
            pages : 21
        }
    }
    setActive(page){
        this.close();
        this.setState({
            page: page
        });
    }
    onNext =()=>{
        const currentPage = this.state.page;
        const pages = this.state.pages;
        if (currentPage === pages) return;
        let newPage = 20;
        if(currentPage < pages)
            newPage = currentPage + 1;
        this.setState({
            page : newPage
        });
    }
    onPrev =()=>{
        const currentPage = this.state.page;
        let newPage = 1;
        if(currentPage>1)
            newPage = currentPage -1;
        this.setState({
            page : newPage
        });
    }
    close(){
        const supportLeft = document.getElementById("support-left");
        const supportRight = document.getElementById("support-right");
        const hasOpen = supportLeft.classList.contains("open");
        if(hasOpen){
            supportLeft.classList.remove("open");
            supportRight.classList.remove("open");
        }
        
    }
    openViewver(el){
        const width = window.innerWidth;
        if(width < 768)
            return;
        const viewver = document.getElementById("image-viewver-container");
        const image = document.getElementById("image");
        const isOpen = viewver.classList.contains("open");
            if(!isOpen){
                image.src = el.target.src;
                viewver.classList.add("open");
            }
    }
    componentDidMount(){
        const viewver = document.getElementById("image-viewver-container");
        viewver.addEventListener("click", (el) => {
            const isOpen = viewver.classList.contains("open");
            if(isOpen)
                viewver.classList.remove("open");
        }, false);
    }
    render(){
        const page = this.state.page;
        const isFirstPage = page === 1 ? true : false;
        const isLastPage = page === this.state.pages ? true : false;
        const prevClass = isFirstPage ? "no-more" : undefined;
        const nextClass = isLastPage ? "no-more" : undefined;
        return(
            <div className="container support-body">
                <div className="row">
                    <div id="support-left" className="col-sm-4 support-left">
                        <div className="">
                        <div onClick={this.close} className="menu-close">
                            <svg fill="#C0C0C0" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                <path d="M0 0h24v24H0z" fill="none"/>
                            </svg>
                        </div>
                        <h1 className="support-title">
                            Macy's Style Crew <br/>Ambassador Support
                        </h1>
                        <ul className="table-contents">
                            <li className={page === 1 ? "active" : "" } onClick={ () => this.setActive(1)}><span>FAQ</span></li>
                            <li className={page === 2 ? "active" : "" } onClick={ () => this.setActive(2)}><span>Creating your Account</span></li>
                            <li className={page === 3 ? "active" : "" } onClick={ () => this.setActive(3)}><span>Account Settings</span></li>
                            <li className={page === 4 ? "active" : "" } onClick={ () => this.setActive(4)}><span>Tongal</span></li>
                            <li className={page === 5 ? "active" : "" } onClick={ () => this.setActive(5)}><span>Uploading Videos</span></li>
                            <li className={page === 6 ? "active" : "" } onClick={ () => this.setActive(6)}><span>Thumbnails</span></li>
                            <li className={page === 7 ? "active" : "" } onClick={ () => this.setActive(7)}><span>Uploading Photos</span></li>
                            <li className={page === 8 ? "active" : "" } onClick={ () => this.setActive(8)}><span>Matching Videos and Photos to Products</span></li>
                            <li className={page === 9 ? "active" : "" } onClick={ () => this.setActive(9)}><span>Publishing to the Macy’s Style Crew Experience</span></li>
                            <li className={page === 10 ? "active" : "" } onClick={ () => this.setActive(10)}><span>Your Channel</span></li>
                            <li className={page === 11 ? "active" : "" } onClick={ () => this.setActive(11)}><span>Product Matching & Links</span></li>
                            <li><span className={page === 12 ? "active" : "" } onClick={ () => this.setActive(12)}>Sharing to Social Networks</span>
                                {  
                                    <ul className="table-contents-l2">
                                        <li className={page === 13 ? "active" : "" } onClick={ () => this.setActive(13)}><span>Promoting your Style Crew Channel</span></li>
                                        <li className={page === 14 ? "active" : "" } onClick={ () => this.setActive(14)}><span>Facebook</span></li>
                                        <li className={page === 15 ? "active" : "" } onClick={ () => this.setActive(15)}><span>Twitter</span></li>
                                        <li className={page === 16 ? "active" : "" } onClick={ () => this.setActive(16)}><span>Pinterest</span></li>
                                        <li className={page === 17 ? "active" : "" } onClick={ () => this.setActive(17)}><span>Instagram</span></li>
                                        <li className={page === 18 ? "active" : "" } onClick={ () => this.setActive(18)}><span>Snapchat</span></li>
                                        <li className={page === 19 ? "active" : "" } onClick={ () => this.setActive(19)}><span>Whatsapp</span></li>
                                        <li className={page === 20 ? "active" : "" } onClick={ () => this.setActive(20)}><span>Other (Email, Chat, Text/SMS)</span></li>
                                    </ul>
                                }
                            </li>
                            <li className={page === 21 ? "active" : "" } onClick={ () => this.setActive(21)}><span>Analytics & Payments</span></li>
                        </ul>
                        </div>
                    </div>
                    <div id="support-right" className="col-sm-8 support-right">
                        
                        
                        <div className="p-body-container">
                        <div className="navigation-buttons top">
                            <button className={prevClass} onClick={this.onPrev}>Prev</button> &nbsp;
                            <button className={nextClass} onClick={this.onNext}>Next</button>
                        </div>
                        {page === 1 && <Faq openViewver={this.openViewver}/>}
                        {page === 2 && <P1 openViewver={this.openViewver}/>}
                        {page === 3 && <P2 openViewver={this.openViewver}/>}
                        {page === 4 && <Tongal openViewver={this.openViewver}/>}
                        {page === 5 && <P3 openViewver={this.openViewver}/>}
                        {page === 6 && <Thumbnail openViewver={this.openViewver}/> }
                        {page === 7 && <P4 openViewver={this.openViewver} setActive={this.setActive.bind(this)}/>}
                        {page === 8 && <P5 openViewver={this.openViewver}/>}
                        {page === 9 && <P6 openViewver={this.openViewver}/>}
                        {page === 10 && <P7 openViewver={this.openViewver} setActive={this.setActive.bind(this)}/>}
                        {page === 11 && <P8 openViewver={this.openViewver}/>}
                        {page === 12 && <P9 openViewver={this.openViewver}/>}
                        {page === 13 && <P10 openViewver={this.openViewver}/>}
                        {page === 14 && <P11 openViewver={this.openViewver}/>}
                        {page === 15 && <P12 openViewver={this.openViewver}/>}
                        {page === 16 && <P13 openViewver={this.openViewver}/>}
                        {page === 17 && <P14 openViewver={this.openViewver}/>}
                        {page === 18 && <P15 openViewver={this.openViewver}/>}
                        {page === 19 && <P16 openViewver={this.openViewver}/>}
                        {page === 20 && <P17 openViewver={this.openViewver}/>}
                        {page === 21 && <P18 openViewver={this.openViewver}/>}
                        <div className="navigation-buttons bottom">
                            <button className={prevClass} onClick={this.onPrev}>Prev</button> &nbsp;
                            <button className={nextClass} onClick={this.onNext}>Next</button>
                        </div>
                        </div>
                    </div>
                </div>
                <div id="image-viewver-container" className="image-viewver-container">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12 image-viewver-body">
                                    <div className="image-viewver">
                                        <div className="image-relative">
                                        <img id="image" src="" alt="Image Viewver"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}
export default Support;