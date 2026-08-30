/* see:
*  http://stackoverflow.com/questions/1335851/what-does-use-strict-do-in-javascript-and-what-is-the-reasoning-behind-it
*  http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
*/
"use strict";

//alert('js loaded');


document.write('<script type="text/javascript" src="assets/js/browserDetect.js"></script>');

// GLOBAL VARS
// Switch on &pound; prefix tags
var debug = 0;

// for currently selected package
// Initialise with "pageStart" before a package has been selected
var currentPackage = "pageStart";
console.log("currentPackage now set to: " + currentPackage + " AABBB");

// Currently selected council district
var currentDistrict = {};
currentDistrict["value"] = "";
currentDistrict["name"]	 = "";
console.log(currentDistrict);
console.log('currentDistrict["value"] = '+currentDistrict["value"]);
console.log('currentDistrict["name"] = '+currentDistrict["name"]);



// http://www.htmlgoodies.com/beyond/javascript/article.php/3724571/Using-Multiple-JavaScript-Onload-Functions.htm
function addLoadEvent(func) {
	console.log("In addLoadEvent()");
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
		  if (oldonload) {
			oldonload();
		  }
		  func();
		}
	}
}

// Update total price. Is this necessary? Should it be called at the end of this file?..
// Leave commented till it's seen whether it's any use or not.
//addLoadEvent(updateTotalPrice);



// Checks whether there is a cemetery selected.
// If so, and price £0.00, sets cemetery dropdown to initial state
// Otherwise does nada.
// New version drops use of cookies.
function checkCemeterySubtotal() {
	console.log("In checkCemeterySubtotal()");
	var subtotal = $('#cemeterySubtotal').text();

	console.log("checkCemeterySubtotal() cemetery subtotal = " + subtotal);

	//var currentCemeteryFullPrice = $("select#cemetery option:selected").val();
	var currentCemeteryFullPrice = $("#cemetery select").val();
	//var currentCemeteryFullPrice = $("select#cemeteryDropdown").val();

	console.log("checkCemeterySubtotal() currentCemeteryFullPrice = " + currentCemeteryFullPrice);

	if(currentCemeteryFullPrice){
		console.log("checkCemeterySubtotal() currentCemeteryFullPrice = " + currentCemeteryFullPrice);
		setCemeteryPrice(currentCemeteryFullPrice);
	}
	else if(subtotal == "£0.00"){
		updateDistrictCemeteries();
	}
}



/*
*	When selecting a cemetery, to ensure that displayed price is correct.
*	Check age of deceased.
*		If <16
*			Zero the price, update the hidden data and keep the selected cemetery.
*		If >16
*			Reset the cemetery dropdown to force user to reselect and update all values accordingly.
*/
function checkDeceasedAge() {
	console.log("In checkDeceasedAge()");
	//console.log('Checked value is: ' + getCheckedValue(document.forms['calculatorForm'].elements['deceasedage']));

	var selectedAge = getCheckedValue(document.forms['calculatorForm'].elements['deceasedage']);
	console.log("checkDeceasedAge(): selectedAge = " + selectedAge);

	if(selectedAge === "0"){
		console.log("checkDeceasedAge(): Proceed as per selectedAge = 0");
		setCemeteryPrice('0.00');
    //alert("Just did setCemeteryPrice('0.00')");
	}
	else if(selectedAge === "1"){
		console.log("checkDeceasedAge(): Proceed as per selectedAge = 1");
	}
	else {
		console.log("checkDeceasedAge(): Proceed as per selectedAge neither 0 or 1");
		alert("Please indicate the age of the deceased");
	}
}



/*
 * Clear selection from a popup selector.
 * type is the popup type ("urn"/""/"")
*/
function clearSelectedItem(type) {
	console.log("In clearSelectedItem()");
	console.log("clearSelectedItem() clearing popup type: "+type);

	//Hide
	//$("#"+type+"SelectorWrapper").hide();
	$("#selected"+type+"sWrapper").hide(); 		// note the extra 's'
	$("#selected"+type+"Wrapper").hide();
	$("#selected"+type+"Image").hide();
	$("#selected"+type+"Name").hide();
	$("#change"+type+"Links").hide();
	////document.getElementById(type+"ReselectLink").style.display="none";
	////document.getElementById("clear"+type+"Link").style.display="none";

	//Update
	//document.getElementById(type + "Subtotal").innerHTML="";
	//document.getElementById(type+"Subtotal").innerHTML="&pound;0.00";
	updatePrice(type, 0);

	// Clear hidden result input
	$("#result_" + type).val("");


	//Show
	//$("#select"+type+"Link").show();
	// Renamed this id from eg selectflowersLink to flowersSelectorLink.
	$("#"+type+"SelectorLink").show();

//	updateTotalPrice(); // can use this or updatePrice() above..
}



/*
* get the subtotal for the option
* insert this into the value of the hidden result input for that option
*
* TODO - changing package after a checkbox is selected does not update the price to the new package's price.
*   Two options:
*   1. Run whatever function does this update.
*   2. Reset all items to their default settings when changing package. (Less desirable for a user exploring options).
*/
function doCheckboxResult(optionType, optionTag, optionText) {
	console.log("In doCheckboxResult(optionType = "+optionType+", optionTag = "+optionTag+", optionText = "+optionText+") AABB");

	// Set the checked/unchecked indicator.
	var checkedValue = "";
	if( $('#'+optionTag+"_Checkbox").is(':checked') ) {
		checkedValue = "Yes";
		console.log("In doCheckboxResult() #"+optionTag+"_Checkbox is checked. AABB");
	}
	else {
		console.log("In doCheckboxResult() #"+optionTag+"_Checkbox is unchecked. AABB");
	}

	// Get the currently displayed subtotal.
	var subtotal = $("#" + optionTag + "Subtotal").text();
	console.log("In doCheckboxResult()  optionType = "+ optionType
                                 + ", optionText = " + optionText
                                 + ", checkedValue = " + checkedValue
                                 + ", subtotal = " + subtotal+" AABB");

	// Re-write content of hidden 'result' input for submitting with form.
	//document.getElementById("result_" + optionTag).value = optionType +";"+ optionText +";"+ checkedValue +";"+ subtotal;
	$("#result_" + optionTag).val(optionType +";"+ optionText +";"+ checkedValue +";"+ subtotal);
}

/*
*	get the subtotal for the option
*	insert this into the value of the hidden result input for that option
*
*
*
*
*/
function doCheckboxResult2(optionTag, replacementPrice) {
  var optionType = $("#"+optionTag).data("optiontype");
  var optionText = $("#"+optionTag).data("optiontext");
	console.log("In doCheckboxResult2(optionType = "+optionType+", optionTag = "+optionTag+", optionText = "+optionText+") AABB");

	console.log("In doCheckboxResult2(optionTag = "+optionTag+", replacementPrice = "+replacementPrice+") AABB");
	console.log("In doCheckboxResult2() currentPackage = " + currentPackage + " AABBB");

	// Set the checked/unchecked indicator.
	var checkedValue = "";
	if( $('#'+optionTag+"_Checkbox").is(':checked') ) {
		checkedValue = "Yes";
		console.log("In doCheckboxResult2() #"+optionTag+"_Checkbox is checked. AABB");
	}
	else {
		console.log("In doCheckboxResult2() #"+optionTag+"_Checkbox is unchecked. AABB");
	}

	// Get the currently displayed subtotal.
	var subtotal = $("#" + optionTag + "Subtotal").text();
	console.log("In doCheckboxResult2()  optionType = "+ optionType
                                 + ", optionText = " + optionText
                                 + ", checkedValue = " + checkedValue
                                 + ", subtotal = " + subtotal+" AABB");

	// Re-write content of hidden 'result' input for submitting with form.
	//document.getElementById("result_" + optionTag).value = optionType +";"+ optionText +";"+ checkedValue +";"+ subtotal;
	$("#result_" + optionTag).val(optionType +";"+ optionText +";"+ checkedValue +";"+ subtotal);
}



