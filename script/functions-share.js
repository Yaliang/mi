$(document).ready(function() {
    var eventid = getUrlParameter("id");

    var currentUser = Parse.User.current();
    if (currentUser) {
        updateEventDetail(eventid);
    } else {
           $("#body-content-event-detail").html("");
          $("#footer-bar-event-id-label").html(eventid);

          // display the UserEvent object info
          var descendingOrderKey = "createdAt";
          var displayFunction = function(objects){  // objects: an array of UserEvent objects
              shareEvents(objects[0]);
              var id = objects[0].id;
              var holder = objects[0].get("owner");
              $("#body-content-event-detail").prepend(buildEventWithoutLogin(objects[0]));
              pullUserEventHolderInfo(holder, "detail-"+id); // display event owner's name, not the username (which is an email address)

              $(".ui-custom-report").on("click",function(){
                  reportActivity(id);
              });
          };
          ParseSelectEvent(eventid, displayFunction);

          // display the comments in this event
          displayFunction = function(objects) { // objects: an array of Comment objects
              $("#body-content-event-detail").append("<div id='body-content-bottom-event-comments-list' class='ui-custom-comment-container'></div>");
              for (var i=0; i<=objects.length-1; i++) {
                  // build the comment content
                  var newElement = buildCommentInEventDetail(objects[i]);
                  $("#body-content-bottom-event-comments-list").append(newElement);
                  
                  // build the user's profile photo
                  var displayFunction1 = function(object, data) {  // object: single cachePhoto[i] object
                      var photo120 = object.get("profilePhoto120");
                      if (typeof(photo120) == "undefined") {
                          photo120 = "./content/png/Taylor-Swift.png";
                      }
                      $("#comment-"+data.commentId).css("backgroundImage", "url("+photo120+")")
                  };
                 // CacheGetProfilePhotoByUserId(objects[i].get("owner"), displayFunction1, {commentId: objects[i].id});
              }
          };
          ParsePullEventComment(eventid, descendingOrderKey, displayFunction);
        }
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


function buildEventWithoutLogin(object){
    var title = object.get("title");
    var location = object.get("location");
    var time = object.get("time");
    var visibility = object.get("visibility");
    var description = object.get("description");
    var commentNumber = object.get("commentNumber");
    var holder = object.get("owner");
    var goingId = object.get("goingId");
    if (typeof(goingId) == "undefined") {
        goingId = [];
    }
    var goingNumber = goingId.length;
    var interestId = object.get("interestId");
    if (typeof(interestId) == "undefined") {
        interestId = [];
    }
    var interestNumber = interestId.length;
    var id = object.id;
    var newElement = "";
    newElement = newElement + "<div id=\'body-event-detail-"+id+"\'>";
    newElement = newElement + "<div class='custom-corners-public custom-corners'>";
    newElement = newElement + "<div class='ui-bar ui-bar-a' style='cursor:pointer' onclick=\"$.mobile.changePage(\'#page-display-user-profile\');\">";
    newElement = newElement + "<div><strong id=\'body-top-bar-event-detail-"+id+"-owner-name\'></strong></div>";
    newElement = newElement + "<div id=\'body-top-bar-event-detail-"+id+"-owner-gender\' class=\'ui-icon-custom-gender\'></div>";
    newElement = newElement + "</div>";
    newElement = newElement + "<div class='ui-body ui-body-a'>";
    newElement = newElement + "<p class='ui-custom-event-title'>" + title + "</p>";
    if (description.length == 0) {
        newElement = newElement + "<p class='ui-custom-event-description-less-margin'></br></p>";
    } else {
        newElement = newElement + "<p class='ui-custom-event-description'>" +  description.replace("\n","</br>") + "</p>";
    }
    newElement = newElement + "<p class='ui-custom-event-location'>" + location + "</p>";
    newElement = newElement + "<p class='ui-custom-event-time'>" + time + "</p>";
    newElement = newElement + "<div class='event-statistics comment-statistics-"+id+"' style='clear:both'>" + commentNumber + " Comments</div><div class='event-statistics interest-statistics-"+id+"'>" + interestNumber + " Interests</div><div class='event-statistics going-statistics-"+id+"'>" + goingNumber + " Goings</div>";
    newElement = newElement + "</div>";
    newElement = newElement + "<div class='ui-footer ui-bar-custom'>";
    // if (interestId.indexOf(Parse.User.current().id) < 0) {
    //     newElement += "<div class='ui-custom-float-left'><a href='#' class='ui-btn ui-bar-btn-custom ui-mini ui-icon-custom-favor-false interest-button-"+id+"' onclick='addInterestEvent(\""+id+"\")'>"+"Interest"+"</a></div>"
    // } else {
    //     newElement += "<div class='ui-custom-float-left'><a href='#' class='ui-btn ui-bar-btn-custom ui-mini ui-icon-custom-favor-true interest-button-"+id+"' onclick='removeInterestEvent(\""+id+"\")'>"+"Interest"+"</a></div>"
    // }
    // if (goingId.indexOf(Parse.User.current().id) < 0) {
    //     newElement = newElement + "<div class='ui-custom-float-left'><a href='#' class='ui-btn ui-bar-btn-custom ui-mini ui-icon-custom-going-false going-button-"+id+"' onclick='addGoingEvent(\""+id+"\")'>"+"Going"+"</a></div>";
    // } else {
    //     newElement = newElement + "<div class='ui-custom-float-left'><a href='#' class='ui-btn ui-bar-btn-custom ui-mini ui-icon-custom-going-true going-button-"+id+"' onclick='removeGoingEvent(\""+id+"\")'>"+"Going"+"</a></div>";
    // }

    newElement += "<div class='ui-custom-float-left'><a href='#' class='ui-btn ui-bar-btn-custom ui-mini ui-icon-custom-favor-true interest-button-"+id+"' onclick='removeInterestEvent(\""+id+"\")'>"+"Interest"+"</a></div>"
    newElement = newElement + "<div class='ui-custom-float-left'><a href='#' class='ui-btn ui-bar-btn-custom ui-mini ui-icon-custom-going-true going-button-"+id+"' onclick='removeGoingEvent(\""+id+"\")'>"+"Going"+"</a></div>";

    newElement = newElement + "</div>";
    newElement = newElement + "</div>";
    newElement = newElement + "</div>";

    return newElement;
}

