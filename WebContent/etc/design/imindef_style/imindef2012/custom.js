$(function(){
	$(".cyberpioneerlatest").find(".viceTitle").dotdotdot({
		ellipsis	: '...',
		wrap		: 'letter',
	});
	$(".cyberpioneerlatest").find(".briefDesc").dotdotdot({
		ellipsis	: '...',
		wrap		: 'letter',
	});
});


$('#tab_official_news-1 .officialslides').find(".news_pic_text").dotdotdot({
	ellipsis	: '...',
	wrap		: 'letter',
});	
$('#tab_official_news-2 .officialslides').find(".tab_content_title").dotdotdot({
	ellipsis	: '...',
	wrap		: 'letter',
});
$('#tab_official_news-2 .officialslides').find(".tab_content_description").dotdotdot({
	ellipsis	: '...',
	wrap		: 'letter',
});
$('#tab_official_news-3 .officialslides').find(".activities-title").dotdotdot({
	ellipsis	: '...',
	wrap		: 'letter',
});
$('#tab_official_news-3 .officialslides').find(".activities-desc").dotdotdot({
	ellipsis	: '...',
	wrap		: 'letter',
});	
$('#tab_official_news-2').attr('style', 'display: none;');
$('#tab_official_news-3').attr('style', 'display: none;');

// Removed due to this issue: 
// When Ctrl + click is performed to title, a new tab is opened and at the same time, the current tab url is changed to http://192.168.2.72/imindef/details.html?title=undefined&date=undefined
/*
$(document).on('click','#tab_official_news-1 .officialslides a',function(){
	var title = $(this).data('title');
	var date = $(this).data('date');
	window.location.href="details.html?title="+title+"&date="+date;
});
$(document).on('click','#tab_official_news-2 .officialslides a',function(){
	var title = $(this).data('title');
	var date = $(this).data('date');
	window.location.href="details.html?title="+title+"&date="+date;
});	*/