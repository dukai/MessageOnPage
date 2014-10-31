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
	},
	initUI: function(){
		var bar = this.bar = $c('div', null, 'msg-bar msgonpage');
		var bub = $c('div', null, 'bub');
		bub.innerHTML = "<i></i>";
		var bubNumber = $c('span');
		bub.appendChild(bubNumber);
		var barItems = this.barItems = $c('ul', null, 'bar_items');
		var toggle = $c('div', null, 'toggle');
		bar.appendChild(bub);
		bar.appendChild(barItems);
		bar.appendChild(toggle);

	},
	open: function(){

	},
	close: function(){

	},
	setTotal: function(count){

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
			fnBarTemplate: ''
		}, options);	

		this.initUI();
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
		fnBar.innerHTML = this.options.fnBarTemplate;
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
			}
			$(this.parentNode).find('.pop').toggle();
			self.lastPop = this;
		});
	},
	//person {senderName: '', senderUid: ''}
	addChatPerson: function(person){
		var li = $c('li', null, '');
		li.innerHTML = '<span>' + person.senderName + '</span><i class="ico close">x</i>';
		this.toUserList.appendChild(li);
		var msglist = $c('ul');
		msglist.innerHTML = person.senderName;
		this.content.appendChild(msglist);
		this.chattab.buildTabStatus();
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