function doPopupResult(optionType, optionTag, label) {
	console.log("In doPopupResult()");
	//var subtotal = document.getElementById(optionTag + "Subtotal").innerHTML;
	var subtotal = $("#"+optionTag + "Subtotal").html();

	//var optionText = document.getElementById(optionTag + "LabelCol").innerHTML;
	var optionText = $("#"+optionTag + "LabelCol").html();

	//alert(optionType +";"+ optionTag +";"+ optionText +";"+ label +";"+ subtotal);

	//document.getElementById("result_" + optionTag).value = optionType +";"+ optionText +";"+ label +";"+ subtotal
	$("#result_" + optionTag).val(optionType +";"+ optionText +";"+ label +";"+ subtotal);
	//document.getElementById("result_" + optionTag).value = "new value!";
}



/*
 * get the subtotal for the option
 * insert this into the value of the hidden result input for that option
 *
*/
function doRadioResult(optionType, optionTag, optionText, label) {
	console.log("In doRadioResult()");
	console.log("In doRadioResult() optionType: "+optionType+", optionTag: "+optionTag+", optionText: "+optionText+", label: "+label);
	console.log("In doRadioResult() Build the hidden result input for use in email.");

	//var subtotal = document.getElementById(optionTag + "Subtotal").innerHTML;
	var subtotal = $(optionTag + "Subtotal").html();

	/*alert("doRadioResult(optionType: " +optionType
					+ ", optionTag: " +optionTag
					+ ", optionText: " +optionText
					+ ", label: 	 " +label);*/

///	alert("result_" + optionTag +";"+ optionText +";"+ label +";"+ subtotal);

	// Build result string
	var newResultString = optionType +";"+ optionText +";"+ label +";"+ subtotal;
	console.log("In doRadioResult() setting newResultString for "+optionTag+": " + newResultString);

	// TODO - fix missing '#' in statement below. But be careful as this is also set elsewehere.
	$("result_" + optionTag).val(newResultString);
}




/*
 * Updated version
 * - ignore passed id and use standard layout based on option name
*/
function doDropdownResult(optionType, optionText, optionTag, optionId) {
	console.log("In doDropdownResult()");

	//alert("doDropdownResult(optionType: "+optionType+", optionText: "
	//			+optionText+", optionTag: "+optionTag+", optionId: "+optionId+")");

	// Find the current subtotal for this option
	var subtotal = $("#"+optionTag+"Subtotal").html();

	// Get selected label from dropdown
	var resultVal = getOptionValue(optionId);
	var resultText = getOptionText(optionId);

	// Dropdown-specific behaviour - was to eliminate need for option name in later function, but still needed..
	if(optionTag == "district"){
		currentDistrict['value'] = resultVal;
		currentDistrict['text'] = resultText;
		console.log("Selected district= "+resultVal +", "+resultText);
	}

	console.log("In doDropdownResult()  optionTag = "+ optionTag
                                 + ", optionType = " + optionType
                                 + ", optionText = " + optionText
                                 + ", resultVal = " + resultVal
                                 + ", resultText = " + resultText
                                 + ", subtotal = " + subtotal);

	// Build results string
	document.getElementById("result_"+optionTag).value = optionType + ";" + optionText + ";" + resultText + ";" + subtotal;
}



function distanceAlert(district) {
	console.log("In distanceAlert()");
	if (district > 1) {
		console.log("Please note that for distances of more than 25 miles, there is a charge per mile.");
	}
}



function displayChildren(){
	console.log("In displayChildren()");
	var children = document.getElementById('id').getElementsByTagName('*');
}




// For dropdown
// TODO - need to prevent price update if the option is set for no price in the current package.
function getOptionValue(elemId) {
	console.log("In getOptionValue()");
	console.log("getOptionValue("+elemId+")");

	//return elemId;
	//var e = document.getElementById(elemId);
	//var val = e.options[e.selectedIndex].value;

	var val = $("select#"+elemId+" option:selected").val();

	return val;
}




// Returns array of elements of the same classname
// From: http://stackoverflow.com/questions/4404154/getelementsbyclassname-ie-resolution-issue
// to replace document.getElementsByClassName() which doesn't work in IE.
function getbyclass(name) {
	console.log("In getbyclass("+name+")");
	var elements = document.getElementsByTagName("*");
	var result = [];
	for(var i=0; i<elements.length; i++) {
		//if (elements[i].getAttribute("class") == name) {
		if (elements[i].className == name) {
		//if (elements[i].getAttribute("class") == name) {
			result.push(elements[i]);
		}
	}
	//alert("getbyclass().result = " + result.length);
	return result;
}


// From http://www.somacon.com/p143.php
// return the value of the radio button that is checked
// return an empty string if none are checked, or
// there are no radio buttons
///function getCheckedValue(radioObj) {
function getCheckedValue(radioObj) {
	console.log("In getCheckedValue()");
	if(!radioObj)
		return "";
	var radioLength = radioObj.length;
	if(radioLength == undefined)
		if(radioObj.checked)
			return radioObj.value;
		else
			return "";
	for(var i = 0; i < radioLength; i++) {
		if(radioObj[i].checked) {
			return radioObj[i].value;
		}
	}
	return "";
}



// For dropdown
function getOptionText(elemId) {
	console.log("In getOptionText()");
	console.log("getOptionText("+elemId+")");

	//var e = document.getElementById(elemId);
	//var text = e.options[e.selectedIndex].text;

	var text = $("select#"+elemId+" option:selected").text();

	return text;
}


/* ajax */
function getRequest(){
	console.log("In getRequest()");
	var ajaxRequest;
	try{
		ajaxRequest = new XMLHttpRequest();
	} catch (e){
		try{
			ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try{
				ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e){
				alert("Your browser broke!");
				return false;
			}
		}
	}
	return ajaxRequest;
}



function getSelectedRadioButton(radioName) {
	console.log("In getSelectedRadioButton()");

	var user_input = 0;
	for (i=0;i<document.calculatorForm.radioName.length;i++) {
		if (document.calculatorForm.radioName[i].checked == true) {
			user_input = document.calculatorForm.radioName[i].value;
			break;
		}
	}
	console.log("user_input = " + user_input);
}


/*
* Functions for info boxes
*/
function hide(el) {
	console.log("In hide()");
	document.getElementById(el).style.display = "none";
}

function hideClose(el) {
	console.log("In hideClose()");
	document.getElementById(el).style.visibility = "hidden";
}


function isNumber(n) {
	//console.log("In isNumber()");
	return !isNaN(parseFloat(n)) && isFinite(n);
}



/*
*
* Dependency function - currently for checkboxes.
*
* When the Controlling option is selected, the Dependent option is enabled.
* When the Controlling option is unselected, the Dependent option is disabled.
*
*/
function onSelectEnableDependents(controllerTag, dependentTag, disabledPrice) {
	console.log("In onSelectEnableDependents() controllerTag = "+controllerTag+", dependentTag = "+dependentTag+", disabledPrice = "+disabledPrice);

	var theController = $("#" + controllerTag + "_Checkbox");
	var theDependentBox = $("#" + dependentTag + "_Checkbox");
	var theDependentPrice = $("#" + dependentTag).find(".subtotal");
	var theDependentText = $("#" + dependentTag + " td.labelCol").text();

	// Do what needs to be done if the Controller is selected
	if($(theController).prop('checked') == true) {
		//$(theDependentPrice).text(disabledPrice);
		//$(theDependent).prop("checked",false);
		$(theDependentBox).prop("disabled",false);
	}
	// Do what needs to be done if the Controller is unselected
	else if($(theController).prop('checked') == false) {
    	// Hopefully the triggered events (using change() ), will update the subtotal.
		$(theDependentPrice).html("&pound;0.00");
    	// Uncheck the checkbox and fire its events appropriately, using change().
		$(theDependentBox).prop("checked",false);//.trigger( "click" );
		$(theDependentBox).prop("disabled",true);
	}

	// Update the dependent's result_ here
	doCheckboxResult('checkbox', dependentTag, theDependentText);

	updateTotalPrice("called from: onSelectEnableDependents("+controllerTag+", "+dependentTag+", "+disabledPrice+")");
}


