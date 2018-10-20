class Common{
	constructor(){
	}
	isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
	createProductStructureData(product){
		let schema = document.createElement("script");
		let data = [];
		const schemaStructure = {
			"@context": "http://schema.org/",
			"@type": "Product",
			"name": product.title,
			"image": product.imageUrl,
			"description": product.description,
			"mpn": product.mpn || null,
			"offers": {
			  "@type": "Offer",
			  "priceCurrency": "USD",
			  "price": product.price === 'Out Of Stock' ? '0.00' : product.price,
			  "availability": product.price === 'Out Of Stock' ? "http://schema.org/OutOfStock" : "http://schema.org/InStock"
			}
		};
		data.push(schemaStructure);
		schema.type="application/ld+json";
		schema.text = JSON.stringify(data);
		document.querySelector("head").appendChild(schema);
	}
	getVideoUrl(video){
		var videoTitle = "titleTextEncoded" in video ? video.titleTextEncoded : video.title.replace(/ /g,"-");
		var formedUrl =TVSite.baseUrl+TVSite.channelVideosData.titleTextEncoded+"/"+videoTitle+"/"+TVSite.channelVideosData.id+"-"+video.id+"/";
		return formedUrl.toLowerCase();
	}
	getVideoPageUrl(video){
		var videoTitle = "titleTextEncoded" in video ? video.titleTextEncoded : video.title.replace(/ /g,"-");
		var formedUrl =TVSite.baseUrl+"v"+"/"+videoTitle+"/"+video.id+"/";
		return formedUrl.toLowerCase();
	}
	getDateFromUnix(unixDate){
		var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		var d = (new Date(Number(unixDate) * 1000));
		var month = months[d.getMonth()];
		var day = '' + d.getDate() + ',';
		var year = d.getFullYear();
		return [month, day, year].join(' ');
		
	}
	isUndefined(o){
		return 'undefined' === typeof o;
	}
	isFunction(o) {
		return 'function' === typeof o;
	}
	compact(o){
		for (var k in o)
      		if (o.hasOwnProperty(k) && !o[k])
        		delete o[k];

    	return o;
	}
	isEmpty(o) {
		for (var key in o) {
			if (o.hasOwnProperty(key))
			return false;
		}
		return true;
	}
	globalPoll(globs, callback){
		globs = (globs || []).filter(Boolean);
		var that = this;
		var globsLength = globs.length;
		var globsCheck = 0;

		(function poll() {
		setTimeout(function () {
			var ready = true;
			var missing;

			for (var i = 0; i < globsLength; i++) {
			var glob = globs[i];

			if (undefined === window[glob]) {
				ready = false;

				missing = glob;
			}
			}

			if (ready) {
			if (that.isFunction(callback))
				callback();
			} else if (++globsCheck < 10000) {
			poll();
			} else {
			throw new Error("missing global: " + missing);
			}
		}, 10);
		}());
	}
	getById(id) {
		return document.getElementById(id);
	}
};
export default new Common();
