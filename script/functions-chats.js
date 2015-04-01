/* This function is designed to start a private chat with a friend with id = friendId.
 */
function startPrivateChat(friendId){
    $("#page-chat-messages > .ui-content").html("");
    $("#header-chat-message-title").html("");
    $("#footer-bar-input-message-content").val("");    
    
    var memberId = [];
    memberId.push(friendId);
    memberId.push(Parse.User.current().id);
    var successFunction = function(object){ // object: single cacheGroup[i] object
        var groupId = object.id;
        var currentId = Parse.User.current().id;
        $("#footer-bar-group-id-label").html(groupId);
        var successFunction1 = function(object){ // object: single Chat object
            var groupId = object.get("groupId");
            var limitNum = 15;
            var descendingOrderKey = "createdAt";
            var displayFunction = function(objects, data){ // objects: an array of Message objects
                for (var i=objects.length-1; i>=0; i--) {
                    var newElement = buildElementInChatMessagesPage(objects[i]);
                    $("#page-chat-messages > .ui-content").append(newElement);
                    var displayFunction1 = function(object, data) { // object: single cachePhoto[i] object
                        var photo120 = object.get("profilePhoto120");
                        if (typeof(photo120) == "undefined") {
                            photo120 = "./content/png/Taylor-Swift.png";
                        }
                        $("#body-message-"+data.messageId).css("backgroundImage", "url("+photo120+")")
                    };
                    CacheGetProfilePhotoByUserId(objects[i].get("senderId"), displayFunction1, {messageId: objects[i].id});
                }
                $.mobile.changePage( "#page-chat-messages");
            };
            ParsePullChatMessage(groupId, limitNum, descendingOrderKey, null, displayFunction, null)
        };
        ParseSetChatObjectAsRead(currentId, groupId, null, successFunction1);
    };
    CacheGetGroupId(memberId,successFunction);
    updateChatTitle(friendId, "header-chat-message-title");
}

/* This function is designed to start a group chat with id = groupId.
 */
function startGroupChat(groupId){
    // clear the current chat 
    $("#page-chat-messages > .ui-content").html("");
    $("#header-chat-message-title").html("");
    $("#footer-bar-input-message-content").val("");

    // build new chat
    var successFunction = function(object){  // object: single cacheGroup[i] object
        var memberId = object.get("memberId");
        var groupName = object.get("groupName");
        if (typeof(groupName) == "undefined") {
            for (var i=0; i<memberId.length; i++) {
                updateChatTitle(memberId[i], "header-chat-message-title");
            }
        } else {
            $("#header-chat-message-title").html(groupName);
        }
        var groupId = object.id;
        var currentId = Parse.User.current().id;
        $("#footer-bar-group-id-label").html(groupId);

        var successFunction1 = function(object){  // object: single Chat object
            var groupId = object.get("groupId");
            var limitNum = 15;
            var descendingOrderKey = "createdAt";
            var displayFunction = function(objects, data){  // objects: an array of Message objects
                for (var i=objects.length-1; i>=0; i--) {
                    var newElement = buildElementInChatMessagesPage(objects[i]);
                    $("#page-chat-messages > .ui-content").append(newElement);

                    var displayFunction1 = function(object, data) {  // object: single cachePhoto[i] object
                        var photo120 = object.get("profilePhoto120");
                        if (typeof(photo120) == "undefined") {
                            photo120 = "./content/png/Taylor-Swift.png";
                        }
                        $("#body-message-"+data.messageId).css("backgroundImage", "url("+photo120+")")
                    };
                    CacheGetProfilePhotoByUserId(objects[i].get("senderId"), displayFunction1, {messageId: objects[i].id});
                }
                $.mobile.changePage( "#page-chat-messages");
            };
            //CachePullChatMessage(groupId, limitNum, null, displayFunction);
            ParsePullChatMessage(groupId, limitNum, descendingOrderKey, null, displayFunction, null)
        };
        ParseSetChatObjectAsRead(currentId, groupId, null, successFunction1);
    };
    CacheGetGroupMember(groupId,successFunction);
    // CacheGetGroupId(newGroupChatMemberArray.memberId,successFunction);
}

