<%@LANGUAGE="JAVASCRIPT"%>
<!--#include file="Connections/Bis.asp" -->
<%
var Recordset1__MMColParam = "1";
if(String(Request.QueryString("id")) != "undefined") { 
  Recordset1__MMColParam = String(Request.QueryString("id"));
}
%>
<%
var Recordset1 = Server.CreateObject("ADODB.Recordset");
Recordset1.ActiveConnection = MM_Bis_STRING;
Recordset1.Source = "SELECT * FROM News WHERE id = "+ Recordset1__MMColParam.replace(/'/g, "''") + "";
Recordset1.CursorType = 0;
Recordset1.CursorLocation = 2;
Recordset1.LockType = 3;
Recordset1.Open();
var Recordset1_numRows = 0;
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
      <!--#include virtual="bis/extras/topica.asp" -->
    </TD>
  </TR>
  <TR> 
    <TD valign="top"> 
      <script language="JavaScript"> //By Paul Davis - www.kaosweaver.com
  var j,l="",m="",p="",q="",z="",list= new Array()
  list[list.length]='images/random/1.jpg?&width=250&align=top';
  list[list.length]='images/random/2.jpg?&width=250&align=top';
  list[list.length]='images/random/3.jpg?&width=250&align=top';
  list[list.length]='images/random/4.jpg?&width=250&align=top';
  list[list.length]='images/random/5.jpg?&width=250&align=top';
  list[list.length]='images/random/6.jpg?&width=250&align=top';
  list[list.length]='images/random/7.jpg?&width=250&align=top';
  list[list.length]='images/random/8.jpg?&width=250&align=top';
  j=parseInt(Math.random()*list.length);
  j=(isNaN(j))?0:j;
  if (list[j].indexOf('?')==-1) {
    document.write("<img src='"+list[j]+"'>");
  }
  else {
    nvp=list[j].substring(list[j].indexOf('?')+2).split('&');
    for(var i=0;i<nvp.length;i++) {
      sub=nvp[i].split('=');
   	  switch(sub[0]) {
 	    case 'link':
          l="<a href='"+unescape(sub[1])+"'>";
          p="</a>";
		  break;
	    case 'target':
          q=" target='"+unescape(sub[1])+"'";
  		  break;
  	    default:
          m+=" "+sub[0]+"='"+unescape(sub[1])+"'";
  		  break;
      }
    }
    z=(l!="")?((q!="")?l.substring(0,l.length-1)+q+">":l):"";
    z+="<img src='"+list[j].substring(0,list[j].indexOf('?'))+"'"+m+">"+p;
  document.write(z);
  }
</script>
    </TD>
    <TD bgcolor="#EA2B2C" valign="top"> 
      <!--#include virtual="bis/extras/leftnav.asp" -->
    </TD>
    <TD bgcolor="#000000">&nbsp; </TD>
  </TR>
</TABLE>
<br>
<table cellspacing=0 cellpadding=0 width=750 border=0>
  <tbody> 
  <tr> 
    <td valign=top align=middle width=250> 
      <center>
      </center>
    </td>
    <td valign=top width=500> 
      <table class=text cellspacing=4 cellpadding=0 width=500 border=0>
        <tr> 
          <td valign=top width=500 class="title">News 
            <P></td>
        </tr>
        <tbody> 
        <tr> 
          <td valign=top width=501>
<p><span class="headline"><%=(Recordset1.Fields.Item("headline").Value)%></span><br>
              <span class="date"><%=(Recordset1.Fields.Item("calendar").Value)%></span><br>
  <span class="copy"><%=(Recordset1.Fields.Item("body").Value)%></span></p>
            <p><a href="/index.asp" target="_top">Back</a><br>
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
Recordset1.Close();
%>