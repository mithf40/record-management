$( document ).ready(function() {
	$("#share_form").submit(async function(event){
		event.preventDefault();
		await view_record();
	});
	var _record;
	async function view_record(){
		var req = {
			record_name: $("#rec_name").val()
		}
		var record_addr;
		$.ajax({
		  type : "GET",
		  // contentType: "application/json",
		  url : "/patient/api/records/view",
		  data : req,
		  // dataType : 'json',
		  success: async function(result){
				record_addr = result.record_addr;
				console.log("Successss. Record found. ", result);
				_record = result[0];
				get_from_blockchain(result[0]);
		  },
		  error : function(e) {
				alert("Error!", window.location);
				console.log("ERROR: ", e);
		  }
		});
	}

	async function get_from_blockchain(record){
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
    console.log(record);
    // const _contract_addr = require('./deploy.js')('../../build/contracts/patient.json',$("#reg_addr").val(),args);
    console.log("Interacting with record contract at " + record.record_addr);
    
    const contract_data = fs.readFileSync('../../build/contracts/record.json', 'utf8');
    // const compiled = require(compiled_contract);
    const compiled = JSON.parse(contract_data);

    const interface = compiled.abi;
    // console.log(interface);
    var key;
    const contract = new web3.eth.Contract(interface, record.record_addr);
    console.log(contract);
    const txObject = {
				gas: "5000000",
				from: $("#eth_addr").val()
			};
		await contract.methods.giveViewPermission($("#share_addr").val()).send(txObject, (err, res) => {
								if(err) console.log(err);
								else console.log("record shared!! "+res);
						}).on('error', (error) => { console.log("dffkadfhlkahs "+error); }).on('confirmation',  (confirmationNumber, receipt) => {  });
		$("#post_share").html("<p>Record shared successfully.</p>");
	}

	async function share() {
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

			console.log("Interacting with record contract at " + $());
			
			const contract_data = fs.readFileSync('../../build/contracts/record.json', 'utf8');
			// const compiled = require(compiled_contract);
			const compiled = JSON.parse(contract_data);

			const interface = compiled.abi;
			// console.log(interface);
			var key;
			const contract = new web3.eth.Contract(interface, _record.record_addr); 
			const txObject = {
				gas: "1000000",
				from: _record.pat_addr
			};
			contract.methods.giveViewPermission(share_addr).send(txObject, (err, res) => {
								if(err) console.log(err);
								else console.log("record shared!! "+res);
						})

	}	
})