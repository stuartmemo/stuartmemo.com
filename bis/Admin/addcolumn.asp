<%@LANGUAGE="JAVASCRIPT"%> 
<!--#include file="../Connections/Bis.asp" -->
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
  var MM_editTable  = "Columns";
  var MM_editRedirectUrl = "/Admin/index.asp";
  var MM_fieldsStr = "title|value|body|value|author|value";
  var MM_columnsStr = "title|',none,''|body|',none,''|author|',none,''";

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
var rsColumns = Server.CreateObject("ADODB.Recordset");
rsColumns.ActiveConnection = MM_Bis_STRING;
rsColumns.Source = "SELECT * FROM Columns";
rsColumns.CursorType = 0;
rsColumns.CursorLocation = 2;
rsColumns.LockType = 3;
rsColumns.Open();
var rsColumns_numRows = 0;
%>
<html>
<head>
<title>Add Column</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<link rel="stylesheet" href="/extras/bis.css" type="text/css">
</head>
<body bgcolor="#FFFFFF" text="#000000">
<p class="title">Add Column</p>   <!--#include virtual="/extras/html.asp" -->
<form name="Columns" method="POST" action="<%=MM_editAction%>">
  <p><span class="headline">Title</span> <span class="copy">(PLEASE USE CAPITAL 
    LETTERS)</span><br>
    <input type="text" name="title" class="form">
  </p>
  <p><span class="headline">Article</span><br>
    <textarea name="body" cols="40" rows="10" class="form"></textarea>
  </p>
  <p><span class="headline">Author</span><br>
    <select name="author" class="form">
      <option value="Amanda" selected>Amanda</option>
      <option value="John">John</option>
      <option value="Steven">Steven</option>
      <option value="Graham">Graham</option>
      <option value="Ryan">Ryan</option>
    </select>
  </p>
  <p> 
    <input type="submit" name="Submit" value="Submit">
  </p>
  <p>&nbsp; </p>
  <input type="hidden" name="MM_insert" value="true">
</form>
<p>&nbsp; </p>
</body>
</html>
<%
rsColumns.Close();
%>
