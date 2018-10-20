import React, { PureComponent } from "react";
import Search from "./search-bar-black";

class HomeTop extends PureComponent{
    constructor(props){
        super(props);
        const handleMobile = window.innerWidth < 961 ? true : false;
        this.state = {
            handleMobile : handleMobile,
            isSearchOpen : !handleMobile,
            isFiltersOpen : !handleMobile
        }
        this.resize = this.resize.bind(this);
        this.activeSearch = this.activeSearch.bind(this);
        this.activeFilters = this.activeFilters.bind(this);
    }
    resize(){
        const that = this;
        window.addEventListener("resize", (element)=>{
            const width = window.innerWidth;
            let handleMobile = that.state.handleMobile;
            if(width < 961){
                handleMobile = true;
            }else{
                handleMobile = false;
            }
            if(that.state.handleMobile !== handleMobile){
                that.setState({
                    handleMobile : handleMobile,
                    isFiltersOpen : !handleMobile,
                    isSearchOpen : !handleMobile
                });
            }
        });
    }
    componentDidMount(){
        this.resize();
    }
    activeSearch(el){
        const currenState = this.state.isSearchOpen;
        this.setState({isSearchOpen : !currenState})
    }
    activeFilters(el){
        const currenState = this.state.isFiltersOpen;
        this.setState({isFiltersOpen : !currenState})
    }
    render(){
    const props = this.props;
    let homeUrl = TVSite.baseUrl;
    let title = "Style Crew";
    let imageUrl = TVSite.baseUrl+"images/logo.png";
    if(TVSite.isAmbassadorPage){
        title = TVSite.ambassadorData.title;
        imageUrl = "https://api.tvpage.com" + TVSite.ambassadorData.profile_picture;
        homeUrl = TVSite.baseUrl + "a/"+ TVSite.ambassadorData.titleTextEncoded+"/"+TVSite.ambassadorData.id;
    }
    return(<div>
                <Search isFilterOpen={this.state.isFiltersOpen} handleMobile={this.state.handleMobile} default={props.default} />
            </div>
     );
    }
}

export default HomeTop;