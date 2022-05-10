var loading = '<div class="text-center"> <div class="spinner-border" role="status"> <span class="sr-only">Loading...</span></div></div>';
var success='<div class="alert alert-success"><strong>Success!</strong> Send JSON value is Success.</div>';
var danger='<div class="alert alert-danger"><strong>Danger!</strong> Can not sent JSON Value.</div>';
window.addEventListener('DOMContentLoaded', event => {
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});
function loadTopic() {
    const xhttp = new XMLHttpRequest();
    xhttp.overrideMimeType("application/json");
    xhttp.open("GET", "http://localhost:9100/topics");
    xhttp.onload = function () {
        var jsonResponse = JSON.parse(xhttp.responseText);
        var status = JSON.parse(jsonResponse.success);
        if (status == 1) {
            var topic = jsonResponse.message;
            for (var i = 0; i < topic.length; i++) {
                console.log(topic[i]);
                var optionValue = topic[i].toString();
                var optionText =topic[i].toString();
                $('#selectTopic').append(`<option value="${optionValue}">
                                       ${optionText}
                                  </option>`);
            }
        } else {
            window.alert("Unable to contact the server!!");
        }
    }
    xhttp.send();
}
function topicSending() {

    var topic=$( "#selectTopic" ).val();
    if(topic=="notselect"){
        window.alert("Please select a topic!!");
        exit;
    }
    var jsonValues=$( "textarea#jsonValues" ).val();

    //console.log(jsonValuesArray);
    const message={
        "topic":topic,
        "message":jsonValues.replace("\n", "")};
    //const messageObj = jsonParse(message);
    $("#loading").html(loading);
    console.log(message);
    try{
        $.ajax({
            type: 'POST',
            url: 'http://localhost:9100/products',
            data: JSON.stringify(message),
            contentType: "application/json; charset=utf-8",
            traditional: true,
            success: function (data) {
                if(data.success ===1){
                    $("#loading").html(success);
                }
            }
        });
    }catch (e){
        $("#loading").html(danger);
    }
    
}
function jsonParse(str){
    try{
        const jsonObj=JSON.parse(str);
        return jsonObj;
    }catch (e){
        window.alert("Unexpected token s in JSON");
    }
}