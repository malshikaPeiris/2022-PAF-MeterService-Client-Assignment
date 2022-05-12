$(document).ready(function()
{
	 $("#alertSuccess").hide();
 	 $("#alertError").hide();
});

// SAVE ============================================
$(document).on("click", "#btnSave", function(event)
{
	// Clear alerts---------------------
	$("#alertSuccess").text("");
 	$("#alertSuccess").hide();
 	$("#alertError").text("");
 	$("#alertError").hide();

	// Form validation-------------------
	var status = validateMeterForm();
	if (status != true)
	{
		 $("#alertError").text(status);
 		 $("#alertError").show();
 		 return;
 	}
 	
	// If valid-------------------------
 	var type = ($("#hidMeterIDSave").val() == "") ? "POST" : "PUT";

	$.ajax(
 	{
 		url : "MeterAPI",
 		type : type,
 		data : $("#formMeter").serialize(),
 		dataType : "text",
 		complete : function(response, status)
 		{
 			onMeterSaveComplete(response.responseText, status);
 		}
 	}); 
 });

function onMeterSaveComplete(response, status)
	{
		if (status == "success")
		{
			 var resultSet = JSON.parse(response);
 			 if (resultSet.status.trim() == "success")
			 {
 				$("#alertSuccess").text("Successfully saved.");
 				$("#alertSuccess").show();
 				$("#divMeterGrid").html(resultSet.data);
 			 } 
 			 else if (resultSet.status.trim() == "error")
			 {
 				$("#alertError").text(resultSet.data);
 				$("#alertError").show();
 			 }
 		} 
 		else if (status == "error")
 		{
 			$("#alertError").text("Error while saving.");
 			$("#alertError").show();
 		} 
 		else
 		{
 			$("#alertError").text("Unknown error while saving..");
 			$("#alertError").show();
 		}
		$("#hidMeterIDSave").val("");
 		$("#formMeter")[0].reset();
}

	// UPDATE==========================================
	$(document).on("click", ".btnUpdate", function(event)
	{
		 $("#hidMeterIDSave").val($(this).data("id"));
		 $("#account_no").val($(this).closest("tr").find('td:eq(0)').text());
		 $("#name").val($(this).closest("tr").find('td:eq(1)').text());
		 $("#address").val($(this).closest("tr").find('td:eq(2)').text());
		 $("#units").val($(this).closest("tr").find('td:eq(3)').text());
 		 $("#date").val($(this).closest("tr").find('td:eq(4)').text());
 		
 		
	});
	
	
	
	$(document).on("click", ".btnRemove", function(event)
	{
 		$.ajax(
 		{
 			url : "MeterAPI",
 			type : "DELETE",
 			data : "id=" + $(this).data("id"),
 			dataType : "text",
 			complete : function(response, status)
 			{
 				onMeterDeleteComplete(response.responseText, status);
 			}
 		});
	});


	function onMeterDeleteComplete(response, status)
	{
		if (status == "success")
 		{
 			var resultSet = JSON.parse(response);
 			if (resultSet.status.trim() == "success")
 			{
 				$("#alertSuccess").text("Successfully deleted.");
 				$("#alertSuccess").show();
 				$("#divMeterGrid").html(resultSet.data);
 			} 
 			else if (resultSet.status.trim() == "error")
 			{
 				$("#alertError").text(resultSet.data);
 				$("#alertError").show();
 			}
 		} 
 		else if (status == "error")
 		{
 				$("#alertError").text("Error while deleting.");
 				$("#alertError").show();
 		} 
 		else
 		{
 				$("#alertError").text("Unknown error while deleting..");
 				$("#alertError").show();
 		}
}
	

	// CLIENT-MODEL================================================================
	function validateMeterForm()
	{
		// CODE
		if ($("#account_no").val().trim() == "")
		{
 			return "Insert Account Number.";
 		}

		// NAME
		if ($("#name").val().trim() == "")
 		{
 			return "Insert Name.";
 		}

		// PRICE-------------------------------
		if ($("#address").val().trim() == "")
 		{
 			return "Insert address.";
 		}
 		// PRICE-------------------------------
		if ($("#units").val().trim() == "")
 		{
 			return "Insert units.";
 		}

		// DESCRIPTION------------------------
		if ($("#date").val().trim() == "")
		{
 			return "Insert Date.";
 		}
 		

		return true;
	}