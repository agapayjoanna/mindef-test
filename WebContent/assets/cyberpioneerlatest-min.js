$(function(){$(".cyberpioneerlatest .menu_cyberpioneer ul").tabs($(".cyberpioneerlatest .flex-control-nav ul"))});(function(a){a.tabs=function(d,c,b){var e=d;e.$el=a(d);e.$em=a(c);e.init=function(){e.options=a.extend({},a.tabs.defaultOptions,b);e.$window=e.$el.parent().parent();e.$tabs=e.$el.children();e.scrollAreaWidth=e.$el.width();e.totalTabs=e.$tabs.length;var g=2;for(var f=0;f<e.totalTabs;f++){g+=e.$tabs.eq(f).width()}e.$el.css("width",g);e.$navs=e.$em.children();e.totalNavs=e.$navs.length;e.curTab=e.options.curTab;e.curNav=e.options.curNav;e.startTab=e.curTab;e.endTab=e.getRightArea(e.startTab).right;e.$tabs.eq(e.curTab-1).addClass("hover");a("a",e.$tabs.eq(e.curTab-1)).addClass("current");e.$window.find("a.left_arr").click(function(){var i=a(this),h=i.data("animation_state");if(h=="busy"){return false}i.data("animation_state","busy");e.goBack(i)});e.$window.find("a.right_arr").click(function(){var i=a(this),h=i.data("animation_state");if(h=="busy"){return false}i.data("animation_state","busy");e.goForward(i)});e.$tabs.delegate(this,"click",function(){e.change(e.$tabs.index(a(this))+1)});e.$curList=a(".cyberpioneerlatest .cyberpioneer_content_box .slides.latest");e.formatStyle()};e.formatStyle=function(){a("div.list_box img",e.$curList).css("width","215px");a(">div>div",e.$curList).css("height","261px");a(".list_box",e.$curList).each(function(){var i=a(".pageImage",this).height();var j=a(".postedDate",this).height()+10;var m=a(".viceTitle",this).height();var g=261-i-j-m;var f=Math.floor(g/16);var l=f*32;var k=a(".briefDesc",this).html().replace(/&nbsp;/g, ' ').replace(/\s\s+/g, ' ');if(k!=null&&k.length>l){k=k.substring(0,l);var h=k.lastIndexOf(" ");if(h!=-1){k=k.substring(0,h).trim()}k+="..."}if(k==null){k=""}a(".briefDesc",this).html(k);a(".briefDesc",this).css("height",g)});a(e.$curList).iosSlider({snapToChildren:true,navSlideSelector:e.$navs,desktopClickDrag:true,onSlideChange:e.changeNav,onSliderLoaded:e.changeNav})};e.isOver=function(){var f=e.totalTabs;return(e.endTab==f)?true:false};e.isBegin=function(){return(e.startTab==1)?true:false};e.getRightArea=function(r){var o=e.$tabs.eq(r-1).width();var m=0;var q=r;var p=r;var h=e.totalTabs;var k=e.scrollAreaWidth;for(;q<h;q++){var g=e.$tabs.eq(q).width();m=o+g;if(o<=k&&m>=k){p=q;break}o=m}var f={left:q,right:p,rightLength:o};return f};e.getLeftArea=function(r){var o=e.$tabs.eq(r-2).width();var m=0;var q=r-1;var p=r-1;var h=e.totalTabs;var k=e.scrollAreaWidth;for(;q>1;q--){var g=e.$tabs.eq(q-2).width();m=o+g;if(o<=k&&m>=k){break}o=m}var f={left:q,right:p,leftLength:o};return f};e.goForward=function(j){if(e.isOver()){return false}var g=e.getRightArea(e.startTab);var k=g.rightLength;var f,h;e.startTab=e.endTab+1;e.endTab=e.getRightArea(e.startTab).left;if(e.isOver()){h=e.getRightArea(e.startTab);f=h.rightLength;k=k+f-e.scrollAreaWidth}var i=e.$el.css("margin-left");i=parseInt(i.substring(0,i.length-2),10);k=i-k;e.$el.animate({marginLeft:k},e.options.speed,function(){e.startTab=e.getLeftArea(e.endTab+1).left;a(j).data("animation_state","complete")})};e.goBack=function(j){if(e.isBegin()){return false}var g,k;var h=e.getLeftArea(e.startTab);var f=h.leftLength;e.startTab=h.left;if(e.isOver()){g=e.getLeftArea(e.endTab+1);k=g.leftLength;f=f+k-e.scrollAreaWidth}var i=e.$el.css("margin-left");i=parseInt(i.substring(0,i.length-2),10);f=i+f;e.$el.animate({marginLeft:f},e.options.speed,function(){e.endTab=e.getRightArea(e.startTab).right;a(j).data("animation_state","complete")})};e.change=function(h){e.$tabs.eq(e.curTab-1).removeClass("hover");a("a",e.$tabs.eq(e.curTab-1)).removeClass("current");a(e.$curList).iosSlider("destroy");e.$curList.addClass("hide");a("a",e.$navs.eq(e.curNav)).removeClass("current");e.curTab=h;var g=e.$tabs.eq(e.curTab-1).attr("id");var f=false;a(".cyberpioneerlatest .cyberpioneer_content_box .slides").each(function(){if(a(this).hasClass(g)){f=true}});if(!f){var i="/nsp/wcm/connect/iMindef%20Content/iMindef/Homepage/Homepage?srv=cmpnt&source=library&cmpntname=iMindef%20Design/Homepage/Cyberpioneer/Cyberpioneer%20List&category=" + g;a.ajax({type:"get",url:i,dataType:"html",cache:false,beforeSend:function(n){var l=a("<div class='loader'><img class='loader'/></div>");l.css("width","470");l.css("height","261px");var m=a(".cyberpioneer_content_box .content_path").html();a("img",l).attr("src","assets/loader.gif");a("img",l).css("top","40%");a("img",l).css("left","45%");a("img",l).css("position","absolute");a(l).insertBefore(a(".cyberpioneer_content_box .button_box1"))},success:function(l,n){a(".cyberpioneer_content_box div.loader").remove();var tabContents = a(l);var element = '.cyberpioneerlatest .cyberpioneer_content_box .slides.' + g + ' div';constructSlides(g);groupContents(tabContents, element);constructNav(tabContents);e.$navs=e.$em.children();a(".cyberpioneerlatest .cyberpioneer_content_box .slides").each(function(){if(a(this).hasClass(g)){e.$curList=a(this)}});e.curNav=0;var m=a(".cyberpioneer_content_box .category_path").html();if(g!="latest"){m+="/"+g}a(".cyberpioneer_content_box .button_box1 a").attr("href",m+".html");e.$tabs.eq(e.curTab-1).addClass("hover");a("a",e.$tabs.eq(e.curTab-1)).addClass("current");if(e.$curList.hasClass("hide")){e.$curList.removeClass("hide")}e.formatStyle()},error:function(){alert("Error!!!")}})}else{var element = '.cyberpioneerlatest .cyberpioneer_content_box .slides.' + g + ' div .list_box';constructNav($(element));e.$navs=e.$em.children();a(".cyberpioneerlatest .cyberpioneer_content_box .slides").each(function(){if(a(this).hasClass(g)){e.$curList=a(this)}});e.curNav=0;var k=a(".cyberpioneer_content_box .category_path").html();if(g!="latest"){k+="/"+g}a(".cyberpioneer_content_box .button_box1 a").attr("href",k+".html");e.$tabs.eq(e.curTab-1).addClass("hover");a("a",e.$tabs.eq(e.curTab-1)).addClass("current");if(e.$curList.hasClass("hide")){e.$curList.removeClass("hide")}e.formatStyle()}};e.changeNav=function(f){a("a",e.$navs.eq(e.curNav)).removeClass("current");e.curNav=f.currentSlideNumber;a("a",e.$navs.eq(e.curNav)).addClass("current")};e.init()};a.tabs.defaultOptions={curTab:1,curNav:0,speed:1000,contentWidth:470};a.fn.tabs=function(c,b,d){return this.each(function(){var e=this;a(c).each(function(){new a.tabs(e,this,b)})})}})(jQuery);