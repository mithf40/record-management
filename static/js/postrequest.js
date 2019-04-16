$( document ).ready(function() {
  var key;
  // SUBMIT FORM
  $("#patientForm").submit(async function(event) {
	  // Prevent the form from submitting via the browser.
	  event.preventDefault();
	  console.log("postrequest called.");
	  // $("#btnsubmit").attr("disabled", true);

	  await validate_deploy();
	  // console.log("contract_addr found: "+_contract_addr);
	  // var valid =  checkValidity(_contract_addr);

	  // ajaxPost();
  });
    
  async function validate_deploy(){
    var req = {
      pat_addr: $("#pat_addr").val(),
    };
    console.log(JSON.stringify(req));

    var contract_addr, valid;

    $.ajax({
      type : "GET",
      // contentType: "application/json",
      url : "/patient/api/registers/contract",
      data : req,
      // dataType : 'json',
      success: async function(result){
        contract_addr = result[0].contract_addr;
        console.log("Successss: ", result[0].contract_addr);
        // return contract_addr;
        valid = await checkValidity(contract_addr);
        console.log("Doctor's permission : "+valid);
        if(valid)
          deploy();
        else
          console.log("permission denied.")
      },
      error : function(e) {
        alert("Error!", window.location);
        console.log("ERROR: ", e);
      }
    });
    
  }
  async function checkValidity(contract_addr){
    // check if doc has permission to create record.
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

    // const _contract_addr = require('./deploy.js')('../../build/contracts/patient.json',$("#reg_addr").val(),args);
    console.log("Interacting with patient contract at " + contract_addr);
    
    const contract_data = fs.readFileSync('../../build/contracts/patient.json', 'utf8');
    // const compiled = require(compiled_contract);
    const compiled = JSON.parse(contract_data);

    const interface = compiled.abi;

    // const web3 = new Web3(web3.currentProvider);
    // console.log(web3.eth);
    var val;
    const contract = new web3.eth.Contract(interface, contract_addr);
    console.log(contract);
    const doc_addr = $("#doc_addr").val();
    await contract.methods.canCreateRecords(doc_addr).call(async (err, res) => {
     if(err) console.log("ERROR : " +err);
     else{
      console.log(res);
      // return res;
      val = res;
     }
    });
    return val;
  }

  async function deploy(){
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

    const contract_data = fs.readFileSync('../../build/contracts/record.json','utf8');
    const compiled = JSON.parse(contract_data);
    const abi = compiled.abi;
    const bytecode = compiled.evm.bytecode.object;

    const recordId = web3.utils.fromAscii($("#record_name").val());
    const _patient = $("#pat_addr").val();
    const _doctor = $("#doc_addr").val();

    var crypto = require('crypto');
    key = crypto.randomBytes(64).toString('hex');
    // key = crypto.randomBytes(64);
    console.log(typeof key);
    console.log(key);
    // const key_bytes = Buffer.from(key,'hex')[0];
    // const key_bytes = web3.utils.hexToBytes("0x"+key);
    const key_bytes = key;
    console.log(typeof key_bytes);
    // console.log(key_bytes[0]);
		// var _key = await crypto.randomBytes(64, async (err, buf) => {
		//   if (err) throw err;
		//   console.log("random ",buf.toString('hex'));
		//   // return buf.toString('hex');
		//   key = web3.utils.fromAscii(buf.toString('hex'));
		// });
		// console.log(key);
		// key = web3.utils.fromAscii(key);
		console.log("key "+key);

		var signature = await web3.eth.personal.sign($("#note").val(), $("#doc_addr").val(),(err,res) =>{
			if(err) console.log("ERROR "+err);
			else console.log("signature "+res);
		});
		signature = web3.utils.fromAscii(signature);

    const contract = new web3.eth.Contract(abi,$("#doc_addr").val());
    // const deployed = await contract.deploy({data: bytecode, arguments: [recordId, _patient, _doctor, key, signature]});
    contract.deploy({
		    data: bytecode,
		    arguments: [recordId, _patient, _doctor, key_bytes, signature]
		})
		.send({
		    from: $("#doc_addr").val()
		}, (error, transactionHash) => {  })
		.on('error', (error) => { console.log(error); })
		.on('transactionHash', (transactionHash) => { console.log(transactionHash); })
		.on('receipt', (receipt) => {
		   console.log("contract deployed to "+receipt.contractAddress) // contains the new contract address
		})
		.on('confirmation', (confirmationNumber, receipt) => {  })
		.then((newContractInstance) => {
		    console.log(newContractInstance.options.address) // instance with the new contract address
		    ajaxPost(newContractInstance.options.address);
		});
    // console.log("contract deployed to : "+deployed.options.address);
  }

  function ajaxPost(_record_addr){
    const Cryptr = require('cryptr');
    console.log("secret key ",key);
		const cryptr = new Cryptr(key);
		 
		const encrypted_data = cryptr.encrypt($("#note").val());
		const decrypted_data = cryptr.decrypt(encrypted_data);
	
		console.log(encrypted_data); // 5590fd6409be2494de0226f5d7
		console.log(decrypted_data); // bacon
    // PREPARE FORM DATA
    var formData = {
      fullname : $("#fullname").val(),
      record_name: $("#record_name").val(),
      pat_addr :  $("#pat_addr").val(),
      doc_addr : $('#doc_addr').val(),
      note : encrypted_data,
      record_addr: _record_addr
    }

    // DO POST
    $.ajax({
    type : "POST",
    contentType : "application/json",
    url : window.location + "/api/users/save",
    data : JSON.stringify(formData),
    dataType : 'json',
    success : function(customer) {
      $("#postResultDiv").html("<p>" + 
        "Post Successfully! <br>" +
        "--> " + customer.fullname + " " + customer.pat_addr + ", createdAt: " + customer.createdAt+  "</p>"); 
    },
    error : function(e) {
      alert("Error!", window.location)
      console.log("ERROR: ", e);
    }
  });
    
    // Reset FormData after Posting
    resetData();

  }

    
    function resetData(){
      $("#fullname").val("");
      $("#record_name").val("");
      $("#pat_addr").val("");
      $("#doc_addr").val("");
      $("#note").val("");
    }
})
