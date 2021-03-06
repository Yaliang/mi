/* This variable indicates the prefix for naming the button for getting friend options
 */
var prefixForGetFriendOptionsButton="";

/* This function is designed to display buttons with proper actions one can take for users shown in the list,
 * for examples, for users found in the near-by search. Actions includes: startChat if they are friends;
 * sendFriendRequest if no friend request has benn sent or received; acceptFriendRequest if a friend request
 * has been received; or doing nothing if a friend request has already been sent.
 */
function getFriendOptionsButton(userId, option){
    if ((option)&&(option == 3)) {
        var startChatButton = "<div class='send-friend-request chat-friend' onclick=\"startPrivateChat('"+userId+"');\">Start Chat</div>";
        $("#"+prefixForGetFriendOptionsButton+userId+" > .custom-corners-people-near-by > .ui-bar").append(startChatButton);
        return;
    }
    var displayFunction = function(ownerId, friendId, object){ // object: single cacheFriend[i] object (belong to ownerId)
        if (typeof(object)=="undefined") {
            var displayFunction1 = function(ownerId, friendId, object){ // object: single cacheFriend[i] object (belong to friendId)
                if (typeof(object)=="undefined") {
                    var sendFriendRequestButton = "<div class='send-friend-request'>Send Friend Request</div>";
                    $("#"+prefixForGetFriendOptionsButton+ownerId+" > .custom-corners-people-near-by > .ui-bar").append(sendFriendRequestButton);
                    $("#"+prefixForGetFriendOptionsButton+ownerId+" > .custom-corners-people-near-by > .ui-bar > .send-friend-request").on("click",function(){
                        // when click to send new friend request
                        sendFriendRequest(ownerId);
                    })
                } else {
                    var objectId = object.id;
                    var acceptFriendRequestButton = "<div class='send-friend-request accept-friend-request'>Accept</div>";
                    var rejectFriendRequestButton = "<div class='reject-friend-request'>Reject</div>";
                    $("#"+prefixForGetFriendOptionsButton+ownerId+" > .custom-corners-people-near-by > .ui-bar").append(acceptFriendRequestButton+rejectFriendRequestButton);
                    $("#"+prefixForGetFriendOptionsButton+ownerId+" > .custom-corners-people-near-by > .ui-bar > .accept-friend-request").on("click",function(){
                        // when accepting friend request
                        $("#"+prefixForGetFriendOptionsButton+ownerId+" > .custom-corners-people-near-by > .ui-bar > .accept-friend-request").unbind("click");
                        $("#"+prefixForGetFriendOptionsButton+ownerId+" > .custom-corners-people-near-by > .ui-bar > .reject-friend-request").unbind("click");

                        var successFunction = function(object){
                            var objectId = object.id;
                            var friendId = object.get("friend");
                            $("#"+prefixForGetFriendOptionsButton+friendId+" > .custom-corners-people-near-by > .ui-bar > .reject-friend-request").remove();
                            $("#"+prefixForGetFriendOptionsButton+friendId+" > .custom-corners-people-near-by > .ui-bar > .accept-friend-request").addClass("chat-friend").removeClass("accept-friend-request");
                            $("#"+prefixForGetFriendOptionsButton+friendId+" > .custom-corners-people-near-by > .ui-bar > .chat-friend").html("Start Chat").on("click",function(){
                                startPrivateChat(friendId);
                            });

                            $("#body-bottom-button-send-request").html("Start Chat").unbind("click").on("click",function(){
                                startPrivateChat(friendId);
                            });

                            // push notification to friend
                            pushNotificationToDeviceByUserId(object.get('friend'), Parse.User.current().get("name")+" accepted your friend request!");
                        };
                        ParseAcceptFriendRequest(objectId, null, null, successFunction);
                    });

                    $("#"+prefixForGetFriendOptionsButton+ownerId+" > .custom-corners-people-near-by > .ui-bar > .reject-friend-request").on("click",function(){
                        // when rejecting friend request
                        var successFunction = function(friendId){
                            $("#"+prefixForGetFriendOptionsButton+friendId).slideUp("fast", function(){
                                $("#"+prefixForGetFriendOptionsButton+friendId).remove();
                            });

                            $("#body-bottom-button-send-request").html("Send Friend Request").unbind("click").on("click",function(){
                                sendFriendRequest(ownerId);
                            });
                        };
                        ParseRejectFriendRequest(objectId, null, ownerId, successFunction);
                    });
                }
            };
            CacheCheckFriend(ownerId, friendId, displayFunction1);
            
        } else {
            var valid = object.get("valid");
            if (valid) {
                var startChatButton = "<div class='send-friend-request chat-friend' onclick=\"startPrivateChat('"+friendId+"');\">Start Chat</div>";
                $("#"+prefixForGetFriendOptionsButton+friendId+" > .custom-corners-people-near-by > .ui-bar").append(startChatButton);
            } else {
                var sendFriendRequestButton = "<div class='send-friend-request'>Request Sent</div>";
                $("#"+prefixForGetFriendOptionsButton+friendId+" > .custom-corners-people-near-by > .ui-bar").append(sendFriendRequestButton);
            }
        }
    };
    CacheCheckFriend(userId, Parse.User.current().id, displayFunction);
}

