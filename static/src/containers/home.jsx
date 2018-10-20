import React from "react";
import { render } from "react-dom";
import asyncComponent from '../components/asyncComponent';
import Search from "../components/Search/index.jsx";
import "../../sass/components/_document.scss";
import 'babel-polyfill';

const Grid = asyncComponent(() => import('../components/video-grid').then(module => module.default), {});

const Home =()=> <div className="app-container-home">
			<div className="document-body">
				<Grid gridTitle = " "
					redirect = {true}
					videos = {[]}
				/>
			</div>
		</div>

export default Home;

render(<Search
	loginId = {TVSite.loginId}
	resultUrl = {(result)=>{
		return `${TVSite.baseUrl}v/${String(result.titleTextEncoded).toLowerCase()}/${result.id}`
	}}
	searchPageUrl = {(query)=>{
		return `${TVSite.baseUrl}search/?s=${query}`
	}}
/>, document.getElementById("tvp-search-area"));

render(<Home />, document.getElementById("tvp-video-gallery-grid"));