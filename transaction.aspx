<%@ Page Language="C#" AutoEventWireup="true" CodeFile="transaction.aspx.cs" Inherits="ForAll_PostBack" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>۶ قدم</title>
    <link rel="icon" href="favicon.ico" type="image/x-icon">
</head>
<body>
	<% string par = (string)Request.Form.ToString(); %>
    <form id="form1" runat="server">
    <div>
    
    </div>
    </form>
    <script>
		var st = "<%= par %>";
        let params = (new URL(document.location)).searchParams
        window.location.href = './pages/game/transaction.html?' + params.toString() + '&' + st
    </script>
</body>
</html>
