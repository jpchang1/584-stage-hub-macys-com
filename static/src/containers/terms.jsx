import React, { PureComponent } from "react";
import { render } from "react-dom";
import HeaderGallery from "../components/header";
import Terms from "../components/terms";
import "../../sass/components/_document.scss";



const App = ()=>{
    
        return(
            <div className="app-container">
                <div className="document-body">
                    <HeaderGallery />
                    <Terms />
                </div>
            </div>
        )
     
}

export default App;

render(<App />, document.getElementById("tvp-video-gallery"));