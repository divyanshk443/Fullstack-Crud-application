// In add user html page when we will hit the submit button
// this below jquery will give us the alert
$("#add_user").submit(function(event){
    alert("Data Inserted Successfully")
})

$("#update_user").submit(function(event){

   // event.preventDefault();
   
    // this below serializeArray will creates an array of objects (name and value) by serializing form values
    var unindexed_array = $(this).serializeArray();
    var data = {}
 
    // now conerting that name and value into a key and value so that we can pass that further
    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `http://localhost:3000/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})

if(window.location.pathname == "/"){
    $ondelete = $("a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/users/${id}`,
            "method" : "DELETE"
        }
        
  // using ajax we can  update parts of a web page, without reloading the whole page.
        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                location.reload();
                
                alert("Data Deleted Successfully!");
                
            })
        }

    })
}
