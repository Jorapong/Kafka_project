var loading = '<div class="text-center mt-3"> <div class="spinner-border" role="status"> <span class="sr-only">Loading...</span></div></div>';
var success = '<div class="alert alert-success mt-3"><strong>Success!</strong> Send JSON value is Success.</div>';
var danger = '<div class="alert alert-danger mt-3 text-center"><strong>Failed!</strong><br>Error: please contact admin<br>jirapong.r@knowesis.com</div>';
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
    xhttp.open("GET", "http://192.168.1.110:9100/topics");
    xhttp.onload = function () {
        var jsonResponse = JSON.parse(xhttp.responseText);
        var status = jsonResponse.status;
        if (status == "success") {
            var topic = jsonResponse.message;
            for (var i = 0; i < topic.length; i++) {
                console.log(topic[i]);
                var optionValue = topic[i].toString();
                var optionText = topic[i].toString();
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
    var topic = $("#selectTopic").val();
    if (topic == "notselect") {
        window.alert("Please select a topic!!");
        exit;
    }
    var jsonValues = $("textarea#jsonValues").val();
    try {
        jsonValuesArray = JSON.parse(jsonValues);
    } catch (e) {
        window.alert("Unexpected token s in JSON");
    } finally {
        const message = {
            "topic": topic,
            "message": jsonValuesArray
        };
        $("#loading").html(loading);
        console.log(JSON.stringify(message));
        try {
            $.ajax({
                type: 'POST',
                url: 'http://192.168.1.110:9100/products',
                data: JSON.stringify(message),
                contentType: "application/json; charset=utf-8",
                traditional: true,
                success: function (data) {
                    console.log(data);
                    if (data.success >= 1) {
                        $("#loading").html(success);
                    } else {
                        $("#loading").html(danger);
                    }
                }
            });
        } catch (e) {
            $("#loading").html(danger);
        }
    }
}
function reSet() {
    document.getElementById("jsonValues").value = "[ ]";
}