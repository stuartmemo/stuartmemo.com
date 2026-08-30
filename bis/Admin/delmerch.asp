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
// *** Delete Record: declare variables

if (String(Request("MM_delete")) != "undefined" &&
    String(Request("MM_recordId")) != "undefined") {

  var MM_editConnection = MM_Bis_STRING;
  var MM_editTable = "Merchandise";
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
var rsAddMerch__MMColParam = "1";
if(String(Request.QueryString("id")) != "undefined") { 
  rsAddMerch__MMColParam = String(Request.QueryString("id"));
}
%>
<%
var rsAddMerch = Server.CreateObject("ADODB.Recordset");
rsAddMerch.ActiveConnection = MM_Bis_STRING;
rsAddMerch.Source = "SELECT * FROM Merchandise WHERE id = "+ rsAddMerch__MMColParam.replace(/'/g, "''") + " ORDER BY id ASC";
rsAddMerch.CursorType = 0;
rsAddMerch.CursorLocation = 2;
rsAddMerch.LockType = 3;
rsAddMerch.Open();
var rsAddMerch_numRows = 0;
%>
<html>
<head>
<title>Delete Merchandise Item</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<link rel="stylesheet" href="/extras/bis.css" type="text/css">
</head>
<body bgcolor="#FFFFFF" text="#000000">
<p><span class="title">Delete Merchandise Item </span> 
<form ACTION="<%=MM_editAction%>" METHOD="POST" name="form1">
  <p><span class="headline">ITEM<br>
    </span> 
    <input type="text" name="item" class="form" value="<%=(rsAddMerch.Fields.Item("Item").Value)%>">
  </p>
  <p><span class="headline">DESCRIPTION</span> 
    <!--#include virtual="/extras/html.asp" -->
    <br>
    <textarea name="description" cols="40" rows="10" class="form"><%=(rsAddMerch.Fields.Item("Description").Value)%></textarea>
  </p>
  <p class="headline">IMAGE<br>
    <input type="text" name="image" value="<%=(rsAddMerch.Fields.Item("Image").Value)%>">
  </p>
  <p class="headline">PRICE<br>
    <input type="text" name="price" value="<%=(rsAddMerch.Fields.Item("Price").Value)%>">
  </p>
  <p> </p>
  <p> </p>
  <p><span class="title">ARE YOU SURE YOU WANT TO DELETE?</span><br>
    <input type="submit" name="Submit" value="CLICK TO DELETE">
  </p>
  <input type="hidden" name="MM_delete" value="true">
  <input type="hidden" name="MM_recordId" value="<%= rsAddMerch.Fields.Item("id").Value %>">
</form>
<p>&nbsp; </p>
</body>
</html>
<%
rsAddMerch.Close();
%>