/*
*
* Dependency function - currently for checkboxes.
*
* When the Controlling option is selected, the Dependent option is disabled.
* When the Controlling option is unselected, the Dependent option is enabled.
*
* Disabled subtotal (price) can be set directly including text, eg "included",
*/
function onSelectDisableDependents(controllerTag, dependentTag, disabledPrice) {
  console.log("In onSelectDisableDependents() controllerTag = "+controllerTag+", dependentTag = "+dependentTag+", disabledPrice = "+ disabledPrice);

	var theController = $("#" + controllerTag + "_Checkbox");
	var theDependentBox = $("#" + dependentTag + "_Checkbox");
	var theDependentPrice = $("#" + dependentTag).find(".subtotal");
	var theDependentText = $("#" + dependentTag + " td.labelCol").text();

	// Do what needs to be done if the Controller is selected
	if($(theController).prop('checked') == true) {
		console.log("In onSelectDisableDependents() Controller is selected");
		$(theDependentPrice).text(disabledPrice);
		// Uncheck the checkbox and fire its events appropriately, using change().
		// TODO
		//			----------------------------------------------------------------------------------- GOT TO HERE
		// change() doesn't work, but trigger('click') does. However, this triggers the
		// togglePrice() function, which sets the subtotal with the price from the hidden inputs.
		// We only need to fire the
		//	doCheckboxResult('checkbox', 'dayHearse', 'Mercedes Benz hearse leaving from family home or location of your choice.');  function.
		// How to do this...
		$(theDependentBox).prop("checked",true);//.trigger( "click" );

		$(theDependentBox).prop("disabled",true);
	}
	// Do what needs to be done if the Controller is unselected
	else if($(theController).prop('checked') == false) {
		console.log("In onSelectDisableDependents() Controller is unselected");
		// Hopefully the triggered events (using change() ), will update the subtotal.
		$(theDependentPrice).html("&pound;0.00");
		// Uncheck the checkbox and fire its events appropriately, using change().
		$(theDependentBox).prop("checked",false);//.trigger( "click" );
		$(theDependentBox).prop("disabled",false);
	}

	// Update the dependent's result_ here
	doCheckboxResult('checkbox', dependentTag, theDependentText);

	updateTotalPrice("called from: onSelectDisableDependents("+controllerTag+", "+dependentTag+", "+disabledPrice+")");
}


/*
*
* Dependency function - currently for checkboxes.
*
* When the Controlling option is selected, the Dependent option is shown.
* When the Controlling option is unselected, the Dependent option is hidden and reset.
*
*/
function onSelectShowDependents(controllerTag, dependentTag) {

	var theController = $("#" + controllerTag + "_Checkbox");
	var theDependent = $("#" + dependentTag);
	var theDependentBox = $("#" + dependentTag + "_Checkbox");
	var theDependentPrice = $("#" + dependentTag).find(".subtotal");

	// Do what needs to be done if the Controller is selected
	if($(theController).prop('checked') == true) {
		$(theDependent).show();
	}
	// Do what needs to be done if the Controller is unselected
	else if($(theController).prop('checked') == false) {
		// Hopefully the triggered events (using change() ), will update the subtotal.
		$(theDependentPrice).html("&pound;0.03");
    	// Uncheck the checkbox and fire its events appropriately, using change().
		$(theDependentBox).prop("checked",false);//.trigger( "click" );
		//$(theDependent).hide();
	}
	updateTotalPrice("called from: onSelectShowDependents("+controllerTag+", "+dependentTag+")");
}



function setDistrict(postcode) {
	console.log("In setDistrict()");
	//simulate finding district from postcode
	if (postcode.length > 4) {
		document.getElementById("district").value = "1";
	}
}



/*
*	Collect data from an option
*	Update hidden values
*/
function setHiddenResultInput(optionTag){
	console.log("In setHiddenResultInput()");
	//Get the necessary data from hidden inputs
	var optionType = document.getElementById(optionTag + "_optionType").value;
	var optionText = document.getElementById(optionTag + "_optionText").value;
	var selectedValue = getCheckedValue(document.forms['calculatorForm'].elements[optionTag])
	var selectedLabel = document.getElementById("label_" + selectedValue + "_" + optionTag).innerHTML;

	var price = document.getElementById(optionTag + "_price_" + selectedValue).value;

//	alert(' optionType: ' + optionType + "\n optionTag:" + optionTag + '\n optionText: ' + optionText + '\n selectedValue: ' + selectedValue + "\n selectedLabel:" + selectedLabel + "\n price:" + price);

	//Set the hidden result input
	doRadioResult(optionType, optionTag, optionText, selectedLabel);
}




function showClose(el) {
	console.log("In showClose()");
	document.getElementById(el).style.visibility = "visible";
}



/*
*
*	TODO - check table-row display criterion is not broken in small screens.
*/
function showInfo2(el) {
	console.log("In showInfo2()");

	var row = document.getElementById(el);
	//row.innerHTML="<td id='testInfoBox' onclick=\"hide('"+el+"');\" colspan=4>test text goes here!</td>";

	//console.log("You\'re using " + BrowserDetect.browser + ' - ' + BrowserDetect.version + ' on ' + BrowserDetect.OS + '!');
	//console.log(row.style.display);

	// Show
	if (row.style.display != "table-row" && row.style.display != "block") {
		if (BrowserDetect.browser == "Explorer" && BrowserDetect.version < 8) {
			row.style.display="block";
		} else {
			row.style.display="table-row";
		}
			//row.style.display="none";
			//row.style.display="";
				//debug
			//	document.getElementById("test-output").innerHTML = "show";
	}
	// Hide
	else {
		row.style.display="none";
			//debug
		//	document.getElementById("test-output").innerHTML = "hide";
	}
}



function showContactDetailsForm() {
	console.log("In showContactDetailsForm()");
	document.getElementById("sendButton1").style.display = "none";
	document.getElementById("sendButton").style.display = "block";

	document.getElementById("contactDetails").style.display = "block";
}




// Sets visible price and updates hidden values
function setCemeteryPrice(price) {
	if(price==null || price=="null") {
		price = "";
	}
	console.log("In setCemeteryPrice()");
	console.log("setCemeteryPrice("+price+")");

	//var cemeterySubtotal = $('#cemeterySubtotal');
	//cemeterySubtotal.innerHTML = "&pound;" + price;

	$('#cemeteryDropdown #subtotalCol').text("&pound;" + price);

	updateTotalPrice("called from: setCemeteryPrice("+price+") ");

	doDropdownResult('dropdown', 'Please select the Cemetery you wish to use', 'cemetery', 'cemetery');
}






// From http://www.somacon.com/p143.php
// set the radio button with the given value as being checked
// do nothing if there are no radio buttons
// if the given value does not exist, all the radio buttons
// are reset to unchecked
function setCheckedValue(radioObj, newValue) {
	console.log("In setCheckedValue()");
	if(!radioObj)
		return;
	var radioLength = radioObj.length;
	if(radioLength == undefined) {
		radioObj.checked = (radioObj.value == newValue.toString());
		return;
	}
	for(var i = 0; i < radioLength; i++) {
		radioObj[i].checked = false;
		if(radioObj[i].value == newValue.toString()) {
			radioObj[i].checked = true;
		}
	}
}

