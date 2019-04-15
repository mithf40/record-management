$( document ).ready(function() {
  
  // GET REQUEST
  $("#all_records").click(function(event){
    event.preventDefault();
    ajaxGet();
  });

  $("#provider_form").submit(async function(event){
    event.preventDefault();
    await get_contract();
    // add_provider();
  })
  
  // DO GET
  function ajaxGet(){

    $.ajax({
      type : "GET",
      url : "/patient/api/users/all",
      // data: {key: "value"},
      success: function(result){
        $('#getResultDiv ul').empty();
        var custList = "";
        $.each(result, function(i, customer){
          // let rec = customer.id + ". " + customer.fullname + " " + customer.ethaddr + "<br>";
          let rec = "<div class='panel panel-default'>" + "<div class='panel-heading'>" + 
                "<h4 class='panel-title'>" + 
                  "<a data-toggle='collapse' data-parent='#getResultDiv' href=#" + customer.id + ">" + customer.fullname + "</a>" + 
                "</h4>" + 
              "</div>" +
              "<div id=" + customer.id + " class='panel-collapse collapse'>" + 
                "<div class='panel-body'>" + customer.ethaddr + " <br>  " + customer.contact_info + " <br> " + customer.address + " " + "</div>" + 
              "</div>" + 
            "</div>";
          $('#getResultDiv .list-group').append(rec);
        });
        console.log("Success: ", result);
      },
      error : function(e) {
        $("#getResultDiv").html("<strong>Error</strong>");
        console.log("ERROR: ", e);
      }
    });  
  }

  async function get_contract(address){
    $.ajax({
      type: "GET",
      url: "/patient/get_contract",
      success: function(result){
        console.log(result);
      },
      error: function(e){
        console.log(e);
      }
    })
  }

  function add_provider(){
    // console.log("called");
    const Web3 = require('web3');
    const HDWalletProvider = require("truffle-hdwallet-provider");
    const provider = new HDWalletProvider(
      "cereal unfold keep grass caution purity scissors twin pioneer jewel enable shuffle",
      "https://ropsten.infura.io/v3/e63294ce678346ddb5de54f863476e9c"
    );
    const web3 = new Web3(provider);
    const fs = require('fs');
    const contract_data = fs.readFileSync('../../build/contracts/patient.json', 'utf8');

    const compiled = JSON.parse(contract_data);

    const abi = compiled.abi;
    // const address = 
  }
})
