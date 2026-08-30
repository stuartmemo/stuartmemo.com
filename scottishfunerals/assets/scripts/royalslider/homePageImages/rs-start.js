jQuery(document).ready(function($) {
  $('#rs-homePageImages').royalSlider({
    arrowsNav: true,
    arrowsNavAutoHide: true,
    autoHeight:true,/**/
    controlNavigationSpacing: 0,
    controlNavigation: false, /* thumbnails tabs bullets */
    fadeinLoadedSlide: true,
    imageScaleMode: 'none',
    imageAlignCenter:false,
    keyboardNavEnabled: true,
    loop: false,
	 loopRewind: true,
    numImagesToPreload:3,
    transitionType: 'fade', /* 'move' or 'fade' */
    transitionSpeed: 1200,
    blockLoop: true,
    autoPlay: {   // autoplay options
  		enabled: true,
      delay: 12000,
  		pauseOnHover: true
  	},
		block: {
			moveEffect:'none',
			speed:5000,
			delay:100
    },
    deeplinking: {  // deep linking options
  		enabled: false
  	}
  });
    // reposition nav
    //var slider = $('.royalSlider');
    //slider.prepend(slider.find('.rsNav'));
});