/* This function is designed to send friend request.
 */
function sendFriendRequest(friendId) {
    var currentUser = Parse.User.current();
    $("#"+prefixForGetFriendOptionsButton+friendId+" > .custom-corners-people-near-by > .ui-bar > .send-friend-request").unbind("click");
    $("#body-bottom-button-send-request").unbind("click");

    var successFunction = function(object){  // object: single Friend object
        var friendId = object.get("friend");
        $("#"+prefixForGetFriendOptionsButton+friendId+" > .custom-corners-people-near-by > .ui-bar > .send-friend-request").html("Request Sent");
        $("#body-bottom-button-send-request").html("Friend Request Sent");

        // push notification to friend
        pushNotificationToDeviceByUserId(object.get('friend'), Parse.User.current().get("name")+" wanna be your friend!");
    };
    ParseSendFriendRequest(currentUser.id, friendId, successFunction);
}

/* This function is designed to accept friend request.
 */
function acceptFriendRequest(requestObjectId) {
    // when accepting friend request
    // unbind the click event
    $("#body-bottom-button-response-request-accept").unbind("click");
    $("#body-bottom-button-response-request-reject").unbind("click");

    var successFunction = function(object){
        // get the current user's "friend" data
        var objectId = object.id;
        var friendId = object.get("friend");
        $("#body-bottom-button-response-request-accept").before("<div class='ui-btn' id='body-bottom-button-send-request' style='clear: both'></div>").remove();
        $("#body-bottom-button-response-request-reject").remove();
        $("#body-bottom-button-send-request").html("Start Chat").unbind("click").on("click",function(){
            startPrivateChat(friendId);
        });

        // push notification to friend
        pushNotificationToDeviceByUserId(object.get('friend'), Parse.User.current().get("name")+" accepted your friend request!");
    };
    ParseAcceptFriendRequest(requestObjectId, null, null, successFunction);
}

/* This function is designed to reject friend request.
 */
function rejectFriendRequest(cachedFriendObjectId, friendId) {
    // when rejecting friend request
    var successFunction = function(friendId){
        $("#body-bottom-button-response-request-accept").before("<div class='ui-btn' id='body-bottom-button-send-request' style='clear: both'></div>").remove();
        $("#body-bottom-button-response-request-reject").remove();

        $("#body-bottom-button-send-request").html("Send Friend Request").unbind("click").on("click",function(){
            sendFriendRequest(friendId);
        });
    };
    ParseRejectFriendRequest(cachedFriendObjectId, null, friendId, successFunction);
}

