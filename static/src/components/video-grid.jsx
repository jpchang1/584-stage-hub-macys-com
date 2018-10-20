import React,{Component} from "react";
import VideoGridItem from "./video-grid-item.jsx";
import Api from "../utils/api_calls.js";
import store from "../store";
import Common from "../utils/common";
import browserHistory from 'history/createBrowserHistory';
import * as actionType from "../actions";

const history = browserHistory();

export default class VideoGrid extends Component{
	constructor(props) {
		super(props);
		const hasVideos = props.videos && props.videos.length ? true : false;
		let enableLoad = hasVideos ? props.videos.length == 12 ? true : false : false;
		this.state = {
			videos:props.videos || [],
			load : enableLoad,
			loading : false,
			currentVideo: props.currentVideo,
			page : props.isSearch ? -1 : 0,
			redirect : props.redirect || false,
			isSearch : props.isSearch || false,
			hasVideos : hasVideos
		};
		this.loadMore = this.loadMore.bind(this);
		
	}
	loadMore(){
		const that = this;
		if(that.state.loading)
			return;
		that.setState({
			loading : true
		});
		const channelId = that.props.channel ? that.props.channel.id : undefined;
		const searchTerm = this.state.isSearch ? (this.props.termToSearch ? this.props.termToSearch : null ) : null;
		Api.videos(channelId,++that.state.page,searchTerm).done(function(data){
			var newState = {};
			if(!data.length){
				newState={
					loading : false,
					load : false,
					hasVideos : that.state.page==0 ? false : true
				};
			}else{
				var enableLoad = data.length < 12 ? false : true;
				TVSite.channelVideosData.videos = TVSite.channelVideosData.videos.concat(data);
				newState={
					videos : that.state.videos.concat(data),
					load : enableLoad,
					loading : false,
					hasVideos : true
				};
			}
			that.setState(newState);
		});
	}
	videoClick(){
		const storeState = store.getState();
		if(storeState.event === actionType.VIDEO_EVENT){
			if(storeState.video_event !== 'tvp:media:videoended') return;
			let index = 0;
			const videos = TVSite.channelVideosData.videos;
			let videoQty = videos.length;
			for (let i = 0; i < videoQty; i++) {
				if(videos[i].id.toString() === this.state.currentVideo.toString()){
					if(i === (videoQty-1))
						index = 0;
					else
						index = ++i;
				}
			}
			let video = videos[index];
			
			/*### CHECK BEHAVIOR OF ROUTER ###*/
			history.push(Common.getVideoPageUrl(video));
			store.dispatch({
				type: actionType.VIDEO,
				video: video
			});
			this.cleanNowPlaying();
			if(index<24){
				this.checkNowPlaying();
			}
			
		}else if(storeState.event === actionType.FILTERED){
			this.setState({
				page:-1,
				videos:[]
			});
			var that = this;
			setTimeout(function(){
				that.loadMore();
			},300);
		}
		else if(storeState.event === actionType.VIDEO){
			this.setState({
				currentVideo : storeState.video.id.toString()
			});
		}

	}
	componentDidMount(){
		const that = this;
		window.addEventListener("scroll",() => {
			if(that.state.loading || !that.state.load)
				return;
			const st = window.pageYOffset || document.documentElement.scrollTop;
			const nwh = document.documentElement.offsetHeight - window.innerHeight;
			let percentDocument = (st*100)/nwh;
			percentDocument = Math.round(percentDocument);
			if(percentDocument > 90){
				that.loadMore();
			}
		});
		store.subscribe(this.videoClick.bind(this));
		if(this.state.isSearch)
			this.loadMore();
		if(!this.hasVideos && this.props.isSearch !== true)
			this.loadMore();
		this.checkNowPlaying();
		this.bindStaticDataEvent();

		setTimeout(function () {
            [].forEach.call(document.getElementById("tvp-video-gallery").querySelectorAll('.loadme'), function (imgEl) {
                imgEl.src = imgEl.getAttribute('data-img-url');
                imgEl.classList.remove('loadme');
            })
        },100);
	}
	redirectCheck = (event) => {
		this.cleanNowPlaying();
		const amba = event.target.getAttribute("data-ambassador");
		if(amba){
			event.preventDefault();
			event.stopPropagation();
			window.location.href = amba;
		}
		if(!this.state.redirect){
			event.preventDefault();
			event.stopPropagation();
			const videos = TVSite.channelVideosData.videos;
			const videoId = event.currentTarget.getAttribute("data-id");
			let currentVideo = null;
			for (let i = 0; i < videos.length; i++) {
				const element = videos[i];
				if(element.id.toString() === videoId)
					currentVideo = element;
			}
			event.currentTarget.classList.add("now-playing");
			this.handleClick(currentVideo);
			const url = Common.getVideoPageUrl(currentVideo);
			history.push(url);
		}
		return event;
	}
	handleClick(video){
		store.dispatch({
			type: actionType.VIDEO,
			video: video
		});
	}
	bindIndividual(list, event){
		for (let l = 0; l < list.length; l++) {
			const element = list[l];
			element.addEventListener("click", event);
		}
	}
	bindStaticDataEvent(){
		const staticContainers = document.querySelectorAll(".tvp-video-item-static");
		const staticLinks = document.querySelectorAll(".tvp-video-item-link-static");
		if(staticContainers.length>0)
			this.bindIndividual(staticContainers, this.handleClick);
		if(staticLinks.length>0)
			this.bindIndividual(staticLinks, this.redirectCheck);
	}
	checkNowPlaying = () => {
		const current = this.state.currentVideo;
		const videos = TVSite.channelVideosData.videos;
		const staticLinks = document.querySelectorAll(".tvp-video-item-link-static");
		for (let i = 0; i < staticLinks.length; i++) {
			const element = staticLinks[i];
			const id = element.getAttribute("data-id");
			if(id===current){
				element.classList.add("now-playing");
			}
		}
	}
	cleanNowPlaying(){
		const staticLinks = document.querySelectorAll(".tvp-video-item-link-static");
		for (let i = 0; i < staticLinks.length; i++) {
			const element = staticLinks[i];
			element.classList.remove("now-playing");
		}
	}
	mapVideos(data, index){
		let playing =  false;
		if(!this.state.redirect){
		 playing = data.id.toString() == this.state.currentVideo.toString() ? true : false;
		}
		return (<VideoGridItem index={index} ambassador={data.ambassador} isSearch={this.state.isSearch} redirect={this.state.redirect} key={data.id+index} playing={playing} video={data} />);
	}
	render() {
		const relatedVideos = (TVSite.isVideoPage || TVSite.isPlayerPage) ? true : false; 
		return(
			<div className="container">
				
				<div className="row">
					<div className="tvp-grid">
						<div className="text-center col-xs-12">
							<h2 className="tvp-video-grid-title">
								
							</h2>
						</div>
						{this.state.hasVideos ? 
						this.state.videos.map(this.mapVideos.bind(this)) :
						<h3 className="text-center col-xs-12">{/*Sorry, no videos match this criteria*/}</h3>
						}
					</div>
					{ this.state.loading && <div className="row text-center">
						LOADING...
						</div>
					}
				</div>
			</div>
			);
	}
}
