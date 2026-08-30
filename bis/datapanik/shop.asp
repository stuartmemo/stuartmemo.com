<?xml version="1.0" encoding="iso-8859-1"?> <%@LANGUAGE="JAVASCRIPT"%>
<!--#include file="Connections/Bis.asp" -->
<%
var rsMerch = Server.CreateObject("ADODB.Recordset");
rsMerch.ActiveConnection = MM_Bis_STRING;
rsMerch.Source = "SELECT * FROM Merchandise";
rsMerch.CursorType = 0;
rsMerch.CursorLocation = 2;
rsMerch.LockType = 3;
rsMerch.Open();
var rsMerch_numRows = 0;
%>
<%
var HLooper1__numRows = -1;
var HLooper1__index = 0;
rsMerch_numRows += HLooper1__numRows;
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>data panik</title>

<script language="JavaScript">
<!--
function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}
//-->
</script>
<script language="JavaScript" type="text/JavaScript">
<!--
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
//-->
</script>
<link href="extras/dpstyle.css" rel="stylesheet" type="text/css" />
</head>

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
        <td width="437"><img src="images/header_shop.gif" alt="" width="437" height="33" /></td>
        <td width="7" background="images/right_bg.gif"><img src="images/spacer.gif" alt="" width="1" height="1" /></td>
      </tr>
      <tr>
        <td background="images/left_bg.gif"><img src="images/spacer.gif" alt="" width="140" height="1" /></td>
        <td valign="top" bgcolor="#A39A7B"><table width="100%"  border="0" cellspacing="0" cellpadding="4">
          <tr>
            <td><table width="100%" border="0" cellpadding="0" cellspacing="4" bordercolor="#CCCCCC" bgcolor="a39a7b" class="text">
                    <tr> 
                      <td valign="top" width="1" class="title"><img src="images/spacer.gif" width="1" height="1" /></td>
                      <td valign="top" width="500" class="title"><table width="100%">
                          <%
var startrw=0;
var endrw=HLooper1__index;
var numberColumns=1;
var numrows=-1;
while((numrows-- !=0) && (!rsMerch.EOF)) {
	startrw=endrw + 1;
	endrw = endrw + numberColumns;
%>
                          <tr align="center" valign="top"> 
                            <%
	while ((startrw <= endrw) && (!rsMerch.EOF)) {
	%>
                            <td> <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                <tr> 
                                  <td width="324" align="left" valign="top" class="headline"><%=(rsMerch.Fields.Item("Item").Value)%></td>
                                  <td rowspan="3" valign="top" width="10">&nbsp;</td>
                                  <td rowspan="3" valign="top" width="83"> 
                                    <div align="left"><img src="<%=(rsMerch.Fields.Item("Image").Value)%>" width="82" height="82"></div></td>
                                </tr>
                                <tr> 
                                  <td width="324" align="left" valign="top" class="bodycopy"><%=(rsMerch.Fields.Item("Description").Value)%></td>
                                </tr>
                                <tr> 
                                  <td width="324" align="left" valign="top" class="bodycopy"><%=(rsMerch.Fields.Item("Price").Value)%></td>
                                </tr>
                                <tr> 
                                  <td width="324" align="left"><a href="#shipping" class="listall">Shipping/ 
                                    Payment Details</a></td>
                                  <td valign="top" width="10">&nbsp;</td>
                                  <td valign="top" width="83">&nbsp;</td>
                                </tr>
                                <tr> 
                                  <td width="324" align="left">&nbsp;</td>
                                  <td valign="top" width="10">&nbsp;</td>
                                  <td valign="top" width="83">&nbsp;</td>
                                </tr>
                              </table></td>
                            <%
	startrw = startrw+1;
	rsMerch.MoveNext();
	}
	%>
                          </tr>
                          <% }%>
                        </table> 
                        <a name="shipping"></a><span class="headline">Shipping 
                        &amp; Handling</span><span class="bodycopy"> </span> 
                        <p class="bodycopy">T-Shirts &pound;1 
                          in UK, &pound;3 / $4 Outside of UK <br>
                          12&quot; Vinyl &pound;1 in UK, &pound;3 / $4 Outside 
                          of UK<br>
                          CD &pound;1 in UK, &pound;2 / $3 Outside of UK<br>
                          7&quot; Vinyl &pound;1 UK, &pound;2/ $3 Outside of UK</p>
                        <p class="headline">Important Payment Information</p>
                        <p class="bodycopy">UK Sterling: Payments accepted in 
                          cash, cheques &amp; money orders.<br>
                          US Dollars: Payments accepted in cash only.</p>
                        <p ><b>Please enquire to <a href="mailto:bishq@hotmail.com">bishq@hotmail.com</a> 
                          for bulk buying postage discounts.</b></p>
                        <p class="copy"><a href="#" onClick="MM_openBrWindow('/merchpop/merchform.asp','','status=yes,scrollbars=yes,width=400,height=300')"><img src="/images/paypal.gif" border="0"> 
                          <span class="listall"><b>RESERVE AND PAY FOR YOUR MERCH 
                          WITH PAY PAL!</b></span></a></p>
                        <p class="headline">Please make cheques/ postal orders 
                          payable to A. MacKinnon</p>
                        <p class="headline">NO FOREIGN CHEQUES or MONEY ORDERS 
                          ARE ACCEPTED. CASH SENT AT OWN RISK.</p>
                        <p class="headline"></p>
                        <p class="bodycopy">Please email <a href="mailto:bishq@hotmail.com">bishq@hotmail.com</a> 
                          to check for product availability before sending your 
                          order.</p>
                        <p class="bodycopy"><span class="headline">SEND ALL ORDERS 
                          TO:</span><br>
                          datapanik, po 3821, Glasgow G46 6JY, United Kingdom. 
                      </td>
                    </tr>
                    <tbody>
                    </tbody>
                  </table>
                  
              </td>
          </tr>
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
rsMerch.Close();
%>