 <%@LANGUAGE="JAVASCRIPT"%>
<!--#include file="Connections/Bis.asp" -->
<%
var rsLyricsDetail__MMColParam = "1";
if(String(Request.QueryString("id")) != "undefined") { 
  rsLyricsDetail__MMColParam = String(Request.QueryString("id"));
}
%>
<%
var rsLyricsDetail = Server.CreateObject("ADODB.Recordset");
rsLyricsDetail.ActiveConnection = MM_Bis_STRING;
rsLyricsDetail.Source = "SELECT * FROM Lyrics WHERE id = "+ rsLyricsDetail__MMColParam.replace(/'/g, "''") + "";
rsLyricsDetail.CursorType = 0;
rsLyricsDetail.CursorLocation = 2;
rsLyricsDetail.LockType = 3;
rsLyricsDetail.Open();
var rsLyricsDetail_numRows = 0;
%>

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
      <!--#include virtual="/extras/output.asp" -->
    </td>
  </tr>
</table>
<br>
<table cellspacing=0 cellpadding=0 width=750 border=0>
  <tbody> 
  <tr> 
    <td valign=top align=middle width=250><img src="/images/blank.gif" width="250" height="1"> 
    </td>
    <td valign=top width=500> 
      <table class=text cellspacing=4 cellpadding=0 width=500 border=0>
        <tr> 
          <td valign=top width=500 class="title">Lyrics 
            <p></td>
        </tr>
        <tbody> 
        <tr> 
          <td valign=top width=500 class="copy"> 
        <p class="headline"><%=(rsLyricsDetail.Fields.Item("title").Value)%> </p>
<p class="copy"><%=(rsLyricsDetail.Fields.Item("lyrics").Value)%> </p>
            <p><a href="/lyrics.asp">Back To Lyrics</a></p>
 </td>
        </tr>
        </tbody> 
      </table>
    </td>
  </tr>
  </tbody> 
</table>

</body>
</html>
<%
rsLyricsDetail.Close();
%>
