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

extends(MOP.ModelBase, EventEmitter);
MOP.MsgBar = function(options){
	this._initMsgBar(options);	
};
MOP.MsgBar.prototype = {
	_initMsgBar: function(options){

	},
	open: function(){

	},
	close: function(){

	},
	setTotal: function(count){

	}
};

MOP.MsgStatus = function(options){
	this._initMsgStatus(options);
};
MOP.MsgStatus.prototype = {
	_initMsgStatus: function(){

	},
	openBox: function(){

	},
	closeBox: function(){

	},
	setCount: function(){

	},
	highLight: function(){

	},
	updateList: function(){

	},
	clearTarget: function(){},
	clearAll: function(){}
};

MOP.MsgUI = function(){
	this._initMsgUI();
};
MOP.MsgUI.prototype = {
	_initMsgUI: function(options){

	},
	//发送通知
	notify: function(){

	},

	playSound: function(){},

	updatePageTitle: function(){}
};