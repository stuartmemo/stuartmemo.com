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
// *** Delete Record: declare variables

if (String(Request("MM_delete")) != "undefined" &&
    String(Request("MM_recordId")) != "undefined") {

  var MM_editConnection = MM_Bis_STRING;
  var MM_editTable = "News";
  var MM_editColumn = "id";
  var MM_recordId = "" + Request.Form("MM_recordId") + "";
  var MM_editRedirectUrl = "/Admin/index.asp";

  // append the query string to the redirect URL
  if (MM_editRedirectUrl && Request.QueryString && Request.QueryString.length > 0) {
    MM_editRedirectUrl += ((MM_editRedirectUrl.indexOf('?') == -1)?"?":"&") + Request.QueryString;
  }
}
%>
<%
// *** Delete Record: construct a sql delete statement and execute it

if (String(Request("MM_delete")) != "undefined" &&
    String(Request("MM_recordId")) != "undefined") {

  // create the sql delete statement
  MM_editQuery = "delete from " + MM_editTable + " where " + MM_editColumn + " = " + MM_recordId;

  if (!MM_abortEdit) {
    // execute the delete
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
<title>Delete News Story</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<link rel="stylesheet" href="/extras/bis.css" type="text/css">
</head>
<body bgcolor="#FFFFFF" text="#000000">
<span class="title"> Delete News Story</span>   <!--#include virtual="/extras/html.asp" -->
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
  <p><span class="title">ARE YOU SURE YOU WANT TO DELETE?</span><br>
    <input type="submit" name="Submit" value="CLICK TO DELETE">
  </p>
  <input type="hidden" name="MM_delete" value="true">
  <input type="hidden" name="MM_recordId" value="<%= rsAmendStory.Fields.Item("id").Value %>">
</form>
</body>
</html>
<%
rsAmendStory.Close();
%>
