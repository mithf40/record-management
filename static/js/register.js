$(document).ready(function() {
	$("#register_form").submit(async function(event) {
		event.preventDefault();
		$("#btnsubmit").attr("disabled", true);
		await deploy();
		// ajaxPost(_contract_addr);
		$('#btnsubmit').attr("disabled", false);

	});
	async function deploy(){
		console.log("deploying patient.sol using " + $("#reg_addr").val());
		var web3Provider = null;
	    if (window.ethereum) {
	      web3Provider = window.ethereum;
	      try {
	        // Request account access
	        await window.ethereum.enable();
	      } catch (error) {
	        // User denied account access...
	        console.error("User denied account access")
	      }
	    }
	    // Legacy dapp browsers...
	    else if (window.web3) {
	      web3Provider = window.web3.currentProvider;
	    }
	    // If no injected web3 instance is detected, fall back to Ganache
	    else {
	      web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
	    }
	    var fs = require('fs');
	    var Web3 = require("web3");
	    var web3 = new Web3(web3Provider);

	    const contract_data = fs.readFileSync('../../build/contracts/patient.json','utf8');
	    const compiled = JSON.parse(contract_data);
	    const abi = compiled.abi;
	    const bytecode = compiled.evm.bytecode.object;

	    const contract = new web3.eth.Contract(abi,$("#reg_addr").val());
		contract.deploy({
		    data: bytecode,
		    arguments: []
		})
		.send({
		    from: $("#reg_addr").val()
		}, (error, transactionHash) => {  })
		.on('error', (error) => { console.log(error); })
		.on('transactionHash', (transactionHash) => { console.log("transaction hash : "+transactionHash); })
		.on('receipt', (receipt) => {
		   console.log("contract deployed to "+receipt.contractAddress) // contains the new contract address
		})
		.on('confirmation', (confirmationNumber, receipt) => {  })
		.then((newContractInstance) => {
		    console.log(newContractInstance.options.address) // instance with the new contract address
		    ajaxPost(newContractInstance.options.address);
		});
	}
	async function ajaxPost(_contract_addr){
		console.log("debug "+$("#reg_addr").val());
		var formData = {
			reg_addr: $("#reg_addr").val(),
			contract_addr: _contract_addr
		}

		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: window.location + "/create",
			data: JSON.stringify(formData),
			dataType: 'json',
			success : function(patient) {
				$("#post_register").html("<p>"+patient.reg_addr+" added succcessfully.</p>");
				window.location = "localhost:8081/patient.html";
			},
			error: function(e){
				alert("ERROR", window.location);
				console.log("ERROR: ", e);
			}
		});
		$("#reg_addr").val("");	}
		// };
		// post();
})