/* This variable will be initialized with the total number of users in a group chat
 * and decrement as the chat object for each user is built. When its value reaches 0,
 * the group chat will be started.
 */
var chatsInitializationNumber = 0;

/* This function is designed to create a group chat.
 */
function createGroupChat() {
    var successFunction = function(object){  // object: single cacheGroup[i] object
        var groupId = object.id;
        var memberId = object.get("memberId");
        chatsInitializationNumber = memberId.length;

        var successFunction1 = function(object) {  // object: single Chat object
            var groupId = object.get("groupId");
            chatsInitializationNumber--;
            if (chatsInitializationNumber == 0) {
                startGroupChat(groupId);
            }
        };

        for (var i=0; i<memberId.length; i++) {
            ParseInitializeChatObjectInGroup({
                groupId:groupId, 
                ownerId:memberId[i],
                successFunction:successFunction1
            });
        }
    };
    CacheGetGroupId(newGroupChatMemberArray.memberId,successFunction);
}

/* This function is designed to build up elements for the list of chats so they can be displayed on the Chats page.
 */
function buildElementInChatListPage(object){
    var chatId = object.id;
    var groupId = object.get("groupId");
    var unreadNum = object.get("unreadNum");
    var newElement = "";
    newElement += "<div id='body-chat-"+chatId+"' class='chat-list'>";
    newElement += "<div class='chat-list-title'></div>";
    newElement += "<div class='chat-last-time'></div>";
    newElement += "<div class='chat-last-message'></div>";
    if (unreadNum > 0) {
        newElement += "<span class='ui-li-count'>"+unreadNum+"</span>";
    }
    newElement += "</div>";

    return newElement;
}

/* This function is designed to pull up my chats.
 */
function pullMyChat(){
    if (!pullNotificationRunning) {
        pullNotification();
    }
    var ownerId = Parse.User.current().id;
    var displayFunction = function(objects){ // objects: an array of Chat objects
        for (var i=objects.length-1; i>=0; i--) {
            if ($("#body-chat-"+objects[i].id).length == 0) {
                var newElement = buildElementInChatListPage(objects[i]);
                $("#page-chat > .ui-content").prepend(newElement);
                var chatId = objects[i].id;
                var data = {chatId: chatId};
                var groupId = objects[i].get("groupId");
                var successFunction = function(object, data){ // object: single cacheGroup[i] object
                    var memberId = object.get("memberId");
                    var groupId = object.id;
                    var groupName = object.get("groupName");
                    if (memberId.length == 2) {
                        // this is a private chat
                        for (var j=0; j<memberId.length; j++) {
                            if (memberId[j] != Parse.User.current().id) {
                                updateChatTitle(memberId[j], "body-chat-"+data.chatId+"> .chat-list-title", 2);
                                data["friendId"] = memberId[j];
                                var displayFunction = function(object, data) {
                                    var photo120 = object.get("profilePhoto120");
                                    if (typeof(photo120) == "undefined") {
                                        photo120 = "./content/png/Taylor-Swift.png";
                                    }
                                    $("#body-chat-"+data.chatId).css("backgroundImage", "url("+photo120+")")
                                };
                                CacheGetProfilePhotoByUserId(data.friendId, displayFunction, data);
                                $("#body-chat-"+data.chatId).unbind("click").on("click",function(){
                                    startPrivateChat(data.friendId);
                                });
                            }
                        }
                    } else {
                        // this is a group chat
                        if (typeof(groupName) == "undefined") {
                            for (j=0; j<memberId.length; j++) {
                                updateChatTitle(memberId[j], "body-chat-"+data.chatId+"> .chat-list-title");
                            }
                        } else {
                            $("#body-chat-"+data.chatId+"> .chat-list-title").html(groupName);
                        }
                        $("#body-chat-"+data.chatId).css("backgroundImage", "url(./content/png/groupchat.png)").unbind("click").on("click",function(){
                            startGroupChat(groupId);
                        });
                    }
                };
                CacheGetGroupMember(groupId, successFunction, data);
                updateLastMessage(groupId, data);

            } else {
                chatId = objects[i].id;
                groupId = objects[i].get("groupId");
                data = {chatId: chatId};

                // move the element to top of the list
                var element = $("#body-chat-"+data.chatId);
                $("#page-chat > .ui-content").prepend(element);

                // update unread number label
                var unreadNum = objects[i].get("unreadNum");
                var $bodyChat = $("#body-chat-"+data.chatId+"> .ui-li-count");
                if (unreadNum > 0) {
                    if ($bodyChat.length > 0) {
                        $bodyChat.html(unreadNum.toString());
                    } else {
                        element.append("<span class='ui-li-count'>"+unreadNum.toString()+"</span>");
                    }
                } else {
                    if ($bodyChat.length > 0) {
                        $("#body-chat-"+data.chatId+"> .ui-li-count").remove();                        
                        $("#body-chat-"+data.chatId+"> .chat-last-time").removeClass("chat-last-time-right-blank");
                    }
                }
                updateLastMessage(groupId, data);
                // update photo and title 
                /*var groupId = objects[i].get('groupId');
                var successFunction = function(object, data){
                    var memberId = object.get("memberId");
                    for (var i=0; i<memberId.length; i++) {
                        if (memberId[i] != Parse.User.current().id) {
                            updateChatTitle(memberId[i], "chat-"+data.chatId+"> .chat-list-title", 2);
                            data['friendId'] = memberId[i];
                            getCashedPhoto120(data.friendId,"#chat-"+data.chatId);
                            $("#chat-"+data.chatId).unbind("click");
                            $("#chat-"+data.chatId).on("click",function(){
                                startPrivateChat(data.friendId);
                            });
                        }
                    }
                }
                CacheGetGroupMember(groupId, successFunction, data);*/
            }
        }
    };
    CachePullMyChat(ownerId,displayFunction);
}

