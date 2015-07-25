var n=1;
alert("ok1");
$(document).ready(function(){
	alert("ok");
	/*
	这里showAuto函数的作用是背景图片轮换显示
	*/
	/*function showAuto(){
		n = (n>=7?1:++n);//从0开始的
		$("#bgimg").fadeIn(2000);
		$("#bgimg").attr("src","imgs/"+n+".jpg");
		//$("#bgimg").css("opacity","0.5");
		$("#bgimg").fadeOut(2000);
	}
	setInterval(showAuto, 4000);*/
	/*function startAudio(){
		$("#myaudio").attr("src","media/"+1+".mp3");
	}*/
	/*
	定义一个    歌曲列表的对象：这里是利用函数创建对象
	this.属性名 表示 公开属性
	var.属性名 表示 私有属性
	*/
	var Zzx = function(o){
		//判断是不是对象，若是则为o不是则建立一个空对象
		this.setting = (typeof o === 'object')?o:{};
		//定义对象的模式，新歌，排行榜等，详见setting对象
		this.target = this.setting.target||'newSong';
		//定义对象的类型，让它是个数字，详见setting对象
		this.type = typeof this.setting.type === 'number'?this.setting.type : parseInt(this.setting.type);
		//初始列表时候，第一次加载的歌曲数目
		this.firstCount  = typeof this.setting.firstCount === 'number' ? this.setting.firstCount : parseInt(this.setting.firstCount);
		//每次增加的歌曲数目
		this.Count  	 = typeof this.setting.Count === 'number' ? this.setting.Count : parseInt(this.setting.Count);
		//定义对象的内容是什么
		this.$content    = $("#content");	
		//定义一个对象成员函数
		this.init();
	}
	/*
	给原型对象添加函数
	*/
	Zzx.prototype = {
		init:function(){
			//列表初始化，获得id为content的元素，将它的文本设为空
			this.content.html("");
			//堆栈指针初始化
			this.stack = 0; //?????????
			//图片路径
			this.imgPath = 'data/';
			//定时器
			this.timer = null;
			//测试JSON数据（可以替换为ajax请求返回值）
			this.testJson = {
				list:[
				{src:"hnh.jpg",title:"情歌-梁静茹",song:"情歌"}，
				{src:"ywaq.jpg",title:"因为爱情-王菲",song:"因为爱情"},
				{src:"hnh.jpg",title:"情歌-梁静茹",song:"情歌"},
				{src:"ywaq.jpg",title:"因为爱情-王菲",song:"因为爱情"},
				{src:"hnh.jpg",title:"情歌-梁静茹",song:"情歌"},
				{src:"ywaq.jpg",title:"因为爱情-王菲",song:"因为爱情"},
				{src:"hnh.jpg",title:"情歌-梁静茹",song:"情歌"},
				{src:"ywaq.jpg",title:"因为爱情-王菲",song:"因为爱情"},
				{src:"hnh.jpg",title:"情歌-梁静茹",song:"情歌"},
				{src:"ywaq.jpg",title:"因为爱情-王菲",song:"因为爱情"},
				{src:"hnh.jpg",title:"情歌-梁静茹",song:"情歌"},
				{src:"ywaq.jpg",title:"因为爱情-王菲",song:"因为爱情"},
				{src:"hnh.jpg",title:"情歌-梁静茹",song:"情歌"},
				{src:"ywaq.jpg",title:"因为爱情-王菲",song:"因为爱情"},
				{src:"hnh.jpg",title:"情歌-梁静茹",song:"情歌"},
				{src:"ywaq.jpg",title:"因为爱情-王菲",song:"因为爱情"},
				{src:"hnh.jpg",title:"情歌-梁静茹",song:"情歌"},
				{src:"ywaq.jpg",title:"因为爱情-王菲",song:"因为爱情"},
				{src:"hnh.jpg",title:"情歌-梁静茹",song:"情歌"},
				{src:"ywaq.jpg",title:"因为爱情-王菲",song:"因为爱情"},
				{src:"hnh.jpg",title:"情歌-梁静茹",song:"情歌"},
				{src:"ywaq.jpg",title:"因为爱情-王菲",song:"因为爱情"}
				]
			}
			this.createList(true);//true初次加载列表
			//this.addHandle();
		},

		//创建内容列表
		createList:function(boolean){
			//boolean:true/false确定是否初次载入
			//创建一个ul结点，给对象ulNode
			this.ulNode = $("<ul></ul>");
			//这里的this.target = newSong
			this.ulNode.attr('id',this.target+'list');
			//给id为content的结点的对象$content追加ulNode
			this.$content.append(this.ulNode);
			//查询到id为newSonglist结点，赋给对象
			this.ulTarget = $("#"+this.ulNode.id);
			//this.createMore();
			this.loadList(boolean);//将是否是初次插入，传递下去
		},

		//创建“更多”按钮
		createMore:function(){
			this.moreNode = document.createElement("div");
			this.moreNode.className = 'm';
			this.moreNode.innerHTML = '更多';
			this.moreNode.id = this.target+'more';
			this.moreTarget = $("#"+this.moreNode.id);
		},

		//加载列表
		loadList:function(boolean){
			var oList = this.testJson.list;//数组也是对象
			var oLength;
			if(boolean){  //若为真，则是初次插入
				oLength = (oList.length > this.firstCount) ? this.firstCount: oList.length;			
			}else{//stack表示列表中现在的索引值
				oLength = ((oList.length-this.stack) > this.Count)? this.Count: (oList.length-this.stack);				
			}	
			if(oLength<=0){
				this.moreTarget.text("这是最后一页了！");
			};
		
			/*if(!this.moreTarget[0]){
				this.content.append(this.moreNode);				
			};*/
			//加载多少首歌，就执行多少次
			for(var i = 0 ; i < oLength ; i++){				
				this.loadDate(oList);
			}
		},

		//加载列表数据
		loadDate:function(oList){
			switch(this.type){
				//根据不同的模块，定制不同的数据展示形式
				case 1: ulTarget.append(
					'<li onclick = "myControl.selectList(this,'+this.stack+')">'
					+'<span style = "display:none;" class = "musicData" value='+oList[this.stack].song+' title='+oList[this.stack].title+'></span>'
					+'<div class = "textBox">'+oList[this.stack].title+'<p>金莎</p></div>'
					+'</li>'
					);
				break;
				case 2: this.content[0].innerHTML  = '此模块建设中...';
				break;
				default: alert("message");
			}
			this.stack+=1;
		},

		//更多按钮的绑定事件
		addHandle:function(){
			var that = this;
			$("#"+this.moreNode.id).bind('click',function(){
				//加载更多列表
				that.createList(false);
			});
		},
	}

	//播放器控制面板 对象
	var Control = function(o){
		this.setting         = (typeof o === 'object')? o : {};		
		this.audio           = this.setting.audio;
		//进度条
		this.progressWrap    = this.setting.progressWrap;
		//播放模式：单曲循环等
		this.playModeNode    = this.setting.playModeNode;
		this.playBtn         = this.setting.playBtn;//开始，暂停
		this.playTitle       = this.setting.playTitle;
		this.singerHead      = this.setting.singerHead;
		//歌曲的播放进度
		this.progress        = this.setting.progress;
		this.oWinObj         = this.setting.oWinObj;
		//总时间
		this.allTimeNode     = this.setting.allTimeNode;
		//当前时间	  
		this.currentTimeNode = this.setting.currentTimeNode;  
		this.path            = 'media/';  //歌曲路径（相对于html）
		this.imgPath         = 'data/';   //图片路径（相对于html）
		this.init();		
	}

	Control.prototype = {
		//初始化
		init:function(){
			//播放控制
			this.start = true;
			//定时器
			this.timer = null;
			this.audio.src = null;
			//可选播放模式
			this.ModeData = [
			{mode:'default',text:'顺序播放模式'},
			{mode:'random',text:'随机播放模式'},
			{mode:'single',text:'单曲循环模式'}
			];
			//默认播放模式
			this.ModeIndex = 0;
			this.playMode = this.ModeData[this.ModeIndex].mode;
		},
		//选择歌曲列表，点击的那个，this就指的那个li
		selectList:function(_this,stack){//_this表示最初的对象
			var allow = true;
			var index = null;
			this.oLi = _this;
			this.oUl = _this.parentNode;//对象父节点
			if(index == stack && !this.start ){
				allow = false;
			}
			index = stack;
			this.loadMusic();//后台加载音乐
			if(allow){
				this.goPlay();
			}else{
				this.goPause();
			}
		},
		//上一首
		prev:function(){
			if(this.oLi.previousSibling!=null){	
				this.oLi = this.oLi.previousSibling;
				this.loadMusic();
			}else{
				this.oWindow("已经是第一首了哦！");
			}
			this.goPlay();
		},
		//主控键
		mainControl:function(){
			if(this.start){
				this.goPlay();
			}else{
				this.goPause();
			}
		},
		//下一首
		next:function(){
			if(this.oLi.nextSibling!=null){
				this.oLi = this.oLi.nextSibling;
				this.loadMusic();
			}else{
				this.oWindow("已经是最后一首了哦！")
			}
			this.goPlay();
		},
		//播放模式选择
		selectMode:function(){
			//先看索引号，自动加1
			this.ModeIndex = (this.ModeIndex<(this.ModeData.length-1))?(this.ModeIndex+1):0;
			//根据索引号，找到对应的模式文本
			this.playMode = this.ModeData[this.ModeIndex].mode;
			this.oWindow(this.ModeData[this.ModeIndex].text);
			this.playModeNode.attr("class","mode-"+this.playMode);
		},
		//播放进度(时间)选择
		selectTime:function(event){
			//pageX() 属性是鼠标指针的位置，相对于文档的左边缘
			var moveTo = event.pageX - this.progressWrap.offset().left;
			this.audio.currentTime = moveTo/parseInt(this.progressWrap.css("width"))*this.audio.duration;
			this.progress.css("width",moveTo+"px");
		},
		//自动播放
		autoPlay:function(){
			//监听歌曲结束
			var that = this;
			this.audio.addEventListener('ended', function () {
				if(typeof that.playMode==='string')
				{	//播放模式判断	
					switch(that.playMode){
						case 'default': that.oLi = (that.oLi.nextSibling!=null)?that.oLi.nextSibling:that.oUl.childNodes[0];
										break;
						 case 'random': that.oLi = that.oUl.childNodes[Math.round(Math.random()*(that.oUl.childNodes.length-1))];
										break;
						 case 'single': ;
							   default: ;
					}
					that.loadMusic();
					that.goPlay();
				}else{
					that.oWindow("循环类型不符!");		
				}
			},false);
		},
		//加载要播放的歌曲
		loadMusic:function(){
			$obj = $(this.oLi)
			var song = $obj.find(".musicData").attr("value");//获得隐藏的span中的value属性	
			//var pic = $obj.find(".musicData").attr("pic");
			var title = $obj.find(".musicData").attr("title");
			//this.singerHead.attr("src",this.imgPath + pic)
			this.audio.src = this.path + song +'.mp3';
			this.playTitle.html(title);
		},
		//判断当前是否歌曲列表
		songReady:function(){
			if(!this.audio.src){
				this.oWindow("请先选择歌曲！")
				return false;
			}else{
				return true;
			}
		},
		//转换成时间格式
		timeDispose:function(){
			var minute = parseInt(number / 60);
			var second = parseInt(number % 60);
			minute = minute >= 10 ? minute : "0" + minute;
			second = second >= 10 ? second : "0" + second;
			return minute + ":" + second;
		},

		//自定义提示框
		oWindow:function(oText){
			this.oWinObj.show();
			this.oWinObj.html(oText);
			var doc = document.documentElement;
			var oWinX = (doc.clientWidth - this.oWinObj[0].offsetWidth)/2;
			var oWinY = (doc.clientHeight - this.oWinObj[0].offsetHeight-50)/2;
			this.oWinObj.css('left',oWinX+'px');
			this.oWinObj.css('top',oWinY+'px');
			var _this = this;
			setTimeout(function(){_this.oWinObj.hide();},1000)
		},
		
		//播放时间
		oTime:function(){
			if(this.audio.readyState >=4){
				var currentProgress = Math.round(this.audio.currentTime/this.audio.duration*parseInt(this.progressWrap.css("width")));
				this.progress.css("width",currentProgress+"px");
				this.allTimeNode.html(this.timeDispose(this.audio.duration));
				this.currentTimeNode.html(this.timeDispose(this.audio.currentTime));
			}
		},
		
		//播放
		goPlay:function(){
			if(this.songReady()){//若是没有选择歌曲，那么无效		
				this.audio.play();//详查audio对象的函数
				var _this = this;
				this.goPlayStyle();//开始，暂停
				this.timer = setInterval(function(){_this.oTime()},1000)//每个1s显示一次，执行一次
				this.start = false;//已经开始过了，那么标记就false
				this.autoPlay();
			}
		},
		
		//暂停
		goPause:function(){
			this.audio.pause();
			this.goPauseStyle();
			clearInterval(this.timer);
			this.start = true;
		},
		
		//播放样式
		goPlayStyle:function(){
			var $oLiIndex = $(this.oLi);
			//$(".frmPause").removeClass("frmPause");
			//$oLiIndex.find(".frmPlay").addClass("frmPause");				
			this.playBtn.addClass("pause");
			this.playBtn.removeClass("play");
		},
		
		//暂停样式
		goPauseStyle:function(){
			var $oLiIndex = $(this.oLi);
			//$(".frmPause").removeClass("frmPause");
			this.playBtn.addClass("play");
			this.playBtn.removeClass("pause");	
		}			

	}
	function ZzxMusic(){
		var aa = {};
		//模块设置 新歌，排行榜 歌手 电台
		//这里的setting也是一个对象
		var setting = {
			//这里我只用到了新歌这个模式，一开始列表中有6首歌，以后每次加5
			newSong:{'target':'newSong','type':'1','firstCount':6,'Count':5},
			songCharts:{'target':'newSong','type':'1','firstCount':2,'Count':4},
			singer:{'target':'newSong','type':'1','firstCount':8,'Count':7},
			radioStation:{'target':'newSong','type':'1','firstCount':9,'Count':2}
		};
		//默认加载模块，创建一个 歌曲列表，参数是一个对象
		aa.newSong = new Zzx(setting.newSong);
		aa.newSong.init();
		/*//模块初始化，在 歌曲后面继续添加行
		$(".songList").children("li").bind('click',function(){
			for(var i in setting){//取对象属性，查找是哪种模式
				if($(this).attr("id")==i){//此处的this为选中的li
					if(typeof aa[i]==='undefined'){
						aa[i] = new Zzx(setting[i]);
					}else{
						aa[i].init();
					}				
				}
			}
			$(".menu_hover").removeClass("menu_hover");
			//给当前的歌曲模式 写class
			$(this).addClass("menu_hover");
		})*/	
	}
	//实例化控制台
	var myControl = new Control({
		audio : $("#myMusic"), //播放器
		//audio : document.getElementById("myMusic"), //播放器
	  	playModeNode : $("#modeButton"),	 //模式选择按钮
		playBtn : $(".play-pause"),   //主控按钮
		playTitle : $("#musicTitle"),   //歌曲TITLE容器
		singerHead : $("#singerHead"),   //歌曲插图容器
	  	progressWrap : $(".bar"), //歌曲进度条容器
		progress : $("#barprogress"),     //歌曲进度条
		oWinObj : $("#oWindow"),		 //警告窗容器
	   	allTimeNode : $("#totalTime"),    //当前时间容器
   		currentTimeNode : $("#currentTime")   //当前时间容器
	});	

	ZzxMusic();
	alert("message");
});
