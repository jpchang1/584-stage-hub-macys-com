import React,{ PureComponent } from "react";
import "../../sass/components/_search-bar.scss";
import Api from  "../utils/api_calls";
import asyncComponent from "./asyncComponent";

const SearchSuggest = asyncComponent(() => import('./search-suggest').then(module => module.default), {});

export default class SearchBar extends PureComponent{
	constructor(props){
		super(props);
		this.state={
			value : props.default || "",
			to : null,
			Suggestions : [],
            Results : [],
			pageResults : -1,
			loadingResults : false,
			loadingSuggestions : false,
            pageSuggestions : -1
		}
		this.change = this.change.bind(this);
		this.click = this.click.bind(this);
		this.clean = this.clean.bind(this);
		this.getSuggestions = this.getSuggestions.bind(this);
		this.getResults = this.getResults.bind(this);
		this.clearSuggest = this.clearSuggest.bind(this);
		this.onScroll = this.onScroll.bind(this);
	}
	change(event){
		const value = event.target.value;
		const that = this;
		this.clearSuggest();
		setTimeout(() => {
			if(!that.state.loadingResults)
				that.getResults(value);
			if(!that.state.loadingSuggestions)
				that.getSuggestions(value);
		},0);
		this.overlay(value);
		this.setState({
			value : value
		});
	}
	overlay(value){
		
		const overlay = document.getElementById("search-overlay");
		if(overlay && !value){
			overlay.remove();
		}
		else if(value){
			if(overlay)
				return;
			const body = document.getElementsByTagName("body")[0];
			let el = document.createElement("div");
			el.className = "search-overlay";
			el.setAttribute("id", "search-overlay");
			body.appendChild(el);
		}
	}
	click(event){
		event.preventDefault();
		if(this.state.value)
			window.location.href = TVSite.baseUrl + "/search/?s="+this.state.value;
	}
	clean(event){
		event.preventDefault();
		this.setState({value: ""});
		this.overlay("");
		this.clearSuggest();
	}
	getSuggestions(keyword){
		if(!keyword)
			return;
		const that  = this;
		that.setState({ loadingSuggestions : true});
        const pageSuggestions = this.state.pageSuggestions;
        Api.suggestKeywords(pageSuggestions, keyword).done((data)=>{
			if(data.length > 0){
                let initialData = that.state.Suggestions;
                that.setState({
					Suggestions : initialData.concat(data.slice(0,20)),
					loadingSuggestions : false
                });
            }
            else{
                that.setState({
					loadingSuggestions : false
                });
            }
        });
    }
    getResults(keyword){
		if(!keyword)
			return;
		const that = this;
		that.setState({ loadingResults : true});
        let pageResults = this.state.pageResults;
        Api.suggestResults(++this.state.pageResults, keyword).done((data)=>{
			if(data.result.length > 0){
                let initialData = that.state.Results;
                that.setState({
					Results : initialData.concat(data.result),
					loadingResults : false
                });
            }
            else{
                that.setState({
					loadingResults : false
                });
            }
        });
    }
    clearSuggest(){
        this.setState({
            Suggestions : [],
            Results : [],
            pageResults : -1,
            pageSuggestions : -1
        });
        
	}
	onScroll(){
		const keyword = this.state.value;
		if(!this.state.loadingResults)
			this.getResults(keyword);
	}
	render(){
		const hasSuggestions  = this.state.Suggestions.length > 0 ? true : false;
        const hasResults  = this.state.Results.length > 0 ? true : false;
		const openResults = hasResults || hasSuggestions ? true : false;
		const value = this.state.value;
		return <form onSubmit={this.click} className={"tvp-searchbar "+(openResults ? "z10000" : "" )}>
			<input className="tvp-searchbar-input" value={this.state.value} placeholder="Search Videos" onChange={this.change} />
			<div className="tvp-searchbar-button">
				{this.state.value ? <div id="clear" className="clear" onClick={this.clean}>
					<span className="cross"></span>
					<span className="cross"></span>
				</div> : 
				<button type="submit" onClick={this.click} >
					<svg fill="#4D4D4D" width="23" height="24" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
						<path d="M1216 832q0-185-131.5-316.5t-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5 316.5-131.5 131.5-316.5zm512 832q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124-143 0-273.5-55.5t-225-150-150-225-55.5-273.5 55.5-273.5 150-225 225-150 273.5-55.5 273.5 55.5 225 150 150 225 55.5 273.5q0 220-124 399l343 343q37 37 37 90z"/>
					</svg>
				</button>
			}
			</div>
			<SearchSuggest onScroll={this.onScroll} value={value} openResults={openResults} Results={this.state.Results} Suggestions={this.state.Suggestions} />
			
		</form>
	}
}