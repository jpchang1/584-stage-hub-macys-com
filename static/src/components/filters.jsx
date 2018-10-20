import React,{Component} from "react";
import Select from "react-select";
import api from "../utils/api_calls";
import store from "../store";
import "../../sass/components/_filters.scss";

export default class Filters extends Component{
	constructor(props){
		super(props);
		let propName = "";
		this.state = {
			options: [],
			value : "",
			isLoading : true,
			page: -1,
			searchTerm : "",
			propName : props.propName || propName
		};
	}
	getOptions = () => {
		var that  = this;
		api.filters().done(function(data){
			var filters = [];
			for (let index = 0; index < data.length; index++) {
				const element = data[index];
				if(element.code===that.state.propName){
					element.options.forEach(el => {
						el.value = el.code;
					});
					filters = element.options;
				}
			};
			that.setState({
				isLoading : false,
				options : filters
			});
		});
	}
	getAmbassadors = (search) => {
		var that  = this;
		api.ambassadors(++this.state.page, search).done(function(data){
			console.log(data);
			var filters = [];
			for (let index = 0; index < data.length; index++) {
				const element = data[index];
				const label = element.first_name + (element.last_name ? " "+element.last_name : "");
				filters.push({
					label : label,
					value : element.user_slug
				});
			};
			that.setState({
				isLoading : false,
				options : filters
			});
		});
	}
	setFilter(option, name){
		if(option){
			TVSite.filter = {
				filter : name,
				value : option.code
			};
		}
		else if(TVSite.isVideoPage || TVSite.isPlayerPage){
			const pageData = TVSite.channelVideosData;
			TVSite.filter = {
				filter : "s",
				value : pageData.video.title
			};
		}
		else{
			TVSite.filter = {};
		}
		store.dispatch({
			type:"FILTERED",
		});
	}
	videoTypeChange = (selectedOption) => {
		this.setFilter(selectedOption,this.state.propName);
		this.setState({
			value : selectedOption
		});
	}
	ambassadorChange = (selectedOption) => {
		console.log("ambassador selected");
		this.setState({
			value : selectedOption
		});
	}
	ambassadorInputChanged = (el) => {
		const value = el;
		console.log("ambassador input changed");
		if(value){
			this.setState({
				page : -1,
				options : []
			});
			this.getAmbassadors(value);
		}
	}
	componentDidMount(){
		if(this.props.Ambassadors)
			this.getAmbassadors();
		else
			this.getOptions();
	}
	scrollBottom = () => {

	}
	render(){
		const placeHolder = this.props.placeholder || "Filter by";
		const searchable = this.props.searchable || false;
		const onChange = this.props.Ambassadors ? this.ambassadorChange : this.videoTypeChange;
		const inputChanged = this.props.Ambassadors ? this.ambassadorInputChanged : undefined;
		const scrollBottom = this.props.Ambassadors ? this.scrollBottom : undefined;
		return<div>
			<div className="tvp-filter">
				<Select 
					options={this.state.options} 
					searchable={searchable} 
					onChange={onChange} 
					value={this.state.value} 
					isLoading={this.state.isLoading}
					onInputChange={inputChanged} 
					onMenuScrollToBottom={scrollBottom}
					placeholder={placeHolder} />
				
			</div>
		</div>
	}
}