/* This function is designed to update the last chatting message for each chat.
 */
function updateLastMessage(groupId, data){
    if (($("#body-chat-"+data.chatId+"> .ui-li-count").length == 0) && (typeof(data.parse) == "undefined")) {
        var displayFunction = function(object, data){  // object: single cacheMessage[i] object
            if (object != null) {
                var text = object.get("text");
                var time = object.get("createdAt");
                $("#body-chat-"+data.chatId+"> .chat-last-message").html(text);
                $("#body-chat-"+data.chatId+"> .chat-last-time").html(convertTime(time));    
                if ($("#body-chat-"+data.chatId+"> .ui-li-count").length > 0) {                    
                    $("#body-chat-"+data.chatId+"> .chat-last-time").addClass("chat-last-time-right-blank");
                }
            } else {
                data.parse = true;
                updateLastMessage(groupId, data);
            }
        };
        CacheGetLastestMessage(groupId, displayFunction, data);

    } else {
        var limitNum = 1;
        var descendingOrderKey = "createdAt";
        displayFunction = function(objects, data){  // objects: an array of Message objects
            if (objects.length > 0) {
                var text = objects[0].get("text");
                var time = objects[0].createdAt;
                $("#body-chat-"+data.chatId+"> .chat-last-message").html(text);                            
                $("#body-chat-"+data.chatId+"> .chat-last-time").html(convertTime(time));
                if ($("#body-chat-"+data.chatId+"> .ui-li-count").length > 0) {
                    $("#body-chat-"+data.chatId+"> .chat-last-time").addClass("chat-last-time-right-blank");
                }
            }
        };
        ParsePullChatMessage(groupId, limitNum, descendingOrderKey, null, displayFunction, data);
    }
}

/* This function is designed to build elements for chatting messages
 */
function buildElementInChatMessagesPage(object){
    var messageId = object.id;
    var senderId = object.get("senderId");
    var currentId = Parse.User.current().id;
    var text = object.get("text");
    var elementClass;

    var newElement = "";
    if (currentId == senderId) {
        elementClass = "ui-custom-message-right";
    } else {
        elementClass = "ui-custom-message-left";
    }
    newElement += "<div id='body-message-"+messageId+"' class='"+elementClass+"'>";
    newElement += "<p>"+text+"</p>";
    newElement += "</div>";

    return newElement;
}

/* This function is designed to send message to other users.
 */
