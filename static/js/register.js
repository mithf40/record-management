$(document).ready(function() {
	$("#register_form").submit(function(event) {
		event.preventDefault();
		ajaxPost();
	});
	const args = [];
	const _contract_addr = require('./deploy.js')('/home/faizan/Documents/blockchain/project/record-management/builds/contracts/patient.json',$("reg_addr").val(),args);
	function ajaxPost(){
		var formData = {
			reg_addr: $("reg_addr").val(),
			contract_addr: _contract_addr
		}

		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: window.location,
			data: JSON.stringify(formData),
			dataType: 'json',
			success : function(patient) {
				$("#post_register").html("<p>"+patient.reg_addr+" added succcessfully.</p>");
			},
			error: function(e){
				alert("ERROR", window.location);
				console.log("ERROR: ", e);
			}
		});
		resetData();
	}
	function resetData(){
      $("#reg_addr").val("");
    }
})