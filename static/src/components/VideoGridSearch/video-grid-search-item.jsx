import React,{Component} from "react";
import Dotdotdot from "react-dotdotdot";
import store from "../../store";
import browserHistory from 'history/createBrowserHistory';
import Common from "../../utils/common";
import Interactive from "react-interactive";
import LazyImg from 'react-lazyload-image';
import ItemProducts from "./video-grid-search-item-products";
import * as actionType from "../../actions";

const history = browserHistory();

export default class VideoGridItem extends Component{
	constructor(props) {
		super(props);
		props.video.url = this.getUrl();
		this.state = {
			redirect : props.redirect || false,
			isSearch : props.isSearch || false
		}
		this.urlGenerator = this.urlGenerator.bind(this);
	}
	handleClick(){
		
		store.dispatch({
			type: actionType.VIDEO,
			video: this.props.video
		});
		
	}
	urlGenerator(video){
		const generateVideoPageUrl = this.props.isSearch || TVSite.isPlayerPage || TVSite.isVideoPage || TVSite.isHomePage ? true : false;
		return  generateVideoPageUrl ? Common.getVideoPageUrl(video) : Common.getVideoPageUrl(video);
	}
	getUrl(){
		return this.urlGenerator(this.props.video);
	}
	redirectCheck(event){
		if(!this.state.redirect){
			event.preventDefault();
			event.stopPropagation();
			this.handleClick();
			history.push(this.getUrl());
		}
		return event;
	}
	render(){
		const shouldHide = (Common.isMobile && this.props.index === 0 && this.props.playing) ? true : false;
		
		return(
			<div onClick={this.handleClick.bind(this)} className={"tvp-video-item col-xs-12 "+ (shouldHide ? "tvp-hide" : "") }>
				<div className="bordered">
					<div as="div" 
					 >
						<div className="row">
						
							<div className="col-sm-4 pl-12">
								<Interactive as="a" 
								href={this.props.video.url} 
								normal={{className:"tvp-normal"}} 
								hover={{className:"tvp-hovered"}} 
								touchActive={{className:"tvp-hovered"}} 
								onClick={this.redirectCheck.bind(this)}
								className="tvp-video-item-thumbnail " >
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
								</Interactive>
							</div>
							<div className="col-sm-8 pl-0">
								<Interactive as="a" href={this.props.video.url}
								normal={{className:"tvp-normal"}} 
								hover={{className:"tvp-hovered"}} 
								touchActive={{className:"tvp-hovered"}} 
								onClick={this.redirectCheck.bind(this)}
								className="tvp-video-item-title">
									<Dotdotdot clamp={2}>
										{this.props.video.title}
									</Dotdotdot>
								</Interactive>
								<Dotdotdot className="tvp-video-item-author" clamp={1}>
									{this.props.video.asset.author}
								</Dotdotdot>
								<Dotdotdot className="tvp-video-item-description" clamp={5}>
									{this.props.video.description}
								</Dotdotdot>
							</div>
							<div className="col-xs-12">
								<div className="row">
									<div className="col-xs-12">
										<ItemProducts index={this.props.index} id={this.props.video.id} />
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
