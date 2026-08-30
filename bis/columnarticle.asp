<%@LANGUAGE="JAVASCRIPT"%>
<!--#include file="Connections/Bis.asp" -->
<%
var rsColumns__MMColParam = "1";
if(String(Request.QueryString("id")) != "undefined") { 
  rsColumns__MMColParam = String(Request.QueryString("id"));
}
%>
<%
var rsColumns = Server.CreateObject("ADODB.Recordset");
rsColumns.ActiveConnection = MM_Bis_STRING;
rsColumns.Source = "SELECT * FROM Columns WHERE id = "+ rsColumns__MMColParam.replace(/'/g, "''") + " ORDER BY calendar ASC";
rsColumns.CursorType = 0;
rsColumns.CursorLocation = 2;
rsColumns.LockType = 3;
rsColumns.Open();
var rsColumns_numRows = 0;
%>
<%
var Repeat1__numRows = -1;
var Repeat1__index = 0;
rsColumns_numRows += Repeat1__numRows;
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
<title>www.bisnation.com</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<link rel="stylesheet" href="/extras/bis.css" type="text/css">
</head>
<body bgcolor="#FFFFFF" text="#000000" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<TABLE WIDTH=751 BORDER=0 CELLPADDING=0 CELLSPACING=0>
  <TR> 
    <TD> <IMG SRC="images/mock_01.gif" WIDTH=250 HEIGHT=7></TD>
    <TD> <IMG SRC="images/mock_02.gif" WIDTH=250 HEIGHT=7></TD>
    <TD> <IMG SRC="images/mock_03.gif" WIDTH=251 HEIGHT=7></TD>
  </TR>
  <TR> 
    <TD> <IMG SRC="images/mock_04.gif" WIDTH=250 HEIGHT=65></TD>
    <TD colspan="2"> 
      <!--#include virtual="/extras/topica.asp" -->
    </TD>
  </TR>
</TABLE>
<table width="751" border="0" cellspacing="0" cellpadding="0">
  <tr> 
    <td width="250"><img src="/images/blank.gif" width="250" height="1"></td>
    <td><img src="/images/blank.gif" width="250" height="1"></td>
    <td><img src="/images/blank.gif" width="251" height="1"></td>
  </tr>
  <tr> 
    <td width="250" valign="top"> 
      <!--#include virtual="/extras/random.asp" -->
    </td>
    <td bgcolor="#EA2B2C" valign="top"> 
      <!--#include virtual="/extras/leftnav.asp" -->
    </td>
    <td bgcolor="#000000" valign="top"> 
      <!--#include virtual="/extras/bandinfo.asp" -->
    </td>
  </tr>
</table>
<br>
<table cellspacing=0 cellpadding=0 width=750 border=0>
  <tbody> 
  <tr> 
    <td valign=top align=middle width=250>&nbsp; </td>
    <td valign=top width=500> 
      <table class=text cellspacing=4 cellpadding=0 width=500 border=0>
        <tr> 
          <td valign=top width=500 class="title">Columns 
            <p> 
          </td>
        </tr>
        <tbody> 
        <tr> 
          <td valign=top width=500 class=copy> 
            <p><span class="date"><%= DoDateTime((rsColumns.Fields.Item("calendar").Value), 1, -1) %></span><span class="copy">&nbsp;<%=(rsColumns.Fields.Item("title").Value)%></span><span class="date">&nbsp;</span><span class="copy"><br>
              by</span> <span class="copy"><%=(rsColumns.Fields.Item("author").Value)%></span></p>
            <p class="copy"><%=(rsColumns.Fields.Item("body").Value)%> </p>
          </td>
        </tr>
        </tbody> 
      </table>
    </td>
  </tr>
  </tbody> 
</table>
<p>&nbsp;</p>
</body>
</html>
<%
rsColumns.Close();
%>
