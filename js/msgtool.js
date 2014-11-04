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
	showBoldAndUrl: function(txt){
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
	}
};

module.exports = msgtool;
})