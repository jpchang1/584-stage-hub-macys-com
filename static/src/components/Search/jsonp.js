const jsonp = (url, params)=>{
	let script = document.createElement('script');
	let counter = 0;
	let src = url || '';

	if(params && 'object' === typeof params)
		for (let param in params) {
			if (params.hasOwnProperty(param)) {
				src += (counter > 0 ? '&' : '?') + param + '=' + params[param];

				++counter;
			}
		}

	const callBackName = `_jsonp_${Math.random().toString(36).substring(7)}`;

	script.src = `${src}&callback=${callBackName}`;

	return new Promise((resolve, reject)=>{
		var cameBack;
		var timer;

		window[callBackName] = function (data) {
			cameBack = true;

			clearInterval(timer);

			resolve(data);
		};

		document.body.appendChild(script);

		timer = setInterval(function () {
			if(!cameBack)
				reject();
		}, 10000);
	});
};

export default jsonp;