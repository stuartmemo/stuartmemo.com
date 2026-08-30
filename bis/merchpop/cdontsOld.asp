<% @language="VBSCRIPT" %>

<%

	Dim myMail, mailFormat, strBody

	Set myMail = CreateObject("CDONTS.NewMail")
	strBody=		"Their Name: " & request.form("name") & vbCRLF & _
				"Their Address 1: " & request.form("addr1") & vbCRLF & _
				"Their Address 2: " & request.form("addr2") & vbCRLF & _
				"Their City: " & request.form("city") & vbCRLF & _
				"Their State/ County: " & request.form("state") & vbCRLF & _
				"Their Zip/ Postcode: " & request.form("zip") & vbCRLF & _
				"Their Country: " & request.form("country") & vbCRLF & _
				"Their Email: " & request.form("email") & vbCRLF & _
				"What They Want: " & request.form("iwant")

	myMail.BodyFormat=1	'0=HTML
	myMail.MailFormat=1	'0=HTML
	myMail.From=request.form ("email")
	myMail.To=request.form ("recipient")
	myMail.Subject=request.form ("subby")
	myMail.Body=strBody
	myMail.Send
	set mymail=nothing

%>

<html>
<body>
 <font face="Arial" size="2" color="#000080">
 Thanks for your enquiry. We'll be in touch soon!
 </font>
</body>
</html>
