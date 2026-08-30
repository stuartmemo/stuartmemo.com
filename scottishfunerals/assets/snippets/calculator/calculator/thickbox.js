/*
 * Thickbox 3.1 - One Box To Rule Them All.
 * By Cody Lindley (http://www.codylindley.com)
 * Copyright (c) 2007 cody lindley
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
*/

var tb_pathToImage = "assets/images/calculator/loadingAnimation.gif";

/*
* GA - 7/6/16 - adding this here to dynamically adjust popup frame size and position on viewport resize.
* (CSS doesn't work because dimensions are inline).
* TODO - attach to thickbox, not window.
*
*/
$(window).resize(function() {
	updateTBSize();
});

// GA - as soon as TB is loaded, resize.
$("#TB_window").load(function() {
	console.log("In $('#TB_window').load(function()... ");
	//updateTBSize();
});

/*
*	Reset TB size depending on available viewport size.
*/
function updateTBSize() {
	console.log("In updateTBSize()");

	// Get viewport dimensions
	var windowWidth = $(window).width(); //retrieve current window width
	var windowHeight = $(window).height(); //retrieve current window height
	//var documentWidth = $(document).width(); //retrieve current document width
	//var documentHeight = $(document).height(); //retrieve current document height

	console.log("In updateTBSize() windowWidth = " + windowWidth);
	console.log("In updateTBSize() windowHeight = " + windowHeight);

	/*
	*	Minimum widths:
	*		No. Items	#TB_ajaxContent	#TB_window
	*		4			920				950
	*		3			690				720
	*		2			460				490
	*		1			230				260
	*/

	// 1. Size difference between TB_windowWidth and TB_ajaxContentWidth
	var TB_widthDiff = 0;
	var TB_closeButtonHeight = 30; //was 52
	var TB_windowBorderWidth = 4;
	var TB_windowBottomGap = 2;

	// 2. Determine appropriate TB width depending on viewport width.
	var TB_windowWidth;
	if(windowWidth >= 975) 			TB_windowWidth = 975; // 974 ok for FF, 975 ok for Chrome
	else if(windowWidth >= 745)		TB_windowWidth = 745; // 744 ok for FF, 745 ok for Chrome
	else if(windowWidth >= 515)		TB_windowWidth = 515; // 514 ok for FF, 515 ok for Chrome
	else if(windowWidth >= 285)		TB_windowWidth = 285; // 284 ok for FF, 285 ok for Chrome

	// 3. Determine appropriate TB height depending on viewport width.
	var TB_windowHeight;
	if(windowHeight >= 650) 		TB_windowHeight = 620;
	else							TB_windowHeight = windowHeight - TB_closeButtonHeight;
	console.log("In updateTBSize() TB_windowHeight = " + TB_windowHeight);

	// 4. Calculate other element dimensions
	var TB_windowMarginLeft = TB_windowWidth/2;

	// Extra adjustment for close button (add to negative margin to move window up)
	// Top of close button is 52px above top of TB_window
	var TB_windowMarginTop = ((TB_windowHeight-TB_closeButtonHeight)/2 + TB_windowBottomGap);
	var TB_ajaxContentWidth = TB_windowWidth - TB_widthDiff;
	var TB_ajaxContentHeight = TB_windowHeight;

	// 5. Set element dimensions
	$("#TB_window").css("width", TB_windowWidth+"px");
	$("#TB_window").css("height", TB_windowHeight+"px");

	$("#TB_window").css("margin-left", "-"+TB_windowMarginLeft+"px");
	$("#TB_window").css("margin-top", "-"+TB_windowMarginTop+"px");

	//$("#TB_ajaxContent").css("width", TB_ajaxContentWidth+"px");
	//$("#TB_ajaxContent").css("height", TB_ajaxContentHeight+"px");
	$("#TB_ajaxContent").css("width", "100%");
	$("#TB_ajaxContent").css("height", "100%");

	// Now measure #TB_window height and re-set top-margin (to ensure borders etc are included)
	var TB_windowHeightFinal = $("#TB_window").css("height"); // Ends up 30px more than the height of #TB_window
	//console.log("In updateTBSize() TB_windowHeightFinal = " + TB_windowHeightFinal);
	//$("#TB_window").css("margin-top", "-"+(TB_windowHeightFinal/2)+"px");
}


