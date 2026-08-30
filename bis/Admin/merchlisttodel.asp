<%@LANGUAGE="JAVASCRIPT"%>
<!--#include virtual="/Connections/Bis.asp" -->
<%
var rsMerch = Server.CreateObject("ADODB.Recordset");
rsMerch.ActiveConnection = MM_Bis_STRING;
rsMerch.Source = "SELECT * FROM Merchandise ORDER BY id ASC";
rsMerch.CursorType = 0;
rsMerch.CursorLocation = 2;
rsMerch.LockType = 3;
rsMerch.Open();
var rsMerch_numRows = 0;
%>
<%
var Repeat1__numRows = -1;
var Repeat1__index = 0;
rsMerch_numRows += Repeat1__numRows;
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
<title>Delete Merchandise Item</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<link rel="stylesheet" href="/extras/bis.css" type="text/css">
</head>
<body bgcolor="#FFFFFF" text="#000000" class="headline">
<p><span class="title"> Delete Merchandise Item</span></p>
<% while ((Repeat1__numRows-- != 0) && (!rsMerch.EOF)) { %>
<table width="243" border="0" cellpadding="0" cellspacing="0">
  <tr> 
    <td width="154" class="headline"><A HREF="/Admin/delmerch.asp?<%= MM_keepURL + ((MM_keepURL!="")?"&":"") + "id=" + rsMerch.Fields.Item("id").Value %>"><%=(rsMerch.Fields.Item("Item").Value)%></A></td>
    <td rowspan="3" valign="top" width="79">&nbsp;</td>
  </tr>
  <tr> 
    <td width="154" class="copy"><%=(rsMerch.Fields.Item("Description").Value)%></td>
  </tr>
  <tr> 
    <td width="154" class="copy"><%=(rsMerch.Fields.Item("Price").Value)%></td>
  </tr>
  <tr> 
    <td width="154">&nbsp;</td>
    <td valign="top" width="79">&nbsp;</td>
  </tr>
</table>
<%
  Repeat1__index++;
  rsMerch.MoveNext();
}
%>
</body>
</html>
<%
rsMerch.Close();
%>
