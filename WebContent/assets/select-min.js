(function(a){a.lazyform=a.lazyform||{};a.extend(a.lazyform,{_inputs:null,_selects:null,init:function(){_inputs=a("input[type=checkbox], input[type=radio]");_inputs.each(a.lazyform._initInput);_selects=a("select").filter(function(b){return a(this).attr("id")!="slt1"});_selects.each(a.lazyform._initSelect);a(document).click(function(){a("div.select div.open").removeClass().next("ul").hide()})},_initInput:function(){var g=a(this);var c=this;var d=g.is(":radio");var h=d?(c.type+"-"+c.name+"-"+c.id):(c.type+"-"+c.id);var f=c.type+(c.checked?"-checked":"");var e=false;var b=a("<span />").attr({id:h,"class":f}).bind("mouseover mouseout",function(){e=!e;b.attr("class",c.type+(c.checked?"-checked":"")+(e?"-hover":""))}).bind("click",function(){if(d){a("input[name="+c.name+"]").each(function(){a("#"+c.type+"-"+c.name+"-"+this.id).attr("class",c.type)})}c.click();b.attr("class",c.type+(c.checked?"-checked":""))});g.addClass("hidden").before(b)},_$openSelect:null,_initSelect:function(){var j=a(this);var k=this;var e=j.width();var i=j.width()-2;var f=a("<div />").attr("id","select-"+k.id).width(e).addClass("select");var h=a("<div />").append("<span />");var c=h.children("span");var d=a("<ul />").width(i).hide();var g=null;var b=null;j.children().each(function(){var l=a("<li />").append(this.text);if(this.selected){l.addClass("hover");c.text(this.text);g=l;b=l}d.append(l);l.bind("mouseover",function(){b.removeClass();l.addClass("hover");b=l}).bind("click",function(){var n=c.text();j.children().each(function(){if(b&&this.text==b.text()){l.addClass("hover");this.selected=true;g=l;b=l}});h.removeClass();c.text(g.text());d.hide();var m=c.text();if(n!=m){j.change()}})});h.click(function(l){if(a.lazyform._$openSelect&&a.lazyform._$openSelect!=f){a("#"+a.lazyform._$openSelect.attr("id")+" > div.open").removeClass().next("ul").hide()}a.lazyform._$openSelect=f;h.toggleClass("open");if(h.attr("class")=="open"){if(b!=g){b.removeClass();g.attr("class","hover");b=g}d.show()}else{d.hide()}l.stopPropagation()});f.append(h);f.append(d);j.hide().before(f)}});a(document).ready(function(){if(typeof window.selectFlag!="undefined"){return false}else{window.selectFlag="loaded"}a.lazyform.init()})})(jQuery);