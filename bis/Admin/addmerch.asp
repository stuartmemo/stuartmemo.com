<%@LANGUAGE="JAVASCRIPT"%>
<!--#include virtual="/Connections/Bis.asp" -->
<%
// *** Edit Operations: declare variables

// set the form action variable
var MM_editAction = Request.ServerVariables("URL");
if (Request.QueryString) {
  MM_editAction += "?" + Request.QueryString;
}

// boolean to abort record edit
var MM_abortEdit = false;

// query string to execute
var MM_editQuery = "";
%>
<%
// *** Insert Record: set variables

if (String(Request("MM_insert")) != "undefined") {

  var MM_editConnection = MM_Bis_STRING;
  var MM_editTable  = "Merchandise";
  var MM_editRedirectUrl = "/Admin/index.asp";
  var MM_fieldsStr = "item|value|description|value|image|value|price|value";
  var MM_columnsStr = "Item|',none,''|Description|',none,''|Image|',none,''|Price|',none,''";

  // create the MM_fields and MM_columns arrays
  var MM_fields = MM_fieldsStr.split("|");
  var MM_columns = MM_columnsStr.split("|");
  
  // set the form values
  for (var i=0; i+1 < MM_fields.length; i+=2) {
    MM_fields[i+1] = String(Request.Form(MM_fields[i]));
  }

  // append the query string to the redirect URL
  if (MM_editRedirectUrl && Request.QueryString && Request.QueryString.length > 0) {
    MM_editRedirectUrl += ((MM_editRedirectUrl.indexOf('?') == -1)?"?":"&") + Request.QueryString;
  }
}
%>
<%
// *** Insert Record: construct a sql insert statement and execute it

if (String(Request("MM_insert")) != "undefined") {

  // create the sql insert statement
  var MM_tableValues = "", MM_dbValues = "";
  for (var i=0; i+1 < MM_fields.length; i+=2) {
    var formVal = MM_fields[i+1];
    var MM_typesArray = MM_columns[i+1].split(",");
    var delim =    (MM_typesArray[0] != "none") ? MM_typesArray[0] : "";
    var altVal =   (MM_typesArray[1] != "none") ? MM_typesArray[1] : "";
    var emptyVal = (MM_typesArray[2] != "none") ? MM_typesArray[2] : "";
    if (formVal == "" || formVal == "undefined") {
      formVal = emptyVal;
    } else {
      if (altVal != "") {
        formVal = altVal;
      } else if (delim == "'") { // escape quotes
        formVal = "'" + formVal.replace(/'/g,"''") + "'";
      } else {
        formVal = delim + formVal + delim;
      }
    }
    MM_tableValues += ((i != 0) ? "," : "") + MM_columns[i];
    MM_dbValues += ((i != 0) ? "," : "") + formVal;
  }
  MM_editQuery = "insert into " + MM_editTable + " (" + MM_tableValues + ") values (" + MM_dbValues + ")";

  if (!MM_abortEdit) {
    // execute the insert
    var MM_editCmd = Server.CreateObject('ADODB.Command');
    MM_editCmd.ActiveConnection = MM_editConnection;
    MM_editCmd.CommandText = MM_editQuery;
    MM_editCmd.Execute();
    MM_editCmd.ActiveConnection.Close();

    if (MM_editRedirectUrl) {
      Response.Redirect(MM_editRedirectUrl);
    }
  }

}
%>
<%
var rsAddMerch__MMColParam = "1";
if(String(Request.QueryString("id")) != "undefined") { 
  rsAddMerch__MMColParam = String(Request.QueryString("id"));
}
%>
<%
var rsAddMerch = Server.CreateObject("ADODB.Recordset");
rsAddMerch.ActiveConnection = MM_Bis_STRING;
rsAddMerch.Source = "SELECT * FROM Merchandise WHERE id = "+ rsAddMerch__MMColParam.replace(/'/g, "''") + "";
rsAddMerch.CursorType = 0;
rsAddMerch.CursorLocation = 2;
rsAddMerch.LockType = 3;
rsAddMerch.Open();
var rsAddMerch_numRows = 0;
%>
<html>
<head>
<title>Add A Merchandise Item</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<link rel="stylesheet" href="/extras/bis.css" type="text/css">
</head>
<body bgcolor="#FFFFFF" text="#000000">
<p><span class="title">Add A Merchandise Item </span> 
  <!--#include virtual="/extras/html.asp" -->
<form name="form1" method="POST" action="<%=MM_editAction%>">
  <p><span class="headline">ITEM </span><span class="copy">(PLEASE USE CAPITAL 
    LETTERS)</span><span class="headline"><br>
    </span> 
    <input type="text" name="item" class="form">
  </p>
  <p><span class="headline">DESCRIPTION</span><br>
    <textarea name="description" cols="40" rows="10" class="form"></textarea>
  </p>
  <p class="headline">IMAGE<br>
    <input type="text" name="image">
  </p>
  <p class="headline">PRICE<br>
    <input type="text" name="price">
  </p>
  <p class="headline"> 
    <input type="submit" name="Submit" value="Submit">
  </p>
  <input type="hidden" name="MM_insert" value="true">
</form>
<p>&nbsp; </p>
</body>
</html>
<%
rsAddMerch.Close();
%>
