$(document).ready(function() {
	$("#register_form").submit(async function(event) {
		event.preventDefault();
		$("#btnsubmit").attr("disabled", true);
		var _contract_addr = await deploy();
		ajaxPost(_contract_addr);
		$('#btnsubmit').attr("disabled", false);

	});
	async function deploy(){
		const args = [];
		// const _contract_addr = require('./deploy.js')('../../build/contracts/patient.json',$("#reg_addr").val(),args);
		console.log("deploying patient.sol using " + $("#reg_addr").val());
		const fs = require('fs');

		const HDWalletProvider = require("truffle-hdwallet-provider");
		const Web3 = require("web3");
		const contract_data = fs.readFileSync('../../build/contracts/patient.json', 'utf8');
		// const compiled = require(compiled_contract);
		const compiled = JSON.parse(contract_data);

		const interface = compiled.abi;
		const bytecode = compiled.evm.bytecode.object;
		// console.log(interface);
		// console.log(JSON.parse(interface));

		// console.log(typeof Web3);

		const provider = new HDWalletProvider(
			"cereal unfold keep grass caution purity scissors twin pioneer jewel enable shuffle",
			"https://ropsten.infura.io/v3/e63294ce678346ddb5de54f863476e9c"
		);
		// console.log(provider);
		const web3 = new Web3(provider);

		// var _contract_addr;

		// const deploy = async () => {
		// async function deploy() {
			try{
					// const accounts = await web3.eth.getAccounts();
				const accounts = [$("#reg_addr").val()];
				console.log(accounts);
				console.log("Attempting to deploy from account", accounts[0]);

				const result = await new web3.eth.Contract(interface)
				 .deploy({ data: "0x" + bytecode,
									 arguments: args})
				 .send({ gas: "1000000", from: accounts[0] });
				 // console.log("lfsdlfkdsd");
				console.log("Contract deployed to", result.options.address);

				// _contract_addr = result.options.address;
				return result.options.address;
				// _callback();

			} catch(e){
				console.log(e);
			}
		// };
	}
	async function ajaxPost(_contract_addr){
		

		// const _contract_addr = deploy();
		// await deploy();
		// console.log(_contract_addr);

		// _contract_addr.then(function(req){
		// 	console.log(req);
		// });

		// async function post(){
			// deploy(() => console.log("Contract deployed."));
			// await deploy();

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