/* This function is designed to build up elements for the list displaying users, such as after a near-by user search.
 */
function buildUserListElement(object, liIdPrefix, lat, lng, type) {
    var name = object.get("name");
    var gender = object.get("gender");
    var latitude = object.get("latitude");
    var longitude = object.get("longitude");
    var userId = object.id;
    var updatedAt = object.updatedAt;
    var newElement = "";
    if (liIdPrefix != null) {
        newElement += "<li id='"+liIdPrefix+userId+"'";
        if (type.localeCompare("add-participant-list") == 0) {
            newElement += " class='ui-add-participant-unchecked'";
        } else {
            newElement += " class='ui-friend-list-line' onclick=\"$.mobile.changePage('#page-display-user-profile'); displayUserProfile('"+userId+"');\"";
        }
        newElement += ">";
    }

    newElement += "<div class='custom-people-in-friend-list custom-corners'>";
    newElement += "<div class='ui-bar ui-bar-a'>";
    newElement += "<div><strong>"+name+"</strong></div>";
    newElement += "<div class='ui-icon-custom-gender' style='";

    if (gender != "undefined") {
        if (gender) {
            newElement += "background-image:url(" + "./content/customicondesign-line-user-black/png/male-white-20.png" + ");";
            newElement += "background-color:" + "#8970f1" + ";";
        } else {
            newElement += "background-image:url(" + "./content/customicondesign-line-user-black/png/female1-white-20.png" + ");";
            newElement += "background-color:" + "#f46f75" + ";";
        }
    }

    newElement += "'></div>";

    if ((lat != null) && (lng != null)) {
        newElement += "<div class='people-near-by-list-distance'>" + getDistance(latitude, longitude, lat, lng) + "km | "+convertTime(updatedAt)+"</div>";
    }

    newElement += "</div>";
    newElement += "</div>";

    if (liIdPrefix != null) {
        newElement += "</li>";
    }

    return newElement;
}

/* This variable represents the current position of a user
 * and continues to get updated as the user moves (like the GPS in a car)
 */
var geoWatchId;

/* This function is designed to list near-by users.
 */
function listPeopleNearBy(){
    if (navigator.geolocation){
        geoWatchId = navigator.geolocation.watchPosition(showPeopleNearByList,showPeopleNearByListError);
    } else {
        $("#page-people-near-by > .ui-content").html("<p style='padding: 1em'>Geolocation is not supported by this browser.</p>");
    }
}

/* This function is designed to stop following user's locations.
 */
function stopGeoWatch(){
    navigator.geolocation.clearWatch(geoWatchId);
    $("#page-people-near-by > .ui-content").html("");
}

/* This function is designed to calculate the distance between two users.
 */
function getDistance(lat1, lng1, lat2, lng2){
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var radLng1 = lng1 * Math.PI / 180.0;
    var radLng2 = lng2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = radLng1 - radLng2;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s * 6378.137;
    s = Math.round(s * 100) / 100;
    return s.toString();
}

/* This function is designed to display the list of near-by users.
 */
