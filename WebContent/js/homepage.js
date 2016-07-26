	function doAjaxRequest(url, callback) {
		$.ajax({
			url : url,
			dataType : 'html',
			async:false,
			error : function(err) { }
		}).done(function(data,txtStatus){
			callback(data);
		});	    	
	}

    function constructHighlight(data) {
    	var highlight = document.createElement('DIV');
    	highlight.setAttribute('class', 'highlight');
    	highlight.setAttribute('style', 'position: relative; top: 0px; left: 0px; overflow: hidden; z-index: 1; width: 685px; height: 234px;');
    	
    	var slider = document.createElement('DIV');
    	slider.setAttribute('class', 'slider');
    	slider.setAttribute('style', 'position: relative; cursor: default; width: 685px; overflow: hidden; left: 0px;');
    	slider.innerHTML = data;    	
    	
    	var selectors = document.createElement('DIV');
    	selectors.setAttribute('class', 'selectors');
    	var selectorLength = (($(data).length > 3) ? 3 : $(data).length);
    	
    	for(var i=0; i < selectorLength; i++) {
	    	var selector = document.createElement('DIV');
	    	selector.setAttribute('class', 'selector');
	    	selector.setAttribute('style', 'cursor: pointer;');
	    	selectors.appendChild(selector);    		
    	}
    	    	    	    	
    	highlight.appendChild(slider);
    	highlight.appendChild(selectors);
    	$('.highlight').append(highlight);	
    	
    	$(".highlight").find(".textItem > h3").dotdotdot({
    		ellipsis	: '...',
    		wrap		: 'letter',
    	});
    	$(".highlight").find(".textItem > p").dotdotdot({
    		ellipsis	: '...',
    		wrap		: 'letter',
    	});	    	
    }
	
	function constructMagazine(data){
		var magazine = document.createElement('DIV');
		magazine.innerHTML = data;
		$('.magazineContent').append(magazine);	

		$(".magazinebox").find(".magazine-title").dotdotdot({
			ellipsis	: '...',
			wrap		: 'letter',
		});
		
		$(".magazinebox").find(".magazine-desc").dotdotdot({
			ellipsis	: '...',
			wrap		: 'letter',
		});			
	}

	function groupTopicContents(contents, container) {
		if((contents !== undefined) && (contents !== null)) {
			var entry = document.createElement('DIV');
			for(var contentIndex = 0; contentIndex < contents.length; contentIndex++) {				
				var content = contents[contentIndex];
				if (content.nodeType == 1 && content.tagName == 'DIV') {
					entry.appendChild(content);						
					if(((contentIndex+1)%3) == 0) {
						$($(container)[0]).append(entry);
						entry = document.createElement('DIV');
					} else if((contentIndex+1) == contents.length) {
						$($(container)[0]).append(entry);
					}							
				}
			}
		}	    
	}	
	
	function constructKeyTopics(data) {
		var div  = document.createElement("div");
		$('.key_topics_box .flexslider').append(div);
	}	
	
	function constructKeyTopicsNav(data){
		var navLength = ((data.length > 9) ? 3 : Math.ceil(data.length / 3));
		$(".flex-control-nav_keytopics").html("");
		for(var i=0; i < navLength; i++) {
			var nav = document.createElement('DIV');
			nav.setAttribute("class","selector");	
			$(".flex-control-nav_keytopics").append(nav);
		}		
	}	
	
	function constructSlides(category) {
		var slidesDivMain = document.createElement('DIV');
		slidesDivMain.setAttribute('class', 'slides ' + category);
		var slidesDiv1 = document.createElement('DIV');
		slidesDivMain.appendChild(slidesDiv1);
		$(slidesDivMain).insertBefore(".cyberpioneer_content_box .button_box1");
	}

	function groupContents(contents, container) {
		if((contents !== undefined) && (contents !== null)) {
			var entry = document.createElement('DIV');
			for(var contentIndex = 0; contentIndex < contents.length; contentIndex++) {				
				var content = contents[contentIndex];						
				if (content.nodeType == 1 && content.tagName == 'DIV') {
					var catContainer = $(content).find('.viceTitle span');
					var catText = catContainer.text().split('_')[1];
					catContainer.html(catText);
					entry.appendChild(content);
					if(((contentIndex+1)%2) == 0) {
						$($(container)[0]).append(entry);
						entry = document.createElement('DIV');
					} else if((contentIndex+1) == contents.length) {
						$($(container)[0]).append(entry);
					}							
				}
			}
		}	    
	}	
	
	function constructNav(data){
		var navLength = ((data.length > 6) ? 3 : Math.ceil(data.length / 2));
		$(".cyberpioneerlatest .flex-control-nav ul").html("");
		for(var i=0; i < navLength; i++) {
			var nav = document.createElement('LI');
			var navLink = document.createElement('A');
			nav.appendChild(navLink);		    	
			$(".cyberpioneerlatest .flex-control-nav ul").append(nav);
		}
	}
	
	function generateCyberpioneerTabs() {
		var cyberpioneerTabsURL = "/nsp/wcm/connect/iMindef%20Content/iMindef/Homepage/Homepage?srv=cmpnt&source=library&cmpntname=iMindef%20Design/Homepage/Cyberpioneer/Cyberpioneer%20Tabs";
		doAjaxRequest(cyberpioneerTabsURL, function(data) {
			var tabs = $(data);
			var newTabList = [];
			for(var tabIndex = 0; tabIndex < tabs.length; tabIndex++) {				
				var tab = tabs[tabIndex].children[0];
				var currTabText = tab.textContent || tab.innerText;
				var tabTextArr = currTabText.split('_');
				var replaceTabPos = tabTextArr[0];
				var replaceTabText = tabTextArr[1];  
				if(tabTextArr.length == 1) {
					replaceTabPos = 0;
					replaceTabText = tabTextArr[0];
				}  	
				
				if(tab.textContent == undefined) {
					tab.innerText = replaceTabText;
				} else {
					tab.textContent = replaceTabText;
				}
				newTabList[replaceTabPos] = $(tab).parent()[0];
			}
			
			$('.menu_cyberpioneer ul').html(newTabList);
		});	
	}
	
	function retrieveContents(category) {
		var cyberpioneerTabsURL = "/nsp/wcm/connect/iMindef%20Content/iMindef/Homepage/Homepage?srv=cmpnt&source=library&cmpntname=iMindef%20Design/Homepage/Cyberpioneer/Cyberpioneer%20List";
		var element = '.cyberpioneerlatest .cyberpioneer_content_box .slides.' + category + ' div';
		if(category != "") {
			cyberpioneerTabsURL +=  "&category" + category;
		}			
		doAjaxRequest(cyberpioneerTabsURL, function(data) {
			var tabContents = $(data);	
			groupContents(tabContents, element);
			constructNav(tabContents);
		});		    
	}	
	
	function retrieveKeyTopicContents(callback) {
		var keyTopicsURL = "/nsp/wcm/connect/iMindef%20Content/iMindef/Homepage/Homepage?srv=cmpnt&cmpntid=a1131e56-ad6c-41fb-9968-0ee67e865fad&source=library";					    
		var element = '.key_topics_box .flexslider div';
		doAjaxRequest(keyTopicsURL, function(data) {
			var contents = $(data);
			groupTopicContents(contents, element);
			constructKeyTopicsNav(contents);
			$('.key_topics_box .list_box').find('p.title span').dotdotdot({
				ellipsis	: '...',
				wrap		: 'letter'
			});
			$('.key_topics_box .list_box').find('.discription').dotdotdot({
				ellipsis	: '...',
				wrap		: 'letter'
			});			
			callback();			
		});  
	}
	
	function getOfficialReleasesContents(tab_num, container) {
		// Get Official Releases Carousel Content via ajax
		var tab1URL = "/nsp/wcm/connect/iMindef%20Content/iMindef/Homepage/Homepage?srv=cmpnt&source=library&cmpntname=iMindef%20Design/Homepage/Official%20Releases/News%20Releases";
		var tab2URL = "/nsp/wcm/connect/iMindef%20Content/iMindef/Homepage/Homepage?srv=cmpnt&source=library&cmpntname=iMindef%20Design/Homepage/Official%20Releases/Forum%20Letter%20Replies";		
		var tab3URL = "/nsp/wcm/connect/iMindef%20Content/iMindef/Homepage/Homepage?srv=cmpnt&source=library&cmpntname=iMindef%20Design/Homepage/Official%20Releases/Activities";
		
		var url = "";
		if(tab_num == "tab1") {
			url = tab1URL;
		} else if(tab_num == "tab2") {
			url = tab2URL;
		} else if(tab_num == "tab3") {
			url = tab3URL;
		}
		
		doAjaxRequest(url, function(data) {
			if(tab_num == "tab2") {
				var contents = $(data);
				if((contents !== undefined) && (contents !== null)) {
					var entry = document.createElement('LI'); 
					entry.setAttribute('style', 'width: 380px; float: left; display: block;');
					for (var i = 0; i < contents.length; i++) {
						var content = contents[i];
						if (content.nodeType == 1 && content.tagName == 'DIV') {
							entry.appendChild(content);
							if(((i+1)%2) == 0) {
								container.append(entry);
								entry = document.createElement('LI');
								entry.setAttribute('style', 'width: 380px; float: left; display: block;');	
							} else if((i+1) == contents.length) {
								container.append(entry);
							}
						}
					}						
				}
			} else {
				container.html(data);
			}				
		});
	}
	
	function getMainCarousel() {
		var highlightURL = "/nsp/wcm/connect/iMindef%20Content/iMindef/Homepage/Homepage?srv=cmpnt&source=library&cmpntname=iMindef%20Design/Homepage/Highlights/Highlights";			
		doAjaxRequest(highlightURL, function(data) {
			constructHighlight(data);
		});
	}
	
	function getMagazine() {
		var magazineURL = "/nsp/wcm/connect/iMindef%20Content/iMindef/Homepage/Homepage?srv=cmpnt&cmpntname=iMindef%20Design/Homepage/Magazine/Magazine&source=library";			
		doAjaxRequest(magazineURL, function(data) {
			constructMagazine(data);
		});
	}
	
	