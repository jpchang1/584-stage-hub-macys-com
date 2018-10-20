import React from "react";
import ChannelGalleryItem from "./channels-block-gallery-item.jsx";
import HomeTop from "./home-top.jsx";
const ChannelGallery =(props) => {
	let channels = null;
	if(props.channels){
		channels = props.channels.map((item, index)=>{
			return <ChannelGalleryItem index={index} key={item.id} channel={item} />;
		});
	}
	
	return(
		<div className="container-fluid">
		<div className="row">
			<HomeTop />
		</div>
		<div className="row">
			<div className="col-xs-12 tvp-gallery">
				{channels}
			</div>
		</div>
		</div>
	);

}
export default ChannelGallery;