jQuery(document).ready(function($) {
  $('#rs-slider').royalSlider({
    arrowsNav: true,
    arrowsNavAutoHide: false,
    autoHeight:true,/**/
    controlNavigationSpacing: 0,
    controlNavigation: 'bullets', /* thumbnails tabs bullets */
    fadeinLoadedSlide: true,
    imageScaleMode: 'none',
    imageAlignCenter:false,
    keyboardNavEnabled: true,
    loop: false,
	 loopRewind: true,
    numImagesToPreload:3,
    transitionType: 'fade', /* 'move' or 'fade' */
    transitionSpeed: 3000,
    blockLoop: true,
    autoPlay: {   // autoplay options
  		enabled: true,
      delay: 6000,
  		pauseOnHover: true
  	},
    deeplinking: {  // deep linking options
  		enabled: true,
      change:true,
  		prefix: ''
  	}
  });
    // reposition nav
    //var slider = $('.royalSlider');
    //slider.prepend(slider.find('.rsNav'));
});