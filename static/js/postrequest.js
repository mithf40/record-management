$( document ).ready(function() {
  
  // SUBMIT FORM
    $("#patientForm").submit(function(event) {
    // Prevent the form from submitting via the browser.
    event.preventDefault();
    console.log("postrequest called.")
    ajaxPost();
  });
    
    
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
      url : window.location + "api/users/save",
      data : JSON.stringify(formData),
      dataType : 'json',
      success : function(customer) {
        $("#postResultDiv").html("<p>" + 
          "Post Successfully! <br>" +
          "--> " + customer.fullname + " " + customer.ethaddr + ", createdAt: " + customer.createdAt+  "</p>"); 
      },
      error : function(e) {
        alert("Error!")
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
