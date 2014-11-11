/**
 * SSSC MESSAGE ON PAGE
 * include two important components: chat and message bar
 * Author DK
 *DATE: 2014-10-20
 */
define(function(require, exports, module){

var Template = require('./js/template');
var swfobj = require('./js/swfobject');
var msgtool = require('./js/msgtool');
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
};

MOP.ModelBase.prototype = {
	_initModelBase: function(options){
		this.options = mix({
			default: {}
		}, options);
		this.attributes = mix({}, this.options.default);
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
			default: {}
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

	readMessageHistory: function(userInfo, fn){
		var self = this;
		$.ajax({
			dataType: 'jsonp',
			url: 'http://member.sssc.cn/message/ajax-get-msg?session_id=&page=1&begin_id=0&receiverIds=' + userInfo.senderUid + '&7658615395172941&callback=?',
			method: 'get',
			success: function(data){
				fn && fn(data);
				self.emit('load:message', {
					messages: data,
					userInfo: userInfo
				});
			},
			error: function(){}
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
                        this.set('lastMessageId_' + value[i].id);
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
			if(e.target != self.popwin && !$.contains(self.popwin, e.target) && e.target != self.barBtn && !$.contains(self.barBtn, e.target)){
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
		$(this.popwin).show('normal');
		$(this.barBtn).addClass('highlight');
	},
	closeBox: function(){
		$(this.popwin).hide('fast');
		$(this.barBtn).removeClass('highlight');
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
			messages[i].text = msgtool.showFace(msgtool.showBoldAndUrl(messages[i].text));
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
			//console.log(self.persons[e.index]);
			self.setTitle(self.persons[e.index].senderName);
		});

		this.sessions = {};
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
			console.log(self.options.model.chatSessionsArray);
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
            var tmpl = new Template(document.getElementById('tmpl_chat_item').innerHTML);
            self.sessions[sessionId].list.innerHTML = tmpl.render({messages: e.messages.datas, uid: self.model.get('uid')});
            self.model.set("lastMessageId_" + sessionId, e.messages.datas[e.messages.datas.length - 1].id);
            self.scrollToBottom();
        });
        this.model.on('chat:message', function(e){
            var tmpl = new Template(document.getElementById('tmpl_chat_item_per').innerHTML);
            for(var key in e.messages){
                self.sessions[key].list.innerHTML += tmpl.render({messages: e.messages[key], uid: self.model.get('uid')});
                self.scrollToBottom();
                //TODO: high light the tab with unread message var key

                var pointer = indexOf(e.sessionsArray, key);
                if(!$(self.sessions[key].tab).hasClass('active')){
                    $(self.sessions[key].tab).addClass('highlight');
                }
            }
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