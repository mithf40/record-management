$( document ).ready(function() {
  
    // SUBMIT FORM
      $("#register_form").submit(async function(event) {
      // Prevent the form from submitting via the browser.
      event.preventDefault();
      console.log("postrequest called.");
      // $("#btnsubmit").attr("disabled", true);
      var valid = await checkValidity();
      console.log(valid);
      ajaxPost();
    });
      
    async function checkValidity(){
      var req = {
        ethaddr: $("#ethaddr").val(),
      };
      console.log(JSON.stringify(req));
  
      var res = 0;
  
      $.ajax({
        type : "GET",
        // contentType: "application/json",
        url : "/patient/api/registers/contract",
        data : req,
        // dataType : 'json',
        success: function(result){
          res = 1;
          console.log("Success: ", result[0].contract_addr);
        },
        error : function(e) {
          alert("Error!", window.location);
          console.log("ERROR: ", e);
        }
      });
  
      return res;
    }
      
      function ajaxPost(){
        
        // PREPARE FORM DATA
        var formData = {
          fullname : $("#fullname").val(),
          ethaddr :  $("#ethaddr").val(),
          contact_info : $('#contact_info').val(),
          address : $('#address').val()
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
            "--> " + customer.fullname + " " + customer.ethaddr + ", createdAt: " + customer.createdAt+  "</p>"); 
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
        $("#ethaddr").val("");
        $("#contact_info").val("");
        $("#address").val("");
      }
  })
  