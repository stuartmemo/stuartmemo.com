<%@LANGUAGE="JAVASCRIPT"%>
<!--#include virtual="/Connections/Bis.asp" -->
<%
var Recordset1 = Server.CreateObject("ADODB.Recordset");
Recordset1.ActiveConnection = MM_Bis_STRING;
Recordset1.Source = "SELECT * FROM News ORDER BY calendar DESC";
Recordset1.CursorType = 0;
Recordset1.CursorLocation = 2;
Recordset1.LockType = 3;
Recordset1.Open();
var Recordset1_numRows = 0;
%>
<%
var Repeat1__numRows = -1;
var Repeat1__index = 0;
Recordset1_numRows += Repeat1__numRows;
%>
<% var MM_paramName = ""; %>
<%
// *** Go To Record and Move To Record: create strings for maintaining URL and Form parameters

// create the list of parameters which should not be maintained
var MM_removeList = "&index=";
if (MM_paramName != "") MM_removeList += "&" + MM_paramName.toLowerCase() + "=";
var MM_keepURL="",MM_keepForm="",MM_keepBoth="",MM_keepNone="";

// add the URL parameters to the MM_keepURL string
for (var items=new Enumerator(Request.QueryString); !items.atEnd(); items.moveNext()) {
  var nextItem = "&" + items.item().toLowerCase() + "=";
  if (MM_removeList.indexOf(nextItem) == -1) {
    MM_keepURL += "&" + items.item() + "=" + Server.URLencode(Request.QueryString(items.item()));
  }
}

// add the Form variables to the MM_keepForm string
for (var items=new Enumerator(Request.Form); !items.atEnd(); items.moveNext()) {
  var nextItem = "&" + items.item().toLowerCase() + "=";
  if (MM_removeList.indexOf(nextItem) == -1) {
    MM_keepForm += "&" + items.item() + "=" + Server.URLencode(Request.Form(items.item()));
  }
}

// create the Form + URL string and remove the intial '&' from each of the strings
MM_keepBoth = MM_keepURL + MM_keepForm;
if (MM_keepBoth.length > 0) MM_keepBoth = MM_keepBoth.substring(1);
if (MM_keepURL.length > 0)  MM_keepURL = MM_keepURL.substring(1);
if (MM_keepForm.length > 0) MM_keepForm = MM_keepForm.substring(1);
%>
<html>
<head>
<title>Delete News Story</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<link rel="stylesheet" href="/extras/bis.css" type="text/css">
</head>
<body bgcolor="#FFFFFF" text="#000000">
<p class="title">Delete News Story</p>
<% while ((Repeat1__numRows-- != 0) && (!Recordset1.EOF)) { %>
<p><A HREF="/Admin/deletestory.asp?<%= MM_keepURL + ((MM_keepURL!="")?"&":"") + "id=" + Recordset1.Fields.Item("id").Value %>" class="headline"><%=(Recordset1.Fields.Item("headline").Value)%></A><br>
  <span class="date"><%=(Recordset1.Fields.Item("calendar").Value)%></span><br>
  <span class="copy"><%=(Recordset1.Fields.Item("summary").Value)%></span></p>
<%
  Repeat1__index++;
  Recordset1.MoveNext();
}
%>
</body>
</html>
<%
Recordset1.Close();
%>
