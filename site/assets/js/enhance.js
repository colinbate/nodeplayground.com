(function() {
	var $ = jQuery;
	
	$(function () {
		$('h1,h2,h3,h4').wrap('<div class="header-highlight"/>');
		$('pre,blockquote').wrap('<div class="highlight"/>');
	});
}());