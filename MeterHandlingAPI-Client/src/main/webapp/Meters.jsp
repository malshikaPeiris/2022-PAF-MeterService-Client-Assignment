<%@page import="com.Meter"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Meter Management</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.6.0.min.js"></script>
<script src="Components/Meters.js"></script>
</head>
<body>

<div class="container"><div class="row"><div class="col-6">

	<h1>Meter Handling And Power Consumption Management </h1>

	<form id="formMeter" name="formMeter">
 		 Customer Account No:
 		<input id="account_no" name="account_no" type="text" class="form-control form-control-sm">
 		<br> 
 		Customer Name:
		<input id="name" name="name" type="text" class="form-control form-control-sm">
 		<br> 
 		Customer Address:
 		<input id="address" name="address" type="text" class="form-control form-control-sm">
 		<br> 
 		Units:
		<input id="units" name="units" type="text" class="form-control form-control-sm">
 		<br>
 		Date:
		<input id="date" name="date" type="text" class="form-control form-control-sm">
 		<br>
 		
 		
 		<input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-success">
 		<input type="hidden" id="hidMeterIDSave" name="hidMeterIDSave" value="">
	</form>
	
	<div id="alertSuccess" class="alert alert-success"></div>
	<div id="alertError" class="alert alert-danger"></div>

	<br>
	<div id="divMeterGrid">
 		<%
 			Meter meterObj = new Meter();
 			out.print(meterObj.readMeter());
 		%>
	</div>
</div> </div> </div>
</body>
</html>