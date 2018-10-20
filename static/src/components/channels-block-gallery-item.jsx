import React from "react";
import Interactive from 'react-interactive';
import { Link } from "react-router-dom";
import common from "../utils/common";
const ChannelGalleryItem =(props) =>{

		let url = "#";
		if(props.channel);{
			if(!props.channel.titleTextEncoded || !props.channel.id)
				return;
			url = TVSite.baseUrl+"c/"+props.channel.titleTextEncoded.toLowerCase()+"/"+props.channel.id+"/";
		}
	
		let elClass = "col-sm-3";
		if(props.index==0 || props.index== 3 || props.index==4)
			elClass = "col-sm-6";
		
		return(
			<div className={"tvp-gallery-item "+elClass}>
				<Link to={url}>
				<div className={"tvp-gallery-item-container tvp-"+props.channel.id }>
					<Interactive onClick={()=> common.channelActive(props.channel)} as="div" normal={{className:"tvp-normal"}} hover={{className:"tvp-hovered"}} touchActive={{className:"tvp-hovered"}} className="tvp-gallery-item-overlay">
						<div className="tvp-gallery-item-overlay-content">
							<h2 className="tvp-gallery-item-title">{props.channel.title}
							<span className="tvp-gallery-item-line"></span>
							</h2>
							
							<span className="tvp-gallery-item-watch">
							<svg className="tvp-play-icon-svg" viewBox="0 0 200 200"><polygon fill="#FFFFFF" points="70, 55 70, 145 145, 100"></polygon></svg>
							<span>WATCH NOW</span>
							</span>
						</div>
					</Interactive>
				</div>
				</Link>
			</div>
		);
	
}
export default ChannelGalleryItem;

