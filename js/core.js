(function(){
	var cacheModules = {};
	var define = function(id, fn){
		//TODO: need to fixed ie7 bug
		var scripts = document.getElementsByTagName('script');
		var currScript = scripts[scripts.length - 1];
        var url = getScriptAbsFullURL(currScript);
		var a = document.createElement('a');
		a.href = url;
		var pathname = a.pathname;
		if(arguments.length == 2){
			id = pathname.replace(/[^\/]+\.js/, '') + id;
		}else{
			fn = id;
			id = pathname.replace('.js', '');
		}
		var module = {
			exports: {}
		};
		var exports = module.exports;
		fn(require, exports, module);
		cacheModules[id] = module.exports;
	};

	var require = function(id){
		if(id.charAt(0) == '.'){
			var scripts = document.getElementsByTagName('script');
			var currScript = scripts[scripts.length - 1];
			var url = getScriptAbsFullURL(currScript);
			if(url == ''){
				url = window.location.href;
			}
			var pathname = parseUrl(url).pathname;
			//relative
			var params = id.split('/');
			var pathArray = pathname.split('/');
			pathArray.pop();
			while(params[0] == '.' || params[0] == '..'){
				var curr = params.shift();
				if(curr == '.'){
					//pathArray.pop();
				}else if(curr == '..'){
					pathArray.pop();
				}
			}
			var idArray = pathArray.concat(params);
			id = idArray.join('/');
		}
		//absolute
		return cacheModules[id];
	};
	var parseUrl = function(url){
		var a = document.createElement('a');
		a.href = url;
		
		return {
			pathname: a.pathname,
			host: a.host
		};
	};
    var getScriptAbsFullURL = function(node){
        if(node.hasAttribute){
            return node.src;
        }else{
            return node.getAttribute('src', 4);
        }
    };
	var use = function(fn){
		fn(require);
	}
	window.define = define;
	window.use = use;
})();