/*!!!!!!!!!!!!!!!!! edit below this line at your own risk !!!!!!!!!!!!!!!!!!!!!!!*/

// GA - starts by calling tb_init with the elements which can trigger a thickbox (inc a).
//on page load call tb_init
$(document).ready(function(){
	tb_init('a.thickbox, area.thickbox, input.thickbox'); //pass where to apply thickbox
	imgLoader = new Image();// preload image
	imgLoader.src = tb_pathToImage;
});

// GA - adds thickbox to a.thickbox elements (plus others) so clicking the a
// calls tb_show()
//add thickbox to href & area elements that have a class of .thickbox
function tb_init(domChunk){
	$(domChunk).click(function(){
	var t = this.title || this.name || null;
	var a = this.href || this.alt;
	var g = this.rel || false;
	tb_show(t,a,g);
	this.blur();
	return false;
	});
}

// GA - start building the thickbox
function tb_show(caption, url, imageGroup) {//function called when the user clicks on a thickbox link

	try {
		if (typeof document.body.style.maxHeight === "undefined") { //if IE 6
			/*
			$("body","html").css({height: "100%", width: "100%"});
			$("html").css("overflow","hidden");
			if (document.getElementById("TB_HideSelect") === null) {//iframe to hide select elements in ie6
			$("body").append("<iframe id='TB_HideSelect'></iframe><div id='TB_overlay' class='gav1'></div><div id='TB_window'></div>");
			$("#TB_overlay").click(tb_remove);
			}
			*/
		}
		else { //all others (GA - inc the Calc popups)
      		console.log("thickbox.js tb_show() 1 ");
			if(document.getElementById("TB_overlay") === null){
				$("body").append("<div id='TB_overlay' class='gav2'></div><div id='TB_window' class='gav3'></div>");
				$("#TB_overlay").click(tb_remove);
			}
		}

		if(tb_detectMacXFF()){
			$("#TB_overlay").addClass("TB_overlayMacFFBGHack");//use png overlay so hide flash
		}
    	else {
      		console.log("thickbox.js tb_show() 2 ");
			$("#TB_overlay").addClass("TB_overlayBG");//use background and opacity
		}

    	// GA - not sure what the caption is for (comes from the a["title"] attribute)
		if(caption===null){caption="";}
		$("body").append("<div id='TB_load'><img src='"+imgLoader.src+"' /></div>");//add loader to the page
		$('#TB_load').show();//show loader

		var baseURL;
		if(url.indexOf("?")!==-1){ //ff there is a query string involved
			baseURL = url.substr(0, url.indexOf("?"));
		} else {
			baseURL = url;
		}

		var urlString = /\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$/;
		var urlType = baseURL.toLowerCase().match(urlString);

		if(urlType == '.jpg' || urlType == '.jpeg' || urlType == '.png' || urlType == '.gif' || urlType == '.bmp') { //code to show images

			TB_PrevCaption = "";
			TB_PrevURL = "";
			TB_PrevHTML = "";
			TB_NextCaption = "";
			TB_NextURL = "";
			TB_NextHTML = "";
			TB_imageCount = "";
			TB_FoundURL = false;

			if(imageGroup) {
				TB_TempArray = $("a[@rel="+imageGroup+"]").get();

				// GA - Fix added to sort the "starting at '2 out of *' instead of '1 out of *'" problem
				// Found at http://boedesign.com/2008/07/08/thickbox-30-image-gallery-duplication-fix/
				// Consists of adding the next block of code.
				// start of fix
				var TB_HrefArray = new Array();
				var TB_ObjArray = new Array();
				$("a[@rel="+imageGroup+"]").each(function(i){
					if(jQuery.inArray(TB_TempArray[i].href,TB_HrefArray) == -1){
						TB_ObjArray.push(TB_TempArray[i]);
						TB_HrefArray.push(TB_TempArray[i].href);
					}
				});
				TB_TempArray = TB_ObjArray;
				// end of fix

				for (TB_Counter = 0; ((TB_Counter < TB_TempArray.length) && (TB_NextHTML === "")); TB_Counter++) {
					var urlTypeTemp = TB_TempArray[TB_Counter].href.toLowerCase().match(urlString);
						if (!(TB_TempArray[TB_Counter].href == url)) {
							if (TB_FoundURL) {
								TB_NextCaption = TB_TempArray[TB_Counter].title;
								TB_NextURL = TB_TempArray[TB_Counter].href;
								TB_NextHTML = "<span id='TB_next'>&nbsp;&nbsp;<a href='#'>Next &gt;</a></span>";
							} else {
								TB_PrevCaption = TB_TempArray[TB_Counter].title;
								TB_PrevURL = TB_TempArray[TB_Counter].href;
								TB_PrevHTML = "<span id='TB_prev'>&nbsp;&nbsp;<a href='#'>&lt; Prev</a></span>";
							}
						} else {
							TB_FoundURL = true;
							TB_imageCount = "Image " + (TB_Counter + 1) +" of "+ (TB_TempArray.length);
						}
				}
			}

			imgPreloader = new Image();
			imgPreloader.onload = function(){
			imgPreloader.onload = null;

			// Resizing large images - orginal by Christian Montoya edited by me.
			var pagesize = tb_getPageSize();
			var x = pagesize[0] - 150;
			var y = pagesize[1] - 150;
			var imageWidth = imgPreloader.width;
			var imageHeight = imgPreloader.height;
			if (imageWidth > x) {
				imageHeight = imageHeight * (x / imageWidth);
				imageWidth = x;
				if (imageHeight > y) {
					imageWidth = imageWidth * (y / imageHeight);
					imageHeight = y;
				}
			} else if (imageHeight > y) {
				imageWidth = imageWidth * (y / imageHeight);
				imageHeight = y;
				if (imageWidth > x) {
					imageHeight = imageHeight * (x / imageWidth);
					imageWidth = x;
				}
			}
			// End Resizing

			TB_WIDTH = imageWidth + 30;
			TB_HEIGHT = imageHeight + 60;

			// GA - set min dimensions for window (for very small images)
			if (imageWidth < 220) {
				TB_WIDTH = 300;
			}

			//Orig:
			//$("#TB_window").append("<a href='' id='TB_ImageOff' title='Close'><img id='TB_Image' src='"+url+"' width='"+imageWidth+"' height='"+imageHeight+"' alt='"+caption+"'/></a>" + "<div id='TB_caption'>"+caption+"<div id='TB_secondLine'>" + TB_imageCount + TB_PrevHTML + TB_NextHTML + "</div></div><div id='TB_closeWindow'><a href='#' id='TB_closeWindowButton' title='Close'>close</a> or Esc Key 1</div>");

			// GA - altered
			$("#TB_window").append("<div id='TB_closeWindow'><a href='#' id='TB_closeWindowButton' title='Close'>close</a></div>");
			$("#TB_window").append("<div id='TB_secondLine'>" + TB_imageCount + TB_PrevHTML + TB_NextHTML + "</div>");
			$("#TB_window").append("<a href='' id='TB_ImageOff' title='Close'><img id='TB_Image' src='"+url
																				+"' width='"+imageWidth+"' height='"+imageHeight
																				+"' alt='"+caption+"'/></a>");
			$("#TB_window").append("<div id='TB_caption'>" + caption + "</div><div class='clearer'></div>");

			$("#TB_closeWindowButton").click(tb_remove);

			if (!(TB_PrevHTML === "")) {
				function goPrev(){
					if($(document).unbind("click",goPrev)){$(document).unbind("click",goPrev);}
					$("#TB_window").remove();
					$("body").append("<div id='TB_window'></div>");
					tb_show(TB_PrevCaption, TB_PrevURL, imageGroup);
					return false;
				}
				$("#TB_prev").click(goPrev);
			}

			if (!(TB_NextHTML === "")) {
				function goNext(){
					$("#TB_window").remove();
					$("body").append("<div id='TB_window'></div>");
					tb_show(TB_NextCaption, TB_NextURL, imageGroup);
					return false;
				}
				$("#TB_next").click(goNext);
			}

			document.onkeydown = function(e){
				if (e == null) { // ie
					keycode = event.keyCode;
				} else { // mozilla
					keycode = e.which;
				}
				if(keycode == 27){ // close
					tb_remove();
				} else if(keycode == 190){ // display previous image
					if(!(TB_NextHTML == "")){
						document.onkeydown = "";
						goNext();
					}
				} else if(keycode == 188){ // display next image
					if(!(TB_PrevHTML == "")){
						document.onkeydown = "";
						goPrev();
					}
				}
			};

			console.log("thickbox.js In tb_show() about to call tb_position() 1");
			tb_position();
			$("#TB_load").remove();
			$("#TB_ImageOff").click(tb_remove);
			$("#TB_window").css({display:"block"}); //for safari using css instead of show
			};

			imgPreloader.src = url;
		}
		else {//code to show html (GA - Calc popup)

			var queryString = url.replace(/^[^\?]+\??/,'');
			var params = tb_parseQuery( queryString );

			TB_WIDTH = (params['width']*1) + 30 || 630; //defaults to 630 if no paramaters were added to URL
			TB_HEIGHT = (params['height']*1) + 40 || 440; //defaults to 440 if no paramaters were added to URL
			ajaxContentW = TB_WIDTH - 30;
			ajaxContentH = TB_HEIGHT - 45;


			// GA - do responsive workings.
/*
			var windowWidth = $(window).width(); //retrieve current window width
			var windowHeight = $(window).height(); //retrieve current window height
      		console.log("thickbox.js tb_show() My page dimensions: width= "+windowWidth+", height = "+windowHeight);

      // Resize width based on viewport width
      if(windowWidth < 970){
		// TB_window
		// TB_ajaxContent
        console.log("thickbox.js tb_show() Resizing ajaxContentW to "+ajaxContentW);

        ajaxContentW = windowWidth;
        console.log("thickbox.js tb_show() Resizing ajaxContentW to "+ajaxContentW);
      }
*/


			var getPageSize = tb_getPageSize();
			var windowWidth2 = getPageSize[0];
			var windowHeight2 = getPageSize[1];
			console.log("thickbox.js In tb_show() tb_getPageSize() dimensions: width= "+windowWidth2+", height = "+windowHeight2);

			console.log("thickbox.js In tb_show() params['width'] = " + params['width'] + ", params['height'] = " + params['height']);
			console.log("thickbox.js In tb_show() TB_WIDTH = " + TB_WIDTH + ", TB_HEIGHT = " + TB_HEIGHT);
			console.log("thickbox.js In tb_show() ajaxContentW = " + ajaxContentW + ", ajaxContentH = " + ajaxContentH);


			if(url.indexOf('TB_iframe') != -1){// either iframe or ajax window
					/*urlNoQuery = url.split('TB_');
					$("#TB_iframeContent").remove();
					if(params['modal'] != "true"){//iframe no modal
						$("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton' title='Close'>close</a> or Esc Key 2</div></div><iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(Math.random()*1000)+"' onload='tb_showIframe()' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;' > </iframe>");
					}else{//iframe modal
					$("#TB_overlay").unbind();
						$("#TB_window").append("<iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(Math.random()*1000)+"' onload='tb_showIframe()' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;'> </iframe>");
					}
					*/
			}
			else {// not an iframe, ajax (GA - Calc popup)
					if($("#TB_window").css("display") != "block"){
						if(params['modal'] != "true"){ //ajax no modal
							$("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"
							+ caption
							+ "</div><div id='TB_closeAjaxWindow'><!--input type='button' value='Print' onclick='printpage()' /> | <a href='#' id='GA_printWindow'>print</a> | --><a href='#' id='TB_closeWindowButton'>close</a> <!--or Esc Key--></div></div><div id='TB_ajaxContent' style='width:"
							+ ajaxContentW + "px;height:" + ajaxContentH + "px'></div>");
						}
						else {//ajax modal (GA - Calc popup)
						$("#TB_overlay").unbind();
						$("#TB_window").append("<div id='TB_ajaxContent' class='TB_modal gav4' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px;'></div>");
						}
					}
					else {//this means the window is already up, we are just loading new content via ajax
						$("#TB_ajaxContent")[0].style.width = ajaxContentW +"px";
						$("#TB_ajaxContent")[0].style.height = ajaxContentH +"px";
						$("#TB_ajaxContent")[0].scrollTop = 0;
						$("#TB_ajaxWindowTitle").html(caption);
					}
			}

			$("#TB_closeWindowButton").click(tb_remove);

				if(url.indexOf('TB_inline') != -1){ // GA - not for popup
					/*$("#TB_ajaxContent").append($('#' + params['inlineId']).children());
					$("#TB_window").unload(function () {
						$('#' + params['inlineId']).append( $("#TB_ajaxContent").children() ); // move elements back when you're finished
					});
					console.log("thickbox.js In tb_show() about to call tb_position() 2");
					tb_position();
					$("#TB_load").remove();
					$("#TB_window").css({display:"block"});*/
				}
				else if(url.indexOf('TB_iframe') != -1){ // GA - not for popup
					/*console.log("thickbox.js In tb_show() about to call tb_position() 3");
					tb_position();
					if($.browser.safari){//safari needs help because it will not fire iframe onload
						$("#TB_load").remove();
						$("#TB_window").css({display:"block"});
					}*/
				}
				else{ // GA - for popup
					//alert("thickbox.js line 405: url = "+url);
					$("#TB_ajaxContent").load(url += "&random=" + (new Date().getTime()),function(){//to do a post change this load method
						console.log("thickbox.js In tb_show() about to call tb_position() 4");
						tb_position();
						$("#TB_load").remove();
						tb_init("#TB_ajaxContent a.thickbox");
						$("#TB_window").css({display:"block"});
					});
				}
		}

		if(!params['modal']){
			document.onkeyup = function(e){
				if (e == null) { // ie
					keycode = event.keyCode;
				} else { // mozilla
					keycode = e.which;
				}
				if(keycode == 27){ // close
					tb_remove();
				}
			};
		}

	} catch(e) {
		//nothing here
	}

	// GA - update TB size after normal render.
	//console.log("In tb_show About to call updateTBSize()");
	//updateTBSize();
}

