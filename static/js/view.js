$( document ).ready(function() {
	$("#view_form").submit(async function(event){
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
    await contract.methods.getDecryptionKey().call({from: $("#eth_addr").val()},async (err,res) => {
    	if(err) console.log("permission denied. "+err);
    	else {
    		console.log("got key "+ res);
    		// key = web3.utils.bytesToHex(res);
    		key = res;
    		const Cryptr = require('cryptr');
		    const cryptr = new Cryptr(key);
		    const decrypted_data = cryptr.decrypt(record.note);
		    console.log("record decrypted!! : "+decrypted_data);

		    $("#post_view").html("<p>Record found.<br> Patient name: "+record.fullname+"<br>Record name: "+record.record_name+"<br>Patient address: "+record.pat_addr+"<br>Doctor's address: "+record.doc_addr+"<br>Doctor's note: "+decrypted_data+"</p>");
    	}
    });

    
    	// <form class='form-horizontal' id='share_form'><div class='form-group'><label class='control-label col-sm-2' for='share'>Share</label><div class='col-sm-6'><input type='text' class='form-control' id='share_addr' name='share_addr'></div></div><div class='form-group'><div class='col-sm-offset-2 col-sm-10'><button type='submit' id='share_submit' class='btn btn-default'>Share</button></div></div></form>");

	}
	$("#share_form").submit(async function(event){
		event.preventDefault();
		await share($("#share_addr").val());
	});
	
})