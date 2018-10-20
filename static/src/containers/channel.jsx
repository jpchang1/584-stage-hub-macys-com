import React from "react";
import { render } from "react-dom";
import asyncComponent from '../components/asyncComponent.jsx';
import "../../sass/components/_document.scss";
import Player from "../components/player";
const Grid = asyncComponent(() => import('../components/video-grid.jsx').then(module => module.default), {});


const Home = () => {
	return <div className="app-container">
		<div className="document-body">
			<Player video={[]} />
			<Grid gridTitle=" "
			redirect={false}
			videos = {"videos" in TVSite.channelVideosData ? TVSite.channelVideosData.videos.slice(0,12) : []}
			channel = {TVSite.channelVideosData} />
		</div>
	</div>
}
export default Home;

render(<Home />, document.getElementById("tvp-video-gallery"));