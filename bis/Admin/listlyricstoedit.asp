<%@LANGUAGE="JAVASCRIPT"%>
<!--#include virtual="/Connections/Bis.asp" -->
<%
var rsLyrics = Server.CreateObject("ADODB.Recordset");
rsLyrics.ActiveConnection = MM_Bis_STRING;
rsLyrics.Source = "SELECT * FROM Lyrics ORDER BY title ASC";
rsLyrics.CursorType = 0;
rsLyrics.CursorLocation = 2;
rsLyrics.LockType = 3;
rsLyrics.Open();
var rsLyrics_numRows = 0;
%>
<%
var Repeat1__numRows = -1;
var Repeat1__index = 0;
rsLyrics_numRows += Repeat1__numRows;
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
<title>Edit Lyrics</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<link rel="stylesheet" href="/extras/bis.css" type="text/css">
</head>
<body bgcolor="#FFFFFF" text="#000000">
<p class="title">Edit Lyrics</p>
<p>
  <% while ((Repeat1__numRows-- != 0) && (!rsLyrics.EOF)) { %>
  <A HREF="/Admin/editlyrics.asp?<%= MM_keepURL + ((MM_keepURL!="")?"&":"") + "id=" + rsLyrics.Fields.Item("id").Value %>"><%=(rsLyrics.Fields.Item("title").Value)%><br></A> 
  <%
  Repeat1__index++;
  rsLyrics.MoveNext();
}
%>
</p>
</body>
</html>
<%
rsLyrics.Close();
%>
