import React, {Component} from "react";
import "../../sass/components/_spinner.scss";
export default (loader, collection) => (
	class AsyncComponent extends Component{
		constructor(props){
			super(props);
			this.Component = null;
			this.state = {
				Component : AsyncComponent.Component
			};
		}
		componentWillMount(){
			var that = this;
			if(!this.state.Component){
				loader().then((Component) => {
					AsyncComponent.Component = Component;
					that.setState({Component});
				});
			}
		}
		render(){
			if(this.state.Component){
				return(
					<this.state.Component {...this.props } { ...collection } />
				)
			}
			else{
				return <span></span>
			}
		}

	}
)