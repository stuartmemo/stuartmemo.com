jQuery(document).ready(function($) {
  $('#rs-slider').royalSlider({
    arrowsNav: false,
    controlNavigation: 'none',
    imageAlignCenter:false,
    transitionType: 'fade', /* 'move' or 'fade' */
    transitionSpeed: 6000,
    autoPlay: {
  		enabled: true,
      delay: 12000,
  		pauseOnHover: true
  	},
		block: {
			moveEffect:'none',
			speed:6000,
			delay:300
    },
  });
});