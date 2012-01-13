jQuery.fn.extend({
	addRule : function (rule) {
		rule = '\n' + rule;
		return this.each(function(){
			if (this.nodeName.toLowerCase() === 'style') {
				if (this.styleSheet && this.styleSheet.cssText !== undefined) { //for ie
					this.styleSheet.cssText = rule;
				} else { this.appendChild(document.createTextNode(rule)); }
			}
		});
	}
});
$(document).ready(function(){
	'use strict';
	var $deets = $('details'),
		$deetStyles = $('<style />').attr('type', 'text/css'),
		rules = 'details { display: block; overflow:hidden; } \n' +
				'details[open] { height: auto; } \n' +
				'summary { display: block; }';
	$deetStyles.addRule(rules);
	$deets.each(function(){
		var detailsID = 'd' + Math.floor(Math.random() * 10000),
			$deet = $(this).attr('data-detailsID', detailsID),
			$summary = $deet.find('summary'),
			height;

		//Can't assume there is a summary element
		if (! $summary.length) {
			$summary = $('<summary>Details</summary>');
			$deet.prepend($summary);
		}
		height = $summary.height();
		$deetStyles.addRule('details[data-detailsid="' + detailsID + '"] { height: ' + height + 'px; }\n' +
							'details[data-detailsid="' + detailsID + '"][open] { height: auto; }');
	});
	$('head').append($deetStyles);
	$('summary').on('click', function(e){
		var $detail = $(e.target).parents('details').first();
		if ($detail.attr('open')) { $detail.removeAttr('open');
		} else { $detail.attr('open', 'open'); }
	});
});