import React from "react";
import SearchBar from "./search-bar.jsx";
import Breadcrumbs from "./breadcrumbs";
import asyncComponent from "./asyncComponent.jsx";
const Filters = asyncComponent(() => import('./filters.jsx').then(module => module.default), {});

const ChannelHead = (props) => {
	
		return (<div>
			<div className={"tvp-channel-banner tvp-"+props.channel.id}>
				<div className="container-fluid">
					<div className="row">
						<h1 className="tvp-channel-title text-center">{props.channel.title}</h1>
					</div>
				</div>
			</div>
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-6">
						<SearchBar />
					</div>
					<div className="col-md-6">
					<Filters />
					</div>
				</div>
				<div className="row">
					<Breadcrumbs />
				</div>
			</div>
			<div className="tvp-line">
			</div>
		</div>)

}

export default ChannelHead;