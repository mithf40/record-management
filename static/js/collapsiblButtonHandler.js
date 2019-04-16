// $(document).ready(function(){


    function whichButton(buttonElement){
        var btn = buttonElement.id;
        
        var num = btn.slice(3,);
        var div1 = "note"+num;
        var div2 = "secret"+num;
        var div3 = "answer"+num;
        var div4 = "account"+num;
      
        var record_addr = document.getElementById(div2).innerHTML;
        var encrypted_note = document.getElementById(div1).innerHTML;
        var account = document.getElementById(div4).innerHTML;
      
        console.log(record_addr);
        decryptIt(record_addr, encrypted_note, account);
        document.getElementById(div3).innerHTML = record_addr + " | | " + encrypted_note;
      
      }
      
        global.decryptIt = async function (record_addr, encrypted_note, account){
          const args = [];
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
          console.log("Interacting record contract at " + record_addr);
          const fs = require('fs');
      
          // const HDWalletProvider = require("truffle-hdwallet-provider");
          const Web3 = require("web3");
          const contract_data = fs.readFileSync('../../build/contracts/record.json', 'utf8');
          // const compiled = require(compiled_contract);
          const compiled = JSON.parse(contract_data);
      
          const interface = compiled.abi;
      
          const web3 = new Web3(web3Provider);
          const contract = new web3.eth.Contract(interface, contractAddr);
          console.log(contract);
      
          const txObject = {
              gas: "1000000",
              from: account
          };
      
          contract.methods.canCreateRecords(doctorAddr).call((err, res) => {
              if(err) console.log(err);
              else console.log(res);
          })
      }
      

// })
    
//   function whichButton(buttonElement){
//   var btn = buttonElement.id;
  
  var num = btn.slice(3,);
  var div1 = "note"+num;
  var div2 = "secret"+num;
  var div3 = "answer"+num;
  var div4 = "account"+num;

  var record_addr = document.getElementById(div2).innerHTML;
  var encrypted_note = document.getElementById(div1).innerHTML;
  var account = document.getElementById(div4).innerHTML;

//   console.log(record_addr);
//   decryptIt(record_addr, encrypted_note, account);
  document.getElementById(div3).innerHTML = record_addr + " | | " + encrypted_note;

}

    async function decryptIt(record_addr, encrypted_note, account){
    const args = [];
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
    console.log("Interacting record contract at " + record_addr);
    const fs = require('fs');

    // const HDWalletProvider = require("truffle-hdwallet-provider");
    const Web3 = require("web3");
    const contract_data = fs.readFileSync('../../build/contracts/record.json', 'utf8');
    // const compiled = require(compiled_contract);
    const compiled = JSON.parse(contract_data);

    const interface = compiled.abi;

    const web3 = new Web3(web3Provider);
    const contract = new web3.eth.Contract(interface, contractAddr);
    console.log(contract);

    const txObject = {
        gas: "1000000",
        from: account
    };

    contract.methods.canCreateRecords(doctorAddr).call((err, res) => {
        if(err) console.log(err);
        else console.log(res);
    })
}
