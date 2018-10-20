import React,{ PureComponent } from "react";
import "../../sass/components/_search-bar-black.scss";
import Api from  "../utils/api_calls";
import asyncComponent from "./asyncComponent";
import {debounce} from 'throttle-debounce';
import * as actionType from "../../src/actions";

//const Filters = asyncComponent(() => import('./filters').then(module => module.default), {});
const SearchSuggest = asyncComponent(() => import('./search-suggest').then(module => module.default), {});
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export default class SearchBar extends PureComponent{
	constructor(props){
		super(props);
		this.state={
			value : props.default || "",
			lastValue : "",
			to : null,
			Suggestions : [],
            Results : [],
			pageResults : -1,
			loadingResults : false,
			loadingSuggestions : false,
			pageSuggestions : -1,
			hasSuggests : true,
			hasResults : true
		}

        this.getResults = debounce(350, this.getResults);
        this.getSuggestions = debounce(350, this.getSuggestions);
	}
	change = (e) => {
        if(e){
            e.preventDefault();
            e.stopPropagation();
        }

        const value = e.target.value;

        if(value == this.state.value)
            return;

		if(!isMobile){
			this.clearSuggest();
			this.overlay(value);

            if(!this.state.loadingResults)
                this.getResults(value);

            if(!this.state.loadingSuggestions)
                this.getSuggestions(value);
		}

		let state = value ? {
			value : value
		} : {
            value: value,
            lastValue : value,
            hasResults : true,
            hasSuggests : true
		}

		this.setState(state);
	}
	overlay = (value) => {
		if(isMobile)
			return;
		const that = this;
		const overlay = document.getElementById("search-overlay");
		if(overlay && !value){
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }

			that.clearSuggest();
		}
		else if(value){
			if(overlay)
				return;
			const body = document.getElementsByTagName("body")[0];
			let el = document.createElement("div");
			el.className = "search-overlay";
			el.setAttribute("id", "search-overlay");
			el.addEventListener("click",()=>{
				this.overlay("");
			},false);
			body.appendChild(el);
		}
	}
	click = (event) => {
		event.preventDefault();
		const list = document.getElementById("suggestions-list");
		if(list && list.childElementCount > 0){
			let selected = null;
			for (let i = 0; i < list.childElementCount; i++) {
				const el = list.childNodes[i];
				if(el.classList.contains("tvp-hover"))
					selected = el;
			}
			if(selected)
				return window.location.href = TVSite.baseUrl + "/search/?s="+selected.innerText;
		}
		if(this.state.value)
			window.location.href = TVSite.baseUrl + "/search/?s="+this.state.value;
	}
	clean = (event) => {
		if(event)
			event.preventDefault();

        this.overlay("");
        this.clearSuggest();

        this.setState({
            value: "",
            lastValue : this.state.value
        });
	}
	getSuggestions = (keyword) => {
		if(!keyword)
			return;

		this.setState({loadingSuggestions : true});

        const pageSuggestions = this.state.pageSuggestions;
        const that  = this;

        Api.suggestKeywords(pageSuggestions, keyword).done((data)=>{
			if(data.length > 0){
                let initialData = that.state.Suggestions;
                that.setState({
					Suggestions : initialData.concat(data.slice(0,20)),
					loadingSuggestions : false,
					hasSuggests : true
                });
            }
            else{
                that.setState({
					loadingSuggestions : false,
					hasSuggests : false
                });
            }
        });
    }
    getResults = (keyword) => {
		if(!keyword)
			return;

        this.setState({loadingResults: true});
        let pageResults = this.state.pageResults;

        const that = this;

        Api.suggestResults(++this.state.pageResults, keyword).done((data)=>{
			if(data.result.length > 0){
                let initialData = that.state.Results;
                that.setState({
					Results : initialData.concat(data.result),
					loadingResults : false,
					hasResults : true
                });
            }
            else{
				const hasResults = this.state.pageResults == 0 ? false : true;
                that.setState({
					loadingResults : false,
					hasResults : hasResults
                });
            }
        });
    }
    clearSuggest =() => {
        const noResultsPane = document.querySelector('.search-suggest-content.no-results')

        if(noResultsPane){
            noResultsPane.classList.add('tvp-hide');
        }

        this.setState({
            Suggestions : [],
			Results : [],
			value : "",
            pageResults : -1,
            pageSuggestions : -1
        });
	}
	onScroll = () => {
		const keyword = this.state.value;
		if(!this.state.loadingResults)
			this.getResults(keyword);
	}
	render(){
		const hasSuggestions  = this.state.Suggestions.length > 0 ? true : false;
        const hasResults  = this.state.Results.length > 0 ? true : false;
		const openResults = hasResults || hasSuggestions ? true : false;
		const value = this.state.value;
		const noResults = this.state.hasResults ? false : true;
		let contentClass = "search-suggest-content "+(openResults ? "" : "tvp-hide ");
		if(this.props.isFilterOpen)
			contentClass = contentClass + "filter-open";
		
		return <div>
			<div className="col-md-12">
			<form onSubmit={this.click} className={"tvp-searchbar "+(openResults ? "z10000" : "")}>
			<input type="text" className="tvp-searchbar-input" value={this.state.value} placeholder="Search Videos" onChange={this.change} />
			<div className="tvp-searchbar-button">
				{this.state.value ? <div id="clear" className="clear" onClick={this.clean}>
					<span className="cross"></span>
					<span className="cross"></span>
				</div> : 
				<button type="submit" onClick={this.click} >
					<svg fill="rgba(51,51,51,0.5)" width="19" height="20" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
						<path d="M1216 832q0-185-131.5-316.5t-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5 316.5-131.5 131.5-316.5zm512 832q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124-143 0-273.5-55.5t-225-150-150-225-55.5-273.5 55.5-273.5 150-225 225-150 273.5-55.5 273.5 55.5 225 150 150 225 55.5 273.5q0 220-124 399l343 343q37 37 37 90z"/>
					</svg>
				</button>
			}
			
			</div>
			</form>
			
			</div>
			<div className={"col-md-4 "+(this.props.isFilterOpen ? "tvp-hide" : "tvp-hide") }>
				{/* <Filters placeholder="Product Category" /> */}
			</div>
			<div className={"col-md-4 "+(this.props.isFilterOpen ? "tvp-hide" : "tvp-hide") }>
				{/* <Filters searchable={true} Ambassadors={true} placeholder="Ambassador" /> */}
			</div>
			<div className="col-xs-12">
				{ !isMobile && <SearchSuggest 
				onScroll={this.onScroll} 
				value={value} 
				lastValue={this.state.lastValue}
				openResults={openResults} 
				Results={this.state.Results} 
				noResults={noResults}
				Suggestions={this.state.Suggestions} />}
			</div>
		</div>
	}
}