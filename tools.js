var isPlainObject = function(obj){
	if(!obj.hasOwnProperty('constructor') && typeof obj == 'object' && obj.constructor == Object){
		return true;
	}
	
	return false;
}
var mix = function(base, child, deep){
    var o = new Object();
    for(var key in base){
        o[key] = base[key];
    }
    for(var key in child){
		if(deep && isPlainObject(o[key])){
			o[key] = mix(o[key], child[key]);
		}else{
			o[key] = child[key];
		}
    }
    return o;
};

var extend = function(subClass, baseClass){
	var parent = subClass.parent = {
		/**
		 * parent construct
		 * @param obj currentObject
		 * @param args
		 */
		'__construct': function(obj, args){
			baseClass.apply(obj, args);
		}
	};

	for(var method in baseClass.prototype){
		parent[method] = baseClass.prototype[method];
		if(! (method in subClass.prototype)){
			subClass.prototype[method] = baseClass.prototype[method];
		}

	}
};

var trim = function(str, spliter){
	var regexp;
	if(!spliter){
		regexp = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;
	}else{
		regexp = new RegExp("^(" + spliter + ")+|(" + spliter + ")+$", "g");
	}
	
	return str.replace(regexp, '');
};


var dashToUnderScore = function(str){
	return str.replace(/-/g, '_');
};

var dashToCamel = function(str){
	return str.replace(/-([a-z])/, function(matches){
		return matches[1].toUpperCase();
	});
}

var camel2Dash = function(str){
	return str.replace(/.+([A-Z])/, function(matches){
		return "-" + matches[1].toLowerCase();
	});
};

//array enhance

var indexOf = function(array, element){
	for(var i = 0, len = array.length; i < len; i++){
		if(array[i] === element){
			return i;
		}
	}
	return -1;
}

var eles = {
	div: document.createElement('div'),
	ul: document.createElement('ul'),
	li: document.createElement('li'),
	span: document.createElement('span'),
	p: document.createElement('p'),
	a: document.createElement('a'),
	fragment: document.createDocumentFragment(),
	input: document.createElement('input')
}
/**
 * create element
 * @param tagName
 * @param id
 * @param className
 * @returns {null}
 */
var $c = function(tagName, id, className){
	var ele = null;
	if(!eles[tagName]){
		eles[tagName] = document.createElement(tagName);
		ele = eles[tagName].cloneNode(true);
	}else{
		ele = eles[tagName].cloneNode(true);
	}
	if(id){
		ele.id = id;
	}
	if(className){
		ele.className = className;
	}
	return ele;
};

var rand = function (m, n) {
	return Math.floor((n - m + 1) * Math.random() + m);
}

var EventEmitter = function(){
	this._initEventEmitter();
};

EventEmitter.prototype = {
	_initEventEmitter: function(){
		this._events = {};
	},
	
	emit: function(type, eventObject){
		if(this._events[type]){
			var events = this._events[type].slice();
			
			for(var i = 0, len = events.length; i < len; i++){
				events[i].listener.call(this, eventObject);
			}
		}
	},
	
	addListener: function(type, listener){
		if(!this._events[type]){
			this._events[type] = [];
		}
		this._events[type].push({
			type: type,
			listener: listener
		});
	},
	
	on: function(type, listener){
		this.addListener(type, listener);
	},
	once: function(type, listener){
		var fired = false;

		function g(eventObject) {
			this.removeListener(type, g);
		
		    if (!fired) {
		    	fired = true;
				listener.apply(this, eventObject);
			}
		}
		
		  g.listener = listener;
		  this.on(type, g);
	},
	removeListener: function(type, listener){
		var events = this._events[type];
		
		for(var i = 0, len = events.length; i < len; i++){
			if(events[i] == listener){
				this._events[type].splice(i, 1);
			}
		}
	},
	removeAllListeners: function(type){
		if(type == undefined){
			this._events = {};
		}else{
			delete this._events[type];
		}
	},
	
};

var Template = function(tmplContent){
	var OPEN_TAG = '<?';
	var CLOSE_TAG = '?>';
	
	//预处理模板内容
	tmplContent = tmplContent.replace(/('|"|\\)/g, "\\$1")
		.replace(/\r/g, "")
		.replace(/\t/g, "\\t")
		.replace(/\n/g, "\\n");
	
	//分析模板语法
	tmplContent = tmplContent.split(OPEN_TAG).join('\t')
		.replace(/\t=(.*?)\?>/g, function(){
			var target =  arguments[1].replace(/\\t/g, ' ').replace(/\\n/g, '\n').replace(/\\r/, '\r').replace(/\\('|"|\\)/g, "$1");
			return "' + " + target + ";\r\n___tpContent += '";
		})
		.replace(/\t(.*?)\?>/g, function(){
			var target = arguments[1].replace(/\\t/g, ' ').replace(/\\n/g, '\n').replace(/\\r/, '\r').replace(/\\('|"|\\)/g, "$1");
			return "';\r\n" + target + "\r\n___tpContent += '";
		});
	
	var fnBody = "var ___tpContent = '',\
	print = function(){\
		___tpContent += [].join.call(arguments, '');\
	};\
	___tpContent += '" + tmplContent + "';\
	return ___tpContent;";
	
	//渲染
	this.render = function(target){
		return new Function(fnBody).call(target);
	};
};