function sendMessage(){
    var groupId = $("#footer-bar-group-id-label").html();
    var senderId = Parse.User.current().id;

    var $footerBarInputMessageContent = $("#footer-bar-input-message-content");

    var text = $footerBarInputMessageContent.val();
    if (text == "") {
        return;
    }

    $footerBarInputMessageContent.val("");

    var displayFunction = function(object){  // object: single Message object
        var messageId = object.id;
        var senderId = object.get("senderId");
        var groupId = object.get("groupId");
        var text = object.get("text");
        var notificationFunction = function(senderId,text,receiverId){
            var displayFunction1 = function(object,data){
                if (typeof(object.get("GCMId")) != "undefined") {
                    data.GCMId = object.get("GCMId");
                }
                if (typeof(object.get("APNId")) != "undefined") {
                    data.APNId = object.get("APNId");
                }
                var displayFunction2 = function(object,data){
                    var message = object.get("name")+": " + data.message;
                    if ("GCMId" in data)
                        pushNotificationToDevice("gcm",data.GCMId,message);
                    if ("APNId" in data)
                        pushNotificationToDevice("apn",data.APNId,message);
                };
                CacheGetProfileByUserId(data.senderId, displayFunction2, data);
            };
            var data = {senderId : senderId, message: text};
            CacheGetProfileByUserId(receiverId, displayFunction1, data);
        };
        CacheSetGroupMemberChatObjectReadFalse(senderId, groupId, text, notificationFunction);

        var newElement = buildElementInChatMessagesPage(object);
        $("#page-chat-messages > .ui-content").append(newElement);

        var displayFunction3 = function(object, data){
            var photo120 = object.get("profilePhoto120");
            if (typeof(photo120) == "undefined") {
                photo120 = "./content/png/Taylor-Swift.png";
            }
            $("#body-message-"+data.messageId).css("backgroundImage","url('"+photo120+"')");
        };
        CacheGetProfilePhotoByUserId(senderId, displayFunction3, {messageId : messageId});
        //$('#footer-bar-send-message').css("bottom",($("body").height()-$("#page-chat-messages").height()-44).toString()+"px");
        
        $("html body").animate({ scrollTop: $(document).height().toString()+"px" }, {
            duration: 750,
            complete : function(){
            }
        });

        var $footerBarSendMessage = $("#footer-bar-send-message");
        if ($footerBarSendMessage.css("position") == "absolute") {
            $footerBarSendMessage.css("bottom", ($("body").height()-$("#page-chat-messages").height()-44).toString()+"px");
        }
    };

    ParseAddChatMessage(senderId, groupId, text, displayFunction);
}

/* This function is designed to update chatting message titles.
 */
function updateChatTitle(friendId, elementId, option){
    var displayFunction= function(ownerId, friendId, object) { // object: single cacheFriend[i] object
        if (typeof(object) != "undefined") {
            // user with friendId is a friend of current user
            var alias = object.get("alias");
            var $elementId = $("#"+elementId);

            if (typeof(alias) == "undefined") {
                var displayFunction1 = function(user){  // user: single cacheUser[i] object
                    if ((option)&&(option == 2)) {
                        $elementId.html(user.get("name"));
                    } else {
                        var titleString = $elementId.html();
                        if (titleString.length > 0) {
                            titleString += ", "+user.get("name");
                        } else {
                            titleString += user.get("name");
                        }
                        $elementId.html(titleString);
                    }
                };
                CacheGetProfileByUserId(friendId, displayFunction1)

            } else {
                if ((option)&&(option == 2)) {
                    $elementId.html(alias);
                } else {
                    var titleString = $elementId.html();
                    if (titleString.length > 0) {
                        titleString += ", "+alias;
                    } else {
                        titleString += alias;
                    }

                    if (titleString.length > 15) {
                        titleString = titleString.substring(0,15)+"...";
                    }
                    $elementId.html(titleString);
                }
            }
        }
    };
    // get the Friend object, in order to get alias of friend.
    CacheCheckFriend(friendId, Parse.User.current().id, displayFunction);
}

/* This function is designed to update chatting messages.
 */
