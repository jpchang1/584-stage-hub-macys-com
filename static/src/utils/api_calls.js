import $ from "./ajax";

class Request{
	constructor(){
		this.Data = {
			"X-login-id" : TVSite.loginId,
		}
	}
	addProperty(property, value){
		const shouldAdd = this.isValid(property) && this.isValid(value) ? true : false;
		if(shouldAdd){
			this.Data[property] = value;
		}
	}
	isValid(toEvaluate){
		let isValid = true;
		if('undefined' === typeof toEvaluate )
			isValid = false;
		else if('string' === typeof toEvaluate && !toEvaluate.length)
			isValid = false;
		else if(toEvaluate === null)
			isValid = false;
		return isValid;
	}
}

class Api{
	commonRequest(url, page, query){
			let requestData = {
				p : (page == null || page == undefined) ? 0 : page,
				n : 24 ,
				s : (query == null || query == undefined) ? undefined : query,
				"X-login-id" : TVSite.loginId,
				status : "approved"
			};
			
			if(TVSite.filter)
				requestData[TVSite.filter.filter] = TVSite.filter.value;
			
			return $.ajax({
				url : url,
				cache : false,
				dataType : "jsonp",
				data : requestData
        });
	}
	commonClean(url, requestData){
		return $.ajax({
			url : url,
			cache : false,
			dataType : "jsonp",
			contentType: "application/json; charset=utf-8",
			data : requestData
		});
	}
	macys(productId){
		const baseUrl = "https://api.macys.com/v4/catalog/product/"+productId;
		const url = baseUrl + "(upcs(upcdetails),reviews,productdetails(childProducts,summary,attributes,primaryImage,price,colorMap,SizeMap),promotions)";
		return $.ajax({
			url : url,
			cache : false,
			beforeSend: request =>{
				request.setRequestHeader("x-macys-webservice-client-id", "pqxaav6bxqsh2zj4u5hw7r97");
				request.setRequestHeader("Accept", "application/json");
			}
		});
	}
	suggestKeywords(page, query){
		const url = TVSite.apiUrl + 'videos/search/suggest?';
		const data = new Request();
		data.addProperty("p", page);
		data.addProperty("s", query);
		return this.commonClean(url, data.Data);
	}
	suggestResults(page, query){
		const url = TVSite.apiUrl + "videos/search/suggest/results";
		const data = new Request();
		data.addProperty("p", page);
		data.addProperty("n", 5);
		data.addProperty("s", query);
		return this.commonClean(url, data.Data);
	}
	filters(){
        const url = TVSite.apiUrl + 'codebook/display/video';
		const request = new Request();
		request.addProperty("channelId", TVSite.channelId);
		return this.commonClean(url, request.Data);
	}
	ambassador(user_id){
		const url = TVSite.apiUrl + "accountUser/ambassador/" + user_id;
		const request = new Request();
		return this.commonClean(url, request.Data);
	}
	ambassadors(page, query){
		const url = "https://test.tvpage.com/api/account/"+TVSite.loginId+"/ambassadors"
		const data = new Request();
		data.addProperty("p", page);
		data.addProperty("n", 24);
		data.addProperty("s", query);
		return this.commonClean(url, data.Data);
	}
	products(videoId){
		const url = TVSite.apiUrl+"videos/" + videoId + "/products";
		const request = new Request();
        return this.commonClean(url, request.Data);
	}
	channelInfo(channelId){
		const url = TVSite.apiUrl+"channels/"+channelId;
		const request = new Request();
		return this.commonClean(url, request.Data);
    }
	videos(channelId, page, query){
		let url = TVSite.apiUrl+"videos/search";
		if(TVSite.replacedChannel)
			channelId = TVSite.replacedChannel;
		if(channelId !== undefined && channelId !== null)
			url = TVSite.apiUrl +"channels/"+ channelId + "/videos";
		const request = new Request();
		request.addProperty("p", page);
		request.addProperty("n", 24);
		request.addProperty("s", query);
		if(TVSite.isVideoPage){
			if(TVSiteFilter.brand){
				request.addProperty("brand", TVSiteFilter.brand);
			}else if(TVSiteFilter.searchTitle){
				request.addProperty("s", TVSiteFilter.searchTitle);
			}
		}
		if(TVSite.isAmbassadorPage){
			request.addProperty("user_id", TVSite.ambassadorData.id);
		}
		if(TVSite.filter)
			request.addProperty(TVSite.filter.filter, TVSite.filter.value);
		request.addProperty("status", "approved");
		if(TVSite.isSearchPage){
			url = TVSite.apiUrl + "videos/search/suggest/results";
		}
		return this.commonClean(url, request.Data);
	}

}

export default new Api();
