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
// *** Update Record: set variables

if (String(Request("MM_update")) != "undefined" &&
    String(Request("MM_recordId")) != "undefined") {

  var MM_editConnection = MM_Bis_STRING;
  var MM_editTable  = "News";
  var MM_editColumn = "id";
  var MM_recordId = "" + Request.Form("MM_recordId") + "";
  var MM_editRedirectUrl = "/Admin/index.asp";
  var MM_fieldsStr = "headline|value|summary|value|body|value|calendar|value";
  var MM_columnsStr = "headline|',none,''|summary|',none,''|body|',none,''|calendar|',none,''";

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
// *** Update Record: construct a sql update statement and execute it

if (String(Request("MM_update")) != "undefined" &&
    String(Request("MM_recordId")) != "undefined") {

  // create the sql update statement
  MM_editQuery = "update " + MM_editTable + " set ";
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
    MM_editQuery += ((i != 0) ? "," : "") + MM_columns[i] + " = " + formVal;
  }
  MM_editQuery += " where " + MM_editColumn + " = " + MM_recordId;

  if (!MM_abortEdit) {
    // execute the update
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
var rsAmendStory__MMColParam = "1";
if(String(Request.QueryString("id")) != "undefined") { 
  rsAmendStory__MMColParam = String(Request.QueryString("id"));
}
%>
<%
var rsAmendStory = Server.CreateObject("ADODB.Recordset");
rsAmendStory.ActiveConnection = MM_Bis_STRING;
rsAmendStory.Source = "SELECT * FROM News WHERE id = "+ rsAmendStory__MMColParam.replace(/'/g, "''") + "";
rsAmendStory.CursorType = 0;
rsAmendStory.CursorLocation = 2;
rsAmendStory.LockType = 3;
rsAmendStory.Open();
var rsAmendStory_numRows = 0;
%>
<html>
<head>
<title>Edit News Story</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<link rel="stylesheet" href="/extras/bis.css" type="text/css">
</head>
<body bgcolor="#FFFFFF" text="#000000">
<p><span class="title"> Edit News Story</span> </p>
  <!--#include virtual="/extras/html.asp" -->
<form ACTION="<%=MM_editAction%>" METHOD="POST" name="addstory">
  <p><span class="headline">Headline</span><br>
    <input type="text" name="headline" class="form" value="<%=(rsAmendStory.Fields.Item("headline").Value)%>">
    <br>
  </p>
  <p><span class="headline">Summary</span><br>
    <input type="text" name="summary" class="form" value="<%=(rsAmendStory.Fields.Item("summary").Value)%>">
  </p>
  <p><span class="headline">Main Story</span><br>
    <textarea name="body" rows="10" cols="40" class="form"><%=(rsAmendStory.Fields.Item("body").Value)%></textarea>
  </p>
  <p> </p>
  <p> </p>
  <p> 
    <input type="submit" name="Submit" value="Edit Story">
  </p>
  <input type="hidden" name="MM_update" value="true">
  <input type="hidden" name="MM_recordId" value="<%= rsAmendStory.Fields.Item("id").Value %>">
</form>
</body>
</html>
<%
rsAmendStory.Close();
%>
