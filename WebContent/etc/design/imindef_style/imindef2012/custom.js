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
