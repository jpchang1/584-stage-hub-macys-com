import React,{Component} from "react";
import Select from "react-select";
import api from "../utils/api_calls";
import store from "../store";
export default class FilterHome extends Component{
	constructor(props){
		super(props);
        let propName = "";
        if(props.options){
            props.options.forEach((el, idx) => {
                el.value = el.id
                el.label = el.title
            });
        }
        this.state = {
			options: props.options || [],
			value : "",
			isLoading : true,
			propName : propName
		};
		this.videoTypeChange = this.videoTypeChange.bind(this);
	}
	setFilter(option){
		if(option){
			TVSite.replacedChannel = option.value;
		}
		else{
			TVSite.replacedChannel = null;
		}
		store.dispatch({
			type:"FILTERED",
		});
	}
	videoTypeChange(selectedOption){
		this.setFilter(selectedOption);
		this.setState({
			value : selectedOption
		});
	}
	render(){
		return<div>
			<div className="tvp-filter">
				{ this.state.options.length > 0 &&
				<Select options={this.state.options} searchable={false} onChange={this.videoTypeChange} value={this.state.value} placeholder="Filter by" />
				}
			</div>
		</div>
	}
}