import React, { PureComponent } from "react";
import Search from "./Search/index.jsx";

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
        <div className="col-md-4 home-top-title">
            <a className="style-container" href={homeUrl}>
                <div className="style-logo" style={{backgroundImage:"url("+imageUrl+")"}}>
                    <img src={imageUrl} alt={title}/>
                </div>
                <div className="style-title">
                    {title}
                </div>
            </a>
        </div>
        <div className="col-md-8 search-area-holder">
            <div id="tvp-search-area" className="tvp-search-area">
              <Search
								loginId = {TVSite.loginId}
								resultUrl = {(result)=>{
									return `${TVSite.baseUrl}v/${String(result.titleTextEncoded).toLowerCase()}/${result.id}`
								}}
								searchPageUrl = {(query)=>{
									return `${TVSite.baseUrl}search/?s=${query}`
								}}
              />
            </div>
            {/*<div className="row">*/}
                {/*<Search isFilterOpen={this.state.isFiltersOpen} handleMobile={this.state.handleMobile} default={props.default} />*/}
                    { /*
                        this.state.handleMobile && <div className="menu-mobile">
                            <div className="menu-mobile-item" >
                                <span className="menu-mobile-filters" onClick={this.activeFilters}>
                                <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
                                    <path d="M0 0h24v24H0z" fill="none"/>
                                </svg>
                                </span>
                            </div>
                        </div> */
                    }
            {/*</div>*/}
        </div>
    </div>);
    }
}

export default HomeTop;