function updateChatMessage(object){
    var groupId = object.get("groupId");
    var beforeAt = object.updatedAt;
    var limitNum = object.get("unreadNum");
    var descendingOrderKey = "createdAt";

    var displayFunction = function(objects, data) {  // objects: an array of Message objects
        var currentId = Parse.User.current().id;
        for (var i=objects.length-1; i>=0; i--) {
            if ($("#body-message-"+objects[i].id).length == 0) {
                var newElement = buildElementInChatMessagesPage(objects[i]);
                $("#page-chat-messages > .ui-content").append(newElement);
                var displayFunction1 = function(object, data) { // object: single cachePhoto[i] object
                    var photo120 = object.get("profilePhoto120");
                    if (typeof(photo120) == "undefined") {
                        photo120 = "./content/png/Taylor-Swift.png";
                    }
                    $("#body-message-"+data.messageId).css("backgroundImage", "url("+photo120+")")
                };
                CacheGetProfilePhotoByUserId(objects[i].get("senderId"), displayFunction1, {messageId: objects[i].id});
                var groupId = objects[i].get("groupId");
                ParseSetChatObjectAsRead(currentId, groupId, 1, function(){});
            }
        }
        $("html body").animate({ scrollTop: $(document).height().toString()+"px" }, {
            duration: 750,
            complete : function(){
            }
        });

        var $footerBarSendMessage = $("#footer-bar-send-message");
        if ($footerBarSendMessage.css("position") == "absolute") {
            $footerBarSendMessage.css("bottom", ($("body").height()-$("#page-chat-messages").height()-44).toString()+"px");
        }
    };
    ParsePullChatMessage(groupId, limitNum, descendingOrderKey, beforeAt, displayFunction, null);
}

/* This function is designed to show hidden options for chatting messages.
 */
function displayChatMessageMoreOption(){
    $("#header-chat-message-more-option").removeClass("ui-header-more-option").addClass("ui-header-more-option-active");
    var groupId = $("#footer-bar-group-id-label").html();

    var displayFunction = function(object, data) {  // object: single cacheGroup[i] object
        var memberId = object.get("memberId");
        var memberNum = memberId.length;
        if (memberNum == 2) {
            var $bodyBottomPrivateChatMessageMoreOption = $("#body-bottom-private-chat-message-more-option");
            $bodyBottomPrivateChatMessageMoreOption.css("position","fixed")
            .css("bottom",(-$bodyBottomPrivateChatMessageMoreOption.height()).toString()+"px").show().animate({
                bottom: "0px"
            },300);

        } else {
            var $bodyBottomGroupChatMessageMoreOption = $("#body-bottom-group-chat-message-more-option");
            $bodyBottomGroupChatMessageMoreOption.css("position","fixed")
            .css("bottom",(-$bodyBottomGroupChatMessageMoreOption.height()).toString()+"px").show().animate({
                bottom: "0px"
            },300);
        }
        $("body").append("<div class='ui-gray-cover' style='position:fixed; width:100%; height:100%; opacity:0; background-color:#000; z-index:1001' onclick='hideChatMessageMoreOption()'><div>")
        $(".ui-gray-cover").animate({
            opacity: 0.3
        },300);
    };
    CacheGetGroupMember(groupId, displayFunction, {});
}

/* This function is designed to hide unnecessary options for chatting messages.
 */
function hideChatMessageMoreOption(){
    $("#header-chat-message-more-option").addClass("ui-header-more-option").removeClass("ui-header-more-option-active");
    var groupId = $("#footer-bar-group-id-label").html();

    var displayFunction = function(object, data) {  // object: single cacheGroup[i] object
        var memberId = object.get("memberId");
        var memberNum = memberId.length;
        if (memberNum == 2) {
            var $bodyBottomPrivateChatMessageMoreOption = $("#body-bottom-private-chat-message-more-option");
            $bodyBottomPrivateChatMessageMoreOption.animate({
                bottom: (-$bodyBottomPrivateChatMessageMoreOption.height()).toString()+"px"
            },300,function(){
                $("#body-bottom-private-chat-message-more-option").hide();
            });
        } else {
            var $bodyBottomGroupChatMessageMoreOption = $("#body-bottom-group-chat-message-more-option");
            $bodyBottomGroupChatMessageMoreOption.animate({
                bottom: (-$bodyBottomGroupChatMessageMoreOption.height()).toString()+"px"
            },300,function(){
                $("#body-bottom-group-chat-message-more-option").hide();
            });
        }
        
        $(".ui-gray-cover").animate({
            opacity: 0
        },300, function(){
            $(".ui-gray-cover").remove();
        });
    };
    
    CacheGetGroupMember(groupId, displayFunction, {});
}

