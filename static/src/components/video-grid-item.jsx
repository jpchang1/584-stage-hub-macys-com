import React,{ PureComponent } from "react";
import Dotdotdot from "react-dotdotdot";
import store from "../store";
import browserHistory from 'history/createBrowserHistory';
import Common from "../utils/common";
import Interactive from "react-interactive";
import LazyImg from 'react-lazyload-image';
import ItemProducts from "./video-grid-item-products";
import * as actionType from "../actions";
import Api from "../utils/api_calls";

const history = browserHistory();

export default class VideoGridItem extends PureComponent{ 
	constructor(props) {
		super(props);
		props.video.url = this.getUrl();
		this.state = {
			redirect : props.redirect || false,
			isSearch : props.isSearch || false,
			ambassador: {}
		}
		this.urlGenerator = this.urlGenerator.bind(this);
	}
	handleClick(){
		store.dispatch({
			type: actionType.VIDEO,
			video: this.props.video
		});
	}
	handleAuthorClick(event){
		event.preventDefault();
		event.stopPropagation();

		window.location.href = this['data-link'];
	}
	urlGenerator(video){
		const generateVideoPageUrl = this.props.isSearch || TVSite.isPlayerPage || TVSite.isVideoPage || TVSite.isHomePage ? true : false;
		return  generateVideoPageUrl ? Common.getVideoPageUrl(video) : Common.getVideoPageUrl(video);
	}
	getUrl(){
		return this.urlGenerator(this.props.video);
	}
	cleanNowPlaying(){
		const staticLinks = document.querySelectorAll(".tvp-video-item-link-static");
		for (let i = 0; i < staticLinks.length; i++) {
			const element = staticLinks[i];
			element.classList.remove("now-playing");
		}
	}
	redirectCheck(event){
		this.cleanNowPlaying();
		if(!this.state.redirect){
			event.preventDefault();
			event.stopPropagation();
			this.handleClick();
			history.push(this.getUrl());
		}
		return event;
	}
	componentDidMount(){
		var userId = this.props.video ? this.props.video.user_id : "";

		if(!userId)
			return;

		var that = this;

		Api.ambassador(userId).done(function(ambassador){
			that.setState({
				ambassador: ambassador
			})
		})
	}
	render(){
		const shouldHide = (Common.isMobile && this.props.index === 0 && this.props.playing) ? true : false;
		const isPlayingClass = this.props.playing ? "now-playing" : undefined;
        const userSlug = this.state.ambassador.user_slug ? this.state.ambassador.user_slug.toLowerCase() : "";

		return(
			<div onClick={this.handleClick.bind(this)} className={"tvp-video-item col-xs-12 col-sm-4 col-md-3 "+ (shouldHide ? "tvp-hide" : "") }>
				<div>
				<Interactive as="a" className={isPlayingClass} normal={{className:"tvp-normal"}} hover={{className:"tvp-hovered"}} touchActive={{className:"tvp-hovered"}} onClick={this.redirectCheck.bind(this)} href={this.props.video.url}>
					<div className="tvp-video-item-thumbnail" >
						<LazyImg src={this.props.video.asset.thumbnailUrl} alt={this.props.video.title}/>
						<div className={"tvp-video-item-overlay "+(this.props.playing ? "tvp-playing" : "")}>
							{ this.props.playing ?
							(<div className="tvp-video-item-overlay-playing">
								<span>NOW PLAYING</span>
							</div>) :
							(<div className="tvp-video-item-overlay-content">
								<svg className="tvp-play-icon-svg" viewBox="0 0 200 200">
									<polygon fill="#FFFFFF" points="70, 55 70, 145 145, 100"></polygon>
								</svg>
								<span className="tvp-hidden tvp-watch-now">WATCH NOW</span>
							</div>)
							}
						</div>
					</div>
					<h2 className="tvp-video-item-title">
						<Dotdotdot clamp={2}>
							{this.props.video.title}
						</Dotdotdot>
					</h2>
                </Interactive>
				<a className="tvp-video-item-author" href={"/style-crew/a/" + userSlug + "/" + this.state.ambassador.user_id}>
                    <Dotdotdot clamp={1}>
                        {this.state.ambassador.first_name} {this.state.ambassador.last_name}
                    </Dotdotdot>
				</a>
				<a href={this.props.video.url}>
                    <Dotdotdot className="tvp-video-item-description" clamp={5}>
                        {this.props.video.description}
                    </Dotdotdot>
                    <ItemProducts id={this.props.video.id} />
				</a>
				</div>
			</div>
		);
	}

}
