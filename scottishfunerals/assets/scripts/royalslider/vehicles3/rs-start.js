
jQuery(document).ready(function($) {
//$(window).load(function($) {
//$(window).load(function() {
	$(".royalSlider").royalSlider({
		controlNavigation: 'thumbnails',
		autoPlay: {
	    enabled:false,
	    delay:3000
		},
		/*
    block: {
			moveEffect:'none',
			speed:1000,
			delay:300
    },
    */
		transitionSpeed:2000,
		transitionType:'fade',
		imageScalePadding:0,
		loop:true,
		autoHeight:true,
		autoScaleSlider:false,
		imageScaleMode:'none',
		imageAlignCenter:false
		//globalCaption:true
	});
});
