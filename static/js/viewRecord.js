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
                        // var ct = 1;
                        console.log(i, item);
                        // console.log(ct);
                        // console.log(item.record_addr);
                        // console.log( typeof item.record_addr);
                        let rec = "<div class='panel panel-default'>" + "<div class='panel-heading'>" + 
                              "<h4 class='panel-title'>" + 
                                "<a data-toggle='collapse' data-parent='#getResultDiv' href=#" + item.id + ">" + item.record_name + "</a>" + 
                              "</h4>" + 
                            "</div>" +
                            "<div id=" + item.id + " class='panel-collapse collapse'>" + 
                              "<div class='panel-body'> Record of: " + item.fullname + " <br> Created By: " + item.doc_addr + " <br> Created at:" + item.createdAt + " " + "</div>" +
                              "<div id='secret"+item.id+"' hidden>" + item.record_addr + "</div>" +
                              "<div id='note"+item.id+"' hidden>" + item.note + "</div>" +
                              "<div id='account"+item.id+"' hidden>" + item.pat_addr + "</div>" +
                              "<div class='panel-body'> <button  id='btn"+ item.id + "' type='button' class='btn btn-default' onclick='whichButton(this)'>Check</button>"+ 
                                "<div id='answer" + item.id + "'> </div>" +
                              "</div>" + 
                            "</div>" + 
                          "</div>";
                        // ct = ct + 1;
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
  