function showPeopleNearByList(position){
    var latitudeLimit = 1;
    var longitudeLimit = 1;
    var descendingOrderKey = "updatedAt";
    if ($("#body-people-near-by-list").length == 0) {
        $("#page-people-near-by > .ui-content").html("<ul id='body-people-near-by-list' data-role='listview' data-inset='true' class='ui-listview ui-listview-inset ui-corner-all ui-shadow'></ul>");
    }

    var displayFunction = function(lat, lng, objects){ // objects: an array of User objects
        for (var i = objects.length-1; i >= 0; i--) {
            if ($("#body-people-near-by-list > #body-near-by-"+objects[i].id).length == 0) {
                var newElement = buildUserListElement(objects[i], "body-near-by-", lat, lng, "body-people-near-by-list");
                var userId = objects[i].id;
                $("#body-people-near-by-list").prepend(newElement);
                var displayFunction = function(object){
                    var photo120 = object.get("profilePhoto120");
                    if (typeof(photo120) == "undefined") {
                        photo120 = "./content/png/Taylor-Swift.png";
                    }
                    $("#body-near-by-"+object.get("userId")+" > .custom-people-in-friend-list").css("backgroundImage","url('"+photo120+"')");
                };
                CacheGetProfilePhotoByUserId(userId, displayFunction);
                prefixForGetFriendOptionsButton="body-near-by-";
                getFriendOptionsButton(userId);
            } else {
                var latitude = objects[i].get("latitude");
                var longitude = objects[i].get("longitude");
                $("#body-near-by-"+objects[i].id+" > .custom-people-in-friend-list > .ui-bar-a > .people-near-by-list-distance").html(getDistance(latitude, longitude, lat, lng) + "km | "+convertTime(objects[i].updatedAt));
            }
        }
    };
    ParsePullUserByGeolocation(position.coords.latitude,position.coords.longitude,latitudeLimit,longitudeLimit,descendingOrderKey,displayFunction);
}

/* This function is designed to handle possible errors when displaying the list of near-by users.
 */
function showPeopleNearByListError(error){
    var $pagePeopleNearBy = $("#page-people-near-by > .ui-content");

    switch(error.code) {
        case error.PERMISSION_DENIED:
            $pagePeopleNearBy.html("<p style='padding: 1em'>Location request has been denied. Please turn on your location service and try again.</p>");
        break;
        case error.POSITION_UNAVAILABLE:
            $pagePeopleNearBy.html("<p style='padding: 1em'>Location information is currently unavailable. Please try again later.</p>");
        break;
        case error.TIMEOUT:
            $pagePeopleNearBy.html("<p style='padding: 1em'>Location request has timed out. Please check your network connection and try again.</p>");
        break;
        case error.UNKNOWN_ERROR:
            $pagePeopleNearBy.html("<p style='padding: 1em'>Location information is currently unavailable due to an unknown error. Please try again later.</p>");
        break;
    }
}

/* This function is designed to auto-show the search results when searching for
 * users with name/email keywords.
 */
function bindSearchAutocomplete(){
    $("#body-list-search-user").on("filterablebeforefilter", function(e, data) {
        var $ul = $(this);
        var $input = $(data.input);
        var value = $input.val();
        $ul.html("");
        if (value && value.length > 0) {
            var limitNumber = 30;
            var displayFunction = function(objects){  // objects: an array of User objects
                var html = "";
                for (var i=0; i<objects.length; i++) {
                    var newElement = buildUserListElement(objects[i], "body-people-search-", null, null, "body-people-near-by-list");
                    var userId = objects[i].id;
                    $( "#body-list-search-user" ).append(newElement);
                    var displayFunction1 = function(object){  // object: single cachePhoto[i] object
                        var photo120 = object.get("profilePhoto120");
                        if (typeof(photo120) == "undefined") {
                            photo120 = "./content/png/Taylor-Swift.png";
                        }
                        $("#body-people-search-"+object.get("userId")+" > .custom-people-in-friend-list").css("backgroundImage","url('"+photo120+"')");
                    };
                    CacheGetProfilePhotoByUserId(userId, displayFunction1);
                    prefixForGetFriendOptionsButton="body-people-search-";
                }
            };
            ParseSearchUserByEmailAndName(value, limitNumber, "updatedAt", displayFunction);
        }
    });
}

/* This function is designed to cancel the auto-showing of user search results.
 */
function unbindSearchAutocomplete(){
    $( "#body-list-search-user" ).unbind("filterablebeforefilter").html("");
    $( "#body-input-user-autocomplete").val("");
}

/* This function is designed to pull up my friend requests.
 */