/*
*	Function to set subtotal column.
*	No numeric processing.
*	Ensures that the currency symbol is correct and strips duplicates.
*
*	See updateTotalPrice() for parsing and formatting which handles text subtotals
*/
function setSubtotal(optionId, subtotal) {
	console.log("In setSubtotal() ("+optionId+", "+subtotal+") GGTT");

	// Convert subtotal to string
	subtotal = subtotal.toString();


	//https://gist.github.com/CrowderSoup/9095873
	//var str = 'This is a test string.';
	// Let's replace all spaces with ','
	//str = str.split(' ').join(',');
/*
	// Strip any pound signs
	subtotal = subtotal.replace("£", "PPP");
	subtotal = subtotal.split("£").join("PPQ");
	console.log("In setSubtotal() stripped £: "+subtotal);

	// Strip any pound sign codes
	subtotal = subtotal.replace("&pound;", "PPR");
	subtotal = subtotal.split("&pound;").join("PPS");
	console.log("In setSubtotal() stripped &pound;: "+subtotal);

	// Use regex
	subtotal = subtotal.replace(/[^\d.-]/g, '');
	console.log("In setSubtotal() stripped non-numeric chars except points: "+subtotal);

	// Use unicode
	subtotal = subtotal.replace(/\u00A3/g, '');
	console.log("In setSubtotal() stripped £ as unicode: "+subtotal);
*/

	// Check for currency symbol
	var firstChar = subtotal.substring(0,1);
	console.log("In setSubtotal() GGTT firstChar = "+firstChar);

	//var strippedSubtotal = stripLeadingAlphaChars(subtotal);
	// Temp for debug - bypass this funtion
	var strippedSubtotal = subtotal;

	console.log("In setSubtotal() GGTT strippedSubtotal = "+strippedSubtotal);

	//if( !isNumber( parseInt(subtotal.substring(0,1)) ) ) {
		// If first char is non-numeric, remove it
	//	subtotal = subtotal.substring(1);
	//}

	// check that price is a number before adding to total
	var parsedSubtotal = parseFloat(strippedSubtotal);

	// Assumes only one non-numeric char at the start of the subtotal string
	// TODO - tighten this up to strip >1
	var parsedFloatSubtotal = parseFloat(parsedSubtotal);
	var parsedIntSubtotal = parseInt(parsedSubtotal, 10);
	console.log("In setSubtotal() GGTT subtotal = "+subtotal+", parsedFloatSubtotal = " + parsedFloatSubtotal +", parsedIntSubtotal = " + parsedIntSubtotal);



	if (isNumber(parsedSubtotal)) {
		console.log("In setSubtotal() Subtotal IS a number ("+parsedSubtotal+") GGTT");


		// TODO before formaatting as currency, test whether it is an int or a float (ie is there pence?)
		// If no pence, number can be presented without decimals if required.

		// Test whether subtotal is an int or float
		if(parsedFloatSubtotal - parsedIntSubtotal == 0) {
			console.log("In setSubtotal() subtotal ("+subtotal+") is an INT GGTT");

			// If there is only one digit (including zero), format with zeros
			if(parsedSubtotal < 10) {
				subtotal = parsedSubtotal.toFixed(2);
			}
			// If more, leave out the zeros
			else {
				// Now can be formatted as currency
				subtotal = parsedSubtotal.toFixed(0);
			}
		} else {
			console.log("In setSubtotal() subtotal ("+subtotal+") is a FLOAT GGTT");

			// Now can be formatted as currency
			subtotal = parsedSubtotal.toFixed(2);
		}



		if(debug)
			$("#"+optionId+" .subtotalCol .subtotal").html("JSS1 &pound;" + subtotal);
		else
			$("#"+optionId+" .subtotalCol .subtotal").html("&pound;" + subtotal);
	}
	else {
		console.log("In setSubtotal() Subtotal IS NOT a number ("+subtotal+")");

		// Now use at it is (ie as text string)
		if(debug)
			$("#"+optionId+" .subtotalCol .subtotal").html("JSS2 " + subtotal);
		else
			$("#"+optionId+" .subtotalCol .subtotal").html(subtotal);
	}

	return;
}


/*
*	Recursive function to strip alpha chars from start of string.
*	When a numeric char is encountered the string is returned.
*
*/
function stripLeadingAlphaChars(theString) {
	console.log("In stripLeadingAlphaChars("+theString+") GGTT");

	// Convert subtotal to string
	theString = theString.toString();

	var firstChar = theString.substring(0,1);

	console.log("In stripLeadingAlphaChars() GGTT firstChar = "+firstChar);

	if( !isNumber( parseInt(firstChar) ) ) {

		// If first char is not a num, remove it and repeat.
		theString = theString.substring(1);

		console.log("In stripLeadingAlphaChars() GGTT remove one char: theString = "+theString);

		if(theString.length > 0) {
			return stripLeadingAlphaChars(theString);
		}
		return false;
	}
	console.log("In stripLeadingAlphaChars() GGTT firstChar isNumber, so return: "+theString);
	return theString;
}



