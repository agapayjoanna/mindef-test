(function(a){a.rotateBanners=function(b,d){var i=this;i.$rotateBanners=a(b);i.options=a.extend({},a.rotateBanners.defaultOptions,d);var c=i.$rotateBanners.children(".rotateBannerPanel:first");if(c.children().length<=i.options.minBanners){return false}i.rotateProc=function(){var j=c.children(".banner:first");j.animate({marginLeft:-1*g+"px"},{duration:i.options.speed,complete:function(){c.append(a(this).detach().css({marginLeft:"0px"}))}})};var e=c.children(".banner:first");var h=parseInt(e.css("margin-right"));var g=e.width()+h;var f=c.children().length*g;c.css({width:f});setInterval(i.rotateProc,i.options.interval)};a.rotateBanners.defaultOptions={speed:1000,interval:2000,minBanners:2};a.fn.rotateBanners=function(b){this.each(function(){a.rotateBanners(this,b)})}})(jQuery);