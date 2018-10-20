import React from "react";
import { render } from "react-dom";
import Player from "../components/player.jsx";
import asyncComponent from "../components/asyncComponent.jsx";
import "../../sass/components/_document.scss";
import 'babel-polyfill';


const Grid = asyncComponent(()=> import("../components/video-grid.jsx").then(module => module.default),{});

const App = () =>{
	const pageData = TVSite.channelVideosData;
	const title = pageData.video.title.replace(/"/g,"");
	TVSite.filter = {
		filter : "s",
		value : title
	};
	return <div className="app-container">
		<div className="document-body">
			<Player video={pageData.video}/>
			<Grid gridTitle=" "
			videos={[]}
			currentVideo = {"video" in pageData ? pageData.video.id : null}
			channel={pageData} />
		</div>
	</div>
}

export default App;

render(<App />, document.getElementById("tvp-video-gallery"));