function pullMyFriendRequests() {
    $("#page-my-friend-requests > .ui-content").html("<ul id='body-friend-requests-list' class='ui-listview ui-listview-inset ui-corner-all ui-shadow'></ul>");
    var descendingOrderKey = "createdAt";

    var displayFunction = function(objects){  // objects: an array of Friend objects
        if (objects.length == 0) {
            $("#page-my-friend-requests > .ui-content").addClass("ui-hidden-accessible");
            $("#body-new-friend-requests-btn").addClass("ui-hidden-accessible");
        } else {
            $("#page-my-friend-requests > .ui-content").removeClass("ui-hidden-accessible");
            $("#body-new-friend-requests-btn").removeClass("ui-hidden-accessible");
        }
        for (var i=0; i<objects.length; i++) {
            var friendId = objects[i].get("owner");
            var objectId = objects[i].id;
            var displayFunction1 = function(userObject, data) {  // userObject: single cacheUser[i] object
                var newElement = buildUserListElement(userObject, "body-new-friend-request-", null, null, "body-people-near-by-list");
                var objectId = data.friendObject.id;
                var friendId = data.friendObject.get("owner");
                $( "#body-friend-requests-list" ).append(newElement);
                var displayFunction2 = function(object, data){  // object: single cachePhoto[i] object
                    var photo120 = object.get("profilePhoto120");
                    if (typeof(photo120) == "undefined") {
                        photo120 = "./content/png/Taylor-Swift.png";
                    }
                    $("#body-new-friend-request-"+data.friendId+" > .custom-people-in-friend-list").css("backgroundImage","url('"+photo120+"')");
                };
                CacheGetProfilePhotoByUserId(friendId, displayFunction2, {friendId: friendId});
                prefixForGetFriendOptionsButton="body-new-friend-request-";
            };
            CacheGetProfileByUserId(friendId, displayFunction1, {friendObject:objects[i]});
            ParseSetRequestRead(objectId);
        }
    };
    CachePullNewFriendRequest(Parse.User.current().id, descendingOrderKey, displayFunction);
}

/* This function is designed to pull up my friend list.
 */
function pullMyFriendList() {
    $( "#body-friend-list" ).html("");
    // check if there is new friend requests. If none, hide the button to transfer request list page
    var displayFunction = function(objects){  // objects: an array of Friend objects
        if (objects.length == 0) {
            $("#page-my-friend-requests > .ui-content").addClass("ui-hidden-accessible");
            $("#body-new-friend-requests-btn").addClass("ui-hidden-accessible");
        } else {
            $("#page-my-friend-requests > .ui-content").removeClass("ui-hidden-accessible");
            $("#body-new-friend-requests-btn").removeClass("ui-hidden-accessible");
        }
    };

    CachePullNewFriendRequest(Parse.User.current().id, "updatedAt", displayFunction);

    var descendingOrderKey = "createdAt";
    displayFunction = function(objects){  // objects: an array of Friend objects
        // sort user list
        objects.sort(function(a, b){return a.get("name") - b.get("name")});

        // display users
        for (var i=0; i<objects.length; i++) {
            var friendId = objects[i].get("friend");
            var objectId = objects[i].id;
            $("#body-friend-list").append("<li id='body-friend-list-"+friendId+"' class='ui-friend-list-line' onclick=\"setCurrLocationHash('#page-friend'); $.mobile.changePage('#page-display-user-profile'); displayUserProfile('"+friendId+"');\"></li>");
            var displayFunction1 = function(userObject, data) {  // userObject: single cacheUser[i] object
                var newElement = buildUserListElement(userObject, null, null, null, "friend-list");
                var objectId = data.friendObject.id;
                var friendId = data.friendObject.get("friend");
                $( "#body-friend-list-"+userObject.id ).append(newElement);
                var displayFunction2 = function(object, data){  // object: single cachePhoto[i] object
                    var photo120 = object.get("profilePhoto120");
                    if (typeof(photo120) == "undefined") {
                        photo120 = "./content/png/Taylor-Swift.png";
                    }
                    $("#body-friend-list-"+data.friendId+">.custom-people-in-friend-list").css("backgroundImage","url('"+photo120+"')");
                };
                CacheGetProfilePhotoByUserId(friendId, displayFunction2, {friendId : friendId});
                prefixForGetFriendOptionsButton="body-friend-list-";
            };
            CacheGetProfileByUserId(friendId, displayFunction1, {friendObject:objects[i]});
        }
    };

    CachePullMyFriend(Parse.User.current().id, descendingOrderKey, displayFunction);
}

