import React from "react";
import HomeTop from "./home-top.jsx";
import "../../sass/components/_home-top.scss";
const HeaderGallery =(props) => {

	return(
		<div className="header">
			<div className="container">
				<div className="row header-container">
					<HomeTop default={props.default} />
				</div>
			</div>
		</div>
	);
}
export default HeaderGallery;