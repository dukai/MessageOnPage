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
define('msgtool', function(require, exports, module){
var msgtool = {
	faces: [
		["强", "[/qiang]", "qiang.gif"],	["弱", "[/ruo]", "ruo.gif"],		["握手", "[/ws]", "ws.gif"],	["胜利", "[/shl]", "shl.gif"],	["抱拳", "[/bq]", "bq.gif"],
		["勾引", "[/gy]", "gy.gif"],		["拳头", "[/qt]", "qt.gif"],		["差劲", "[/cj]", "cj.gif"],	["爱你", "[/aini]", "aini.gif"],["NO", "[/bu]", "bu.gif"],
		["YES", "[/hd]", "hd.gif"], 		["微笑", "[/wx]", "wx.gif"],		["撇嘴", "[/pz]", "pz.gif"],	["色", "[/se]", "se.gif"],		["发呆", "[/fd]", "fd.gif"],
		["得意", "[/dy]", "dy.gif"],		["流泪", "[/ll]", "ll.gif"],		["害羞", "[/hx]", "hx.gif"],	["闭嘴", "[/bz]", "bz.gif"],	["睡", "[/shui]", "shui.gif"],
		["大哭", "[/dk]", "dk.gif"],		["尴尬", "[/gg]", "gg.gif"],		["发怒", "[/fn]", "fn.gif"],	["调皮", "[/tp]", "tp.gif"],	["呲牙", "[/cy]", "cy.gif"],
		["惊讶", "[/jy]", "jy.gif"],		["难过", "[/ng]", "ng.gif"],		["酷酷", "[/kuk]", "kuk.gif"],	["冷汗", "[/lengh]", "lengh.gif"],["抓狂", "[/zk]", "zk.gif"],
		["吐", "[/tuu]", "tuu.gif"],		["偷笑", "[/tx]", "tx.gif"],		["可爱", "[/ka]", "ka.gif"],	["白眼", "[/baiy]", "baiy.gif"],["傲慢", "[/am]", "am.gif"],
		["饥饿", "[/jie]", "jie.gif"],		["困", "[/kun]", "kun.gif"],		["惊恐", "[/jk]", "jk.gif"],	["流汗", "[/lh]", "lh.gif"],	["憨笑", "[/hanx]", "hanx.gif"],
		["大兵", "[/db]", "db.gif"],		["奋斗", "[/fendou]", "fendou.gif"],["咒骂", "[/zhm]", "zhm.gif"],	["疑问", "[/yiw]", "yiw.gif"],	["嘘", "[/xu]", "xu.gif"],
		["晕", "[/yun]", "yun.gif"],		["折磨", "[/zhem]", "zhem.gif"],	["衰", "[/shuai]", "shuai.gif"],["骷髅", "[/kl]", "kl.gif"],	["敲", "[/qiao]", "qiao.gif"],
		["再见", "[/zj]", "zj.gif"],		["擦汗", "[/ch]", "ch.gif"],		["抠鼻", "[/kb]", "kb.gif"],	["鼓掌", "[/gz]", "gz.gif"],	["糗大了", "[/qd]", "qd.gif"],
		["坏笑", "[/huaix]", "huaix.gif"],	["左哼哼", "[/zhh]", "zhh.gif"],	["右哼哼", "[/yhh]", "yhh.gif"],["哈欠", "[/hq]", "hq.gif"],	["鄙视", "[/bs]", "bs.gif"],
		["委屈", "[/wq]", "wq.gif"],		["快哭了", "[/kk]", "kk.gif"],		["阴险", "[/yx]", "yx.gif"],	["亲亲", "[/qq]", "qq.gif"],	["吓", "[/xia]", "xia.gif"],
		["可怜", "[/kel]", "kel.gif"],		["菜刀", "[/cd]", "cd.gif"],		["刀", "[/dao]", "dao.gif"],	["玫瑰", "[/mg]", "mg.gif"],	["凋谢", "[/dx]", "dx.gif"],
		["西瓜", "[/xig]", "xig.gif"],		["啤酒", "[/pj]", "pj.gif"],		["蛋糕", "[/dg]", "dg.gif"],	["咖啡", "[/kf]", "kf.gif"],	["饭", "[/fan]", "fan.gif"],
		["示爱", "[/sa]", "sa.gif"],		["心", "[/xin]", "xin.gif"],		["心碎", "[/xs]", "xs.gif"],	["闪电", "[/shd]", "shd.gif"],	["炸弹", "[/zhd]", "zhd.gif"],
		["猪头", "[/zt]", "zt.gif"],		["瓢虫", "[/pch]", "pch.gif"],		["便便", "[/bb]", "bb.gif"],	["太阳", "[/ty]", "ty.gif"],	["月亮", "[/yl]", "yl.gif"],
		["礼物", "[/lw]", "lw.gif"],		["拥抱", "[/yb]", "yb.gif"],		["足球", "[/zq]", "zq.gif"],	["篮球", "[/lq]", "lq.gif"],	["乒乓", "[/pp]", "pp.gif"]
	],
	showFace: function(txt){
		var faces = this.faces;
		if(typeof txt != 'string'){
			return;
		}
		for(var i = 0; i < faces.length; i ++){
			txt = txt.replace(/((\[)[^\s]+?(\]))/g,function(match){
				if(match==faces[i][1]){
					return '<img width="24" height="24" src="http://img.scimg.cn/expression/default/'+faces[i][2]+'" alt="' + faces[i][0] + '" title="' + faces[i][0] + '" />';//faces[i][2];
				}
				else{ 
					return match;
				}
			});
		}
		return txt;
	},
	showBold: function(txt){
		if(typeof txt != 'string'){
			return;
		}
		txt = txt.replace(/\[[b]\]/ig,"<b>").replace(/\[\/[b]\]/ig,"</b>")
				 .replace(/\[[i]\]/ig,"<i>").replace(/\[\/[i]\]/ig,"</i>")
				 .replace(/\[color=(\w+)\]/ig,"<font color='$1'>").replace(/\[\/color\]/ig,"</font>")
				 .replace(/\[img\]([\s\S]*?)\[\/img\]/ig,"<img src='$1' />")
				 .replace(/\[url=([\s\S]*?)\]\[\/url\]/ig,"$1")
				 .replace(/\[url\]([\s\S]*?)\[\/url\]/ig,"$1")
				 .replace(/\[url=([\s\S]*?)\]([\s\S]*?)\[\/url\]/ig,"$2");
		return txt;
	},

	showBoldAndUrl: function(txt){
		if(typeof txt != 'string'){
			return;
		}
		txt = txt.replace(/\[[b]\]/ig,"<b>").replace(/\[\/[b]\]/ig,"</b>")
				 .replace(/\[[i]\]/ig,"<i>").replace(/\[\/[i]\]/ig,"</i>")
				 .replace(/\[color=(\w+)\]/ig,"<font color='$1'>").replace(/\[\/color\]/ig,"</font>")
				 .replace(/\[img\]([\s\S]*?)\[\/img\]/ig,"<img src='$1' />")
				 .replace(/\[url=([\s\S]*?)\]\[\/url\]/ig,"<a href='$1' target='_blank'>$1</a>")
				 .replace(/\[url\]([\s\S]*?)\[\/url\]/ig,"<a href='$1' target='_blank'>$1</a>")
				 .replace(/\[url=([\s\S]*?)\]([\s\S]*?)\[\/url\]/ig,"<a href='$1' target='_blank'>$2</a>");
		return txt;
	}
};

module.exports = msgtool;
})
define('swfobject', function(require, exports, module){
module.exports = function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();
    window.swfobject = module.exports;
});
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
	}
	
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
define('template', function(require, exports, module){	
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
	module.exports = Template;
});

