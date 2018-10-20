import React from "react";
import { render } from "react-dom";
import Header from "../components/Support/Header/Header";
import Support from "../components/Support/Support";
import "../../sass/components/_document.scss";
import 'babel-polyfill';


const App = ()=>{
    
        return(
            <div className="app-container">
                <div className="document-body">
                    <Header />
                    <Support />
                </div>
            </div>
        )
     
}

export default App;

render(<App />, document.getElementById("tvp-video-gallery"));