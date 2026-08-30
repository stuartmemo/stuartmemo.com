jQuery(document).ready(function($) {
  $('#memorialsSlider').royalSlider({
    autoHeight:true,/**/
    controlNavigationSpacing: 0,
    controlNavigation: 'tabs', /* thumbnails tabs bullets */
    fadeinLoadedSlide: false,
    keyboardNavEnabled: true,
    numImagesToPreload:0, //* affects lightbox due to params being sent. TODO - get page id from a-buchanan  */
    transitionType: 'fade', /* 'move' or 'fade' */
    transitionSpeed:800,
    //width:800,
    deeplinking: {  // deep linking options
  		enabled: true,
      change: true,
  		prefix: ''
  	},
		autoScaleSlider:true,
		//autoScaleSliderWidth:700,
    navigateByClick: false
  });
    // reposition nav
    var slider = $('.royalSlider');
    slider.prepend(slider.find('.rsNav'));
});