/* This variable holds an array of temporary users for creating or adding users to a group chat.
 */
var newGroupChatMemberArray = {groupId:null, memberId:[], prevNum:0, newNum:0, newMemberList:[]};

/* This function is designed to pull up my friend list for adding them in a group chat.
 * Modified by Renpeng @ 19:30 4/18/2015
 * Modified by Yaliang @ 11:37 4/18/2015
 * ! important note: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * only design for adding participant to existing group. It use $("#footer-bar-group-id-label") to get the group Id.
 * That html content will not be removed when leaving page-chat-message
 */
function pullFriendListForAddingParticipants(){
    $("#body-add-participants-list").html("");
    $("#header-add-participant-for-group-chat").html("OK").unbind("click");
    var groupId = $("#footer-bar-group-id-label").html();

    // pull the friend list
    var descendingOrderKey = "createdAt";
    var displayFunction = function(objects){  // objects: an array of Friend objects
        objects.sort(function(a, b){return a.get("name") - b.get("name")});  // sort user list

        // display them
        for (var i=0; i<objects.length; i++) {
            var friendId = objects[i].get("friend");
            var objectId = objects[i].id;
            $("#body-add-participants-list").append("<li id='body-add-participants-list-"+friendId+"' class='ui-friend-list-line'></li>");
            $("#body-add-participants-list-"+friendId).click({id: friendId},selectANewParticipant);
            var displayFunction1 = function(userObject, data) { // userObject: single cacheUser[i] object
                var newElement = buildUserListElement(userObject, "body-add-participants-people-", null, null, "add-participant-list");
                var objectId = data.friendObject.id;
                var friendId = data.friendObject.get("friend");
                $( "#body-add-participants-list-"+userObject.id ).append(newElement);
                var displayFunction2 = function(object, data){  // object: single cachePhoto[i] object
                    var photo120 = object.get("profilePhoto120");
                    if (typeof(photo120) == "undefined") {
                        photo120 = "./content/png/Taylor-Swift.png";
                    }
                    $("#body-add-participants-people-"+data.friendId+">.custom-people-in-friend-list").css("backgroundImage","url('"+photo120+"')");
                };
                CacheGetProfilePhotoByUserId(friendId, displayFunction2, {friendId : friendId});
                prefixForGetFriendOptionsButton="body-add-participants-list-";
                //getFriendOptionsButton(friendId, 3);
            };
            CacheGetProfileByUserId(friendId, displayFunction1, {friendObject:objects[i]});
        }

        // check if they have been in the group
        // get the current users in chat
        var groupId = $("#footer-bar-group-id-label").html();
        var successFunction = function(object, data){  // object: single cacheGroup[i] object
            var memberId = object.get("memberId");
            //console.log(memberId);
            newGroupChatMemberArray.groupId = object.id;
            newGroupChatMemberArray.isGroupChat = object.get("isGroupChat");
            newGroupChatMemberArray.memberId = $.merge([], memberId);
            newGroupChatMemberArray.prevNum = memberId.length;
            newGroupChatMemberArray.newNum = 0;
            newGroupChatMemberArray.newMemberList = [];
            for (var i=0; i<memberId.length; i++) {
                $("#body-add-participants-list-"+memberId[i]).unbind("click");
                $("#body-add-participants-people-"+memberId[i]).removeClass("ui-add-participant-unchecked").addClass("ui-add-participant-checked");
            }
        };
        CacheGetGroupMember(groupId, successFunction, {});
    };

    CachePullMyFriend(Parse.User.current().id, descendingOrderKey, displayFunction);
}

