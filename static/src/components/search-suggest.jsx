import React,{ PureComponent } from "react";
import Simplebar from "../libs/simplebar";
import LiveItem from "./live-search-result";
import "../../sass/components/search-suggest.css";

class SearchSuggest extends PureComponent {
    constructor(props){
		super(props);
		this.index = 0;
		this.navigationEvent = this.navigationEvent.bind(this);
		this.activeHover = this.activeHover.bind(this);
    }
    componentDidMount(){
        const that = this;
		setTimeout(function(){
			const scroller = document.getElementById("results-list-container");
            var simplebar = new Simplebar(scroller);
            simplebar.getScrollElement().addEventListener("scroll", function(e){
                that.props.onScroll();
            });
		},300);
		this.navigationEvent();
	}
	navigationEvent(){
		const list = document.getElementById("suggestions-list");
		
		const that = this;
		window.addEventListener("keydown", event => {
			const code = event.keyCode;
			const qty = list.childElementCount;
			if(!that.props.openResults){
				that.index= 0;
				return;
			}
			/* 37=left 38=up 39=right 40=down */
			if(code === 40 || code === 38){
				let currentItem = that.index + 1;
				
				if(code===40){
					if(that.index >= 0)
						++that.index;
					if(currentItem===qty)
						that.index = 0;
				}else{
					--that.index
					if(that.index < 0)
						that.index = qty - 1;
				}
				for (let i = 0; i < qty; i++) {
					const el = list.childNodes[i];
					el.classList.remove("tvp-hover");
				}
				list.childNodes[that.index].classList.add("tvp-hover");

			}
		});
	}
	cleanArrows(){
		const list = document.getElementById("suggestions-list");
		if(list.childElementCount>0){
			for (let index = 0; index < list.childElementCount; index++) {
				const el = list.childNodes[index];
				el.classList.remove("tvp-hover");
			}
		}
	}
	activeHover(e){
		this.cleanArrows();
		this.index = 0;
		let el = e.target;
		if(el.nodeName=="SPAN"){
			el = el.parentNode;
		}
		el.classList.add("tvp-hover");
	}
	removeHover(e){
		let el = e.target;
		if(el.nodeName=="SPAN"){
			el = el.parentNode;
		}
		el.classList.remove("tvp-hover");
	}
    render(){
       const openResults = this.props.openResults;
       const value = this.props.value || this.props.lastValue;
       const Suggestions = this.props.Suggestions;
       const Results = this.props.Results;
	   const searchURL =  TVSite.baseUrl + "search/?s=";
	   const noResults = Results.length === 0 && openResults ?  true : false;
    return (
        <div className="search-suggest">
				
					<div id="search-suggest-content" className={"search-suggest-content "+(openResults ? "" : "tvp-hide")}>
						<div className="row">
						<div className="col-sm-4">
							<div className="suggestions">
							<ul id="suggestions-list" className="suggestions-list">
							<li>
								<a href={searchURL+value}
								onMouseEnter={this.activeHover}
								onMouseLeave={this.removeHover}
								>
								<span className="keyword">{value}</span>
								</a>
							</li>
							{
								
								Suggestions.map(keyword => {
								const list = keyword.split(value);
								return <li key={keyword} >
											<a href={searchURL+keyword}
											onMouseEnter={this.activeHover}
											onMouseLeave={this.removeHover}
											>
											{
												list.map( (item, index) => {
													return <span key={index}>
															{item}
															{(list.length !== (index + 1)) && <span className="keyword">{value}</span>}
														</span>
												})
											}
											</a>
										</li>
							})
							}
							</ul>
							</div>
						</div>
						<div className="results suggestions-line col-sm-8">
							<div className="results-for">
								results for <span>{ value }</span>
							</div>
                            <div id="results-list-container" className="results-list-container">
							<ul id="results-list" className="results-list">
							{Results.map((result, index) => {
								return <li key={index} >
											<LiveItem 
											identifier={index}
											video={result} />
										</li>
							})
							}
							</ul>
                            </div>
						</div>
					</div>
					
					</div>
					{ this.props.noResults &&
					<div className="search-suggest-content no-results">
						<div className="no-results-text">
							NO RESULTS FOR {value}
						</div>
					</div>
					}
				</div>
    ) 
    } 
}

export default SearchSuggest;

