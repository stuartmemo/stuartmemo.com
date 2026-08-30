<%@LANGUAGE="JAVASCRIPT"%>
<!--#include file="Connections/Bis.asp" -->
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
var Repeat1__numRows = 15;
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
<SCRIPT RUNAT=SERVER LANGUAGE=VBSCRIPT>					
function DoDateTime(str, nNamedFormat, nLCID)				
	dim strRet								
	dim nOldLCID								
										
	strRet = str								
	If (nLCID > -1) Then							
		oldLCID = Session.LCID						
	End If									
										
	On Error Resume Next							
										
	If (nLCID > -1) Then							
		Session.LCID = nLCID						
	End If									
										
	If ((nLCID < 0) Or (Session.LCID = nLCID)) Then				
		strRet = FormatDateTime(str, nNamedFormat)			
	End If									
										
	If (nLCID > -1) Then							
		Session.LCID = oldLCID						
	End If									
										
	DoDateTime = strRet							
End Function									
</SCRIPT>
<html>
<head>
<title>News Headlines</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">

<link href="/datapanik/extras/dpstyle.css" rel="stylesheet" type="text/css">
</head>
<body bgcolor="#FFFFFF" text="#000000" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<p class="title">&nbsp;</p>
<table width=100% border=0 cellpadding=0 cellspacing=4 bordercolor="#CCCCCC" bgcolor="a39a7b" class=text>
  <tr> 
    <td valign=top width=500 class="title"> <p> </td>
  </tr>
  <tbody>
    <tr> 
      <td valign=top width=500> <span class="tablebg"> 
        <% while ((Repeat1__numRows-- != 0) && (!Recordset1.EOF)) { %>
        </MM:DECORATION></MM_REPEATEDREGION></span><MM_REPEATEDREGION NAME="Repeat1" SOURCE="Recordset1"><MM:DECORATION OUTLINE="Repeat" OUTLINEID=1> 
        <a href="/story.asp?<%= MM_keepNone + ((MM_keepNone!="")?"&":"") + "id=" + Recordset1.Fields.Item("id").Value %>" target="_top" class="headline" ><%=(Recordset1.Fields.Item("headline").Value)%></a><br>
        <span class="dateline"><%= DoDateTime((Recordset1.Fields.Item("calendar").Value), 1, -1) %></span><br>
        <span class="bodycopy"><%=(Recordset1.Fields.Item("summary").Value)%></span></p> 
        <%
  Repeat1__index++;
  Recordset1.MoveNext();
}
%>
        </span> <a href="/listall.asp">List All </a> </td>
    </tr>
  </tbody>
</table>
<p class="title">&nbsp;</p>
</body>
</html>
<%
Recordset1.Close();
%>
