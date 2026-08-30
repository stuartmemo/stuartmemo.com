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
</head>

<link href="extras/dpstyle.css" rel="stylesheet" type="text/css" />
<body bgcolor="#232116" topmargin="0" marginheight="0" onLoad="MM_preloadImages('images/news_1.gif','images/live_1.gif','images/discog_1.gif','images/media_1.gif','images/about_1.gif','images/shop_1.gif')">
<table width="584"  border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td><img src="images/top.gif" alt="" width="584" height="147" /></td>
  </tr>
  <tr>
    <td><table width="584" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="140"><img src="images/lon.gif" alt="" width="140" height="41" /></td>
        <td width="51"><a href="index.asp" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('news','','images/news_1.gif',1)"><img src="images/news_0.gif" alt="news" name="news" width="51" height="41" border="0" id="news" /></a></td>
        <td width="52"><a href="live.asp" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('live','','images/live_1.gif',1)"><img src="images/live_0.gif" alt="live" name="live" width="52" height="41" border="0" id="live" /></a></td>
        <td width="121"><a href="discog.asp" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('discography','','images/discog_1.gif',1)"><img src="images/discog_0.gif" alt="discography" name="discography" width="121" height="41" border="0" id="discography" /></a></td>
        <td width="73"><a href="media.asp" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('media','','images/media_1.gif',1)"><img src="images/media_0.gif" alt="media" name="media" width="73" height="41" border="0" id="media" /></a></td>
        <td width="78"><a href="about.asp" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('about','','images/about_1.gif',1)"><img src="images/about_0.gif" alt="about" name="about" width="78" height="41" border="0" id="about" /></a></td>
        <td width="69"><a href="shop.asp" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('shop','','images/shop_1.gif',1)"><img src="images/shop_0.gif" alt="shop" name="shop" width="69" height="41" border="0" id="shop" /></a></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width="584" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td><img src="images/loh.gif" alt="" width="140" height="33" /></td>
        <td width="437"><img src="images/header_news.gif" alt="" width="437" height="33" /></td>
        <td width="7" background="images/right_bg.gif"><img src="images/spacer.gif" alt="" width="1" height="1" /></td>
      </tr>
      <tr>
        <td background="images/left_bg.gif"><img src="images/spacer.gif" alt="" width="140" height="1" /></td>
        <td valign="top" bgcolor="#A39A7B"><table width=100% border=0 cellpadding=0 cellspacing=4 bordercolor="#CCCCCC" bgcolor="a39a7b" class=text>
              <tr>
                <td valign=top width=1 class="title"><img src="images/spacer.gif" width="1" height="1"></td>
                <td valign=top width=500 class="title"> <% while ((Repeat1__numRows-- != 0) && (!Recordset1.EOF)) { %>
      <p><a href="story.asp?<%= MM_keepNone + ((MM_keepNone!="")?"&":"") + "id=" + Recordset1.Fields.Item("id").Value %>" class="headline" target="_top"><%=(Recordset1.Fields.Item("headline").Value)%></a><br>
                    <span class="dateline"><%= DoDateTime((Recordset1.Fields.Item("calendar").Value), 1, -1) %></span><br>
                    <span class="bodycopy"><%=(Recordset1.Fields.Item("summary").Value)%></span></p>
      <%
  Repeat1__index++;
  Recordset1.MoveNext();
}
%></p>
                  </td>
              </tr>
              <tbody>
              </tbody>
            </table></td>
        <td background="images/right_bg.gif">&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><img src="images/base.gif" alt="" width="584" height="26" /></td>
  </tr>
</table>
</body>
</html>
<%
Recordset1.Close();
%>