/* This function is designed to add new users to a group chat.
 */
function selectANewParticipant(event) {
    var id = event.data.id;
    newGroupChatMemberArray.memberId.push(id);
    newGroupChatMemberArray.newNum++;
    $("#header-add-participant-for-group-chat").html("OK("+newGroupChatMemberArray.newNum+")").unbind("click").click(createGroupChat);
    $("#body-add-participants-list-"+id).children(".ui-add-participant-unchecked")
        .removeClass("ui-add-participant-unchecked").addClass("ui-add-participant-checked")
        .unbind("click").click({id: id},removeANewParticipant);
}

/* This function is designed to remove selected users from a group chat.
 */
function removeANewParticipant(event) {
    var id = event.data.id;
    newGroupChatMemberArray.memberId = jQuery.grep(newGroupChatMemberArray, function(value) {
      return value != id;
    });
    newGroupChatMemberArray.newNum--;
    if (newGroupChatMemberArray.newNum > 0) {
        $("#header-add-participant-for-group-chat").html("OK("+newGroupChatMemberArray.newNum+")").unbind("click").click(createGroupChat);
    } else {
        $("#header-add-participant-for-group-chat").html("OK").unbind("click");
    }
    $("#body-add-participants-list-"+id).children(".ui-add-participant-checked")
        .removeClass("ui-add-participant-checked").addClass("ui-add-participant-unchecked")
        .unbind("click").click({id: id},selectANewParticipant);
}

/* This function is designed to pull up the profile for a group.
 */
function pullGroupProfile(){
    var groupId = $("#footer-bar-group-id-label").html();
    $("#body-group-participants-list-toggle").html("Collapse List");
    $("#body-group-participants-list").show();
    pullParticipantsListInGroup();

    var displayFunction = function(object) {  // object: single cacheGroup[i] object
        var groupName = object.get("groupName");
        if (typeof(groupName) == "undefined") {
            groupName = "Not Set";
            $("#body-input-set-group-name").val("");
        } else {
            $("#body-input-set-group-name").val(groupName);
        }
        $("#body-group-name").html("<font style='padding-right:1em'>Group Name:</font><font style='color:#AAA'>"+groupName+"</font>");
    };
    CacheGetGroupMember(groupId,displayFunction);
}

/* This function is designed to toggle user list in a group chat.
 */
function groupParticipantsListToggle(){
    var $bodyGroupParticipantsListToggle = $("#body-group-participants-list-toggle");
    var htmlString = $bodyGroupParticipantsListToggle.html();
    if (htmlString.localeCompare("Collapse List") == 0) {
        $bodyGroupParticipantsListToggle.html("Expand List");
        $("#body-group-participants-list").slideUp();
    } else {
        $bodyGroupParticipantsListToggle.html("Collapse List");
        $("#body-group-participants-list").slideDown();
    }
}

/* This function is designed to save the name of a group chat.
 */
function saveGroupName(){
    var groupName = $("#body-input-set-group-name").val();
    if (groupName.length == 0) {
        $.mobile.back();
        return
    }
    var groupId = $("#footer-bar-group-id-label").html();

    var displayFunction = function(object) {  // object: single Group object
        var groupId = object.id;
        var groupName = object.get("groupName");
        $("#body-input-set-group-name").val(groupName);
        $("#body-group-name").html("<font style='padding-right:1em'>Group Name:</font><font style='color:#AAA'>"+groupName+"</font>");
        $("#header-chat-message-title").html(groupName);
        var displayFunction = function(object, data){
            $("#body-chat-"+object.id+" > .chat-list-title").html(data.groupName);
        };
        CacheGetChatByGroupId(Parse.User.current().id, groupId, displayFunction, {groupName: groupName})
    };
    ParseSetGroupName(groupId, groupName, displayFunction);

    $.mobile.back();
}