/*
 *	Version for handling packages.
 *  Show/hide form rows according to their inclusion in each package (by class)
 *
 *	TODO - check currentPackage before entry. No pont in rerunning the same package.
*/
function toggleFuneralPackage(packageTag, packageName, packagePrice, calculatorMode) {
	console.log("-------------------------------------------------------------------------------");
	console.log("In toggleFuneralPackage("+packageTag+", "+packageName+", "+packagePrice+", "+calculatorMode+") GGFA");
	console.log("----------------------------------------------------------------------------");

	// Set global package var
	currentPackage = packageTag;
	console.log("In toggleFuneralPackage()  currentPackage now set to: " + currentPackage + " GGF");

	// If there is a formResponseMessage already set (from a previous quote), remove it.
	if(calculatorMode == "multi"){
		$(".formResponseMessage").fadeOut();
		//$(".formResponseMessage").css("background","pink");
	}
	else if(calculatorMode == "singlePackage"){
		//$(".formResponseMessage").css("background","yellow");
	}

  // Set hidden vars
  $("#packageTag:hidden").val(packageTag);
  $("#packageName").val(packageName); // deprecated. Remove when safe in favour of #currentPackageName.
  $("#currentPackageName").val(packageName);
  $("#packageBasePrice").val(packagePrice);

  // Set Package Name in the Basic Package Price row
  $("#basicPricePackageName").text(packageName);

	// The current package name
  //var currentPackageName = $("#packageType_data").data("name");
  var currentPackageName = packageName;
	console.log("In toggleFuneralPackage() GGF #packageTag = " + $("#packageTag").val());
	console.log("In toggleFuneralPackage() GGF #packageName = " + $("#packageName").val());
	console.log("In toggleFuneralPackage() GGF #currentPackageName = " + $("#currentPackageName").val());
	console.log("In toggleFuneralPackage() GGF #packageBasePrice = " + $("#packageBasePrice").val());
	console.log("In toggleFuneralPackage() GGF #basicPricePackageName = " + $("#basicPricePackageName").text());

	// SET VISIBILITY - ALL OPTION TYPES

	// First - hide all infobox table rows (now because it's simpler).
	$( "tr.infoBoxWrapper2").each(function() {
    console.log("In toggleFuneralPackage("+packageTag+")	#"+$(this).attr('id') +" now being hidden.");
  	//$(this).fadeOut();
  	$(this).hide(); // GA - 28/6 changed to this, presume less overhead.
	});

	// Next - disable all hidden results inputs (so they won't be submitted, and no filtering required at other end)
	$("input.result_:hidden").each(function() {
		$(this).prop("disabled", true);
	});

	// Loop through all optionRows which might be options for the current package and
  // which are not marked 'stayVis' (the controlling buttons).
	// If they have the same class name as the currently selected package, make visible,
	// if not, make invisible.

	//	TODO
	//		When $_SESSION['mode'] == "multi", widgets are all set to class="startUndisplayed"
	//		so need to loop through these as well... But this may cause problems for dependent
	//		options which are undisplayed till another option is selected....
	///$( "tr.optionRow").not( ".stayVis, .startUndisplayed" ).each(function() {
	$( "tr.optionRow").not( ".stayVis" ).each(function() {
    var currentOptionRow = $(this);
    var currentOptionTag = $(currentOptionRow).prop("id");

    console.log("In toggleFuneralPackage("+packageTag+") $(this):	#"+$(this).attr('id') +" now being hidden.. POO");
    console.log("In toggleFuneralPackage("+packageTag+") currentOptionRow: #"+$(currentOptionRow).attr('id') +" now being hidden.. POO");
    // First, hide the optionRow
		$(currentOptionRow).fadeOut();

    // IF the optionRow has the currentPackage tag as a class, show it.
		if ( $(currentOptionRow ).hasClass(packageTag)) {
			console.log("In toggleFuneralPackage("+packageTag+")	#"+$(currentOptionRow).attr('id') +" now being shown..");

			// Show the optionRow
			// Explicitly set optionRow to display as a Block element, then show.
			$(currentOptionRow).css("display","block");
			//$(currentOptionRow).css("background","lightblue");
			$(currentOptionRow).fadeIn();

			// Also fade in the option's associated infobox, which is a separate table row!
			$("."+currentOptionTag+"InfoBoxWrapper2").fadeIn();

			// And then enable this option's hidden result input
			$( "input#result_"+currentOptionTag+":hidden").prop("disabled", false);

			// DEBUG TEST - check whether child elements have been left hidden.
			/*	var optionTag = $(this).attr("id");
			var noChildrenVisible = $(this).find(':visible').length;
			var warning = "ok";
			if(noChildrenVisible < 1){ var warning = "!!!!!!!!!!!!"; }
			console.log("toggleFuneralPackage(): VISIBLE option " + optionTag + " has " + noChildrenVisible + " visible children. " + warning);	*/
		}
	});

  // DISPLAY PACKAGE BASE PRICE
  //console.log("In toggleFuneralPackage()	About to show tr#packageType.. SWQ");
  //$("tr#packageType").show(); // deprecated. This row now has optionRow and packageTag classes and is handled in the loop above.

	// DISPLAY PACKAGE TEXT (FOR MULTI MODE)
	var packageText = $("#packageText-" + packageTag).val();
	$("tr#packageText td").html(packageText);

	// DISPLAY FOOTER SECTIONS
	$(".footer").show();


	// DO POPUP SELECTORS
	// Loop through all optionRows that use popup selectors and are visible.
	// Currently, just clear them whenever changing package
  	// Currently there are no package-specific params for popup selectors

  	// Find all visible optionRows of class 'popupSelector'
	//$("tr.optionRow.popupSelector").filter(":visible").each(function() {
	$( ".optionRow.popupSelector:visible" ).each(function() {

		var visibleOptionRow = this; // TODO - "this" or "$(this)" ?

		// Find the id and type of option
		var optionId = $(visibleOptionRow).prop("id");
		var optionType = $(visibleOptionRow).data("optiontype");
		console.log("In toggleFuneralPackage() found a visible popupSelector optionRow: " + optionId + " (" + optionType + ")");

		// For each, call the clearSelectedItem() function to reset
		clearSelectedItem(optionId);

		// Make any updates required for the CURRENT PACKAGE
		// Get the hidden input matching the currentPackage
		var hidnInput = $(visibleOptionRow).find(".subtotalCol input:hidden." + currentPackage);

		// Swap in alternative option label text for this package, if any
		if($(hidnInput).data('optiontext')){
			$("#"+optionId+"LabelCol").text( $(hidnInput).data('optiontext') );
		}

		// Check if we need to deduct an amount from the normal prices
		if($(hidnInput).data('deductprice') == 1) {

			// Create URL params for calling popup:

			// Prices are to be deducted - boolean
			var deductPrice_Param = "&ded=1";

			// The amount to be deducted from the normal prices (if there's no default item)
			var deductionAmount_Param = "&dedAmnt=" + $(hidnInput).data('deductionamount');

			// The text to prefix the deducted prices, if any
			if($(hidnInput).data('deductionprefix')){
				var deductionPrefix_Param = "&dedPref=" + $(hidnInput).data('deductionprefix');
			} else {
				var deductionPrefix_Param = "";
			}

			// The default item (eg coffin, urn), if any
			if($(hidnInput).data('defaultitem')){
				var defaultItem_Param = "&default=" + $(hidnInput).data('defaultitem');
			} else {
				var defaultItem_Param = "";
			}

			// The current package name
      		//var currentPackageName = $("#packageType_data").data("name"); // done further up function
			var currentPackage_Param = "&package=" + currentPackageName;
			console.log("In toggleFuneralPackage() GGF currentPackage_Param = " + currentPackage_Param);

			// Build the URL param string
			var deductionParams = deductPrice_Param + deductionAmount_Param + deductionPrefix_Param + defaultItem_Param + currentPackage_Param;

			// Append these params to the existing Thickbox link URL
			// Get the URL
			var popupUrl = $("#"+optionId +" .selectorCol .popupSelectorLink a").attr("href");
			console.log("In toggleFuneralPackage() 1. popupSelector optionRow: " + optionId + ", URL = " + popupUrl);
			// Set the URL
			$("#"+optionId +" .selectorCol .popupSelectorLink a").attr("href", popupUrl+deductionParams);
			var popupUrl = $("#"+optionId +" .selectorCol .popupSelectorLink a").attr("href");
			console.log("In toggleFuneralPackage() 2. reset popupSelector optionRow: " + optionId + ", URL = " + popupUrl);

			// Append these params to the reselect link URL
			// Get the URL
			var reselectUrl = $("a#" + optionId + "ReselectLink").attr("href");
			// Set the URL
			$("a#" + optionId + "ReselectLink").attr("href", reselectUrl+deductionParams);

		}

	}); // end POPUP SELECTORS


	// DO DROPDOWNS

  // Specific Dropdowns

  // Cemeteries
	// Clear all options out of the cemeteries dropdown
	$("#cemeteryDropdown").html("");

	// If cemeteries dropdown is visible (ie included in the current Package), populate it.
  // TODO - maybe also test to see if it's empty and save a wasted ajax call.
  // - actually, no point in this - can't update cemeteries until a council district has been selected, so trigger
  // the update from there.
	//if($("#cemeteryDropdown:visible")) {
    //updateDistrictCemeteries();           // Delete this chunk when safe
  //}

	// Replace the inital cemetry option label
  // TODO - store this in hidden data- (eg as data-initial-cemetery="") and collect from there.
	var label = $("#initial_cemetery").val();
	$("#cemeteryDropdown").html("<option value=''>"+label+"</option>");

  // Crematoria
	// If crematoria dropdown is visible (ie included in the current Package), populate it.
  // TODO - maybe also test to see if it's empty and save a wasted ajax call.
  // Replaced this with package-specific call to updateCrematoria(). Let's see how it works out...
	///if($("#crematoriumDropdown:visible")) {
	if( $("#crematoriumDropdown").is(":visible") ) {
		console.log("In toggleFuneralPackage() ASSS #crematoriumDropdown IS visible");
		console.log("In toggleFuneralPackage() ASSS1 num Crematoria = " + $("#crematoriumDropdown").length);
		//console.log("In toggleFuneralPackage() found #crematoriumDropdown:visible  Now to call updateCrematoria()...");
		updateCrematoria('Call from toggleFuneralPackage() ASSS line:986...');
		console.log("In toggleFuneralPackage() ASSS2 num Crematoria = " + $("#crematoriumDropdown").length);
	} else {
		console.log("In toggleFuneralPackage() ASSS #crematoriumDropdown is NOT visible");
	}


  // Now, loop through ALL dropdowns.
	//$( ".optionRow.dropdown:visible" ).each(function() {
	$( ".optionRow.dropdown").filter(":visible").each(function() {

		var visibleDropdownRow = this;

		// Find the id and type of option
		var optionId = $(visibleDropdownRow).prop("id");
		var optionType = $(visibleDropdownRow).data("optiontype");
		console.log("In toggleFuneralPackage() AAA found a visible dropdown optionRow: " + optionId + " (" + optionType + ")");

		// Save the dropdown
    var theDropdown = $(visibleDropdownRow).find(".selectorCol select");
    // Get the dropdown id
    var dropdownId = $(theDropdown).prop("id");

 		console.log("In toggleFuneralPackage() AAA dropdownId = " + dropdownId);


    // Unselect any selected dropdown options
  	//$("#"+ optionId + " select option").removeAttr("selected");
  	$(theDropdown).find("option").removeAttr("selected");

  	// Zero dropdown subtotals.
    // TODO - some dropdowns don't have a price...
  	//$("#"+ optionId + " .subtotalCol .subtotal").html("&pound;0.10");
  	// Clear instead of zero
  	//$("#"+ optionId + " .subtotalCol .subtotal").text("");
  	$(visibleDropdownRow).find(".subtotalCol .subtotal").text("");


/* ------------------------------------ GOT TO HERE --------------------------------------------------- */

  	// Make any updates required for the CURRENT PACKAGE
  	// Get the hidden input matching the currentPackage
  	var hidnInput = $("#"+ optionId).find(".subtotalCol input:hidden." + currentPackage);


	// Set onclick actions, if any, for the current package (from checkboxes)
	if($(hidnInput).data('onchange') != "") {
		// clears current onclick actions
		$(theDropdown).attr('onchange', '');
		console.log("In toggleFuneralPackage() AAA (dropdown: "+dropdownId+") currentOnChange = " + $(theDropdown).attr('onclick') );

		// Get the actions for this package
		var currentPackageOnChange = $(hidnInput).data('onchange');
		console.log("In toggleFuneralPackage() AAA (dropdown: "+dropdownId+") currentPackageOnChange = " + currentPackageOnChange );

		// Set the new actions
		$(theDropdown).attr('onchange', currentPackageOnChange);
		//$(theDropdown).click(newclick);
	}

  	// Set subtotal to price or text/blank.
		var price = $(hidnInput).data('price');
		var hasPrice = $(hidnInput).data('hasprice');
  	if($(hidnInput).data('hasprice') == 0){
		// Price can be empty string, £0.00 or text.
		if(debug)
  			$("#"+optionId+"Subtotal").text("L111 -" + price +"-");
  		else
  			$("#"+optionId+"Subtotal").text(price);
  	}
		else if(hasPrice == 1) {
			if(debug)
				$("#"+optionId+"Subtotal").html("L222 &pound;0.00");
			else
				$("#"+optionId+"Subtotal").html("&pound;0.00");
		}


  });


















	// SETTING PACKAGE-SPECIFIC ATTRIBUTES:
	// Update package-specific subtotals, event handlers etc for all form options,
	// using the hidden vars holding the price for each package.
	//      ONLY DO THIS IF THE OPTION IS VISIBLE (ie included in that Package)
	//      AND SELECTED (ie the price will be something other than £0.00) ----- may not be implemented
	//      Otherwise ignore.


  // DO RADIO BUTTONS
	// Loop through all optionRows that use radio buttons and are visible.
	$( ".optionRow.radio:visible" ).each(function() {

		var visibleOptionRow = this;

    // Find the id and type of option
    var optionId = $(visibleOptionRow).prop("id");
    var optionType = $(visibleOptionRow).data("optiontype");
    console.log("In toggleFuneralPackage() found a visible optionRow: " + optionId + " (" + optionType + ")");

		// Clear subtotal, for now.
    // TODO - some options don't have prices!
    // - eg an option may offer choices, some or all of which are included in the package base price.
    	if(debug)
			$(visibleOptionRow).find( ".subtotal" ).html("LL98 &pound;0.00");
		else
			$(visibleOptionRow).find( ".subtotal" ).html("&pound;0.00");

		// Loop through the radio buttons (but not the hidden inputs)
		$(visibleOptionRow).find(".selectorCol input:not(:hidden)").each(function() {

			// Save the radio button
			var theButton = this;

			var buttonGroupName = $(theButton).prop("name"); // button name
      var buttonIndex = $(theButton).val();            // button index (position in the radio button group)
      console.log("In toggleFuneralPackage() found a radio button: index = " + buttonIndex + ", name = " + buttonGroupName);

			// Ensure the button is deselected.
			$(theButton).prop('checked', false);

      // NOW - set the button values for the CURRENT PACKAGE

			// Get the hidden input matching the currentPackage*
      // *It should exist, o/w the option wouldn't have the package tag in its classes and we wouldn't be handling this button.
			var hidnInput = $(visibleOptionRow).find(".subtotalCol input:hidden." + currentPackage);

      // Current Package EVENT HANDLERS

      // 1st, remove any that are there.
      // (Appears to remove only event handlers that were added via JQuery.
      //  - That's fine, the default ones (eg for updating price etc) will remain intact.)
      $( theButton ).off( "click" );

      // ALERTS
      // Check to see if there is one for this button+package. (Do we really want more than one?..)
      if( $(hidnInput).data('alert-'+buttonIndex) ) {

        console.log("In toggleFuneralPackage() found an alert for radio button " + buttonIndex +" in "+ currentPackage +": alert = "+$(hidnInput).data('alert-'+buttonIndex));

        // Add it to the button.
        var alertHandler = function() {
          alert( $(hidnInput).data('alert-'+buttonIndex) );
        };
        $( theButton ).on( "click", alertHandler );
      }
      // Other EVENT HANDLER types - repeat the bove block.
      // Other PACKAGE-SPECIFIC params* - find in the hidnInput var
      // *Package-specific prices are handled in updateRadioPrice()
      // TODO - standardise where prices are updated (here for radio, below for checkboxes..)

		});
	}); // end of visible radio button options loop




  // DO CHECKBOXES
	// Loop through all optionRows that use checkboxes and are visible.
	$( ".optionRow.checkbox:visible" ).each(function() {

    // (Redeclared vars. Should be OK, but keep an eye on them.)
		var visibleOptionRow = this;

    // Find the id and type of option
    var optionId = $(visibleOptionRow).prop("id");
    var optionType = $(visibleOptionRow).data("optiontype");
    console.log("In toggleFuneralPackage() found a visible optionRow: " + optionId + " (" + optionType + ")");

		// Clear subtotal, for now.
    // TODO - some options don't have prices!
    // - eg an option may offer choices, some or all of which are included in the package base price.
		$(visibleOptionRow).find( ".subtotal" ).html("L2424 &pound;0.24");

		// Loop through the checkboxes (but not the hidden inputs)
    // TODO - may need multi checkboxes in future
		$(visibleOptionRow).find(".selectorCol input:not(:hidden)").each(function() {

  		// Save the checkbox
  		var theCheckbox = this;

			// Get the checkbox id
			var checkboxId = $(theCheckbox).prop("id");
      console.log("In toggleFuneralPackage() found a checkbox: id = " + checkboxId );

      // NOW - set the button values for the CURRENT PACKAGE

			// RESET PACKAGE SPECIFIC VALUES (eg disabled/checked, onclick) as required.
			// Get the hidden input matching the currentPackage
			var hidnInput = $(visibleOptionRow).find(".subtotalCol input:hidden."+currentPackage);

			//Get the checked value
			if($(hidnInput).data('checked') == 1) {
				$(theCheckbox).prop("checked", true);
			}
			else if($(hidnInput).data('checked') == 0) {
				$(theCheckbox).prop("checked", false);
			}

			//Get the disabled value
			if($(hidnInput).data('disabled') == 1){
				$(theCheckbox).prop("disabled", true);
			}
			else if($(hidnInput).data('disabled') == 0){
				$(theCheckbox).removeAttr("disabled");
			}

      // Set onclick actions, if any, for the current package.
      if($(hidnInput).data('onclick') != "") {

        console.log("In toggleFuneralPackage() (checkbox: "+checkboxId+") currentOnclick = " + $(theCheckbox).attr('onclick') );

        // clears current onclick actions
        $(theCheckbox).attr('onclick', '');
        console.log("In toggleFuneralPackage() (checkbox: "+checkboxId+") currentOnclick (cleared) = " + $(theCheckbox).attr('onclick') );

        // Get the actions for this package
        var currentPackageOnclick = "";
        currentPackageOnclick = $(hidnInput).data('onclick');
        console.log("In toggleFuneralPackage() ABCD (checkbox: "+checkboxId+") currentPackageOnclick = " + currentPackageOnclick );

        // Set the new actions
        $(theCheckbox).attr('onclick', currentPackageOnclick);
        //$(theCheckbox).click(newclick);
      }

			// SET THE SUBTOTAL (for the current package)
      // TODO - standardise where prices are updated (here for checkboxes, updateRadioPrice() for radio)
			if( $(theCheckbox).is( ":checked" ) ) {

				// Get the hidden price and replace the subtotal with it
				var currentPackagePrice = $(hidnInput).data('price');

        console.log("In toggleFuneralPackage() found a checkbox: id = " + checkboxId +",  currentPackagePrice = "+currentPackagePrice);


				if (isNumber(currentPackagePrice)) {
					// (Values of things in Javascript are automatically set to string type,
					// so convert to number).
					currentPackagePrice = parseFloat(currentPackagePrice).toFixed(2);
				}
				// O/W do nothing, as there may be a non-numeric value to display ("£included" etc).

				// set the currentPackage price as the subtotal for this option
				$(visibleOptionRow).find( ".subtotal" ).html("&pound; CCC" + currentPackagePrice );
			}
			else { // If not checked
				// Set the subtotal to £0.00  (could leave as-is, but maybe this is safer)
				// TODO - this does not allow for text prices (eg "included").....
				if(debug)
					$(visibleOptionRow).find( ".subtotal" ).html("LC675 &pound;0.00");
				else
					$(visibleOptionRow).find( ".subtotal" ).html("&pound;0.00");
			}

		}); // end of loop through the checkboxes
	}); // end of visible checkbox options loop

	console.log("----------------------------------------------------------------------------");
	console.log("End toggleFuneralPackage("+packageTag+", "+packageName+", "+packagePrice+", "+calculatorMode+") GGFA");
	console.log("-------------------------------------------------------------------------------");

	updateTotalPrice("called from: toggleFuneralPackage("+packageTag+", "+packageName+", "+packagePrice+", "+calculatorMode+")");
}



