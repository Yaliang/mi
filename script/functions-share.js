$(document).ready(function() {
    var eventid = getUrlParameter("id");
    console.log(eventid);
    updateEventDetail(eventid);
    var displayFunction = function(objects) {
        shareEvents(objects[0]);
    }
    ParseSelectEvent(eventid, displayFunction);
});

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}