//helper functions below
function tb_showIframe(){
	console.log("thickbox.js In tb_showIframe()");
	$("#TB_load").remove();
	$("#TB_window").css({display:"block"});
}

function tb_remove() {
	console.log("thickbox.js In tb_remove()");
 	$("#TB_imageOff").unbind("click");
	$("#TB_closeWindowButton").unbind("click");
	$("#TB_window").fadeOut("fast",function(){$('#TB_window,#TB_overlay,#TB_HideSelect').trigger("unload").unbind().remove();});
	$("#TB_load").remove();
	if (typeof document.body.style.maxHeight == "undefined") {//if IE 6
		$("body","html").css({height: "auto", width: "auto"});
		$("html").css("overflow","");
	}
	document.onkeydown = "";
	document.onkeyup = "";
	return false;
}

// Sets with and left marguin of #TB_window
function tb_position() {
	console.log("thickbox.js In tb_position() - function disabled.");
	//$("#TB_window").css({marginLeft: '-' + parseInt((TB_WIDTH / 2),10) + 'px', width: TB_WIDTH + 'px'});
	//if ( !(jQuery.browser.msie && jQuery.browser.version < 7)) { // take away IE6
	//	$("#TB_window").css({marginTop: '-' + parseInt((TB_HEIGHT / 2),10) + 'px'});
	//}

	// GA - update TB size after normal render.
	console.log("In tb_position About to call updateTBSize()");
	updateTBSize();

}