/*
 * For tickboxes - handle package subtotal.
 * Based on name of the tickbox (could change this to ID, but name can be used to construct IDs) and the current package (from global var)
 * If unticking, zero the subtotal.
 * If ticking, replace subtotal with the price set for the current package for this option.
 *
*/
function togglePrice(inputId) {
	console.log("In togglePrice("+inputId+"), currentPackage = " + currentPackage);

	var input = $("#" + inputId + "_Checkbox");
	var subtotal = $("#"+inputId+"Subtotal");

	// If box is checked
	if ( input.is( ":checked" ) ){
		//alert(inputId + " IS checked");

  	console.log("In togglePrice("+inputId+") - box " + $(input).attr('id') + " is checked");

		// Update package-specific subtotals for all form options.
		subtotal.siblings("input:hidden").each(function() {

			if ( $(this).hasClass(currentPackage)) {

				// Get the currentPackage price for this option
				//var currentPackagePrice = $(this).val();
				var currentPackagePrice = $(this).data("price");

				//alert("togglePrice() currentPackagePrice = "+currentPackagePrice);

				if (isNumber(currentPackagePrice)) {
					// (Values of things in Javascript are automatically set to string type,
					// so convert to number).
					currentPackagePrice = parseFloat(currentPackagePrice).toFixed(2);
				}

				// set the currentPackage price as the subtotal for this option
				if(debug)
					subtotal.html("K777 &pound; " + currentPackagePrice);
				else
					subtotal.html("&pound;" + currentPackagePrice);

				return false;
			}
		});
	}
	else {
		//alert(inputId + " NOT checked");
		// set the subtotal to zero.
		if(debug)
			subtotal.html("LH29 &pound;0.00");
		else
			subtotal.html("&pound;0.00");
	}

	updateTotalPrice("called from: togglePrice("+inputId+")");
	return;
}


	/*
		1. Find all visible optionRows of class 'popupSelector'
		2. For each, call the clearSelectedItem() function
	*/
	$("tr.optionRow.popupSelector").filter(":visible").each(function(){
			var selectorName = $(this).prop("id");
			clearSelectedItem(selectorName);
	});



