
/*
 * GA - this controls the style and behvaiour of the popup.
 * Inserted (via addFancyboxSnippet.php) into the page head dynamically by MODx.
 * The html elements calling these must have at least:
 *		class="fancybox"
 * They can also have an id:
 *    id="ordersOfServiceForm"
 * But here, if there is a script with just the class, is:
 * 		$('.fancybox')
 * that will be used in preference to the script with the matching id.
 * Can also be more specific and use:
 * 		class="fancybox fancybox.iframe"
 * but I don't yet know what difference this makes.
 *
*/
	$(document).ready(function() {
		$('#ordersOfServiceForm').fancybox({
				maxWidth	: 930,
				//maxHeight	: 400,
				fitToView	: false,
				width		: '100%',
				height		: '99%',
				padding		: 4,
				autoSize	: false,
				closeClick	: false,
				openEffect	: 'none',
				closeEffect	: 'none',
				overlay : {
						closeClick : false,  // if true, fancyBox will be closed when user clicks on the overlay
						speedOut   : 2200,   // duration of fadeOut animation
						showEarly  : true,  // indicates if should be opened immediately or wait until the content is ready
						css        : {},    // custom CSS properties
						locked     : true   // if true, the content will be locked into overlay
					},
		    afterLoad: function(current, previous) {
		        console.info( 'Current: ' + current.href );
		        console.info( 'Previous: ' + (previous ? previous.href : '-') );

		        if (previous) {
		            console.info( 'Navigating: ' + (current.index > previous.index ? 'right' : 'left') );
		        }
		    },
				beforeClose : function() {
		        return window.confirm('Have you saved everything?\nClick OK to continue out, or Cancel to go back and save first');
		    }
		    //beforeClose: function() {
		    //    confirm('Careful now!');
		    //}
				/*beforeClose: function() {
					$( "#dialog-confirm" ).dialog({
						resizable: false,
						height:140,
						modal: true,
						buttons: {
							"Close anyway": function() {
									$( this ).dialog( "close" );
							},
							Cancel: function() {
								$( this ).dialog( "close" );
							}
						}
					});
				}*/

		});
	});




$(document).ready(function() {
	$("#homepageVideo").fancybox({
		//maxWidth	: '80%',
		//maxHeight	: '80%',
		fitToView	: false,
		width		: 420,
    	height		: 315,
		autoSize	: false,
		//fitToView	: true,
		//padding : 0, /* removes border*/
		closeBtn : false, /* removes close button */
		closeClick	: false,
		openEffect	: 'fade',
		closeEffect	: 'none',
		showEarly  : true,  // indicates if should be opened immediately or wait until the content is ready
		overlay : {
				closeClick : false,  // if true, fancyBox will be closed when user clicks on the overlay
				speedOut   : 6000,   // duration of fadeOut animation
				showEarly  : true,  // indicates if should be opened immediately or wait until the content is ready
				locked     : true   // if true, the content will be locked into overlay
			}
	});
});
