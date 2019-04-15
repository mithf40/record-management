$( document ).ready(function() {
  
    // SUBMIT FORM
      $("#view_form").submit(async function(event) {
      // Prevent the form from submitting via the browser.
      event.preventDefault();
      console.log("View Record called.");
      // $("#btnsubmit").attr("disabled", true);
      await viewRecords();
      
    });

    async function viewRecords(){
        const viewer = $("#viewer_addr").val();
        const viewee = $("#viewee_addr").val();

        if(viewer == viewee){
            console.log("Viewing own records!!");
            var req = {patient : viewer};
            $.ajax({
                type: "GET",
                url: "/patient/api/users/selected",
                data : req,
                success : function(result){
                    console.log("success: ", result);
                    $('#getResultDiv ul').empty();
                    let num = "<p> Found <strong>"+result.length+"</strong> records for patient <strong>"+viewee+"</strong> </p>";
                    $('#getResultDiv .list-group').append(num);
                    $.each(result, function(i, item){
                        // let rec = customer.id + ". " + customer.fullname + " " + customer.ethaddr + "<br>";
                        let rec = "<div class='panel panel-default'>" + "<div class='panel-heading'>" + 
                              "<h4 class='panel-title'>" + 
                                "<a data-toggle='collapse' data-parent='#getResultDiv' href=#" + item.id + ">" + item.fullname + "</a>" + 
                              "</h4>" + 
                            "</div>" +
                            "<div id=" + item.id + " class='panel-collapse collapse'>" + 
                              "<div class='panel-body'>" + item.ethaddr + " <br>  " + item.contact_info + " <br> " + item.address + " " + "</div>" + 
                              "<div class='panel-body'> <button id='btn'"+i+ "type='button' class='btn btn-default' onclick='whichButton(this)'>Check</button>"+ 
                                "<div id='hidden" + i + "'> </div>" +
                              "</div>" + 
                            "</div>" + 
                          "</div>";
                        
                        $('#getResultDiv .list-group').append(rec);
                      });
                },
                error: function(e){
                    console.log("error: ",e);
                }
            });
        }
        else{
            console.log("Other patient's records viewing!!");
        }
    }
  })
  