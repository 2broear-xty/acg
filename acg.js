$(function(){
	var jsonObj = [{
		"title":{
			"en":"anime",
			"cn":"动漫电影"
		}
	}, {
		"title":{
			"en":"comic",
			"cn":"动画漫画"
		}
	}, {
		"title":{
			"en":"game",
			"cn":"游戏佳作"
		}
	}, {
		"title":{
			"en":"movie",
			"cn":"精彩影片"
		}
	}, {
		"title":{
			"en":"tv",
			"cn":"电视剧"
		}
	}],
	jsonCount = [], elsCount = [],
	csJson = function(init,max){
		this.init = init;
		this.max = max;
	};
	for(k in jsonObj){
		let key = Number(k)+1,
			val = jsonObj[k],
			jsonc = val.title.cn,
			jsone = val.title.en,
			jsonp = eval(jsone),
			obj = '.info.'+jsone+' .inbox.more',
			elsObj = '.'+jsone+' h2',
			elsNum = 0;
		jsonCount.push(jsonp.length);
		elsCount.push(elsNum);
		var csfn = new csJson(elsCount, jsonCount);
		// console.log(jsonCount+csfn.init+csfn+max)

		// 加载元素/00
		$(".counter").append('<div class="'+jsone+'"><a href="#'+jsone+'"><h2></h2><p>'+jsonc+'/'+jsone.toUpperCase()+'</p></a></div>')
		$(".rcmd-boxes").append('<div class="inbox-clip wow fadeInUp" data-wow-delay="0.25s"><h2 id="'+jsone+'">'+jsonc+'<sup> '+jsone+' </sup></h2></div><div class="info '+jsone+' flexboxes wow fadeInUp" data-wow-delay="0.15s"><div class="inbox more flexboxes"><div class="inbox-more flexboxes"><a href="mailto:xty@2broear.com" title="发送邮件，荐你所见"></a></div></div></div>');
		
		// 计算并写入 jsonObj 对象数量
		function calcTimer(tname,tnum,tel,tjson){
			tname = setInterval(function(){
				tnum++;
				$(tel).text(tnum).append('<sup>+</sup>');
				tnum>=tjson ? clearInterval(tname) : false
			},100)
		}calcTimer(jsonCount[k],elsNum,elsObj,jsonCount[k]);

		// 加载 jsonObj 对象到元素
		for(var i in jsonp){
			if(jsonp[i].class == undefined){
				$(obj).before('<div class="inbox flexboxes"><div class="inbox-headside flexboxes"><span class="author">'
						+jsonp[i].subtitle+
						'</span><img class="bg" src="images/'+key+'/'+jsonp[i].id+'.jpg" /><img src="images/'+key+'/'+jsonp[i].id+'.jpg" /></div><div class="inbox-aside"><span class="lowside-title"><h4><a href="'
						+jsonp[i].src+
						'" target="_blank">'
						+jsonp[i].title+
						'</a></h4></span><span class="lowside-description"><p>'
						+jsonp[i].description+
						'</p></span></div></div>')
			}else{
				$(obj).before('<div class="inbox flexboxes"><div class="inbox-headside flexboxes"><span class="author">'
						+jsonp[i].subtitle+
						'</span><img class="bg" src="images/'+key+'/'+jsonp[i].id+'.jpg" /><img src="images/'+key+'/'+jsonp[i].id+'.jpg" /></div><div class="inbox-aside"><span class="lowside-title"><h4><a href="https://store.steampowered.com/app/'
						+jsonp[i].src+
						'" target="_blank">'
						+jsonp[i].title+
						'</a></h4></span><span class="lowside-description"><p>'
						+jsonp[i].description+
						'</p></span><div class="game-ratings '
						+jsonp[i].class+
						'"><div class="ign" title="IGN Ratings"><h3 style="color: #fff;">'
						+jsonp[i].ign_rating+'</h3></div><div class="gamespot" title="GameSpot Ratings"><div class="range"><span id="before"></span><span id="after"></span></div><span id="spot"><h3 style="color: #fff;">'
						+jsonp[i].gs_rating+'</h3></span></div></div></div></div>')
			}
		}
	};

	// jsonObj-jgame 评分逻辑
	function ratingRange(){
		var baseRange = 90,afterRange = 180,
			fullRangeA = baseRange+afterRange;
		$('.inbox-aside .game-ratings.gs .gamespot h3').each(function(){
			var RS = $(this),
				RSP = RS.parent().siblings('.range'),
				RSPA = RSP.children('#after'),
				RSPB = RSP.children('#before'),
				RSLen = RS.length,
				RSTxt = $(this).text(), //String
				RSNum = (parseInt(RSTxt)),
				RSNumFloat = (parseFloat(RSTxt)),
				RSNumPer = (RSNumFloat/10).toFixed(2), //Number Percentage 0.85
				RSNumPerFloat = (RSNumPer*fullRangeA).toFixed(1); //0.85(percent)*270(fullRangeA)=rotateAngle
			if(RSNum > 0){
				var cSpots,_cSpots,
					_RSNumPerFloat = RSNumPerFloat, //设定对比值]
					_RSNumPerFloat_ = (RSNumPer*(90)).toFixed(1); //特定对比值
				function numFloat(){
					var num=0,
						timer = setInterval(function(){
						num+=0.1;
						if(RSNumFloat > 0 && RSNumFloat <= 5){
							RS.text((num+0.0).toFixed(1));
						}else if(RSNumFloat > 5 && RSNumFloat < 10){
							RS.text((num-0.1).toFixed(1));
						}else if(RSNumFloat == 10){
							RS.text((num-0.1).toFixed(0));
						}
						if(num>=RSTxt){
							clearInterval(timer);
						}
					},20);
				};
				//得分大于0，小于等于5
				if(RSNumFloat > 0 && RSNumFloat <= 5){
					RSP.addClass('RSBIndex');
					RSPA.hide();
					RSPB.css({'transform':'rotate('+(_RSNumPerFloat_)+'deg)'}); //(-RSNumPerFloat)反向旋转
					//mouseenter/leave:
					RS.parents('.rcmd-boxes .info.game .inbox').mouseenter(function(){
						RSPB.css({'transform':'rotate('+(-RSNumPerFloat)+'deg)'}); //-90
						numFloat(); //浮动数字
					}).mouseleave(function(){
						RSPB.css({'transform':'rotate('+(_RSNumPerFloat_)+'deg)'}); //%
					});
				};
				
				//得分大于5，小于等于10
				if(RSNumFloat > 5 && RSNumFloat <= 10){
					RSPA.css({'transform':'rotate('+RSNumPerFloat+'deg)'}); //按百分比设定初始值
					//mouseenter/leave:animation
					RS.parents('.rcmd-boxes .info.game .inbox').mouseenter(function(){
						//clearInterval(timer); //清除浮动数字
						clearInterval(_cSpots); //清除本地定时器
						clearInterval(cSpots); //清除(鼠标移出)定时器
						//设定本地定时器
						_cSpots = setInterval(function(){
							RSNumPerFloat--;
							RSPA.css({'transform':'rotate('+(RSNumPerFloat)+'deg)'});
							if(RSNumPerFloat <= 30){
								RSP.addClass('RSBIndex');
								RSPB.css({'transform':'rotate('+(RSNumPerFloat)+'deg)'});
								RSPA.css({'z-index':''});
							}
							if(RSNumPerFloat <= (-90)){
								clearInterval(_cSpots); //清除本地定时器
							}
						},0);
						numFloat(); //浮动数字
					}).mouseleave(function(){
						clearInterval(_cSpots); //清除(鼠标移入)定时器
						clearInterval(cSpots); //清除本地定时器
						//设定本地定时器
						cSpots = setInterval(function(){
							RSNumPerFloat++;
							RSPA.css({'transform':'rotate('+(RSNumPerFloat)+'deg)'});
							if(RSNumPerFloat > 160){
								RSPB.css({'transform':''});
								RSPA.css({'z-index':'4'});
							}
							if(RSNumPerFloat >= (_RSNumPerFloat)){
								clearInterval(cSpots); //清除本地定时器
							}
						},0)
					});
				};
			};
			switch(true){
				case (RSNumFloat == 10):
					RSP.addClass('Essential');
					break;
				case (RSNumFloat>=9 && RSNumFloat<10):
					RSP.addClass('Superb');
					break;
				case (RSNumFloat>=8 && RSNumFloat<9):
					RSP.addClass('Great');
					break;
				case (RSNumFloat>=7 && RSNumFloat<8):
					RSP.addClass('Good');
					break;
				case (RSNumFloat>=6 && RSNumFloat<7):
					RSP.addClass('Fair');
					break;
				case (RSNumFloat>=5 && RSNumFloat<6):
					RSP.addClass('Medicore');
					break;
				case (RSNumFloat>=4 && RSNumFloat<5):
					RSP.addClass('Poor');
					break;
				case (RSNumFloat>=3 && RSNumFloat<4):
					RSP.addClass('Bad');
					break;
				case (RSNumFloat>=2 && RSNumFloat<3):
					RSP.addClass('Terrible');
					break;
				case (RSNumFloat>=1 && RSNumFloat<2):
					RSP.addClass('Abysmal');
					break;
				default:
					return 'error'
			};
		})
	}ratingRange();
})
