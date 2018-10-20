import React, {Component} from "react";
import { render } from "react-dom";
import asyncComponent from '../components/asyncComponent';
import HeaderGallery from "../components/header";
import "../../sass/components/_document.scss";
import 'babel-polyfill';

const Grid = asyncComponent(() => import('../components/VideoGridSearch/video-grid-search')
.then(module => module.default), {
  redirect:true,
  videos : []
});
class App extends Component{
    constructor(){
        super();
        this.state={
            searchTerm : ""
        };
    }
    componentWillMount(){
        var o = {};
        if (window.location && 'search' in location) {
            var kv = location.search.substr(1).split('&'), params = [];
            for (var i = 0; i < kv.length; i++) { 
                params.push(kv[i]); 
            }
            for (var j = 0; j < params.length; j++) {
                var param = params[j].split('=');
                o[param[0]] = decodeURIComponent(param[1]);
            }
        }
        if("s" in o){
            this.setState({
                searchTerm : o.s.toUpperCase()
            });
        }
    }
    render(){
        return(
            <div className="app-container">
                <div className="document-body">
                    <HeaderGallery default={this.state.searchTerm}/>
                    <Grid gridTitle={"RESULTS FOR  "+this.state.searchTerm} isSearch={true} termToSearch={this.state.searchTerm} />
                </div>
            </div>
        )
    }
}

export default App;

render(<App />, document.getElementById("tvp-video-gallery"));