/*
* For updating popup selectors.
*
*/
function updateSelectedItem(type, image, caption, price) {
	console.log("In updateSelectedItem() VVCC");
	var selectedItem = "<img src='" + image + "' class='selectedImage vvv' />";

	//Update
	$("#selected" + type + "Image").html(selectedItem);
	$("#selected" + type + "Name").html(caption);
	$("#"+type+"Subtotal").html("&pound;"+price);

	//Show
	$("#selected" + type + "sWrapper").show();		// Note the extra 's'
	$("#selected" + type + "Wrapper").show();
	$("#selected" + type + "Name").show();
	$("#selected" + type + "Image").show();
	$("#change" + type + "Links").show();

	$("#"+type+"ReselectLink").show();

	if ($("#"+type + "MultiSelectLink")) {
		$("#"+type + "MultiSelectLink").show();
	}

	$("#clear"+type+"Link").show();

	//Hide
	//$("#select" + type + "Link").hide();
	// Renamed this id from eg selectflowersLink to flowersSelectorLink.
	$("#"+type+"SelectorLink").hide();

	// Update hidden result input and subtotal here
	doPopupResult('popup', type, caption);

	updateTotalPrice("called from: updateSelectedItem("+type+", "+image+", "+caption+", "+price+") VVCC ");
}



function undisplayChildren(){
	console.log("In undisplayChildren()");
	var children = document.getElementById('id').getElementsByTagName('*');
}



/*
*	Stores the price in session before updating it on screen.
*	-- not sure we need this any more --
*
*	-- deprecated? --
*/
function updateAndStorePrice_deprecated(name, unitPrice, quantity) {
	console.log("In updateAndStorePrice() ("+name+", "+unitPrice+", "+quantity+")");

	// Quantity defaults to 1 if not passed
	quantity = typeof(quantity) != 'undefined' ? quantity : 1;

	var value = unitPrice * quantity;

	updatePrice(name, unitPrice, quantity);
}



/*
 * Populate dropdown of crematoria when Cremation is selected
 * TODO - This will be deprecated when crematoria are taken from the db.
*/
function updateCrematoria(debugmessage) {
	console.log("In updateCrematoria("+debugmessage+") Start.");

	var ajaxRequest = getRequest();
	ajaxRequest.onreadystatechange = function() {
		if(ajaxRequest.readyState == 4 && ajaxRequest.status == 200) {

			console.log("In updateCrematoria("+debugmessage+") ajaxRequest.responseText = " + ajaxRequest.responseText);

			// Get the hidden input matching the currentPackage
			var hidnInput = $("#crematorium .subtotalCol input#crematorium_" + currentPackage + "_data:hidden");

			console.log("In updateCrematoria("+debugmessage+") hidnInput search string = '#crematorium .subtotalCol input#crematorium_" + currentPackage + "_data:hidden'");
			console.log("In updateCrematoria("+debugmessage+") hidnInput = " + hidnInput);

			// Fix for IE bug http://support.microsoft.com/kb/276228

			// Insert options into select
			$("select#crematoriumDropdown").html(ajaxRequest.responseText);

      // Set price to the default for the current package
			var price = $(hidnInput).data('price');
			var hasPrice = $(hidnInput).data('hasprice');
			if(hasPrice == 0) {
				// Price can be empty string, £0.00 or text.
				//$("#crematoriumSubtotal").text("L555 -"+price +"-");
				$("#crematoriumSubtotal").text(price);
			}
			else if(hasPrice == 1) {
				//$("#crematoriumSubtotal").html("L666 &pound;0.00");
				$("#crematoriumSubtotal").html("&pound;0.00");
			}
			console.log("In updateCrematoria("+debugmessage+"): for " + currentPackage
                                        + ": hasprice = " + hasPrice
                                        + ", price = " + price);

      // Check to see if we are actually contacting #crematoriumSubtotal
      var currentSubtotal = $("#crematoriumSubtotal").text();
			console.log("In updateCrematoria("+debugmessage+"): currentSubtotal = " + currentSubtotal);



			// TODO - there's no price wrapper! Need to ensure this goes in at the start, even if empty.
			//var subtotal = $('#crematoriumSubtotal');
			//$("#crematorium .subtotal").text = ("&pound;0.00");

			updateTotalPrice("called from: updateCrematoria("+debugmessage+") after updating #crematoriumSubtotal via ajax ");
		}
	}

	// Flat file version
	//ajaxRequest.open("GET", "assets/snippets/calculator/calculator/crematoria.php", true);
	//ajaxRequest.send(null);

	// DB version
	// Call directed to scottishfunerals.com/getcrematoria in order to access db via the modx connection
	ajaxRequest.open("GET", "ajax/getcrematoria", true);
	ajaxRequest.send(null);
}



