//document.domain = "sssc.cn";
var md5 = function (string) {
 
	function RotateLeft(lValue, iShiftBits) {
		return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
	}
 
	function AddUnsigned(lX,lY) {
		var lX4,lY4,lX8,lY8,lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
		if (lX4 & lY4) {
			return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		}
		if (lX4 | lY4) {
			if (lResult & 0x40000000) {
				return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			} else {
				return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			}
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
 	}
 
 	function F(x,y,z) { return (x & y) | ((~x) & z); }
 	function G(x,y,z) { return (x & z) | (y & (~z)); }
 	function H(x,y,z) { return (x ^ y ^ z); }
	function I(x,y,z) { return (y ^ (x | (~z))); }
 
	function FF(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function GG(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function HH(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function II(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function ConvertToWordArray(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWords_temp1=lMessageLength + 8;
		var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
		var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
		var lWordArray=Array(lNumberOfWords-1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while ( lByteCount < lMessageLength ) {
			lWordCount = (lByteCount-(lByteCount % 4))/4;
			lBytePosition = (lByteCount % 4)*8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount-(lByteCount % 4))/4;
		lBytePosition = (lByteCount % 4)*8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
		lWordArray[lNumberOfWords-2] = lMessageLength<<3;
		lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
		return lWordArray;
	};
 
	function WordToHex(lValue) {
		var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
		for (lCount = 0;lCount<=3;lCount++) {
			lByte = (lValue>>>(lCount*8)) & 255;
			WordToHexValue_temp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
		}
		return WordToHexValue;
	};
 
	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	};
 
	var x=Array();
	var k,AA,BB,CC,DD,a,b,c,d;
	var S11=7, S12=12, S13=17, S14=22;
	var S21=5, S22=9 , S23=14, S24=20;
	var S31=4, S32=11, S33=16, S34=23;
	var S41=6, S42=10, S43=15, S44=21;
 
	string = Utf8Encode(string);
 
	x = ConvertToWordArray(string);
 
	a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
 
	for (k=0;k<x.length;k+=16) {
		AA=a; BB=b; CC=c; DD=d;
		a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
		d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
		c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
		b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
		a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
		d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
		c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
		b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
		a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
		d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
		c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
		b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
		a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
		d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
		c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
		b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
		a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
		d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
		c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
		b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
		a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
		d=GG(d,a,b,c,x[k+10],S22,0x2441453);
		c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
		b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
		a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
		d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
		c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
		b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
		a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
		d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
		c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
		b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
		a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
		d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
		c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
		b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
		a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
		d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
		c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
		b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
		a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
		d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
		c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
		b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
		a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
		d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
		c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
		b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
		a=II(a,b,c,d,x[k+0], S41,0xF4292244);
		d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
		c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
		b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
		a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
		d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
		c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
		b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
		a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
		d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
		c=II(c,d,a,b,x[k+6], S43,0xA3014314);
		b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
		a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
		d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
		c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
		b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
		a=AddUnsigned(a,AA);
		b=AddUnsigned(b,BB);
		c=AddUnsigned(c,CC);
		d=AddUnsigned(d,DD);
	}
 
	var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
 
	return temp.toLowerCase();
}


var uid = jQuery.cookie('cdb_uid');
var nowTime = parseInt(new Date().getTime() / 1000);
var uploadUrl = "http://uploader.sssc.cn/upload.php?uid=" + uid + "&time=" + nowTime + "&txnId=" + md5(uid + (nowTime + '63540b6u0HXWV7Bp')) + "&type=message";;

function flashChecker(){
	var hasFlash=0;//是否安装了flash
	var flashVersion=0;//flash版本
	if(document.all)
	{
		try{
			var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
			if(swf) {
				hasFlash=1;
				VSwf=swf.GetVariable("jQueryversion");
				flashVersion=parseInt(VSwf.split(" ")[1].split(",")[0]);
			}
		} catch (err) {
			
		}
		
	}else{
		if (navigator.plugins && navigator.plugins.length > 0)
		{
			try{
				var swf=navigator.plugins["Shockwave Flash"];
				if (swf)
				{
					hasFlash=1;
					var words = swf.description.split(" ");
					for (var i = 0; i < words.length; ++i)
					{
						 if (isNaN(parseInt(words[i]))) 
							continue;
						 flashVersion = parseInt(words[i]);
					}
				}
			}catch(err){
			
			}
		}
	}
	return {f:hasFlash,v:flashVersion};
}
var flashCheckResult = flashChecker();
//*****************************Flash Uploader*******************************************
var swfMovie;
var maxFileCount = 1;
function getFlashUploader()
{
	var swfName = "SSSCFlashUploader";
	if(typeof document[swfName] != 'undefined')
	{
		swfMovie=document[swfName];
	}
	else
	{
		swfMovie = window[swfName];
	}
	return swfMovie;
}
//swf call this method after swf loaded
function callBySwfLoaded()
{
	jQuery("#flash-loading-info").hide();
	var flashUploader = getFlashUploader();
	var useDesc = true;
	if(typeof showFileDesc != 'undefined' && !showFileDesc){
		useDesc = false;
	}
	if(typeof flashUploader != 'undefined')
	{
		flashUploader.setParams(uploadUrl, 8388608, maxFileCount, useDesc);
	}
}
function uploadFileBySwf(){
	try{
		if(!isAnyFileUnuploaded()){
			alert("您尚未选择要上传的图片！如果您要关闭上传窗口，请点击“取消上传”。");
			return;
		}
		var flashUploader = getFlashUploader();
		if(typeof flashUploader != 'undefined')
		{
			jQuery('#link-clear-flashuploader').attr('disabled',true);
			flashUploader.submit();
		}
	}
	catch(err){
		alert("文件上传失败");
	}
}
function clearFilesInSwf(){
	var flashUploader = getFlashUploader();
	if(typeof flashUploader != 'undefined')
	{
		flashUploader.clear();
	}
}
function flashUploadSuccessed(datas,submitAfterUpload)
{
	jQuery('#link-clear-flashuploader').attr('disabled',false);
	uploadSuccessed(datas);
}
function uploadSuccessed(datas){
	try{
		var dataArr = eval(datas);
		if(dataArr && dataArr.length>0)
		{
			for(var i=0;i<dataArr.length;i++)
			{
				addUploadedFileToContainer(dataArr[i].id,dataArr[i].filename,dataArr[i].size,dataArr[i].desc,dataArr[i].json);
			}
		}
	}catch(err){
		alert('上传文件发生异常，请稍候再试。');
	}
	closeFileUploader();
}
var documentTitle = "";
//jQuery(document).ready(function(){
	
	var uploaderStyleString = "<style>#fileUploadContainer{background-color:#f4f5e4;margin:0;padding:2px;}#fileUploadContainer ul.box-tab{color:#a01717;margin:5px 10px;}#fileUploadContainer ul.box-tab li.fr{font-weight:700;cursor:pointer;}#fileUploadContainer #flashUploader,#fileUploadContainer #flashVersionError,#fileUploadContainer #ajaxUploader{background-color:#fff;border:1px solid #cfcfcf;margin:0;padding:0;}#fileUploadContainer #uploadItemTitle{height:30px;border-bottom:1px solid #cfcfcf;overflow:hidden;text-align:left;background-color:#e5e5e5;}#fileUploadContainer #uploadItemTitle input{height:24px;margin:3px;}#fileItemContainer,flashUploader object{height:250px;}#fileItemContainer,#fileItemContainer{width:100%;height:219px;overflow-y:scroll;}#fileUploadContainer .span-6{font-size:14px;color:#7c7c7c;text-align:left;font-weight:700;}#fileUploadContainer .span-6 p{padding:20px 0 5px 20px;}#fileUploadContainer .span-6 a{font-size:12px;color:#a01717;border:1px solid #7c7c7c;background-color:#ccc;-moz-border-radius:5px;-webkit-border-radius:5px;padding:5px 10px;}#fileUploadContainer .span-14{background-image:url(http://img.scimg.cn/images/uploader/uploadHelp-bg.gif?20100722);background-repeat:no-repeat;background-position:0 bottom;}#fileUploadContainer .fileItem{width:250px;float:left;font-size:12px;color:#333;border:1px solid #ccc;display:inline;background-color:#f1f1f1;margin:5px 0 0 5px;}#fileUploadContainer .img_preview{float:left;width:64px;text-align:center;height:90px;overflow:hidden;margin:5px 5px 0;}#fileUploadContainer .img_preview img{width:60px;height:60px;border:1px solid #666;display:block;margin-bottom:3px;padding:1px;}#fileUploadContainer .img_preview a:hover{color:red;}#fileUploadContainer .img_info{float:left;text-align:left;margin:5px 0 0 5px;}#fileUploadContainer #flashUploader,#fileUploadContainer #flashVersionError{height:292px;}#fileUploadContainer .img_info ul{line-height:20px;list-style:none;margin:0;padding:0;}#fileUploadContainer .img_info input{height:20px;}#fileUploadContainer .button-line{height:40px;border-top:1px solid #d2d2d2;background-color:#e5e5e5;margin:0 1px 1px;padding:0 10px;}#fileUploadContainer .button-line a.button{float:left;display:block;width:121px;height:29px;margin-top:5px;line-height:30px;overflow:hidden;font-size:14px;font-weight:700;background-image:url(http://img.scimg.cn/styles/bbs/img/bbsuploadbutton.gif);background-repeat:no-repeat;color:#fff;text-decoration:none;text-align:center;}#fileUploadContainer .button-line span.text{float:left;font-size:12px;margin:10px 0 0 10px;}#fileUploadContainer .button-line a.link{float:right;font-size:14px;font-weight:700;margin:8px 10px 0;}#ssscUploader{font-size:12px;position:relative;margin-top:10px;}#ssscUploader .height1{height:50px;background-color:red;display:none;}#ssscUploader #upload-btn-container{overflow:visible;float:left;}#ssscUploader #upload-file-container{float:none;min-height:50px;margin-left:130px;_height:50px;}#ssscUploader .upload-preview{width:250px;border:solid 1px #d4d0c8;line-height:20px;background-color:#f1f1f1;height:85px;float:left;-moz-border-radius:5px;-webkit-border-radius:5px;margin:0 10px 10px 0;}#ssscUploader .upload-preview .img-preview{text-align:center;width:66px;height:66px;float:left;overflow:hidden;margin-top:10px;margin-left:10px;display:inline;}#ssscUploader .upload-preview .img-preview img{border:solid 1px #d4d0c8;margin:auto;padding:1px;}#ssscUploader .upload-preview .fileinfo-preview{width:158px;height:66px;float:left;margin-top:10px;margin-left:10px;}#ssscUploader .upload-preview .fileinfo-preview a{font-size:12px;padding:2px;}#ssscUploader a.linkUploadPic{color:#545b65;display:block;width:121px;height:29px;margin-top:5px;line-height:30px;overflow:hidden;font-size:14px;font-weight:700;background-image:url(http://img.scimg.cn/styles/member/img/imgupload.gif);background-repeat:no-repeat;text-decoration:none;text-align:center;}#fileUploadContainer .fileItem form,#fileUploadContainer .img_info ul li,#ssscUploader p,#ssscUploader img,#ssscUploader a{margin:0;padding:0;}#fileUploadContainer .button-line a.button:hover,#ssscUploader a.linkUploadPic:hover{background-position:0 -29px;}</style>";
	var uploaderHtmlString = '<div id="fileUploadContainer"class="clearfix"style="display:none;"title="上传文件"><ul class="box-tab reset clearfix"><li class="fl">每张小于8M，可一次添加多张图片</li><li id="type-1"class="fr"onclick="showUploader(1);">使用增强型上传>></li><li id="type-2"class="fr"onclick="showUploader(2);">遇到问题？尝试普通上传>></li></ul><div id="flashUploader"class="clearfix"style="clear:both;display:none;position:relative;"><div id="flash-loading-info"style="position:absolute;z-index:9999;padding:60px 0px 0px 270px;font-size:22px;color:#333;">载入中，请稍候......</div><div id="flashContent"></div><p class="button-line"><a class="button"onclick="if(isUploading()){return false;} uploadFileBySwf();return false;"href="javascript:void(0)">确定上传</a><span class="text">上传完成后将自动返回发布页。</span><a class="link"href="javascript:void(0)"onclick="if(confirm(\'确定取消上传？\')){clearFilesInSwf();closeFileUploader();}return false;"title="取消上传">取消上传</a><a id="link-clear-flashuploader"class="link"href="javascript:void(0)"onclick="if(isUploading()){alert(\'文件上传中，无法清空列表\');return false;}if(confirm(\'确定清空文件列表？\')){clearFilesInSwf();}return false;"title="清空上传列表内容">清空列表</a></p></div><div id="flashVersionError"class="clearfix"style="clear:both;display:none;"><div class="span-6"><p>您的Flash版本过低无法使用增强型上传</p><p><a href="http://get.adobe.com/cn/flashplayer/"target="_blank"title="升级flash解决此问题">升级Flash解决此问题</a></p><p><a href="javascript:void(0)"onclick="showUploader(2);"title="使用普通上传，暂不升级">暂不升级，使用普通模式上传</a></p></div><div class="span-14 last"><img src="http://img.scimg.cn/images/uploader/uploadHelp.gif"alt="使用增强上传功能，更方便的上传您的藏品、图片。"style="margin:5px auto;"/></div></div><div id="ajaxUploader"class="clearfix"style="clear:both;display:none;"><div id="uploadItemTitle"class="clearfix"><span id="newUploadItem"><input class="file"name="file"type="file"id="file_10000"onchange="AjaxFileUploader.newItem();"size="45"width="320"/></span></div><div id="fileItemContainer"class="clearfix"></div><p class="button-line"><a class="button"onclick="if(isUploading()){return false;}AjaxFileUploader.upload();return false;"href="javascript:void(0)">确定上传</a><span class="text">上传完成后将自动返回发布页。</span><a class="link"href="javascript:void(0)"onclick="if(confirm(\'确定取消上传？\')){AjaxFileUploader.clearItems();closeFileUploader();}return false;"title="取消上传">取消上传</a><a id="link-clear-ajaxuploader"class="link"href="javascript:void(0)"onclick="if(isUploading()){alert(\'文件上传中，请稍后再试\');return false;}if(confirm(\'确定清空上传列表内容？\')){AjaxFileUploader.clearItems();}return false;"title="清空上传列表内容">清空列表</a></p></div></div>';
	jQuery('head').append(uploaderStyleString);
	jQuery('body').append(uploaderHtmlString);
	
	documentTitle = document.title;
	jQuery("#fileUploadContainer").dialog({
		autoOpen: false,
		modal: true,
		resizable:false,
		closeOnEscape:false,
		closeText:'关闭',
		draggable: true,
		width:800,
		close: function(event, ui) {
			if(document.title == '#'){
				document.title = documentTitle;
			}
			jQuery("select").show();
			swfobject.removeSWF("SSSCFlashUploader");
			jQuery("#flashUploader").html("<div id=\"flashContent\"></div>"+jQuery("#flashUploader").html());
		},
		beforeclose : function(){
			if(isUploading()){
				if(!confirm('文件上传中，您确定关闭上传窗口？')){
					return false;
				}
			}else if(isAnyFileUnuploaded()){
				if(!confirm('关闭窗口将清空已选择的文件列表，确定关闭上传窗口？')){
					return false;
				}
			}
			try{
				AjaxFileUploader.clearItems();
				clearFilesInSwf();
			}catch(err){					
			}
		}
	});
//});

function openFileUploader(){
	if(typeof maxFileCount == 'undefined'){
		maxFileCount = 50;
	}
	if(maxFileCount && fileCount >= maxFileCount){
		alert("您只能上传"+maxFileCount+"张图片！");
		return;
	}
	jQuery("select").hide();
	jQuery("#fileUploadContainer").dialog("open");
	if(flashCheckResult && flashCheckResult.f && flashCheckResult.v>=10){
		var swfVersionStr = "10.0.0";
		<!-- To use express install, set to playerProductInstall.swf, otherwise the empty string. -->
		var xiSwfUrlStr = "playerProductInstall.swf";
		var flashvars = {};
		var params = {};
		params.quality = "high";
		params.bgcolor = "#ffffff";
		params.allowscriptaccess = "always";
		params.allowfullscreen = "true";
		params.wmode = "transparent";
		var attributes = {};
		attributes.id = "SSSCFlashUploader";
		attributes.name = "SSSCFlashUploader";
		attributes.align = "middle";
		swfobject.embedSWF(
			"http://img.scimg.cn/images/uploader/SSSCFlashUploader.swf?<?=HEADER_CSS_JS_VER?>", "flashContent", 
			"100%", "250", 
			swfVersionStr, xiSwfUrlStr, 
			flashvars, params, attributes);
	}
	showUploader(1);
}
function closeFileUploader(){
	jQuery("select").show();
	jQuery("#fileUploadContainer").dialog("close");
}
if(typeof showFileDesc == 'undefined'){
	showFileDesc = false;
}
if(typeof maxFileNum == 'undefined'){
	maxFileNum = 1;
}
var fileCount=0;
var fileIndex=1;
function addUploadedFileToContainer(id,name,size,desc,json){
	//if(jQuery.browser.mozilla){
		id = (++fileIndex);
	//}
	fileCount++;
	if(typeof addNewFile !='undefined' && jQuery.isFunction(addNewFile)){
		addNewFile(id,name,size,desc,json);
	}else{
		if(fileCount>maxFileNum){
			return;
		}
		eval("var datas = "+json);
		var shortName = name;
		if(shortName.length>14){
			shortName = name.substr(0,10)+"…"+name.substr(name.lastIndexOf('.'));
		}
		var descHtml = "";
		if(showFileDesc){
			descHtml = "<span>备注:<input id=\"uploadedFileDesc_"+id+"\" name=\"uploadedFileDesc["+id+"]\" size=10 /></span><br/>";
		}
		var previewPath = getPreviewPath(datas);
		var html = "";
		html += "<div id=\"uploaded-file-"+id+"\" class=\"imgbox\">\r\n";
		html += "	<p class=\"img-preview\"><input type=\"hidden\" name=\"uploadedFiles["+id+"]\" value=\'"+json+"\' /><a title=\""+name+"\" href=\"http://uploader.sssc.cn/preview/"+datas.orig+"\" target=\"_blank\"><img src=\"http://uploader.sssc.cn/preview/"+previewPath+"\" /></a></p>\r\n";
		html += "	<p class=\"fileinfo-preview\"><span title=\""+name+"\">"+shortName+"</span>"
					+""+descHtml+"<a href=\"#\" onclick=\"delUploadedFile("
					+id+");return false;\">删除图片</a></p>\r\n";
		//html += "	<div class=\"clear height1\"></div>\r\n";
		html += "</div>\r\n";
		//jQuery("#upload-file-container").append(html);
        jQuery(".pop.uploadimg").html(html).show();
		jQuery("#uploadedFileDesc_"+id).val(desc);
	}
	if(typeof newFileUploaded != 'undefined' && jQuery.isFunction(newFileUploaded)){
		newFileUploaded(id,name,size,desc,json);
	}
}
function delUploadedFile(id){
	if(typeof beforeFileDeleted != 'undefined' && jQuery.isFunction(beforeFileDeleted)){
		var result = beforeFileDeleted(id);
		if(typeof result != 'undefined' && result === false){
			return;
		}
	}
	fileCount--;
	if(typeof deleteFileById != 'undefined' && jQuery.isFunction(deleteFileById)){
		deleteFileById(id);
	}else{
		jQuery("#uploaded-file-"+id).remove();
	}
	if(typeof afterFileDeleted != 'undefined' && jQuery.isFunction(afterFileDeleted)){
		afterFileDeleted(id);
	}
    jQuery(".pop.uploadimg").hide();
}
function getPreviewPath(datas){
	if(typeof datas == 'undefined' || !datas){
		return '';
	}
	var thumbSizes = ['50','60','70','80','100','120','260','300','600','orig'];
	for(var i=0;i< thumbSizes.length;i++){
		if(typeof datas[thumbSizes[i]] != 'undefined'){
			return datas[thumbSizes[i]];
		}
	}
	return '';
}
function restImg60(obj){
	var thisImg = new Object(obj);
	var oldWidth = thisImg.width;
	var oldHeight = thisImg.height;
	var maxWidth = 60;
	var maxHeight = 60;
	if(thisImg.width > thisImg.height) {
		thisImg.height = thisImg.height * (maxWidth/oldWidth);
		thisImg.width = maxWidth;
		obj.style.height= thisImg.height;
		obj.style.width= thisImg.width;
		var i = (60 - thisImg.height)/2;
		obj.style.marginTop= i+"px";
    } else {
		thisImg.width = thisImg.width * (maxHeight/oldHeight);
		thisImg.height = maxHeight;
		obj.style.height= thisImg.height;
		obj.style.width= thisImg.width;
	}
}
//*****************************Ajax File Uploader*********************************
var AjaxFileUploader = {
	"uploadUrl":uploadUrl+"&ajax=1",
	"uploadingId":0,
	"uploadedIds":[],
	"itemIds":[],
	"itemIndex":10000,
	"maxFileCount":50,
	"results":[],
	"isUploading":false,
	"isUploadFinished":false,
	"uploadedCallback":function(data){alert(data);},
	"upload":function(){
		AjaxFileUploader.isUploading = true;
		for(var i=0;i<AjaxFileUploader.itemIds.length;i++){
			if(!AjaxFileUploader.isItemUploaded(AjaxFileUploader.itemIds[i])){
				var lineCount = parseInt((i+1)/3);
				jQuery("#fileItemContainer").scrollTop(lineCount*100);
				jQuery('#file_'+AjaxFileUploader.itemIndex).attr('disabled',true); 
				jQuery('#link-clear-ajaxuploader').attr('disabled',true); 
				jQuery('#form_'+AjaxFileUploader.itemIds[i]).submit();
				return;
			}
		}
		jQuery('#file_'+AjaxFileUploader.itemIndex).attr('disabled',false);
		jQuery('#link-clear-ajaxuploader').attr('disabled',false);
		AjaxFileUploader.isUploading = false;
		AjaxFileUploader.isUploadFinished = true;
		AjaxFileUploader.uploadedFinished();
	},
	"uploadedFinished":function(){
		var datas = [];
		for(var i=0;i<AjaxFileUploader.results.length;i++){
			datas.push("{id:'"+AjaxFileUploader.results[i].Id+"',filename:'"+AjaxFileUploader.getFileName(jQuery("#file_"+AjaxFileUploader.results[i].Id).val(),true)+"',size:'"+AjaxFileUploader.getFileSize(AjaxFileUploader.results[i].Id)+"',desc:'"+jQuery("#desc_"+AjaxFileUploader.results[i].Id).val()+"',json:'"+AjaxFileUploader.Json.toJSON(AjaxFileUploader.results[i].data)+"'}");
		}
		AjaxFileUploader.uploadedCallback("["+datas.join(",")+"]");
		AjaxFileUploader.clearItems();
	},
	"newItem":function(){
		if(AjaxFileUploader.itemIds.length >= AjaxFileUploader.maxFileCount){
			alert("您只能上传"+AjaxFileUploader.maxFileCount+"张图片");
			return;
		}
		id = AjaxFileUploader.itemIndex;
		if(typeof id == 'undefined' || !id){
			return;
		}
		var file = jQuery("#file_"+id);
		if(jQuery("#file_"+id).length<1){
			return;
		}
		var fileExt = AjaxFileUploader.getFileExt(jQuery("#file_"+id).val());
		if(jQuery.inArray(fileExt,['.jpg','.gif','.png','.jpeg'])==-1){
			alert('只允许上传.jpg、.gif、.png格式的图片!');
			return;
		}
		var itemHtml = AjaxFileUploader.getNewItemHtml(id);
		jQuery("#fileItemContainer").append(itemHtml);
		AjaxFileUploader.getImgPreview(id);
		jQuery("#filename_"+id).html(""+AjaxFileUploader.getFileName(jQuery("#file_"+id).val()));
		jQuery("#filesize_"+id).html(""+AjaxFileUploader.getFileSize(id));
		jQuery("#filename_"+id).append(jQuery("#file_"+id));
		jQuery("#file_"+id).hide();
		jQuery('#form_'+id).ajaxForm({
			dataType:'json', 
			beforeSubmit:AjaxFileUploader.beforeUpload,
			success:AjaxFileUploader.uploadSuccess,
			error:AjaxFileUploader.uploadFailed
		});
		AjaxFileUploader.itemIds.push(id);
		AjaxFileUploader.itemIndex++;
		jQuery("#newUploadItem").html("<input name=\"file\" type=\"file\" id=\"file_"+AjaxFileUploader.itemIndex+"\" onchange=\"AjaxFileUploader.newItem();\" size=\"45\" width=\"320\"/>");
	},
	"removeItem":function(id){
		//if(confirm('是否确定删除此图片？')){
			for(var i=0;i<AjaxFileUploader.itemIds.length;i++){
				if(AjaxFileUploader.itemIds[i] == id){
					AjaxFileUploader.itemIds.splice(i,1);
					break;
				}
			}
			jQuery("#fileItem_"+id).remove();
		//}
	},
	"isItemUploaded":function(id){
		return jQuery.inArray(id,AjaxFileUploader.uploadedIds) != -1;
	},
	"clearItems":function(){
		jQuery("#fileItemContainer").html("");
		AjaxFileUploader.uploadedIds = [];
		AjaxFileUploader.uploadingId = 0;
		AjaxFileUploader.itemIds = [];
		AjaxFileUploader.results = [];
	},
	"getFileName":function(str,fullName){
		if(!str){
			return str;
		}
		var filename = '';
		if(str.lastIndexOf("\\")>0){
			filename = str.substr(str.lastIndexOf("\\")+1);
		}else if(str.lastIndexOf("/")>0){
			filename = str.substr(str.lastIndexOf("/")+1);
		}else{
			filename = str;
		}
		var fileExt = filename.substr(filename.lastIndexOf("."));
		filename = filename.substr(0,filename.lastIndexOf("."));
		if((typeof fullName == 'undefined' || !fullName) && filename.length>6){
			filename=filename.substr(0,6)+"…";
		}
		return filename+fileExt;
	},
	"getFileExt":function(str){
		if(!str){
			return str;
		}
		return str.substr(str.lastIndexOf(".")).toLowerCase();
	},
	"getFileSize":function(id){
		if(jQuery.browser.mozilla){
			return jQuery("#file_"+id).get(0).files[0].fileSize;
		}else if(jQuery.browser.msie){
			var tempDiv=document.createElement("div");
			try{
				jQuery("#ajaxUploader").append(jQuery(tempDiv));   
				tempDiv.style.width="10px";   
				tempDiv.style.height="10px";   
				tempDiv.style.diplay="none";   
				tempDiv.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image);";   
				tempDiv.ID="previewTemp"; 
				tempDiv.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src="file:\\\\"+jQuery("#file_"+id).val();   
				var width=tempDiv.offsetWidth;   
				var height=tempDiv.offsetHeight;   
				jQuery(tempDiv).remove();
				return width+"x"+height;
			}
			catch(err){
				jQuery(tempDiv).remove();
			}
		}
		return "未知";
	},
	"getNewItemHtml":function(id){
		var itemHtml = "";
		itemHtml += "<div id=\"fileItem_"+id+"\" class=\"fileItem clearfix\">\r\n";
		itemHtml += "<form name=\"form_"+id+"\" id=\"form_"+id+"\" method=\"post\" action=\""+AjaxFileUploader.uploadUrl+"\">\r\n";
		itemHtml += "<div class=\"img_preview\">\r\n";
		itemHtml += "	<div id=\"upload_img_"+id+"\"></div>\r\n";
		itemHtml += "	<div><a href=\"javascript:void(0)\" onclick=\"AjaxFileUploader.removeItem("+id+");\">移除图片</a></div>\r\n";
		itemHtml += "</div>\r\n<div class=\"img_info\">\r\n<ul>\r\n";
		itemHtml += "	<li>名称：<span id=\"filename_"+id+"\"></span></li>\r\n";
		itemHtml += "	<li>大小：<span id=\"filesize_"+id+"\"></span></li>\r\n";
		if(typeof showFileDesc == 'undefined' || showFileDesc == true){
			itemHtml += "	<li id=\"filedesc_"+id+"\">备注：<input id=\"desc_"+id+"\" name=\"desc_"+id+"\" size=\"12\" /></li>\r\n";
		}
		itemHtml += "	<li>状态：<span id=\"filestatus_"+id+"\">等待上传</span></li>\r\n";
		itemHtml += "</ul>\r\n</div>\r\n";
		itemHtml += "</form>\r\n</div>\r\n";
		
		return itemHtml;
	},
	"getImgPreview":function(id){
		
		if(jQuery.browser.msie){
			try{
				var imgDivHtml = "<div id=\"preview_"+id+"\" style=\"filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale); width:60px;height:60px;border:solid 1px black;\"></div>";
				jQuery("#upload_img_"+id).html(imgDivHtml);
				var picpreview = document.getElementById("preview_"+id);
				picpreview.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = "file:\\\\"+jQuery("#file_"+id).attr("value");
				return;
			}catch(err){}
		}
		if(jQuery.browser.mozilla){
			try{
				var imgobj=new Image();
				imgobj.width = 60;
				imgobj.height = 60;
				imgobj.src=jQuery("#file_"+id).get(0).files[0].getAsDataURL();
				jQuery("#upload_img_"+id).append(jQuery(imgobj));
				return;
			}catch(err){}
		} 
		
		var imgDivHtml = "<a href=\"http://bbs.sssc.cn/viewthread.php?tid=480371&page=39#pid6708425\" target=\"_blank\"><img src=\"http://img.scimg.cn/images/uploader/no-preview.gif\" /></a>";
		jQuery("#upload_img_"+id).html(imgDivHtml);
	},
	"Json":{
		"type":function(o){
			var _toS = Object.prototype.toString();    
			var _types = {    
				'undefined': 'undefined',    
				'number': 'number',    
				'boolean': 'boolean',    
				'string': 'string',  
				'object': 'object',
				'[object Object]': 'object',
				'[object Function]': 'function',    
				'[object RegExp]': 'regexp',    
				'[object Array]': 'array',    
				'[object Date]': 'date',    
				'[object Error]': 'error'    
			};    
			return _types[typeof o] || _types[_toS.call(o)] || (o ? 'object' : 'null');    
		},
		"specialChars": { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\' },  
		"replaceChars": function(chr) {    
			return AjaxFileUploader.Json.specialChars[chr] || '\\u00' + Math.floor(chr.charCodeAt() / 16).toString(16) + (chr.charCodeAt() % 16).toString(16);    
    	},
		"toJSON" : function(o) {    
			var s = [];    
			switch (AjaxFileUploader.Json.type(o)) {    
				case 'undefined':    
					return 'undefined';    
					break;    
				case 'null':    
					return 'null';    
					break;    
				case 'number':    
				case 'boolean':    
				case 'date':    
				case 'function':    
					return o.toString();    
					break;    
				case 'string':    
					return '"' + o.replace(/[\x00-\x1f\\"]/g, AjaxFileUploader.Json.replaceChars) + '"';    
					break;    
			   case 'array':    
					for (var i = 0, l = o.length; i < l; i++) {    
						s.push(AjaxFileUploader.Json.toJSON(o[i]));    
					}    
					return '[' + s.join(',') + ']';    
					break;    
				case 'error':    
				case 'object':    
					for (var p in o) {    
						s.push('"'+p+'"' + ':' + AjaxFileUploader.Json.toJSON(o[p]));    
					}    
					return '{' + s.join(',') + '}';    
					break;    
				default:    
					return '';    
					break;
			}    
		}
	},
	"uploadFailed":function(xhr,status,error){
		var e = '';
		for(var k in error)
			e += k+":"+error[k];
		AjaxFileUploader.debug(status+e);
		jQuery("#filestatus_"+AjaxFileUploader.uploadingId).html("<b><font color='red'>上传失败</font></b>");
		AjaxFileUploader.uploadedIds.push(AjaxFileUploader.uploadingId);
		AjaxFileUploader.upload();
	},
	"beforeUpload":function(formData, jqForm, options){
		var formId = jqForm[0].id;
		AjaxFileUploader.uploadingId = parseInt(formId.substr(formId.lastIndexOf("_")+1));
		if(AjaxFileUploader.uploadingId<1){
			return false;
		}
		AjaxFileUploader.debug("fileItem:"+AjaxFileUploader.uploadingId+", 上传中......");
		jQuery("#filestatus_"+AjaxFileUploader.uploadingId).html("<img src='http://img.scimg.cn/images/uploader/ajax-loader2.gif' width='100' />");
	},
	"uploadSuccess":function(data,status,form){
		if(typeof data.ERROR != 'undefined'){
			jQuery("#filestatus_"+AjaxFileUploader.uploadingId).html("<b><font color='red'>上传失败</font></b>");
		} else {
			AjaxFileUploader.results.push({"Id":AjaxFileUploader.uploadingId,"data":data});
			jQuery("#filestatus_"+AjaxFileUploader.uploadingId).html("<b><font color='#006600'>上传成功</font></b>");
		}
		AjaxFileUploader.uploadedIds.push(AjaxFileUploader.uploadingId);
		AjaxFileUploader.upload();
	},
	"debug":function(message){
		//jQuery("#msg").html(message);
	}
}
AjaxFileUploader.uploadedCallback = uploadSuccessed;
if(typeof maxFileCount != 'undefined'){
	AjaxFileUploader.maxFileCount = maxFileCount;
}
//type: 0 flash version error
//		1 flash
//      2 ajax
var preUploadType = null;
function showUploader(type){
	if(isUploading()){
		alert('文件上传中，请稍候再试！');
		return;
	}
	if(isAnyFileUnuploaded() && type !== 0 && preUploadType !== null && type!=preUploadType){
		if(!confirm("切换上传方式将使已选择的文件列表清空\r\n是否确定切换上传方式？")){
			return;
		}else{
			clearFilesInSwf();
			AjaxFileUploader.clearItems();
		}
	}
	jQuery('#flashUploader').hide();
	jQuery('#ajaxUploader').hide();
	jQuery('#flashVersionError').hide();
	jQuery('#fileUploadContainer .box-tab #type-1').hide();
	jQuery('#fileUploadContainer .box-tab #type-2').hide();
	if(type && type === 0){
		jQuery('#flashVersionError').show();
		preUploadType = null;
		jQuery('#fileUploadContainer .box-tab #type-2').show();
	}else if( type && type === 1){
		if(flashCheckResult && flashCheckResult.f && flashCheckResult.v>=10){
			jQuery('#flashUploader').show();
			preUploadType = "type1";
			jQuery('#fileUploadContainer .box-tab #type-2').show();
		}else{
			jQuery('#flashVersionError').show();
			preUploadType = null;
			jQuery('#fileUploadContainer .box-tab #type-2').show();
		}
	}else{
		if((typeof type == 'undefined' || !type)&&flashCheckResult && flashCheckResult.f && flashCheckResult.v>=10){
			showUploader(1);
		}else{
			jQuery('#ajaxUploader').show();
			preUploadType = "type2";
			jQuery('.box-tab #type-1').show();
		}
	}	
}
function isUploading(){
	try{
		if(flashCheckResult && flashCheckResult.f && flashCheckResult.v>=10){
			var flashUploader = getFlashUploader();
			if(typeof flashUploader != 'undefined'){
				var isUploading = flashUploader.inUploading();
				if(isUploading){
					return true;
				}
			}
		}
	}catch(err){
		
	}
	if(AjaxFileUploader.isUploading){
		return true;
	}
	return false;
}
function isAnyFileUnuploaded(){
	if(flashCheckResult && flashCheckResult.f && flashCheckResult.v>=10){
		var flashUploader = getFlashUploader();
		if(typeof flashUploader != 'undefined'){
			try{
				var hasFileUnuploaded = flashUploader.hasFileUnuploaded();
				if(hasFileUnuploaded){
					return true;
				}
			}
			catch(err){
			}
		}
	}
	return AjaxFileUploader.itemIds.length != AjaxFileUploader.uploadedIds.length;
}
function formatFileSize(size){
	size =  parseInt(size);
	if(size < 1024)
		return padSize( parseInt(size*100)/100) + " bytes";
	if(size < 1048576)
		return padSize( parseInt((size / 1024)*100)/100) + "KB";
	if(size < 1073741824)
		return padSize( parseInt((size / 1048576)*100)/100) + "MB";
	return padSize( parseInt((size / 1073741824)*100)/100) + "GB";
}
		// helper function to pad the right side of the file size
function padSize(size){
	var temp = String(size);
	var index = temp.lastIndexOf(".");
	if(index == -1)
		return temp + ".00";
	else if(index == temp.length - 2)
		return temp + "0";
	else
		return temp;
}

function showUploadButton(elementId){
	var html="";
	//上传图片...
	//<a class=\"linkUploadPic\" href=\"javascript:void(0)\" onclick=\"if(fileCount >= maxFileNum){alert('您已上传'+maxFileNum+'张图片，不能再上传。\\r\\n\\r\\n若要更换已上传图片，请先将已上传图片删除！');}else{openFileUploader();}\" >上传图片...</a>
	html += "<div id=\"upload-btn-container\"><a class=\"linkUploadPic\" href=\"javascript:void(0)\" onclick=\"if(fileCount >= maxFileNum){alert('您已上传'+maxFileNum+'张图片，不能再上传。\\r\\n\\r\\n若要更换已上传图片，请先将已上传图片删除！');}else{openFileUploader();}\" >上传图片...</a></div>\r\n";
	html += "<div id=\"upload-file-container\" class=\"clearfix\">\r\n";
	html += "</div>\r\n";
	html += "<div class=\"clear height1\"></div>\r\n";
	if(elementId && jQuery('#'+elementId).length<1){
		return;
	}else{
		jQuery('#'+elementId).html(html);
	}
}
showUploadButton("ssscUploader");


//屏蔽ie6不显示的bug
//function btnUploadPicShow(){
//	jQuery('#ssscUploader input.btnUploadPic').css('zoom','1');
//}
//setTimeout(btnUploadPicShow,500);



if(flashCheckResult && flashCheckResult.f && flashCheckResult.v>=10){
	showUploader(1);
} else {
	showUploader(2);
}