function pullFriendListForSelectingParticipantsInNewGroup(){
    $("#body-add-participants-list").html("");
    $("#header-add-participant-for-group-chat").html("OK").unbind("click");
    newGroupChatMemberArray.prevNum = 0;
    newGroupChatMemberArray.newNum = 0;
    newGroupChatMemberArray.newMemberList = [];

    // pull the friend list
    var descendingOrderKey = "createdAt";
    var displayFunction = function(objects){  // objects: an array of Friend objects
        objects.sort(function(a, b){return a.get("name") - b.get("name")});  // sort user list

        // display them
        for (var i=0; i<objects.length; i++) {
            var friendId = objects[i].get("friend");
            var objectId = objects[i].id;
            $("#body-add-participants-list").append("<li id='body-add-participants-list-"+friendId+"' class='ui-friend-list-line'></li>");
            $("#body-add-participants-list-"+friendId).click({id: friendId},selectANewParticipant);
            var displayFunction1 = function(userObject, data) { // userObject: single cacheUser[i] object
                var newElement = buildUserListElement(userObject, "body-add-participants-people-", null, null, "add-participant-list");
                var objectId = data.friendObject.id;
                var friendId = data.friendObject.get("friend");
                $( "#body-add-participants-list-"+userObject.id ).append(newElement);
                var displayFunction2 = function(object, data){  // object: single cachePhoto[i] object
                    var photo120 = object.get("profilePhoto120");
                    if (typeof(photo120) == "undefined") {
                        photo120 = "./content/png/Taylor-Swift.png";
                    }
                    $("#body-add-participants-people-"+data.friendId+">.custom-people-in-friend-list").css("backgroundImage","url('"+photo120+"')");
                };
                CacheGetProfilePhotoByUserId(friendId, displayFunction2, {friendId : friendId});
                prefixForGetFriendOptionsButton="body-add-participants-list-";
                //getFriendOptionsButton(friendId, 3);
            };
            CacheGetProfileByUserId(friendId, displayFunction1, {friendObject:objects[i]});
        }
    };

    CachePullMyFriend(Parse.User.current().id, descendingOrderKey, displayFunction);
}

/* This function is designed to pull up paricipants list in a group chat.
 */
function pullParticipantsListInGroup(){
    $("#body-group-participants-list").html("");
    // get the current users in chat
    var groupId = $("#footer-bar-group-id-label").html();
    var successFunction = function(object, data){
        var memberId = object.get("memberId");
        for (var i=0; i<memberId.length; i++) {
            $("#body-group-participants-list").append("<li id='body-group-participants-list-"+memberId[i]+"'></li>");
            $("#body-group-participants-list-"+memberId[i]).click({id: memberId[i]},function(e){
                displayUserProfile(e.data.id);
            });
            var displayFunction = function(userObject) {
                var newElement = buildUserListElement(userObject, "body-group-participants-people-", null, null, "group-participant-list");
                $("#body-group-participants-list-"+userObject.id).append(newElement);
                var displayFunction = function(object, data){
                    var photo120 = object.get("profilePhoto120");
                    if (typeof(photo120) == "undefined") {
                        photo120 = "./content/png/Taylor-Swift.png";
                    }
                    $("#body-group-participants-people-"+data.userId+">.custom-people-in-friend-list").css("backgroundImage","url('"+photo120+"')");
                };
                CacheGetProfilePhotoByUserId(userObject.id, displayFunction, {userId : userObject.id});
            };
            CacheGetProfileByUserId(memberId[i],displayFunction);
        }
    };
    CacheGetGroupMember(groupId, successFunction, {});
}