// Sets cemetery dropdown to initial state
function updateDistrictCemeteries() {
	console.log("In updateDistrictCemeteries()");
	var selectedDistrict = getOptionValue('districtDropdown');
	//var selectedDistrict = currentDistrict['value'];

	console.log("In updateDistrictCemeteries() selectedDistrict = " + selectedDistrict);

	var ajaxRequest = getRequest();
	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4){

			console.log("In updateDistrictCemeteries() ajaxRequest.responseText = ");
			console.log(ajaxRequest.responseText);

			// Replace the entire html content of the select
			$("#cemeteryDropdown").html(ajaxRequest.responseText);

			// Hide the first option (that was there already), for future use.
			//$("#cemeteryDropdown option:eq(0)").hide();

			$("#cemeteryDropdown select").html(ajaxRequest.responseText);


			// Reset the subtotal, to either, blank, £0 or whatever the hidden data-price is

			// Get the hidden input matching the currentPackage
			var hidnInput = $("#cemetery .subtotalCol input#cemetery_" + currentPackage + "_data:hidden");

			var price = $(hidnInput).data('price');
			var hasPrice = $(hidnInput).data('hasprice');
			if(hasPrice == 0) {
				// Price can be empty string, £0.00 or text.
				//$("#cemeterySubtotal").text("L333 -"+price +"-");
				$("#cemeterySubtotal").text(price);
			}
			else if(hasPrice == 1) {
				//$("#cemeterySubtotal").html("L444 &pound;0.00");
				$("#cemeterySubtotal").html("LD33 &pound;0.00");
			}
			console.log("In updateDistrictCemeteries(): for " + currentPackage
                                                        + ": hasprice = " + hasPrice
                                                        + ", price = " + price);

			updateTotalPrice("called from: updateDistrictCemeteries() after updating #cemeterySubtotal via ajax ");
		}
	}
	var queryString = "?dist=" + selectedDistrict;

	console.log("updateDistrictCemeteries() queryString = "+queryString);

	// (Original) call to database is made from this next file, based on dist id
	//ajaxRequest.open("GET", "...path-to.../calculator/calculator/districtCemeteries.php" + queryString, true);

	// Call directed to scottishfunerals.com/getcemeteries in order to access db via the modx connection
	ajaxRequest.open("GET", "ajax/getcemeteries" + queryString, true);
	ajaxRequest.send(null);
}




/*
 * Updated for package arrays etc
 * 2/6/16 - add fixedFee - TODO - beware adverse effects on other widgets.
 *
*/
function updatePrice(name, unitPrice, quantity, fixedFee) {
	console.log("In updatePrice()");


	console.log("updatePrice() ("+name+", "+unitPrice+", "+quantity+", "+fixedFee+")");

	//Quantity defaults to 1 if not passed
	quantity = typeof(quantity) !== 'undefined' ? quantity : 1;

  var price;

  // If quantity is zero just return £0.00
  if(quantity == 0) {
    price = "0.00";
  }
	else if (isNumber(unitPrice)) {
    //var value = parseFloat(unitPrice.substring(1));
		price = unitPrice * quantity;

		// If there's a fixed fee, and it's a number > 0, add it.
		//if (fixedFee !== undefined && fixedFee > 0) {
		if (typeof fixedFee !== "undefined" && isNumber(unitPrice) && fixedFee > 0) {
			price += fixedFee;
		}
		price = price.toFixed(2);
	} else {
		price = unitPrice;
	}
	if(debug)
		$("#"+name+" .subtotalCol .subtotal").html("JUP &pound;" + price);
	else
		$("#"+name+" .subtotalCol .subtotal").html("&pound;" + price);

	updateTotalPrice("called from: updatePrice("+name+", "+unitPrice+", "+quantity+", "+fixedFee+") ");
	return;
}





/*
 * New function for radio buttons.
 * Finds the selected radio button.
 * Finds price for current package in hidden inputs.
 * Currently for two-button sets.
 * Next version to be for multiple radio buttons.
 *
*/
function updateRadioPrice(optionTag) {
	console.log("In updateRadioPrice()");
	console.log("updateRadioPrice() optionTag = "+optionTag);

	/*
	* 1. Find selected button
	* 2. Find corresponding price for current package
	* 3. Apply price to subtotal
	*/
	var optionRow = $("#"+optionTag);
	var subtotal = $("#"+optionTag+"Subtotal");

	// Get index (name) of selected button (all versions work)
	//var buttonIndex = $("#"+optionTag+" .selectorCol input:radio:checked").val();
	//var buttonIndex = $("[name='"+optionTag+"']:checked").val();
	var buttonIndex = $("input:radio[name='"+optionTag+"']:checked").val();
	console.log("updateRadioPrice() buttonIndex 1 = "+buttonIndex);

	// If a selected button was found
	if(buttonIndex){
		console.log("updateRadioPrice() buttonIndex 2 = "+buttonIndex);

		// Get the hidden input with class matching the current package
		var hiddenDataInput = $("tr#"+optionTag+" .subtotalCol input."+currentPackage).filter(":hidden");

		// Get the currentPackage price for this option
		var currentPackagePrice = $(hiddenDataInput).data("price-"+buttonIndex);

		console.log("updateRadioPrice() var currentPackagePrice = $("+hiddenDataInput+").data('price-'"+buttonIndex+");");
		console.log("updateRadioPrice() currentPackagePrice = "+currentPackagePrice);

		if (isNumber(currentPackagePrice)) {
			// (Values of things in Javascript are automatically set to string type, so convert to number).
			currentPackagePrice = parseFloat(currentPackagePrice).toFixed(2);
		}

		// set the currentPackage price as the subtotal for this option
		if(debug)
			subtotal.html("LK88 &pound;" + currentPackagePrice);
		else
			subtotal.html("&pound;" + currentPackagePrice);
	}
	else {
		console.log("Error: updateRadioPrice() No buttons checked: setting the subtotal to zero");
		// No buttons checked: set the subtotal to zero.
		subtotal.html("LJ99 &pound;0.00");
	}

	updateTotalPrice("called from: updateRadioPrice("+optionTag+")");
	return;
}


/*
 * Updated with JQuery
 *
*/
function updateTotalPrice(debugNote) {
	console.log(" -------------- In updateTotalPrice() ------------------ ");
	if(debugNote instanceof Event){
		console.log("In updateTotalPrice() - called by an Event of type : " + debugNote.type);
	}
	else {
		console.log("In updateTotalPrice() - "+debugNote);
	}
	//alert("In updateTotalPrice() caller is " + arguments.callee.caller.toString());
	//echo"In updateTotalPrice() \$('.subtotal').length = ".$('.subtotal').length."<br/>";
	//console.log("In updateTotalPrice() caller = " + updateTotalPrice.caller);

	console.log("In updateTotalPrice() $('.subtotal').length = " + $(".subtotal").length);

	// If there is at least one .subtotal element, loop through them.
	if ($(".subtotal").length) {

		var resultsString = "";
		var total = 0;

		console.log("In updateTotalPrice() Loop through all visible .subtotal elements...");

		$(".subtotal").filter(":visible").each(function(){

			// TODO - Ensure that elements made invisible are also zeroed

			var subtotalId = $(this).attr('id');
			//var price = $(this).html();
			var price = $(this).text();

			console.log("In updateTotalPrice("+subtotalId+ " : "+price+")");

			// check that price is a number before adding to total
			var value = parseFloat(price.substring(1));
			console.log("In updateTotalPrice() parsed subtotal: "+ $(this).attr('id') +" = "+value);

			if (isNumber(value)) {
				console.log("In updateTotalPrice() subtotal: "+ $(this).attr('id') +" = "+value);
				resultsString += value+"<br />";
				total += value;
			}

			var formattedTotal = total.toFixed(2);
			if(debug)
				$("#total").html("LP000 &pound;"+formattedTotal);
			else
				$("#total").html("&pound;"+formattedTotal);
			if(debug)
				$("#input-total").val("LF001 &pound;"+formattedTotal);
			else
				$("#input-total").val("&pound;"+formattedTotal);
		});

		// If the Total is > 0 make sure the Total row is visible
		// TODO - do this elsewhere, based on presence of a currentPackage, as opposed to Total value.
		if(total > 0 && $("#footerRow").is(":visible") === false){
			$("#footerRow").fadeIn();
		}

	} else { // If no subtotal elements found
			$("#total").html("Not updated!");
	}
}



// http://stackoverflow.com/questions/704758/how-to-check-if-an-element-is-really-visible-with-javascript
function visible(element) {
	console.log("In visible()");
	if (element.offsetWidth === 0 || element.offsetHeight === 0) return false;
	var height = document.documentElement.clientHeight,
	  rects = element.getClientRects(),
	  on_top = function(r) {
		var x = (r.left + r.right)/2, y = (r.top + r.bottom)/2;
		document.elementFromPoint(x, y) === element;
	  };
	for (var i = 0, l = rects.length; i < l; i++) {
	var r = rects[i],
		in_viewport = r.top > 0 ? r.top <= height : (r.bottom > 0 && r.bottom <= height);
	if (in_viewport && on_top(r)) return true;
	}
	return false;
}
