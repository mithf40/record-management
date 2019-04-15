$( document ).ready(function() {
	
		// SUBMIT FORM
			$("#register_form").submit(async function(event) {
			// Prevent the form from submitting via the browser.
			event.preventDefault();
			console.log("Give Create Permission called.");
			// $("#btnsubmit").attr("disabled", true);
			await checkValidity();
			
		});
			
		async function checkValidity(){
			var req = {
				ethaddr: $("#patient_addr").val(),
			};
			console.log(JSON.stringify(req));
	
		//   var res = 0;
	
			$.ajax({
				type : "GET",
				// contentType: "application/json",
				url : "/patient/api/registers/contract",
				data : req,
				// dataType : 'json',
				success: function(result){
				//   res = 1;
					console.log("Success: ", result[0].contract_addr);
					var contractAddr = result[0].contract_addr;
				//   $("#postPermit").html("<p> Shared Successfully!! "+contractAddr+" </p>");
					// viewWritePermission(contractAddr);
					givewriteperm(contractAddr,$("#doc_addr").val());
				},
				error : function(e) {
					alert("Error!", window.location);
					console.log("ERROR: ", e);
				}
			});
		}

		async function viewWritePermission(contractAddr){
			const args = [];
			// const _contract_addr = require('./deploy.js')('../../build/contracts/patient.json',$("#reg_addr").val(),args);
			console.log("Interacting patient contract at " + contractAddr);
			const fs = require('fs');

			const HDWalletProvider = require("truffle-hdwallet-provider");
			const Web3 = require("web3");
			const contract_data = fs.readFileSync('../../build/contracts/patient.json', 'utf8');
			// const compiled = require(compiled_contract);
			const compiled = JSON.parse(contract_data);

			const interface = compiled.abi;
			// console.log(interface);
			// console.log(JSON.parse(interface));

			// console.log(typeof Web3);
					const mneumonic = $("#mneumonic").val();
					const key = $("#mneumonic_key").val();

			const provider = new HDWalletProvider(
				mneumonic, "https://ropsten.infura.io/v3/"+key
			);
			// console.log(provider);
			const web3 = new Web3(provider);

					const contract = new web3.eth.Contract(interface, contractAddr);
					console.log(contract);
					console.log("I am alive!!");
					const doctorAddr = $("#doc_addr").val();
					const patientAddr = $("#patient_addr").val();

					const txObject = {
						gas: "1000000",
						from: patientAddr
					};
					// const tx = new Tx(txObject);

					// let from = web3.toChecksumAddress(Merchant.accounts[0]);

					// const signed = web3.eth.sign(web3.utils.sha3(txObject), doctorAddr, function (err, result) { console.log(err, result); });

					// console.log(signed);

					// contract.methods.giveWritePermission(signed).call({from: patientAddr}, (err, res) => {
					//     if(err) console.log(err);
					//     else console.log(res);
					// })

					contract.methods.giveWritePermission(doctorAddr).send(txObject, (err, res) => {
							if(err) console.log(err);
							else console.log(res);
					})
		}
			

		async function givewriteperm(contract_addr, doc_addr)
		{
			// Modern dapp browsers...
	    if (window.ethereum) {
	        window.web3 = new Web3(ethereum);
	        try {
	            await ethereum.enable();
	            // var accounts= await web3.eth.getAccounts();
	            // console.log("found accounts "+accounts);
	        } catch (error) {
	            // User denied account access...
	        }
	    }
	    // Legacy dapp browsers...
	    else if (window.web3) {
	        window.web3 = new Web3(web3.currentProvider);
	        // Acccounts always exposed
	        web3.eth.sendTransaction({/* ... */});
	    }
	    // Non-dapp browsers...
	    else {
	        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
	    }
			const fs = require('fs');
			const contract_data = fs.readFileSync('../../build/contracts/patient.json','utf8');
			const compiled = JSON.parse(contract_data);
			var abi = compiled.abi;
			// console.log(compiled);
			var contract = window.web3.eth.contract(abi,contract_addr);
			console.log(contract);
			contract.methods.giveWritePermission(doc_addr).send();
			var perm = contract.methods.canCreateRecords(doc_addr).call();
			console.log("Doctor permission : "+perm);
			}
	})
	