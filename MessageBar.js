/*************
MessageBar
	Bars
		BarItem
			updateCount
			openWin
			clearAll
			clearTarget
			showPopWin
			hidePopWin
			renderPopWin

	Toggle
		Open
		Close
		Shine
ChatWindow
	Tab
		AddTab
		CloseTab
	SmileWin
		Open
	UsefulExpWin
		Open
	UploadImagesWin
		Open
		Close
	HistoryBtn
		Open
******************/
define(function(require, exports, module){

var Template = require('./js/template');
var MOP = {};
MOP.ModelBase = function(options){
	this._initModelBase(options);
};

MOP.ModelBase.prototype = {
	_initModelBase: function(options){
		this.options = mix({}, options);
		this.attributes = {};
		EventEmitter.call(this);
	},

	set: function(attr, value){
		this.emit("change:" + attr, {model: this, value: value});
	},

	get: function(attr){

	}
};

extend(MOP.ModelBase, EventEmitter);

MOP.UIBase = function(options){
	this._initUIBase(options);
};
MOP.UIBase.prototype = {
	_initUIBase: function(){

	},
	initUI: function(){}
};

MOP.MsgBar = function(options){
	this._initMsgBar(options);	
};
MOP.MsgBar.prototype = {
	_initMsgBar: function(options){
		this.options = mix({}, options);
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

	},
	initEvents: function(){
		var self = this;
		$(this.toggle).click(function(){
			$(self.barItems).toggle();
			$(self.bub).toggle();
		});
	},
	open: function(){

	},
	close: function(){

	},
	setTotal: function(count){
		this.bubNumber.innerHTML = count;
	},

	getDom: function(){
		return this.bar;
	},

	addStatus: function(msgStatus){
		this.barItems.appendChild(msgStatus.getDom());
	}
};

MOP.MsgStatus = function(options){
	this._initMsgStatus(options);
};
MOP.MsgStatus.prototype = {
	_initMsgStatus: function(options){
		this.options = mix({
			iconId: 1,
			title: ''
		}, options);
		this.templateHMLT = '<div class="title">' + 
			'<?=this.title?>' + 
			'<div class="fn_btns"><a>清除通知</a><a>收件箱</a></div>' +
		'</div>' +
		'<div class="content">' +
			'<ul class="sms_list">' +
			'</ul>' +
		'</div>';
		this.initUI();
		this.initEvents();
	},

	initUI: function(){
		var barItem = this.barItem = $c('li', null, 'i-' + this.options.iconId + ' bar_item');
		var barBtn = this.barBtn = $c('a', null, 'btn_bar');
		var bub = $c('div', null, 'bub');
		bub.innerHTML = "<i></i>";
		var bubNumber = $c('span');
		bub.appendChild(bubNumber);
		var popwin = this.popwin = $c('div', null, 'popwin');
		barItem.appendChild(barBtn);
		barItem.appendChild(popwin);
		var template = new Template(this.templateHMLT);
		popwin.innerHTML = template.render({title: this.options.title});
	},

	initEvents: function(){
		var self = this;
		$(this.barItem).click(function(){
			self.openBox();
		});
		$(document).click(function(e){
			if(e.target != self.popwin && !$.contains(self.popwin, e.target) && e.target != self.barBtn && !$.contains(self.barBtn, e.target)){
				self.closeBox();
			}
		});
	},

	openBox: function(){
		$(this.popwin).show('normal');
		$(this.barBtn).addClass('highlight');
	},
	closeBox: function(){
		$(this.popwin).hide('fast');
		$(this.barBtn).removeClass('highlight');
	},
	setCount: function(count){
		this.bubNumber = count;	
	},
	activeBtn: function(){
		$(this.barBtn).addClass('active');
	},
	disactiveBtn: function(){
		$(this.barBtn).removeClass('active');
	},
	updateList: function(){

	},
	clearTarget: function(){},
	clearAll: function(){},
	getDom: function(){
		return this.barItem;
	}
};
//message on page UI
MOP.MsgUI = function(){
	this._initMsgUI();
};
MOP.MsgUI.prototype = {
	_initMsgUI: function(options){
		this.msgBar = new MOP.MsgBar();
		this.sPersonal = new MOP.MsgStatus({
			title: '个人信息',
			iconId: 1
		});

		this.sFinance = new MOP.MsgStatus({
			title: '财务通知',
			iconId: 2
		});
	
		this.sAuction = new MOP.MsgStatus({
			title: '拍卖通知',
			iconId: 3
		});	
		this.sTrade = new MOP.MsgStatus({
			title: '交易通知',
			iconId: 4
		});	
		this.sOther = new MOP.MsgStatus({
			title: '其他通知',
			iconId: 5
		});	
		this.sIndentify = new MOP.MsgStatus({
			title: '鉴定通知',
			iconId: 6
		});	
		this.msgBar.addStatus(this.sPersonal);
		this.msgBar.addStatus(this.sFinance);
		this.msgBar.addStatus(this.sAuction);
		this.msgBar.addStatus(this.sTrade);
		this.msgBar.addStatus(this.sOther);
		this.msgBar.addStatus(this.sIndentify);
		document.body.appendChild(this.msgBar.getDom());

		this.chatbox = new MOP.ChatBox({
			fnBarTemplate: document.getElementById('tmpl_fn_bar').innerHTML
		});

		document.body.appendChild(this.chatbox.getDom());
	},
	//发送通知
	notify: function(){

	},

	playSound: function(){},

	updatePageTitle: function(){}
};
//message on page chat box
MOP.ChatBox = function(options){
	this._initChatBox(options);
};
MOP.ChatBox.prototype = {
	_initChatBox: function(options){
		this.options = mix({
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
			]
		}, options);	

		this.initUI();
		this.persons = [];
		this.panel = $(this.chatBox);
		this.initEvents();
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
		var self = this;
		this.chattab.on('show', function(e){
			console.log(self.persons[e.index]);
			self.setTitle(self.persons[e.index].senderName);
		});
	},
	initUI: function(){
		var chatBox = this.chatBox = $c('div', null, 'chatbox msgonpage');
		var title = $c('div', null, 'title');
		var t1 = document.createTextNode('正在与');
		var t2 = document.createTextNode('聊天');
		var targetPer = this.targetPer = $c('span');
		var btnClose = $c('a', null, 'btn_close');
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

		$(this.btnSend).click(function(){
			//handle send message event
		});
		$(this.toUserList).delegate('li i.ico.close', 'click', function(){
			$(self.content).find('>ul').eq(this.parentNode.tabindex).remove();
			$(this.parentNode).remove();	
			self.chattab.buildTabStatus();
		});
	},
	//person {senderName: '', senderUid: ''}
	addChatPerson: function(person){
		this.persons.push(person);
		var li = $c('li', null, '');
		li.innerHTML = '<span>' + person.senderName + '</span><i class="ico close">x</i>';
		this.toUserList.appendChild(li);
		var msglist = $c('ul');
		msglist.innerHTML = person.senderName;
		this.content.appendChild(msglist);
		this.chattab.buildTabStatus();
	},
	setTitle: function(value){
		this.targetPer.innerHTML = value;
	},
	addText: function(value){
		this.msgTextarea.value += value;
		this.msgTextarea.focus();
	},

	getDom: function(){
		return this.chatBox;
	}
};

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
		this.show(this.total - 1);
	},
	initEvents: function(){
		var self = this;
		this.panel.delegate(this.options.tab, this.options.fireevent, function(e){
			var index = this.tabindex;
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