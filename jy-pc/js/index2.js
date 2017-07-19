$(document).ready(function() {
	$("#home-header").load("./html/header.html")
	$("#home-footer").load("./html/footer.html")
	   setInterval(GetRTime,1000);
	   homeAside()

//===========================侧栏的左边距离
	function homeAside(){
		var bodyWidth = document.body.clientWidth,
			left = (bodyWidth -1200)/2-70;
			left = left + 'px';
			$("#home-aside").css("left",left)
		$(window).resize(function() {
			var bodyWidth = document.body.clientWidth,
			left = (bodyWidth -1200)/2-70;
			if(left >= 0){
				left = left + 'px';
				$("#home-aside").css("left",left)
			}
		});

		$(window).scroll(function(){
			var top = ($(document).scrollTop());
			if(top > 840){
				$("#home-aside").show()
			}else if(top <= 600){
				$("#home-aside").hide()
			}
			var lh = $(".main-floor").length;
			for(var i=0; i<lh; i++){
				floorTop = $(".main-floor").eq(i).offset().top;
				floorHeight = $(".main-floor")[i].clientHeight;
				if(top >= (floorTop-150) && top <= (floorTop+floorHeight)){
					var idx = i;
					$('#home-aside ul li').eq(idx+1).find('a').addClass('asideStyle').parent("li").siblings().find('a').removeClass("asideStyle")
				}
			}
		})
	};


	   	function GetRTime(){
	       var EndTime= new Date('2018/06/8 10:00:00'); //截止时间 前端路上 http://www.51xuediannao.com/qd63/
	       var NowTime = new Date();
	       var t =EndTime.getTime() - NowTime.getTime();
	       /*var d=Math.floor(t/1000/60/60/24);
	       t-=d*(1000*60*60*24);
	       var h=Math.floor(t/1000/60/60);
	       t-=h*60*60*1000;
	       var m=Math.floor(t/1000/60);
	       t-=m*60*1000;
	       var s=Math.floor(t/1000);*/

	       var d=Math.floor(t/1000/60/60/24);
	       var h=Math.floor(t/1000/60/60%24);
	       var m=Math.floor(t/1000/60%60);
	       var s=Math.floor(t/1000%60);
		   if(h < 10 && h > 0){ h = ('0'+h) };
		   if(m < 10 && m > 0){ m = ('0'+m) };
		   if(s < 10 && s > 0){ s = ('0'+s) };
		   $('#home-main .mainOne .one .moddle .hour').html(h)
		   $('#home-main .mainOne .one .moddle .minute').html(m)
		   $('#home-main .mainOne .one .moddle .second').html(s)
//	       document.getElementById("t_d").innerHTML = d + "天";
//	       document.getElementById("t_h").innerHTML = h + "时";
//	       document.getElementById("t_m").innerHTML = m + "分";
//	       document.getElementById("t_s").innerHTML = s + "秒";
	   }


//	==========================导航条的设置
	$("#home-nav li").hover(function(m,n){
		$(this).css("background","#5e8f1a").siblings().css("background","#95c357")
	},function(){
		$(this).css("background","#95c357")
		$("#home-nav li").eq(0).css("background","#5e8f1a")

	})
	

	
	
//	地区馆的鼠标移入效果

	$("#home-main .main-diqu .banshouTop .diquName .diqu-mingzi .yuan").hover(function(){
		var idx = $(this).parents(".diqu-mingzi").index()
		$(this).css({"background":" #fda702","box-shadow":"0 0 5px 5px #d0c08b"}).parents(".diqu-mingzi").siblings(".diqu-mingzi").find(".yuan").css({"background":"#fff","box-shadow":"none"})
		$(this).siblings(".name").css("color","#fda702").parents(".diqu-mingzi").siblings(".diqu-mingzi").find(".name").css("color","#fff")
		$(this).parents(".diquName").siblings(".jieshao").find(".diqujieshao").eq(idx).show().siblings(".diqujieshao").hide();
		$("#home-main .main-diqu .banshouTop .img img").eq(idx).show().siblings("img").hide();
	},function(){
//		$("#home-main .main-diqu .banshouTop .diquName diqu-guiyang .name").css("color","#fda702")
//		$("#home-main .main-diqu .banshouTop .diquName diqu-guiyang .yuan").css({"background":" #fda702","box-shadow":"0 0 5px 5px #d0c08b"})
	})
	
	$("#home-main .main-diqu .banshouTop .diquName .diqu-mingzi .name").hover(function(){
		var idx = $(this).parents(".diqu-mingzi").index()
		$(this).css("color","#fda702").parents(".diqu-mingzi").siblings(".diqu-mingzi").find(".name").css("color","#fff")
		$(this).siblings(".yuan").css({"background":" #fda702","box-shadow":"0 0 5px 5px #d0c08b"}).parents(".diqu-mingzi").siblings(".diqu-mingzi").find(".yuan").css({"background":"#fff","box-shadow":"none"})
		$(this).parents(".diquName").siblings(".jieshao").find(".diqujieshao").eq(idx).show().siblings(".diqujieshao").hide();
		$("#home-main .main-diqu .banshouTop .img img").eq(idx).show().siblings("img").hide();
	},function(){
//		$("#home-main .main-diqu .banshouTop .diquName diqu-guiyang .name").css("color","#fda702")
//		$("#home-main .main-diqu .banshouTop .diquName diqu-guiyang .yuan").css({"background":" #fda702","box-shadow":"0 0 5px 5px #d0c08b"})
	})
	
	
//	获取数据

	$.ajax({
		type:"get",
		url:"http://p1.t.jiayou9.com/index.php?callback=1",
		async:true,
		dataType:"jsonp",
		success: function(res){
			var data = res.data;
			console.log(data)
//		标题
			$("#home-shengtai .main-title").append(
				`<span class="styleTitle"></span>
				<span class="titleName" id = ${data.shengtai_channel.id}>${data.shengtai_channel.title}</span>`
			)
			$("#home-banshou .main-title").append(
				`<span class="styleTitle"></span>
				<span class="titleName" id = ${data.banshouli_channel.id}>${data.banshouli_channel.title}</span>`
			)
			$("#home-diqu .main-title").append(
				`<span class="styleTitle"></span>
				<span class="titleName" id = ${data.dibiao_channel.id}>${data.dibiao_channel.title}</span>`
			)
			$("#home-meishi .main-title").append(
				`<span class="styleTitle"></span>
				<span class="titleName" id = ${data.meishi_channel.id}>${data.meishi_channel.title}</span>`
			)
			$("#home-chajiu .main-title").append(
				`<span class="styleTitle"></span>
				<span class="titleName" id = ${data.cha_channel.id}>${data.cha_channel.title}</span>`
			)
			$("#home-shuiguo .main-title").append(
				`<span class="styleTitle"></span>
				<span class="titleName" id = ${data.shuiguo_channel.id}>${data.shuiguo_channel.title}</span>`
			)
			$("#home-gongyi .main-title").append(
				`<span class="styleTitle"></span>
				<span class="titleName" id = ${data.yipin_channel.id}>${data.yipin_channel.title}</span>`
			)
			$("#home-meizhuang .main-title").append(
				`<span class="styleTitle"></span>
				<span class="titleName" id = ${data.meizhuang_channel.id}>${data.meizhuang_channel.title}</span>`
			)
			$("#home-muying .main-title").append(
				`<span class="styleTitle"></span>
				<span class="titleName" id = ${data.muying_channel.id}>${data.muying_channel.title}</span>`
			)
			$("#home-yiliao .main-title").append(
				`<span class="styleTitle"></span>
				<span class="titleName" id = ${data.yiliao_channel.id}>${data.yiliao_channel.title}</span>`
			)
			
//			轮播图数据
			$.each(data.lunbo,function(m,n){
				$("#home-banner .swiper-wrapper").append(
					$("<img>").addClass('swiper-slide').attr("src",n.lunbo_imgurl)
	            )
				//	==========================轮播图的设置
				var mySwiper = new Swiper('.swiper-container', {
					autoplay: 2000,//可选选项，自动滑动
					loop : true,//环路
					prevButton:'.swiper-button-prev',//左右按钮
					nextButton:'.swiper-button-next',
					pagination : '.swiper-pagination',//分页器
					autoplayDisableOnInteraction : false,//点击后继续播放
				})
				$('.swiper-container').mouseenter(function(){
					mySwiper.stopAutoplay()
				}).mouseleave(function(){
					mySwiper.startAutoplay()
				})
				
			})
//			生态馆数据
			$.each(data.shengtai_channel.channel_lunbo_son,function(m,n){
				$("#home-shengtai .shengtaiTop").append(
					$("<img>").attr("src",n.lunbo_imgurl)
				)
			})
			$.each(data.shengtai_channel.goods_detaill_arr,function(m,n){
				
				$("#home-shengtai .gonggongStyleOne").append(
					`<li id = ${n.goods_id}>
                    <div class="img">
                        <img src=${n.goods_thumb}  alt="" />
                    </div>
                    <div class="message">
                        <p class="goodPri">
                            <span class="dashed"></span>
                            <span class="price">￥<span>${n.shop_price}</span></span>
                            <span class="dashed"></span>
                        </p>
                        <p class="goodName">${n.goods_name}</p>
                        <p class="goodMessage"></p>
                    </div>
                </li>`
				)
			})
//			伴手礼数据=============================伴手礼的数据=====================
			$("#home-banshou .banshouTop").append(
					`<img src=${data.banshouli_channel.channel_lunbo_son[0].lunbo_imgurl} alt="" class="banshouTopImg"/>`
				)
			$.each(data.banshouli_channel.goods_detaill_arr,function(m,n){
				$("#home-banshou ul").append(
					`<li id = ${n.goods_id}>
	                    <img src=${n.goods_thumb} alt="" />
	                    <div class="message">
	                        <p class="banshouTitle">伴手礼之精品</p>
	                        <p class="goodName">${n.goods_name}</p>
	                        <p class="goodMessage">${n.goods_brief}</p>
	                        <p class="price">￥<span>${n.shop_price}</span></p>
	                    </div>
	                </li>`
				)
			})
//			地区馆数据
			
////=================================地区馆===============================
			$.each(data.dibiao_channel.goods_detaill_arr,function(m,n){
				$("#home-diqu .gonggongStyleOne").append(
					`<li id = ${n.goods_id}>
                    <div class="img">
                        <img src="${n.goods_thumb}" alt="" />
                    </div>
                    <div class="message">
                        <p class="goodPri">
                            <span class="dashed"></span>
                            <span class="price">￥<span>${n.shop_price}</span></span>
                            <span class="dashed"></span>
                        </p>
                        <p class="goodName">${n.goods_name}</p>
                        <p class="goodMessage">${n.goods_name}</p>
                    </div>
                </li>`
				)
			})
//			
			function liHtml(m,n){
				var liHtml = `<li id = ${n.goods_id}>
		                    <div class="goodImg">
		                        <img src="${n.goods_thumb}" alt="" />
		                        <p class="slideUP"><i class="jy-iconfont shop-icon"></i>加入购物车</p>
		                    </div><br />
		                    <div class="goodMessage">
		                        <p class="goodsName">${n.goods_name}</p>
		                        <p class="goodsPrice">￥<span>${n.shop_price}</span></p>
		                    </div>
		                </li>`
				return(liHtml)
			}
			function lip(m,n){
				var lip = `<li>
		           	 		<p>${n}</p>
		           	 	</li>`
				return lip;
			}
////===================================美食================================:
			$.each(data.meishi_channel.tab,function(m,n){
				$("#home-meishi .gonggongStyleTwo .main-option").append(lip(m,n))
			})
			$.each(data.meishi_channel.xiushi,function(m,n){
				$("#home-meishi .gonggongStyleTwo .oneShow").append(liHtml(m,n))
			})
			$.each(data.meishi_channel.liangyou,function(m,n){
				$("#home-meishi .gonggongStyleTwo .liangyou").append(liHtml(m,n))
			})
			$.each(data.meishi_channel.tiaowei,function(m,n){
				$("#home-meishi .gonggongStyleTwo .tiaowei").append(liHtml(m,n))
			})
			$.each(data.meishi_channel.ganhuo,function(m,n){
				$("#home-meishi .gonggongStyleTwo .ganhuo").append(liHtml(m,n))
			})
//			
////===================================茶酒================================:
			$.each(data.cha_channel.tab,function(m,n){
				$("#home-chajiu .gonggongStyleTwo .main-option").append(lip(m,n))
			})
			$.each(data.cha_channel.cha,function(m,n){
				$("#home-chajiu .gonggongStyleTwo .oneShow").append(liHtml(m,n))
			})
			$.each(data.cha_channel.jiulei,function(m,n){
				$("#home-chajiu .gonggongStyleTwo .jiulei").append(liHtml(m,n))
			})
			$.each(data.cha_channel.yinliao,function(m,n){
				$("#home-chajiu .gonggongStyleTwo .yinliao").append(liHtml(m,n))
			})
			
//
////===================================水果================================:
			$.each(data.shuiguo_channel.tab,function(m,n){
				$("#home-shuiguo .gonggongStyleTwo .main-option").append(lip(m,n))
			})
			$.each(data.shuiguo_channel.shuiguo,function(m,n){
				$("#home-shuiguo .gonggongStyleTwo .shuiguo").append(liHtml(m,n))
			})
			$.each(data.shuiguo_channel.yurou,function(m,n){
				$("#home-shuiguo .gonggongStyleTwo .yurou").append(liHtml(m,n))
			})
//
//
////===================================工艺================================:
			$.each(data.yipin_channel.tab,function(m,n){
				$("#home-gongyi .gonggongStyleTwo .main-option").append(lip(m,n))
			})
			$.each(data.yipin_channel.gerenpeishi,function(m,n){
				$("#home-gongyi .gonggongStyleTwo .gerenpeishi").append(liHtml(m,n))
			})
			$.each(data.yipin_channel.diaoke,function(m,n){
				$("#home-gongyi .gonggongStyleTwo .diaoke").append(liHtml(m,n))
			})
//
////===================================美妆================================:
			$.each(data.meizhuang_channel.tab,function(m,n){
				$("#home-meizhuang .gonggongStyleTwo .main-option").append(lip(m,n))
			})
			$.each(data.meizhuang_channel.hufu,function(m,n){
				$("#home-meizhuang .gonggongStyleTwo .hufu").append(liHtml(m,n))
			})
			$.each(data.meizhuang_channel.huli,function(m,n){
				$("#home-meizhuang .gonggongStyleTwo .huli").append(liHtml(m,n))
			})
			$.each(data.meizhuang_channel.caizhuang,function(m,n){
				$("#home-meizhuang .gonggongStyleTwo .caizhuang").append(liHtml(m,n))
			})
////===================================母婴================================:
			$.each(data.muying_channel.tab,function(m,n){
				$("#home-muying .gonggongStyleTwo .main-option").append(lip(m,n))
			})
			$.each(data.muying_channel.naifen,function(m,n){
				$("#home-muying .gonggongStyleTwo .naifen").append(liHtml(m,n))
			})
			$.each(data.muying_channel.fushi,function(m,n){
				$("#home-muying .gonggongStyleTwo .fushi").append(liHtml(m,n))
			})
			
////===================================医疗================================:
			$.each(data.yiliao_channel.tab,function(m,n){
				$("#home-yiliao .gonggongStyleTwo .main-option").append(lip(m,n))
			})
			$.each(data.yiliao_channel.yaopin,function(m,n){
				$("#home-yiliao .gonggongStyleTwo .yaopin").append(liHtml(m,n))
			})
			$.each(data.yiliao_channel.jichu,function(m,n){
				$("#home-yiliao .gonggongStyleTwo .jichu").append(liHtml(m,n))
			})
			$.each(data.yiliao_channel.yaoshi,function(m,n){
				$("#home-yiliao .gonggongStyleTwo .yaoshi").append(liHtml(m,n))
			})
			$.each(data.yiliao_channel.weiliang,function(m,n){
				$("#home-yiliao .gonggongStyleTwo .weiliang").append(liHtml(m,n))
			})
			$.each(data.yiliao_channel.yiyaoxiang,function(m,n){
				$("#home-yiliao .gonggongStyleTwo .yiyaoxiang").append(liHtml(m,n))
			})

//			美食茶酒等数据
			$("#home-main .gonggongStyleTwo .main-option li").hover(function(){
				$(this).css({
					'border': '1px solid #95c356',
		            'border-bottom': 0,
		            'border-top': '3px solid #95c356',
		            'background': '#fff',
				}).siblings("li").css({
					'border': '1px solid transparent',
					'border-bottom':"1px solid #95c356",
		            'border-top': '3px solid transparent',
		            'background':"#f8f8f6"
				})
				var idx = $(this).index();
				$(this).parents(".gonggongStyleTwo").find(".oneStyle").eq(idx).show().siblings(".oneStyle").hide()
				
			},function(){
				$(this).siblings("li").css({
					'border': '1px solid transparent',
					'border-bottom':"1px solid #95c356",
		            'border-top': '3px solid transparent',
		            'background':"#f8f8f6"
				})
			})
			$("#home-main .gonggongStyleTwo .oneStyle li").each(function(){
				$(this).hover(function(){
					$(this).find(".slideUP").slideDown(300)
				},function(){
					$(this).find(".slideUP").slideUp(20);
				})
			})
		}
	});
	
	
});