import React from "react";
import { render } from "react-dom"; 
import Player from "../components/player";
import asyncComponent from "../components/asyncComponent";
import "../../sass/components/_document.scss";
import 'babel-polyfill';
import Search from "../components/Search/index.jsx";

const Grid = asyncComponent(()=> import("../components/video-grid").then(module => module.default),{});
const video = TVSite.channelVideosData.video;
const App = () => {
	return <div className="app-container-video">
			<div className="document-body">
				<Player video={video}/>
				
			 </div>
		</div>
}

export default App;

render(<Search
	loginId = {TVSite.loginId}
	resultUrl = {(result)=>{
		return `${TVSite.baseUrl}v/${String(result.titleTextEncoded).toLowerCase()}/${result.id}`
	}}
	searchPageUrl = {(query)=>{
		return `${TVSite.baseUrl}search/?s=${query}`
	}}
/>, document.getElementById("tvp-search-area"));
render(<App />, document.getElementById("tvp-video-player"));
render(<Grid gridTitle=" "
videos={[]}
currentVideo = {video.id}
/>, document.getElementById("tvp-video-gallery-grid"));