/**
 * SSSC MESSAGE ON PAGE
 * include two important components: chat and message bar
 * Author DK
 *DATE: 2014-10-20
 */
define('messagebar', function(require, exports, module){

var Template = require('./template');
var swfobj = require('./swfobject');
var msgtool = require('./msgtool');
var MOP = {};
/**
 * SSSC SMS Const
 */

MOP.SMS_DOMAIN = "localhost";

MOP.SMS_TYPE_ID = {
	'0' : {title: '个人消息', id: 'sms'},
	'-1': {title: '拍卖通知', id: 'auction'},
	'-2': {title: '财务通知', id: 'finance'},
	'-3': {title: '交易通知', id: 'trade'},
	'-4': {title: '鉴定通知', id: 'jianding'},
	'-5': {title: '其他通知', id: 'bbs'},
	'-127': {title: '其他通知', id: 'bbs'}
};
MOP.SMS_TYPE = {
	'sms': 0,
	'auction': -1,
	'finance': -2,
	'trade': -3,
	'jianding': -4,
	'bbs': -5
};


MOP.ModelBase = function(options){
	this._initModelBase(options);
    this.unloadGoodsInfo = [];
};

MOP.ModelBase.prototype = {
	_initModelBase: function(options){
		this.options = mix({
			'default': {}
		}, options);
		this.attributes = mix({}, this.options['default']);
		EventEmitter.call(this);
	},

	set: function(attr, value){
		this.attributes[attr] = value;
		this.emit("change:" + attr, {model: this, value: value});
	},

	get: function(attr){
		return this.attributes[attr];
	}
};

extend(MOP.ModelBase, EventEmitter);

MOP.MsgModel = function(options){
	this._initMsgModel(options);
};
MOP.MsgModel.prototype = {
	_initMsgModel: function(options){
		MOP.ModelBase.call(this, options);
		this.options = mix({
			'default': {
                currentPointer: 0
            }
		}, options);
		this.chatSessions = {};
		this.chatSessionsArray = [];
	},

	sessionExist: function(sessionId){
		return !!this.chatSessions[sessionId];
	},

	getSessionLength: function(){
		return this.chatSessionsArray.length;
	},

	addSession: function(userInfo){
		if(userInfo.sessionId){
			this.chatSessions[userInfo.sessionId] = userInfo;
			this.chatSessionsArray.push(userInfo.sessionId);	
			this.emit('session:add', {
				sessionsArray: this.chatSessionsArray,
				sessions: this.chatSessions,
				session: userInfo
			});
			this.readMessageHistory(userInfo);
		}else{
			var self = this;
			this.readMessageHistory(userInfo, function(data){
				userInfo.sessionId = data.sessionId;
				this.chatSessions[userInfo.sessionId] = userInfo;
				this.chatSessionsArray.push(userInfo.sessionId);	
				this.emit('session:add', {
					sessionsArray: this.chatSessionsArray,
					sessions: this.chatSessions,
					session: userInfo
				});
			});
		}
	},

	removeSession: function(sessionId){
		delete this.chatSessions[sessionId];
		var index = indexOf(this.chatSessionsArray, sessionId);
		this.chatSessionsArray.splice(index, 1);
		this.emit('session:delete', {
			sessionsArray: this.chatSessionsArray,
			sessions: this.chatSessions 
		});
	},

	removeSessionByOrder: function(pointer){
		var sessionId = this.chatSessionsArray[pointer];
		delete this.chatSessions[sessionId];
		this.chatSessionsArray.splice(pointer, 1);
		this.emit('session:delete', {
			sessionsArray: this.chatSessionsArray,
			sessions: this.chatSessions 
		})
	},
    getSession: function(index){
        return this.chatSessions[this.chatSessionsArray[index]];
    },
    getCurrentSession: function(){
        var index = this.get('currentPointer');
        if(index !== undefined && index >= 0 && index < this.chatSessionsArray.length){
            return this.getSession(index);
        }else{
            return this.getSession(this.chatSessionsArray.length - 1);
        }
    },

	readMessageHistory: function(userInfo, fn){
		var self = this;
		$.ajax({
			dataType: 'jsonp',
			url: 'http://member.sssc.cn/message/ajax-get-msg?session_id=&page=1&begin_id=0&receiverIds=' + userInfo.senderUid + '&7658615395172941&callback=?',
			method: 'get',
			success: function(data){
				fn && fn(data);
                for(var i = 0, len = data.datas.length; i < len; i++){
                    var r = self.analyzeUrl(data.datas[i].message);
                    if(r){
                        data.datas[i].linkinfo = r;
                    }
                }
				self.emit('load:message', {
					messages: data,
					userInfo: userInfo
				});
			},
			error: function(){}
		});
	},
    analyzeUrl: function (message) {
        var regexpPai = /pai\.sssc\.cn\/(item)\/(\d+)/i;
        var regexpBbs = /bbs.sssc.cn\/thread-(\d+)-/i;
        var rp = regexpPai.exec(message);
        var rb = regexpBbs.exec(message);
        var result = null;
        if(rp){
            result = {
                type: rp[1],
                id: rp[2]
            };
        }
        if(rb){
            result = {
                type: 'tid',
                id: rb[1]
            };
        }
        if(result){
            var uuid = "li_" + Math.random().toString().replace('.', '');
            var parseResult = {
                uuid: uuid,
                type: result.type,
                id: result.id
            };
            this.unloadGoodsInfo.push(parseResult);
            return parseResult;
        }
        return false;
    },
    loadGoodsInfo: function(){
        while(this.unloadGoodsInfo.length > 0){
            this.loadPerGoodInfo(this.unloadGoodsInfo.pop());
        }

    },
    loadPerGoodInfo: function(info){
        var self = this;
        var url = 'http://member.sssc.cn/message/get-link-info?type=' + info.type + '&id=' + info.id + '&callback=?';
        $.ajax({
            dataType: 'jsonp',
            url: url,
            success: function(data){
                self.emit('load:goodsinfo', {
                    info: info,
                    data: data
                })
            }
        });
    },
	setMessage: function(key, value){
		if(key == 'sms'){
			//process chat window messages
			var msgs = [];
			var exCount = 0;
            var chatMsgs = {};
			for(var i = 0, len = value.length; i < len; i++){
				if(this.sessionExist(value[i].sessionId)){
                    //TODO: to be deleted
                    if(true || this.get('lastMessageId_' + value[i].sessionId) < value[i].id){
                        chatMsgs[value[i].sessionId] || (chatMsgs[value[i].sessionId] = []);
                        chatMsgs[value[i].sessionId].push(value[i]);
                        this.set('lastMessageId_' + value[i].sessionId, value[i].id);
                    }
					exCount++;
				}else{
					msgs.push(value[i]);
				}

			}
            this.emit('chat:message', {
                model: this,
                messages: chatMsgs,
                sessionsArray: this.chatSessionsArray
            })
			this.set('sms', msgs);
			this.set('totalCount', this.get('totalCount') - exCount);
		}else{
			this.set(key, value);
		}
	},
    // message {text: '', image: ''}
    sendMessage: function (message) {
        var self = this;
        var session = this.getCurrentSession();
        if(!session){
            console.log('undefined chat user');
            return;
        }
        //ajax send messages
        var url = 'http://member.sssc.cn/message/ajax-send-msg?receiverName=' + session.senderName
            + '&receivers=' + session.senderUid
            + '&session_id=' + session.sessionId
            + '&text=' + encodeURIComponent(message.text)
            + '&callback=?';
        if(message.image !== undefined && message.image != ''){
            url += '&uploadedFiles[0]=' + message.image;
        }

        $.ajax({
            dataType: 'jsonp',
            method: 'get',
            url: url,
            success: function(data){
                self.emit('sendcomplete:message', {model: this});
                if(!data.success){
                    alert(data.message);
                    return;
                }
                var img = "";
                if(data.images.length > 0){
                    img = data.images[0].thumb.replace('http://img.scimg.cn/userupload/messageimages/80x80/', '');
                }
                var chatmsg = {
                    senderUid: self.get('uid'),
                    senderName: '我',
                    text: data.text,
                    images: img,
                    sendTime: data.createdTime,
                    id: data.messageId
                };
                self.set('lastMessageId_' + session.sessionId, data.messageId);

                var messages = {};
                messages[session.sessionId] = [chatmsg];
                self.emit('chat:message', {
                    model: self,
                    messages: messages,
                    sessionsArray: self.chatSessionsArray
                });
            },
            error: function(){}
        });
    },

	clearAll: function(){

	},
	clearTarget: function(){
		
	},
	clearSession: function(sessionId){
		$.get('http://' + MOP.SMS_DOMAIN + '/n/clear?t='+Math.random()+'&sid=' + sessionId, function(){}, 'script');
	}
};
extend(MOP.MsgModel, MOP.ModelBase);

MOP.MsgStatusModel = function(){};
MOP.MsgStatusModel.prototype = {};

MOP.UIBase = function(options){
	this._initUIBase(options);
};
MOP.UIBase.prototype = {
	_initUIBase: function(options){
		this.options = mix({}, options);
        this.model = this.options.model;
		EventEmitter.call(this);	
	},
	initUI: function(){}
};
extend(MOP.UIBase, EventEmitter);



/**
 * Msg bar
 */

MOP.MsgBar = function(options){
	this._initMsgBar(options);	
};
MOP.MsgBar.prototype = {
	_initMsgBar: function(options){
		MOP.UIBase.call(this, mix({
			swfurl: 'new-msg.swf?'
		}, options));
		this.initUI();
		this.panel = $(this.bar);
		this.initEvents();
	},
	initUI: function(){
		var bar = this.bar = $c('div', null, 'msg-bar msgonpage');
		var bub = this.bub = $c('div', null, 'bub total');
		bub.innerHTML = "<i></i>";
		var bubNumber = this.bubNumber = $c('span');
		bub.appendChild(bubNumber);
		bubNumber.innerHTML = '0';
		var barItems = this.barItems = $c('ul', null, 'bar_items');
		var toggle = this.toggle = $c('div', null, 'toggle');
		bar.appendChild(bub);
		bar.appendChild(barItems);
		bar.appendChild(toggle);
		var flashContainer = this.flashContainer = $c('div', 'flashcontainer');
		flashContainer.style.cssText = 'width: 5px; height: 5px; bottom: -10px; position: absolute;';
		bar.appendChild(flashContainer);
		this.addFlash();	
	},
	initEvents: function(){
		var self = this;
		//toggle the bar status
		$(this.toggle).click(function(){
			$(self.barItems).toggle();
			$(self.bub).toggle();
			$(this).toggleClass('col');
		});
		this.options.model.on('change:totalCount', function(e){
			self.setCount(e.value);
		});
	},
	open: function(){

	},
	close: function(){

	},
	setCount: function(count){
		var displayCount = count;
		if(count > 99){
			displayCount = '99+';
		}
		this.bubNumber.innerHTML = displayCount;
	},

	getDom: function(){
		return this.bar;
	},

	addStatus: function(msgStatus){
		this.barItems.appendChild(msgStatus.getDom());
	},
	addFlash: function(){
		swfobj.embedSWF(this.options.swfurl,
			'flashcontainer', 
			'1',
			'1',
			'10');
	}
};
extend(MOP.MsgBar, MOP.UIBase);

MOP.MsgStatus = function(options){
	this._initMsgStatus(options);
};
MOP.MsgStatus.prototype = {
	_initMsgStatus: function(options){
		MOP.UIBase.call(this, mix({
			iconId: 1,
			title: '',
			smsType: '',
			clearNotice: '',
			checkInbox: ''
		}, options));
		this.templateHMLT = document.getElementById('tmpl_popwin').innerHTML;
		this.smslistTmpl = new Template(document.getElementById('tmpl_popwin_msg').innerHTML);
        this.active = false;

		this.initUI();
		this.panel = $(this.barItem);
		this.initEvents();
		this.updateList([]);
	},

	initUI: function(){
		var barItem = this.barItem = $c('li', null, 'i-' + this.options.iconId + ' bar_item');
		var barBtn = this.barBtn = $c('a', null, 'btn_bar');
		var bub = this.bub = $c('div', null, 'bub');
		bub.innerHTML = "<i></i>";
		var bubNumber = this.bubNumber = $c('span');
		bub.appendChild(bubNumber);
		var popwin = this.popwin = $c('div', null, 'popwin');
		barBtn.appendChild(bub);
		barItem.appendChild(barBtn);
		barItem.appendChild(popwin);
		var template = new Template(this.templateHMLT);
		popwin.innerHTML = template.render({title: this.options.title, clearNotice: this.options.clearNotice, checkInbox: this.options.checkInbox});
	},

	initEvents: function(){
		var self = this;
		//打开窗口
		$(this.barItem).click(function(){
			self.openBox();
		});
		//自动隐藏
		$(document).click(function(e){
            //console.log(e.target);
			if(e.target != self.popwin && !$.contains(self.popwin, e.target) && e.target != self.barBtn && !$.contains(self.barBtn, e.target)){
                if(self.active)
                    self.closeBox();
			}
		});
		//忽略所有信息
		this.panel.delegate('.ignore-ajax', 'click', function(e){
			e.preventDefault();
			self.updateList([]);
			self.showAdView();
			var url = this.href;
			self.emit('ignore', {});
			try{
				$.ajax({
					type: 'get',
					dataType: 'script',
					url : url + "&t=" + Math.random(),
					success: function(data, status, xhr){
					},
					error: function(){}
				});

				if(/type=-5/.test(url)){
					$.ajax({
						type: 'get',
						dataType: 'script',
						url: url.replace('-5', '-127') + '&t=' + Math.random(),
						success: function(){},
						error: function(){}
					})
				}
			}catch(ex){}
		});
		this.panel.delegate('.msg_txt', 'click', function(e){
			//message text click event	
			//console.log(this.getAttribute('type'));
			if(this.getAttribute('type') == '0'){
				//个人信息
				//显示聊天窗口，判断当前聊天的人数，最多支持3个人
				var sessionId = this.getAttribute('sessionid'),
					senduid = this.getAttribute('senduid'),
					sendname = this.getAttribute('sendname'),
					referLink = this.getAttribute('url');
				var userinfo = {
					sessionId: sessionId,
					senderUid: senduid,
					senderName: sendname,
					referLink: referLink
				};
				var model = self.options.model;
				if(model.sessionExist(sessionId)){
					alert('已存在会话,无法添加');
					return;
				}
				if(model.getSessionLength() >=3){
					alert('聊天人数已达到上限');
					return;
				}

				self.options.model.addSession(userinfo);
				//清除本会话下面的内容
				self.options.model.clearSession(sessionId);
				var deletedCount = self.panel.find('.sms_list li[sessionid="' + sessionId + '"]').length;

				self.panel.find('.sms_list li[sessionid="' + sessionId + '"]').remove();
				self.setCount(self.panel.find('.sms_list>li').length);
				self.options.model.set('totalCount', self.options.model.get('totalCount') - deletedCount);
			}else{
				//其他信息
				window.open(this.getAttribute('url'));
			}
			e.preventDefault();
			e.stopPropagation();
		});

		this.options.model.on('change:' + this.options.type, function(e){
			self.updateList(e.value);
		});
	},

	showAdView: function(){},
	hideAdView: function(){},

	openBox: function(){
		$(this.popwin).show();
		$(this.barBtn).addClass('highlight');
        this.active = true;
	},
	closeBox: function(){
		$(this.popwin).hide();
		$(this.barBtn).removeClass('highlight');
        this.active = false;
	},
	setCount: function(count){
		if(count > 99){
			this.bubNumber.innerHTML = '99+';	
		}else{
			this.bubNumber.innerHTML = count;
		}
		if(count > 0){
			$(this.bub).show();
			this.activeBtn();
		}else{
			$(this.bub).hide();
			this.disactiveBtn();
			this.hideAdView();
		}
	},
	activeBtn: function(){
		$(this.barBtn).addClass('active');
	},
	disactiveBtn: function(){
		$(this.barBtn).removeClass('active');
	},
	updateList: function(messages){
		for(var i = 0, len = messages.length; i < len; i++){
			if(!messages[i].senderName){
				messages[i].senderName = '系统';
			}
			messages[i].text = msgtool.showFace(msgtool.showBold(messages[i].text));
		}
		this.setCount(messages.length);
		this.panel.find('.sms_list').html(this.smslistTmpl.render({checkInbox: this.options.checkInbox,messages:messages}));
	},
	clearTarget: function(){},
	clearAll: function(){},
	getDom: function(){
		return this.barItem;
	}
};
extend(MOP.MsgStatus, MOP.UIBase);
//message on page UI
MOP.MsgUI = function(options){
	this._initMsgUI(options);
};
MOP.MsgUI.prototype = {
	_initMsgUI: function(options){
		this.options = mix({
			iframeurl: 'smscomet.html',
			model: null
		}, options);
		this.origTitle = document.title;
		this.msgBar = new MOP.MsgBar({
			model: this.options.model
		});
		this.status = {};
		this.status.sms = new MOP.MsgStatus({
			type: 'sms',
			title: '个人信息',
			iconId: 1,
			model: this.options.model
		});

		this.status.finance = new MOP.MsgStatus({
			type: 'finance',
			title: '财务通知',
			iconId: 2,
			model: this.options.model
		});
	
		this.status.auction = new MOP.MsgStatus({
			type: 'auction',
			title: '拍卖通知',
			iconId: 3,
			model: this.options.model
		});	
		this.status.trade = new MOP.MsgStatus({
			type: 'trade',
			title: '交易通知',
			iconId: 4,
			model: this.options.model
		});	
		this.status.bbs = new MOP.MsgStatus({
			type: 'bbs',
			title: '其他通知',
			iconId: 5,
			model: this.options.model
		});	
		this.status.jianding = new MOP.MsgStatus({
			type: 'jianding',
			title: '鉴定通知',
			iconId: 6,
			model: this.options.model
		});	
		for(var key in this.status){
			this.msgBar.addStatus(this.status[key]);
		}
		document.body.appendChild(this.msgBar.getDom());

		this.chatbox = new MOP.ChatBox({
			fnBarTemplate: document.getElementById('tmpl_fn_bar').innerHTML,
			model: this.options.model
		});

		document.body.appendChild(this.chatbox.getDom());
		this.addIfrmae();	
	},
	setScsms: function(){},
	addIfrmae: function(){
		try{
			var ui = this;
			var smsIframe = document.createElement('iframe');
			var smsiframeInit = false;
			smsIframe.onload = function(){
				if(smsiframeInit){
					return;
				}
				smsiframeInit = true;
				
				var iWindow = smsIframe.contentWindow;
				iWindow.scsms.regist(ui);
				ui.setScsms(iWindow.scsms);
			};

			smsIframe.onreadystatechange = function(){
				if(this.readyState == 'complete'){
					if(smsiframeInit){
						return;
					}
					smsiframeInit = true;
					
					var iWindow = smsIframe.contentWindow;
					iWindow.scsms.regist(ui);
					ui.setScsms(iWindow.scsms);
				}
			};
			smsIframe.charset = 'utf-8';
			smsIframe.src = this.options.iframeurl;
			smsIframe.width = 1;
			smsIframe.height = 1;
			smsIframe.style.position = 'absolute';
			smsIframe.style.left = '-100px';
			smsIframe.style.top = '-100px';
			document.body.appendChild(smsIframe);
		}catch(ex){}
	},
	//发送通知
	notify: function(messages, count){
		this.msgBar.setCount(count);

		for(var key in messages){
			//this.status[key].updateList(messages[key]);
			this.options.model.setMessage(key, messages[key]);
			this.options.model.set('totalCount', count);
		}
	},

	playSound: function(){
		try{
			var flashobj = document.getElementById('flashcontainer');
			//flashobj.Play();

		}catch(ex){}
	},

	updatePageTitle: function(totalCount){
		if(totalCount < 1){
			document.title = this.origTitle;
		}else{
			document.title = '(' + totalCount + ')' + this.origTitle;
		}
	}
};
//message on page chat box
MOP.ChatBox = function(options){
	this._initChatBox(options);
};
MOP.ChatBox.prototype = {
	_initChatBox: function(options){
		MOP.UIBase.call(this, mix({
			fnBarTemplate: '',
			faces: [
				["强", "[/qiang]", "qiang.gif"],	["弱", "[/ruo]", "ruo.gif"],		["握手", "[/ws]", "ws.gif"],	["胜利", "[/shl]", "shl.gif"],	["抱拳", "[/bq]", "bq.gif"],
				["勾引", "[/gy]", "gy.gif"],		["拳头", "[/qt]", "qt.gif"],		["差劲", "[/cj]", "cj.gif"],	["爱你", "[/aini]", "aini.gif"],["NO", "[/bu]", "bu.gif"],
				["YES", "[/hd]", "hd.gif"], 		["微笑", "[/wx]", "wx.gif"],		["撇嘴", "[/pz]", "pz.gif"],	["色", "[/se]", "se.gif"],		["发呆", "[/fd]", "fd.gif"],
				["得意", "[/dy]", "dy.gif"],		["流泪", "[/ll]", "ll.gif"],		["害羞", "[/hx]", "hx.gif"],	["闭嘴", "[/bz]", "bz.gif"],	["睡", "[/shui]", "shui.gif"],
				["大哭", "[/dk]", "dk.gif"],		["尴尬", "[/gg]", "gg.gif"],		["发怒", "[/fn]", "fn.gif"],	["调皮", "[/tp]", "tp.gif"],	["呲牙", "[/cy]", "cy.gif"],
				["惊讶", "[/jy]", "jy.gif"],		["难过", "[/ng]", "ng.gif"],		["酷酷", "[/kuk]", "kuk.gif"],	["冷汗", "[/lengh]", "lengh.gif"],["抓狂", "[/zk]", "zk.gif"],
				["吐", "[/tuu]", "tuu.gif"],		["偷笑", "[/tx]", "tx.gif"],		["可爱", "[/ka]", "ka.gif"],	["白眼", "[/baiy]", "baiy.gif"],["傲慢", "[/am]", "am.gif"],
				["饥饿", "[/jie]", "jie.gif"],		["困", "[/kun]", "kun.gif"],		["惊恐", "[/jk]", "jk.gif"],	["流汗", "[/lh]", "lh.gif"],	["憨笑", "[/hanx]", "hanx.gif"],
				["大兵", "[/db]", "db.gif"],		["奋斗", "[/fendou]", "fendou.gif"],["咒骂", "[/zhm]", "zhm.gif"],	["疑问", "[/yiw]", "yiw.gif"],	["嘘", "[/xu]", "xu.gif"],
				["晕", "[/yun]", "yun.gif"],		["折磨", "[/zhem]", "zhem.gif"],	["衰", "[/shuai]", "shuai.gif"],["骷髅", "[/kl]", "kl.gif"],	["敲", "[/qiao]", "qiao.gif"],
				["再见", "[/zj]", "zj.gif"],		["擦汗", "[/ch]", "ch.gif"],		["抠鼻", "[/kb]", "kb.gif"],	["鼓掌", "[/gz]", "gz.gif"],	["糗大了", "[/qd]", "qd.gif"],
				["坏笑", "[/huaix]", "huaix.gif"],	["左哼哼", "[/zhh]", "zhh.gif"],	["右哼哼", "[/yhh]", "yhh.gif"],["哈欠", "[/hq]", "hq.gif"],	["鄙视", "[/bs]", "bs.gif"],
				["委屈", "[/wq]", "wq.gif"],		["快哭了", "[/kk]", "kk.gif"],		["阴险", "[/yx]", "yx.gif"],	["亲亲", "[/qq]", "qq.gif"],	["吓", "[/xia]", "xia.gif"],
				["可怜", "[/kel]", "kel.gif"],		["菜刀", "[/cd]", "cd.gif"],		["刀", "[/dao]", "dao.gif"],	["玫瑰", "[/mg]", "mg.gif"],	["凋谢", "[/dx]", "dx.gif"],
				["西瓜", "[/xig]", "xig.gif"],		["啤酒", "[/pj]", "pj.gif"],		["蛋糕", "[/dg]", "dg.gif"],	["咖啡", "[/kf]", "kf.gif"],	["饭", "[/fan]", "fan.gif"],
				["示爱", "[/sa]", "sa.gif"],		["心", "[/xin]", "xin.gif"],		["心碎", "[/xs]", "xs.gif"],	["闪电", "[/shd]", "shd.gif"],	["炸弹", "[/zhd]", "zhd.gif"],
				["猪头", "[/zt]", "zt.gif"],		["瓢虫", "[/pch]", "pch.gif"],		["便便", "[/bb]", "bb.gif"],	["太阳", "[/ty]", "ty.gif"],	["月亮", "[/yl]", "yl.gif"],
				["礼物", "[/lw]", "lw.gif"],		["拥抱", "[/yb]", "yb.gif"],		["足球", "[/zq]", "zq.gif"],	["篮球", "[/lq]", "lq.gif"],	["乒乓", "[/pp]", "pp.gif"]
			],
			model: null
		}, options));

		this.initUI();
		this.persons = [];
		this.panel = $(this.chatBox);
        this.sessions = {};
		this.chattab = new MOP.SimpleTab({
			container: this.chatBox,
			tab: '.footer ul li',
			content: '.content>ul',
			selectClass: 'active'
		});
		new MOP.SimpleTab({
			container: $(this.chatBox).find('.pop.smile'),
			tab: '.tab a',
			content: 'ul li',
			selectClass: 'active'
		});

        this.initEvents();
		var self = this;
        //TODO: need to include the image uploader component


	},
	initUI: function(){
		var chatBox = this.chatBox = $c('div', null, 'chatbox msgonpage');
		var title = $c('div', null, 'title');
		var t1 = document.createTextNode('正在与');
		var t2 = document.createTextNode('聊天');
		var targetPer = this.targetPer = $c('span');
		var btnClose = this.btnClose = $c('a', null, 'btn_close');
		title.appendChild(t1);
		title.appendChild(targetPer);
		title.appendChild(t2);
		title.appendChild(btnClose);
		var content = this.content = $c('div', null, 'content');
		//var msgList = this.msgList = $c('ul');
		//content.appendChild(msgList);
		var fnBar = $c('div', null, 'fn_bar');
		var tmpl = new Template(this.options.fnBarTemplate);
		fnBar.innerHTML = tmpl.render({faces: this.options.faces});
		var msgBox = $c('div', null, 'msgbox');
		var msgTextarea = this.msgTextarea = $c('textarea', null, 'msg-content');
		msgBox.appendChild(msgTextarea);
		var footer = $c('div', null, 'footer');
		var toUserList = this.toUserList = $c('ul');
		var btnSend = this.btnSend = $c('div', null, 'btn_send');
		btnSend.innerHTML = ('发送');
		footer.appendChild(toUserList);
		footer.appendChild(btnSend);


		chatBox.appendChild(title);
		chatBox.appendChild(content);
		chatBox.appendChild(fnBar);
		chatBox.appendChild(msgBox);
		chatBox.appendChild(footer);

	},
	initEvents: function(){
		var self = this;
		self.lastPop = null;
        /*
		this.panel.find('.btnbox .ico').click(function(e){
			if(self.lastPop != this && self.lastPop){
				//self.panel.find('.btnbox .pop').hide();
				$(self.lastPop.parentNode).find('.pop').hide();
				$(self.lastPop).removeClass('active');
			}
			$(this.parentNode).find('.pop').toggle();
			$(this).toggleClass('active');
			self.lastPop = this;
		});
		*/
        this.panel.find('.fn_bar .btnbox .ico.phrase').click(function (e) {
            if(self.lastPop != this && self.lastPop){
				//self.panel.find('.btnbox .pop').hide();
				$(self.lastPop.parentNode).find('.pop').hide();
				$(self.lastPop).removeClass('active');
			}
			$(this.parentNode).find('.pop').toggle();
			$(this).toggleClass('active');
			self.lastPop = this;
        });
        this.panel.find('.fn_bar .btnbox .ico.smile').click(function (e) {
            if(self.lastPop != this && self.lastPop){
				//self.panel.find('.btnbox .pop').hide();
				$(self.lastPop.parentNode).find('.pop').hide();
				$(self.lastPop).removeClass('active');
			}
			$(this.parentNode).find('.pop').toggle();
			$(this).toggleClass('active');
			self.lastPop = this;
        });
        this.panel.find('.fn_bar .btnbox.uploadimg').hover(function(){
            if($(this).find('.pop input').length == 0){
                return;
            }
            $(this).find('.pop').show();
        }, function(){
            $(this).find('.pop').hide();
        });
		//表情事件
		this.panel.find('.fn_bar .btnbox .pop.smile').delegate('ul span a', 'click',function(e){
			self.addText(this.hash.substr(1));
			self.panel.find('.fn_bar .btnbox .pop.smile').hide();
			self.panel.find('.fn_bar .btnbox .ico.smile').removeClass('active');
			e.preventDefault();
		});
		//快捷短语
		this.panel.find('.fn_bar .btnbox .pop.phrase').delegate('li', 'click', function(){
			self.addText(this.innerHTML);
			self.panel.find('.fn_bar .btnbox .pop.phrase').hide();
			self.panel.find('.fn_bar .btnbox .ico.phrase').removeClass('active');
		});
        this.panel.find('.fn_bar .btnbox .ico.uploadimg').click(function(e){
            //TODO: to be completed
            var self = this;
            if(this.fileUploadStatus){
                openFileUploader();
                return;
            }
            console.log('upload img');
            var version = '1.1';
            jQuery('head').append('<link rel="stylesheet" href="http://img.scimg.cn/styles/jquery-ui/jquery-ui.css" type="text/css" media="all" />');
            if(typeof jQuery.fn.ajaxSubmit == 'undefined'){
                jQuery(document).append("<scrip"+"t type=\"text/javascript\" src=\"http://img.scimg.cn/javascripts/member/jquery.form-2.40.js?" + version + "\" charset=\"utf-8\"></s"+"cript>");
            }
            $.getScript('http://img.scimg.cn/javascripts/jquery/jquery-ui.js', function(){
                $.ajax({
                    dataType: 'script',
                    type: 'get',
                    url: 'js/file-uploader.js',
                    success: function(){
                        self.fileUploadStatus = true;
                        console.log('load script');
                        openFileUploader();
                    }
                })
            });

        });
        //send message event
		$(this.btnSend).click(function(){
			//handle send message event
            var content = $.trim(self.msgTextarea.value);
            if(content == ''){
                alert('回复内容不能为空');
            }
            var image = self.panel.find('.pop.uploadimg input').val()
            self.model.sendMessage({
                text: content,
                image: image
            });
            console.log(self.model.getCurrentSession());
		});
		//tab close btn
		$(this.toUserList).delegate('li i.ico.close', 'click', function(){
			var pointer = this.parentNode.tabindex;
			$(self.content).find('>ul').eq(pointer).remove();
			$(this.parentNode).remove();	
			self.chattab.buildTabStatus();
			self.options.model.removeSessionByOrder(pointer);
			if(self.options.model.getSessionLength() == 0){
				self.hide();
			}
			//console.log(self.options.model.chatSessionsArray);
		});
        this.chattab.on('show', function(e){
			//console.log(self.persons[e.index]);
			self.setTitle(self.persons[e.index].senderName);
            self.model.set('currentPointer', e.index);
		});
		//添加聊天对象事件
		this.model.on('session:add', function(e){
			if(self.options.model.getSessionLength() == 1){
				self.show();
			}
			self.addChatPerson(e.session);		
		});
        this.model.on('load:message', function(e){
            var sessionId = e.messages.sessionId;
            self.sessions[sessionId].list.innerHTML = "加载完成";
            //TODO: need to make template variable to be global
            var tmpl = new Template(document.getElementById('tmpl_chat_item').innerHTML);
            self.sessions[sessionId].list.innerHTML = tmpl.render({messages: e.messages.datas, uid: self.model.get('uid'), process: function(txt){
                    return msgtool.showBoldAndUrl(msgtool.showFace(txt));
                }});
            self.model.set("lastMessageId_" + sessionId, e.messages.datas[e.messages.datas.length - 1].id);
            self.scrollToBottom();
            //TODO: process insite url for pai and bbs trade
            self.model.loadGoodsInfo();
        });
        this.model.on('chat:message', function(e){
            //TODO: need to make template variable to be global
            var tmpl = new Template(document.getElementById('tmpl_chat_item_per').innerHTML);
            for(var key in e.messages){
                self.sessions[key].list.innerHTML += tmpl.render({messages: e.messages[key], uid: self.model.get('uid'), process: function(txt){
                    return msgtool.showBoldAndUrl(msgtool.showFace(txt));
                }});
                self.scrollToBottom();

                var pointer = indexOf(e.sessionsArray, key);
                if(!$(self.sessions[key].tab).hasClass('active')){
                    $(self.sessions[key].tab).addClass('highlight');
                }
            }

            //TODO: process insite url for pai and bbs trade
        });
        this.model.on('load:goodsinfo', function (e) {
            var tmpl = new Template(document.getElementById('tmpl_goods').innerHTML);
            console.log(e);
            $('#' + e.info.uuid).html(tmpl.render(e.data));
        })
        this.model.on('sendcomplete:message', function(e){
            self.msgTextarea.value = '';
            self.panel.find('.pop.uploadimg').html('');
        });
		$(this.btnClose).click(function(){
			self.hide();
		});
	},
    scrollToBottom: function (list) {
        this.content.scrollTop = this.content.scrollHeight;
    },
	//person {senderName: '', senderUid: ''}
	addChatPerson: function(person){
		this.persons.push(person);
		var li = $c('li', null, '');
		li.sessionid = person.sessionId;
		li.innerHTML = '<span>' + person.senderName + '</span><i class="ico close">x</i>';
		this.toUserList.appendChild(li);
		var msglist = $c('ul');
		msglist.innerHTML = '消息记录读取中...';
		this.content.appendChild(msglist);
		this.chattab.buildTabStatus();

		this.sessions[person.sessionId] = {
			list: msglist,
            tab: li
		};
	},
	setTitle: function(value){
		this.targetPer.innerHTML = value;
	},
	addText: function(value){
		this.msgTextarea.value += value;
		this.msgTextarea.focus();
	},

	show: function(){
		$(this.chatBox).show();
	},

	hide: function(){
		$(this.chatBox).hide();
	},

	getDom: function(){
		return this.chatBox;
	}
};
extend(MOP.ChatBox, MOP.UIBase);

MOP.SimpleTab = function(options){
	this._initSimpleTab(options);	
};
MOP.SimpleTab.prototype = {
	_initSimpleTab: function(options){
		EventEmitter.call(this);
		this.options = mix({
			container: '',
			tab: '',
			content: '',
			fireevent: 'click',
			selectClass: 'select'
		}, options);
		this.selectedIndex = 0;
		this.total = 0;
		this.panel = $(this.options.container);
		this.buildTabStatus();
		this.initUI();
		this.initEvents();
	},
	initUI: function(){
		//this.buildTabStatus();
		this.show(0);
	},
	buildTabStatus: function(){
		var self = this;
		this.total = 0;
		this.panel.find(this.options.tab).each(function(index){
			this.tabindex = index;
			self.total++;
		});
		this.panel.find(this.options.content).hide();
		(this.total > 0) && this.show(this.total - 1);
	},
	initEvents: function(){
		var self = this;
		this.panel.delegate(this.options.tab, this.options.fireevent, function(e){
			var index = this.tabindex;
            $(this).removeClass('highlight');
			self.emit('tabselect', {index: index});
			self.show(index);
		})
	},
	show: function(index){
		var o = this.options;
		this.panel.find(o.tab + ':eq(' + this.selectedIndex + ')').removeClass(o.selectClass);
		this.panel.find(o.tab + ':eq(' + index + ')').addClass(o.selectClass);
		this.panel.find(o.content + ':eq(' + this.selectedIndex + ')').hide();
		this.panel.find(o.content + ':eq(' + index + ')').show();
		var event = {
			prevIndex: this.selectedIndex, index: index
		};
		this.selectedIndex = index;
		this.emit('show', event);	
	}
};
extend(MOP.SimpleTab, EventEmitter);
module.exports = MOP;
});