function tb_parseQuery ( query ) {
	console.log("thickbox.js In tb_parseQuery()");
	var Params = {};
	if ( ! query ) {return Params;}// return empty object
	var Pairs = query.split(/[;&]/);
	for ( var i = 0; i < Pairs.length; i++ ) {
		var KeyVal = Pairs[i].split('=');
		if ( ! KeyVal || KeyVal.length != 2 ) {continue;}
		var key = unescape( KeyVal[0] );
		var val = unescape( KeyVal[1] );
		val = val.replace(/\+/g, ' ');
		Params[key] = val;
	}
	return Params;
}

function tb_getPageSize(){
	console.log("thickbox.js In tb_getPageSize()");
	var de = document.documentElement;
	var w = window.innerWidth || self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
	var h = window.innerHeight || self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;

	console.log("thickbox.js tb_getPageSize() Widths: window.innerWidth = "
													+ window.innerWidth
													+", self.innerWidth = "
													+ self.innerWidth
													+", (de&&de.clientWidth) = "
													+ (de&&de.clientWidth)
													+", document.body.clientWidth = "
													+ document.body.clientWidth);
	arrayPageSize = [w,h];
	return arrayPageSize;
}

function tb_detectMacXFF() {
	console.log("thickbox.js In tb_detectMacXFF()");
	var userAgent = navigator.userAgent.toLowerCase();
		if (userAgent.indexOf('mac') != -1 && userAgent.indexOf('firefox')!=-1) {
		return true;
	}
}


