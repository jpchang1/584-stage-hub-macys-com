import React,{Component} from "react";
import VideoGridItem from "./video-grid-search-item.jsx";
import Api from "../../utils/api_calls.js";
import store from "../../store";
import Common from "../../utils/common";
import browserHistory from 'history/createBrowserHistory';
import * as actionType from "../../actions";
import "../../../sass/components/video-grid-search.css";

const history = browserHistory();
export default class VideoGrid extends Component{
	constructor(props) {
		super(props);
		const hasVideos = props.videos && props.videos.length ? true : false;
		if(hasVideos){
			props.videos.forEach((item)=>{
				return item.date_created = Common.getDateFromUnix(item.date_created)
			});
		}
		let enableLoad = hasVideos ? props.videos.length == 12 ? true : false : false;
		this.state = {
			videos:props.videos || [],
			load : enableLoad,
			loading : false,
			currentVideo: props.currentVideo,
			page : props.isSearch || !hasVideos ? -1 : 0,
			redirect : props.redirect || false,
			isSearch : props.isSearch || false,
			hasVideos : hasVideos
		};
		this.loadMore = this.loadMore.bind(this);
		store.subscribe(this.videoClick.bind(this));
		if(this.state.isSearch)
			this.loadMore();
		if(!hasVideos && props.isSearch !== true)
			this.loadMore();
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
			const results = data.result;
			if(!results.length)
				newState={
					loading : false,
					load : false,
					hasVideos : that.state.page==0 ? false : true
			};
			else{
				results.forEach((item)=>{
					const processData = JSON.parse(item.data);
					item.asset = processData.asset;
					item.titleTextEncoded = processData.titleTextEncoded;
				});
				var enableLoad = results.length < 12 ? false : true;
				newState={
					videos : that.state.videos.concat(results),
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
			let videoQty = this.state.videos.length;
			for (let i = 0; i < videoQty; i++) {
				if(this.state.videos[i].id===this.state.currentVideo){
					if(i === (videoQty-1))
						index = 0;
					else
						index = ++i;
				}
			}
			let video = this.state.videos[index];
			/*### CHECK BEHAVIOR OF ROUTER ###*/
			history.push(Common.getVideoPageUrl(video));
			store.dispatch({
				type: actionType.VIDEO,
				video: video
			});
			
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
				currentVideo : storeState.video.id
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
	}
	mapVideos(data, index){
		let playing =  false;
		if(!this.state.redirect){
		 playing = data.id == this.state.currentVideo ? true : false;
		}
		return (<VideoGridItem index={index} isSearch={this.state.isSearch} redirect={this.state.redirect} key={data.id+index} playing={playing} video={data} />);
	}
	render() {
		return(
			<div className="container">
				<div className="row">
					<div className="tvp-grid">
						<div className="col-xs-12">
							<h2 className="tvp-video-grid-title">
								{this.props.gridTitle}
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
