var _gaq=[];

//登录表单验证
function checkHeaderLoginForm(myForm){
	if(myForm.username.value=="" || myForm.password.value=="" ) {
		alert("请填写用户名及密码!");
		return false;
	}
	jQuery('headerLoginReferer').value = escape(window.location.href);
	return true;
}
//加入收藏js脚本
function AddFavorite(){
	_gaq.push(['_trackEvent', 'Global_Nav_Usage', 'Add_Favorite']);
	if ( window.sidebar && "object" == typeof( window.sidebar ) && "function" == typeof( window.sidebar.addPanel ) ){
	//  firefox
	window.sidebar.addPanel( document.title, document.location.href, '' );
}else if ( document.all && "object" == typeof( window.external ) ){
//  ie
	window.external.addFavorite( document.location.href, document.title );
}}
//设为首页js脚本
function SetHome(obj,vrl){
	_gaq.push(['_trackEvent', 'Global_Nav_Usage', 'Set_As_Home']);
		try{
			obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
		}
		catch(err){
			if(window.netscape) {
		try {
			netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); 
		}catch (err) { 
			alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将[signed.applets.codebase_principal_support]设置为'true'"); 
		}
			var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
			prefs.setCharPref('browser.startup.homepage',vrl);
		}
	}
}

jQuery.cookie = function(name, value, options) {
	if (typeof value != 'undefined') { // name and value given, set cookie
		options = options || {};
		if (value === null) {
			value = '';
			options.expires = -1;
		}
		var expires = '';
		if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
		}
		// CAUTION: Needed to parenthesize options.path and options.domain
		// in the following expressions, otherwise they evaluate to undefined
		// in the packed version for some reason...
		var path = options.path ? '; path=' + (options.path) : '';
		var domain = options.domain ? '; domain=' + (options.domain) : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else { // only name given, get cookie
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};
jQuery(function(){
	if(jQuery("#he"+"aderL"+"U").length > 0){
		jQuery("#dol"+"ogin").click(function(){
			if(jQuery("#"+'lo'+'gin_h'+'um'+'an_cl'+'icked').length == 0){
				jQuery("#he"+"aderL"+"U").parent().append('<input type="hidden" id="lo'+'gin_h'+'um'+'an_cl'+'icked" name="lo'+'gin_h'+'um'+'an_cl'+'icked" value="1" />');
			}
		});
	}
	if(jQuery("#sclo"+"ginf"+"orm #us"+"ern"+"ame").length > 0){
		jQuery("#bt"+"n_cl"+"ic"+"k").click(function(){
			if(jQuery("#sclo"+"ginf"+"orm #"+'lo'+'gin_h'+'um'+'an_cl'+'icked').length == 0){
				jQuery("#sclo"+"ginf"+"orm").append('<input type="hidden" id="lo'+'gin_h'+'um'+'an_cl'+'icked" name="lo'+'gin_h'+'um'+'an_cl'+'icked" value="1" />');
			}
		});
	}
});
var globalMenu = {
	
	/* 定义子菜单 */
	'items' : {
		/* 名称跟要append进的id名称相同 */
		'navhomepage' : [
			{'text':'在线拍卖', 'title':'进入拍卖首页', 'url':'http://pai.sssc.cn/', 'class':'', 'display':'on', 'extra':''},
			{'text':'拍卖资讯', 'title':'最新的拍卖、成交、行情资讯', 'url':'http://www.sssc.cn/b/news/auction/', 'class':'', 'display':'on', 'extra':''},
			{'text':'拍卖预展', 'title':'拍卖场次在线预展及各大拍卖公司历年拍卖数据', 'url':'http://yz.sssc.cn', 'class':'', 'display':'on', 'extra':''},
			{'text':'行业新闻', 'title':'业内新闻纵览', 'url':'http://www.sssc.cn/b/news/specialty-news/archive/', 'class':'', 'display':'on', 'extra':''},
			{'text':'店铺首页', 'title':'盛世收藏店铺一条街', 'url':'http://shop.sssc.cn/', 'class':'', 'display':'on', 'extra':''},
			{'text':'知之频道', 'title':'进入知之，了解收藏那点事', 'url':'http://zlk.sssc.cn/', 'class':'', 'display':'on', 'extra':''},
			{'text':'盛世服务', 'title':'了解盛世收藏网为您提供的众多个性服务', 'url':'http://www.sssc.cn/b/news/service/major-service/archive/', 'class':'', 'display':'on', 'extra':'','rel':'nofollow'},
			{'text':'互动论坛', 'title':'进入论坛相互交流,查看藏友最新帖子和相互交流', 'url':'http://bbs.sssc.cn', 'class':'', 'display':'on', 'extra':''}
		],
		'navauction' : [
			{'text':'拍卖首页', 'title':'进入拍卖首页', 'url':'http://pai.sssc.cn/', 'class':'', 'display':'on', 'extra':''},
			{'text':'场次安排表', 'title':'查看场当年次安排表', 'url':'http://pai.sssc.cn/index/auction-list', 'class':'', 'display':'on', 'extra':'','rel':'nofollow'},
			{'text':'我关注的', 'title':'您关注的所有拍品', 'url':'http://pai.sssc.cn/index/watch-list', 'class':'', 'display':'on', 'extra':'','rel':'nofollow'},
			{'text':'我参与的', 'title':'您参与的拍卖', 'url':'http://pai.sssc.cn/index/my-items', 'class':'', 'display':'on', 'extra':'','rel':'nofollow'},
			{'text':'场次管理', 'title':'您的场次管理', 'url':'http://pai.sssc.cn/manage/auction-list', 'class':'', 'display':'on', 'extra':'','rel':'nofollow'},
			{'text':'拍卖帮助', 'title':'与拍卖相关的问题解答', 'url':'http://www.sssc.cn/b/help/', 'class':'hilight', 'display':'on', 'extra':'','rel':'nofollow'}
		],
		'navshop' : [
			{'text':'店铺首页', 'title':'店铺频道，汇集了全国各地的古玩藏家，海量藏品供您交流', 'url':'http://shop.sssc.cn', 'class':'', 'display':'on', 'extra':''},
			{'text':'所有店铺列表', 'title':'店铺列表', 'url':'http://shop.sssc.cn/all-shops', 'class':'', 'display':'on', 'extra':''},
			{'text':'所有藏品列表', 'title':'藏品列表', 'url':'http://shop.sssc.cn/products', 'class':'', 'display':'on', 'extra':''},
			{'text':'如何保证交易安全', 'title':'了解如何在交易交流中保证您的资金安全', 'url':'http://bbs.sssc.cn/faq.php?action=message&amp&id=67', 'class':'', 'display':'on', 'extra':'','rel':'nofollow'},
			{'text':'信誉实体店', 'title':'信誉实体是由盛世收藏网官方认证的实体店铺，点击了解。', 'url':'http://shop.sssc.cn/recommended/list', 'class':'', 'display':'on', 'extra':''},
			{'text':'店铺手册', 'title':'如何将店铺经营的更好，请点此查看店铺营销手册', 'url':'http://bbs.sssc.cn/viewthread.php?tid=183938&amp;extra=page%3D1', 'class':'hilight', 'display':'on', 'extra':'','rel':'nofollow'}
		],
		'navinfo' : [
			{'text':'资讯首页', 'title':'进入资讯首页，查看海量收藏资讯。', 'url':'http://www.sssc.cn/b/news/', 'class':'', 'display':'on', 'extra':''},
			{'text':'拍卖资讯', 'title':'帮助您获取最新的拍卖、成交、行情资讯', 'url':'http://www.sssc.cn/b/news/auction/', 'class':'', 'display':'on', 'extra':''},
			{'text':'古玩知识', 'title':'业内新闻纵览', 'url':'http://www.sssc.cn/b/news/specialty-news/archive/', 'class':'', 'display':'on'},
			{'text':'投资行情', 'title':'市场投资行情及趋势分析', 'url':'http://www.sssc.cn/b/news/investment/archive/', 'class':'', 'display':'on', 'extra':''},
			//{'text':'文化历史', 'title':'文化历史', 'url':'http://www.sssc.cn/b/news/auction/history-news/archive/', 'class':'', 'display':'on', 'extra':''},
			{'text':'拍卖预展', 'title':'这里为您收集了最新的拍卖场次在线预展及各大拍卖公司历年拍卖数据', 'url':'http://yz.sssc.cn', 'class':'hilight', 'display':'on', 'extra':''},
			{'text':'人物专访', 'title':'业界高端人物访谈，帮您了解他们都想些什么。', 'url':'http://www.sssc.cn/b/news/auction/personage/archive/', 'class':'', 'display':'on', 'extra':''},
			{'text':'考古研究', 'title':'考古研究界的奇闻趣事', 'url':'http://www.sssc.cn/b/news/archaeology/archive/', 'class':'', 'display':'on', 'extra':''},
			{'text':'教育培训', 'title':'教育培训资讯', 'url':'http://www.sssc.cn/b/news/training/archive/', 'class':'', 'display':'on', 'extra':''},
			{'text':'品牌专区', 'title':'品牌专区', 'url':'http://www.sssc.cn/b/news/auction/brand/archive/', 'class':'', 'display':'on', 'extra':''},
			{'text':'盛世服务', 'title':'了解盛世收藏网为您提供的众多个性服务', 'url':'http://www.sssc.cn/b/news/service/major-service/archive/', 'class':'hilight', 'display':'on', 'extra':'target="_blank"','rel':'nofollow'}
		],
		'navwiki' : [
			{'text':'知之首页', 'title':'知之，可以帮助您了解收藏行内常用的名词术语，您也可以将您知道的知识发出来，与大家分享...', 'url':'http://zlk.sssc.cn/', 'class':'', 'display':'on'},
			{'text':'收藏品|艺术品', 'title':'收藏品|艺术品', 'url':'http://zlk.sssc.cn/3/', 'class':'', 'display':'on', 'extra':''},
			{'text':'术语', 'title':'收藏专业术语', 'url':'http://zlk.sssc.cn/48/', 'class':'', 'display':'on', 'extra':''},
			{'text':'人物', 'title':'艺术家、收藏人物、工匠', 'url':'http://zlk.sssc.cn/4/', 'class':'', 'display':'on', 'extra':''},
			{'text':'历史及文化', 'title':'历史、文化', 'url':'http://zlk.sssc.cn/5/', 'class':'', 'display':'on', 'extra':''},
			{'text':'市场|机构', 'title':'收藏交流市场、机构', 'url':'http://zlk.sssc.cn/6/', 'class':'', 'display':'on', 'extra':''},
			{'text':'书籍', 'title':'著作、资料、出版物', 'url':'http://zlk.sssc.cn/15/', 'class':'', 'display':'on'},
			{'text':'法律规章', 'title':'法律、规章', 'url':'http://zlk.sssc.cn/132/', 'class':'', 'display':'on', 'extra':''},
			{'text':'词条分类', 'title':'词条分类查看', 'url':'http://zlk.sssc.cn/index.php?category', 'class':'', 'display':'on', 'extra':'','rel':'nofollow'},
			{'text':'热点词条', 'title':'热点词条查看', 'url':'http://zlk.sssc.cn/index.php?list-hotdoc.html', 'class':'', 'display':'on', 'extra':'','rel':'nofollow'},
			{'text':'最新词条', 'title':'最新词条查看', 'url':'http://zlk.sssc.cn/index.php?list-recentdoc.html', 'class':'', 'display':'on', 'extra':'','rel':'nofollow'}
		],
		'navblog' : [
			{'text':'博客', 'title':'博客,暂时未开通', 'url':'http://blog.sssc.cn/', 'class':'', 'display':'off', 'extra':''}
		],
		'navdajia' : [
			{'text':'大家首页', 'title':'大家首页', 'url':'http://dajia.sssc.cn/', 'class':'', 'display':'on'},
			{'text':'网友动态', 'title':'网友动态', 'url':'http://dajia.sssc.cn/home.php?mod=exhibition&do=new_feeds', 'class':'', 'display':'on', 'extra':'','rel':'nofollow'},
			{'text':'最新图集', 'title':'最新图集', 'url':'http://dajia.sssc.cn/home.php?mod=exhibition&do=new_albums', 'class':'', 'display':'on', 'extra':''},
			{'text':'最新观点', 'title':'最新观点', 'url':'http://dajia.sssc.cn/home.php?mod=exhibition&do=new_articles&type=1', 'class':'', 'display':'on', 'extra':''},
			{'text':'热门图集', 'title':'热门图集', 'url':'http://dajia.sssc.cn/home.php?mod=exhibition&do=hot_albums', 'class':'', 'display':'on', 'extra':''},
			{'text':'热门观点', 'title':'推荐观点', 'url':'http://dajia.sssc.cn/home.php?mod=exhibition&do=hot', 'class':'', 'display':'on', 'extra':''},
			{'text':'焦点图', 'title':'焦点图', 'url':'http://dajia.sssc.cn/home.php?mod=exhibition&do=hot_pics', 'class':'', 'display':'on', 'extra':''},
			{'text':'大家目录', 'title':'大家目录', 'url':'http://dajia.sssc.cn/home.php?mod=exhibition&do=users', 'class':'', 'display':'on', 'extra':''}
		],
		'navforum' : [
			{'text':'论坛首页', 'title':'论坛首页', 'url':'http://bbs.sssc.cn', 'class':'', 'display':'on'},
			{'text':'帖子', 'title':'查看您所发布的所有主题及回复', 'url':'http://bbs.sssc.cn/forum.php?mod=guide&view=my', 'class':'', 'display':'on', 'extra':'','rel':'nofollow'},
			{'text':'@提到我', 'title':'查看提到您的帖子', 'url':'http://bbs.sssc.cn/forum.php?mod=guide&view=my&type=scatme', 'class':'', 'display':'on', 'extra':'','rel':'nofollow'},
			{'text':'收藏', 'title':'查看收藏的文章', 'url':'http://bbs.sssc.cn/home.php?mod=space&do=favorite&view=me', 'class':'', 'display':'on', 'extra':'','rel':'nofollow'},
			{'text':'好友', 'title':'查看好友', 'url':'http://bbs.sssc.cn/home.php?mod=space&do=friend', 'class':'', 'display':'on', 'extra':'','rel':'nofollow'},
			{'text':'勋章', 'title':'勋章', 'url':'http://bbs.sssc.cn/home.php?mod=medal', 'class':'', 'display':'on', 'extra':'','rel':'nofollow'},	
			{'text':'任务', 'title':'任务', 'url':'http://bbs.sssc.cn/home.php?mod=task', 'class':'', 'display':'on', 'extra':'','rel':'nofollow'},	
			{'text':'搜索', 'title':'在论坛范围内精确搜索您感兴趣的内容', 'url':'http://bbs.sssc.cn/search.php?mod=forum', 'class':'', 'display':'on', 'extra':'','rel':'nofollow'},
			{'text':'论坛设置', 'title':'查看修改您的个人资料(不包含您银行账户信息修改)，例如登录密码、头像、联系方式等', 'url':'http://bbs.sssc.cn/home.php?mod=spacecp', 'class':'', 'display':'on', 'extra':'','rel':'nofollow'}
		]
	},

	'turnOffItem' : function(name, index) {
		globalMenu.items[name][index].display = 'off';
	},

	/* 将子菜单附加至页面 */
	'appendMenuItems' : function() {
		for (layer1 in globalMenu.items) {
			var string = '';
			string += '<p>';
			for (layer2 in globalMenu.items[layer1]) {
				if (globalMenu.items[layer1][layer2].display=='on') {
					if(typeof(globalMenu.items[layer1][layer2].rel) != "undefined" && globalMenu.items[layer1][layer2].rel =='nofollow'){
						var rel = 'rel="nofollow"';
					}else{
					    var rel = '';
					}
					string += '<a ' + rel + ' href="' + globalMenu.items[layer1][layer2].url + '"  class="'
					+ globalMenu.items[layer1][layer2]['class'] + ' " title=" '
					+ globalMenu.items[layer1][layer2].title + ' " ' + globalMenu.items[layer1][layer2].extra
					+ ' onclick="_gaq.push([\'_trackEvent\', \'Global_Nav_Usage\', \'Sub_Nav_Click\', \'' + globalMenu.items[layer1][layer2].text + '\']);">' + globalMenu.items[layer1][layer2].text +  '</a>';
				}
			}
			string += '</p>';
			jQuery('#' + layer1).append(string);
		}
		globalMenu.writeSearchBox();
		globalMenu.writeSitemap();
	}, /* End of writeMenu() */

	'writeSearchBox' : function() {
		var string = '';
		string += '<form action="http://zhannei.baidu.com/cse/search" method="get" target="_blank" class="bdcs-search-form" id="bdcs-search-form">';
		string += '<input type="hidden" name="s" value="17048826156321352137">';
		string += '<input type="hidden" name="entry" value="1">';
		string += '<table>';
		string += '<tbody>';
		string += '<tr>';
		string += '<td>';
		string += '<input class="text" type="text" name="q">';
		string += '</td>';
		string += '<td>';
		string += '<input type="submit" class="bdcs-search-form-submit button" id="bdcs-search-form-submit" value="搜索">';
		string += '</td>';
		string += '</tr>';
		string += '</tbody>';
		string += '</table>';
		string += '</form>';
		jQuery("#site-nav-search").html(string);
	},

	'writeSitemap' : function() {
		var string = '';
		string += '	<a id="site-map-button" href="javascript:void(0);" title="网站导航">网站导航</a>';
		string += '	<div id="site-map-content">';
		string += '		<dl id="news">';
		string += '			<dt>新闻/知识</dt>';
		string += '			<dd>';
		string += '				<b><a title="新闻及资讯" href="http://www.sssc.cn/b/news/">新闻及资讯</b></a>';
		string += '					<ul class="clearfix">';
		string += '						<li><a title="最新的拍卖、成交、行情资讯" href="http://www.sssc.cn/b/news/auction/">拍卖资讯</a></li>';
		string += '						<li><a title="业内新闻纵览" href="http://www.sssc.cn/b/news/specialty-news/archive/">行业新闻</a></li>';
		string += '						<li><a title="市场投资行情及趋势分析" href="http://www.sssc.cn/b/news/investment/archive/">投资行情</a></li>';
		string += '						<li><a title="最新的拍卖场次在线预展及各大拍卖公司历年拍卖数据" href="http://yz.sssc.cn">拍卖预展</a></li>';
		string += '						<li><a title="业界人物访谈" target="_blank" href="http://www.sssc.cn/b/news/auction/personage/archive/">人物专访</a></li>';
		string += '						<li><a title="考古研究界的奇闻趣事" href="http://www.sssc.cn/b/news/archaeology/archive/">考古研究</a></li>';
		string += '						<li><a title="教育培训资讯" href="http://www.sssc.cn/b/news/training/archive/">教育培训</a></li>';
		string += '						<li><a title="品牌专区" href="http://www.sssc.cn/b/news/auction/brand/archive/">品牌专区</a></li>';
		string += '						<li><a title="了解盛世收藏网为您提供的众多个性服务" href="http://www.sssc.cn/b/news/service/major-service/archive/" rel="nofollow">盛世服务</a></li>';
		string += '					</ul>';
		string += '				<b><a title="知之 (资料库)" href="http://zlk.sssc.cn">知之 (资料库)</b></a>';
		string += '					<ul class="clearfix">';
		string += '						<li><a title="收藏品、艺术品" href="http://zlk.sssc.cn/3/">收藏艺术</a></li>';
		string += '						<li><a title="收藏专业术语" href="http://zlk.sssc.cn/48/">专业术语</a></li>';
		string += '						<li><a title="艺术家、收藏人物、工匠" href="http://zlk.sssc.cn/4/">名家人物</a></li>';
		string += '						<li><a title="历史、文化" href="http://zlk.sssc.cn/5/">历史、文化</a></li>';
		string += '						<li><a title="收藏交流市场、机构" href="http://zlk.sssc.cn/6/">市场机构</a></li>';
		string += '						<li><a title="著作、资料、出版物" href="http://zlk.sssc.cn/15/">书籍资料</a></li>';
		string += '						<li><a title="法律、规章" href="http://zlk.sssc.cn/132/">法律规章</a></li>';
		string += '						<li><a title="词条分类" href="http://zlk.sssc.cn/index.php?category" rel="nofollow">词条分类</a></li>';
		string += '						<li><a title="热点词条" href="http://zlk.sssc.cn/index.php?list-hotdoc.html" rel="nofollow">热点词条</a></li>';
		string += '						<li><a title="最新词条" href="http://zlk.sssc.cn/index.php?list-recentdoc.html" rel="nofollow">最新词条</a></li>';
		string += '					</ul>';
		string += '			</dd>';
		string += '		</dl>';
		string += '		<dl id="action">';
		string += '			<dt>交易</dt>';
		string += '			<dd>';
		string += '				<b><a title="拍卖频道" href="http://pai.sssc.cn/">拍卖频道</a></b>';
		string += '					<ul class="clearfix">';
		string += '						<li><a title="场次安排" href="http://pai.sssc.cn/index/auction-list" rel="nofollow" >场次安排</a></li>';
		string += '						<li><a title="我关注的" href="http://pai.sssc.cn/index/watch-list" rel="nofollow" >我关注的</a></li>';
		string += '						<li><a title="我参与的" href="http://pai.sssc.cn/index/bidded-items" rel="nofollow"  >我参与的</a></li>';
		string += '						<li><a title="我赢得的" href="http://pai.sssc.cn/index/my-items" rel="nofollow">我赢得的</a></li>';
		string += '						<li><a title="场次管理" href="http://pai.sssc.cn/manage/auction-list" rel="nofollow" >场次管理</a></li>';
		string += '						<li><a title="拍卖帮助" href="http://bbs.sssc.cn/viewthread.php?tid=359399" rel="nofollow"  >拍卖帮助</a></li>';
		string += '					</ul>';
		string += '				<b><a title="店铺首页" href="http://shop.sssc.cn/">店铺频道</a></b>';
		string += '					<ul class="clearfix">';
		string += '						<li><a title="所有店铺列表" href="http://shop.sssc.cn/all-shops">所有店铺</a></li>';
		string += '						<li><a title="所有藏品列表" href="http://shop.sssc.cn/products">所有藏品</a></li>';
		string += '						<li><a title="了解如何保证交易安全" href="http://www.sssc.cn/a/20130314/136324928387398.shtml" rel="nofollow" >交易安全</a></li>';
		string += '						<li><a title="点击查看如何开店" href="http://www.sssc.cn/a/20110810/131296586751687.shtml" rel="nofollow"  >我要开店</a></li>';
		string += '						<li><a title="信誉实体店列表" href="http://shop.sssc.cn/recommended/list">信誉实体店</a></li>';
		string += '					</ul>';
		string += '			</dd>';
		string += '		</dl>';
		string += '		<dl id="group">';
		string += '			<dt>论坛</dt>';
		string += '			<dd>';
		string += '			<b>古代艺术类 </b>';
		string += '				<ul class="clearfix">';
		string += '					<li><a title="青铜艺术" href="http://bbs.sssc.cn/forum-351-1.html">青铜艺术</a></li>';
		string += '					<li><a title="古代兵器" href="http://bbs.sssc.cn/forum-1589-1.html">古代兵器</a></li>';
		string += '					<li><a title="铜镜专区" href="http://bbs.sssc.cn/forum-487-1.html">铜镜专区</a></li>';
		string += '					<li><a title="造像专区" href="http://bbs.sssc.cn/forum-486-1.html">造像专区</a></li>';
		string += '					<li><a title="铜炉专区" href="http://bbs.sssc.cn/forum-580-1.html">铜炉专区</a></li>';
		string += '					<li><a title="玺印封泥" href="http://bbs.sssc.cn/forum-357-1.html">玺印封泥</a></li>';
		string += '					<li><a title="墨盒刻铜" href="http://bbs.sssc.cn/forum-464-1.html">墨盒刻铜</a></li>';
		string += '					<li><a title="金银服饰" href="http://bbs.sssc.cn/forum-355-1.html">金银服饰</a></li>';
		string += '					<li><a title="契证徽章" href="http://bbs.sssc.cn/forum-619-1.html">契证徽章</a></li>';
		string += '					<li><a title="陶瓷艺术" href="http://bbs.sssc.cn/forum.php?gid=1624">陶瓷艺术</a></li>';
		string += '					<li><a title="玉翠珠宝" href="http://bbs.sssc.cn/forum.php?gid=1625">玉翠珠宝</a></li>';
		string += '					<li><a title="文房清玩" href="http://bbs.sssc.cn/forum-940-1.html">文房清玩</a></li>';
		string += '					<li><a title="瓦当石刻" href="http://bbs.sssc.cn/forum-1290-1.html">瓦当石刻</a></li>';
		string += '					<li><a title="牙角骨雕" href="http://bbs.sssc.cn/forum-1160-1.html">牙角骨雕</a></li>';
		string += '					<li><a title="传统字画" href="http://bbs.sssc.cn/forum-489-1.html">传统字画</a></li>';
		string += '					<li><a title="碑帖故纸" href="http://bbs.sssc.cn/forum-503-1.html">碑帖故纸</a></li>';
		string += '					<li><a title="木器家具" href="http://bbs.sssc.cn/forum-680-1.html">木器家具</a></li>';
		string += '					<li><a title="钱币邮卡" href="http://bbs.sssc.cn/forum.php?gid=695">钱币邮卡</a></li> ';
		string += '					<li><a title="香道茶道" href="http://bbs.sssc.cn/forum-1582-1.html">香道茶道</a></li> ';
		string += '				</ul>';
		string += '			<b>现代当代类 </b>';
		string += '				<ul class="clearfix">';
		string += '					<li><a title="绘画书法" href="http://bbs.sssc.cn/forum-1305-1.html">绘画书法</a></li>';
		string += '					<li><a title="架上艺术" href="http://bbs.sssc.cn/forum-1306-1.html">架上艺术</a></li>';
		string += '					<li><a title="雕塑装置" href="http://bbs.sssc.cn/forum-1307-1.html">雕塑装置</a></li>';
		string += '					<li><a title="影像艺术" href="http://bbs.sssc.cn/forum-1434-1.html">影像艺术</a></li>';
		string += '					<li><a title="紫砂鉴藏" href="http://bbs.sssc.cn/forum-1327-1.html">紫砂鉴藏</a></li>';
		string += '					<li><a title="钟表珍藏" href="http://bbs.sssc.cn/forum-1309-1.html">钟表珍藏</a></li>';
		string += '					<li><a title="名酒雪茄" href="http://bbs.sssc.cn/forum-1310-1.html">名酒雪茄</a></li>';
		string += '				</ul>';
		string += '			<b>全国藏友分会 </b>';
		string += '				<ul class="clearfix">';
		string += '					<li><a title="京津" href="http://bbs.sssc.cn/forum-1302-1.html">京津</a></li>';
		string += '					<li><a title="江浙" href="http://bbs.sssc.cn/forum-1339-1.html">江浙</a></li>';
		string += '					<li><a title="河北" href="http://bbs.sssc.cn/forum-1332-1.html">河北</a></li>';
		string += '					<li><a title="河南" href="http://bbs.sssc.cn/forum-1301-1.html">河南</a></li>';
		string += '					<li><a title="山东" href="http://bbs.sssc.cn/forum-1303-1.html">山东</a></li>';
		string += '					<li><a title="云贵滇藏" href="http://bbs.sssc.cn/forum-1311-1.html">云贵滇藏</a></li>';
		string += '					<li><a title="山西" href="http://bbs.sssc.cn/forum-1312-1.html">山西</a></li>';
		string += '					<li><a title="东北" href="http://bbs.sssc.cn/forum-1333-1.html">东北</a></li>';
		string += '					<li><a title="内蒙" href="http://bbs.sssc.cn/forum-1337-1.html">内蒙</a></li>';
		string += '					<li><a title="陕甘宁" href="http://bbs.sssc.cn/forum-1342-1.html">陕甘宁</a></li>';
		string += '				</ul>';
		string += '			<b>站务及其它</b>';
		string += '				<ul class="clearfix">';
		string += '					<li><a title="会员服务" href="http://bbs.sssc.cn/forum-367-1.html" rel="nofollow" >会员服务</a></li>';
		string += '					<li><a title="经济" href="http://bbs.sssc.cn/forum-1320-1.html">经济</a></li>';
		string += '					<li><a title="娱乐" href="http://bbs.sssc.cn/forum-107-1.html">娱乐</a></li>';
		string += '					<li><a title="站务" href="http://bbs.sssc.cn/forum-19-1.html">站务</a></li>';
		string += '					<li><a title="预展资讯" href="http://yz.sssc.cn">预展资讯</a></li>';
		string += '					<li><a title="投诉|黑名单" href="http://bbs.sssc.cn/forum-1334-1.html" rel="nofollow" >投诉|黑名单</a></li>';
		string += '				</ul>';
		string += '			</dd>';
		string += '		</dl>';
		string += '		<em id="close-sitemap">关闭站点导航</em>';
		string += '	</div>';
		jQuery("#site-map").append(string);
	}, /* End of writeSitemap() */

	'init' : function() {
		globalMenu.appendMenuItems();
		globalMenu.attachEvent();
	},

	'attachEvent' : function() {

		jQuery("#site-nav li.select").addClass("sfhover");

		jQuery("#site-nav li").mouseover(
			function () {
				jQuery("#site-nav li").removeClass("sfhover");
				jQuery(this).addClass("sfhover");
			}
		);

		jQuery("#site-head").mouseleave(function(){
			jQuery("#site-nav li").removeClass("sfhover");
			jQuery("#site-nav li.select").addClass("sfhover");
		});

		jQuery("#site-map-button").bind("mouseover", function(){
			jQuery("#site-map-button").addClass("select");
			jQuery("#site-map-content").addClass("select");
			jQuery("#site-map-content").fadeTo("fast", 0.95);
			_gaq.push(['_trackEvent', 'Global_Nav_Usage', 'Site_Map_Open']);
		});
		jQuery("#close-sitemap").bind("click", function(){
			jQuery("#site-map-content").hide()
			jQuery("#site-map-button").removeClass("select");
		});
		jQuery("#site-map").mouseleave(function(){
			jQuery("#site-map-content").hide()
			jQuery("#site-map-button").removeClass("select");
		});
		
		jQuery("#site-nav-search form").bind('submit', function(){
			_gaq.push(['_trackEvent', 'Global_Nav_Usage', 'Site_Search']);
		});
	}
}

/*
 * @Description: 图片延迟加载
 * @author dk
 */

var LazyLoad = {
	'options': {
		range: 20,
		elements: window.document.images,
		replaceImg: 'http://img.scimg.cn/images/common/lzimg.gif',
		laodingBg: 'http://img.scimg.cn/images/common/loader.gif',
		container: window,
		loadQueue: [],
		isStatic: true,
		onImageLoad: function(){}
	},
	pageDom: function(target){
		if(typeof target == 'string'){
			target = document.getElementById(target);
		}
		if (!target) {
			return null;
		}
		var left = 0, top = 0;
		do {
			left += target.offsetLeft || 0;
			top += target.offsetTop || 0;
			target = target.offsetParent;
		} while (target);
		return {
			left: left,
			top: top
		};
	},
	getScroll: function(){
		var scrollx, scrolly;
		if (typeof(window.pageXOffset) == 'number') {
			scrollx = window.pageXOffset;
			scrolly = window.pageYOffset;
		} else {
			scrollx = document.documentElement.scrollLeft;
			scrolly = document.documentElement.scrollTop;
		}
		return {left: scrollx, top: scrolly};
	},
	isResizing : false,
	init: function(option){
		var self =  this;
		for(var key in option){
			this.options[key] = option[key];
		}
		var elements = LazyLoad.options.elements;
		var visiableHeight = jQuery(window).height() + this.options.range;
		for(var i = 0, len = elements.length; i < len; i++){
			var img = elements[i];
			var pagedom = LazyLoad.pageDom(img);
			if(!img.getAttribute('realsrc'))
				continue;
			jQuery(img).load(function(e){
				self.options.onImageLoad({img: this});
			});
			if(pagedom.top > visiableHeight || !jQuery(img).is(':visible')){
				img.ly = pagedom.top;
				//if(pagedom.top > visiableHeight)
					this.options.loadQueue.push(img);
			}else{
				img.src = img.getAttribute('realsrc');
				img.removeAttribute('realsrc');
			}
		}
		
		setTimeout(function(){self.doload();}, 10);
		jQuery(this.options.container).bind('scroll', function(e){self.doload(e)});
		jQuery(this.options.container).bind('resize', function(e){self.resizeEvent(e)});
	},
	resizeEvent: function(){
		if(!LazyLoad.isResizing){
			LazyLoad.doload();
			LazyLoad.isResizing == true;
			LazyLoad.resizeTimer = setTimeout(function(){LazyLoad.isResizing = false;}, 500);
		}
	},
	doload: function(){
		var images = LazyLoad.options.loadQueue;
		var picCount = images.length;
		if(picCount > 0){
			var scrollY = LazyLoad.getScroll().top;
			var visibleHeight = scrollY + jQuery(window).height() + LazyLoad.options.range;
			for(var i = 0; i < picCount; i++){
				var img = images[i];
				if(!img) {
					continue;
				}
				var picCount = images.length;
				if(!this.options.isStatic){
					var pagedom = this.pageDom(img);
					img.ly = pagedom.top;
				}
				if(img.ly < visibleHeight && jQuery(img).is(':visible')){
					if(img.getAttribute('realsrc')){
						img.src = img.getAttribute('realsrc');
						img.removeAttribute('realsrc');
					}
					
					images.splice(i, 1);
				}
			}
		}else{
			jQuery(LazyLoad.options.container).unbind('scroll', this.doload);
			jQuery(LazyLoad.options.container).unbind('resize', this.resizeEvent);
		}
	},
	loadImages: function(images){
		for(var i = 0, len = images.length; i < len; i++){
			var img = images[i];
			if(!img.getAttribute('realsrc')){
				continue;
			}
			img.src = img.getAttribute('realsrc');
			img.removeAttribute('realsrc');
		}
	}
}
var result, regexp = /linkin=u-(\d+)/i;
if(regexp.test(window.location.href)){
	if(true || document.referrer != '' && !/\.sssc\.cn/i.test(document.referrer)){
		result = regexp.exec(window.location.href);
		result[1] = parseInt(result[1]);
		if(result[1] > 0){
			jQuery.ajax({
				url : 'http://bbs.sssc.cn/linkin.php?linkinuid=' + result[1] + '&url=' + encodeURIComponent(window.location.href) + '&referrer=' + encodeURIComponent(document.referrer)
			});
		}
	}
}