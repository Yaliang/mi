$(document).ready(function (){
	var currentUser = Parse.User.current();
	$('#comment-content').on("blur",function(){
		$('#comment-content').textinput('disable');
	});
	if (currentUser) {
		var successFunction = function() {
			window.location.hash = "page-event";
			pullUserEvent();
			pullNotification();
		};
		var errorFunction = function() {
			window.location.hash = "page-login";
		};
		ParseUpdateCurrentUser(successFunction, errorFunction);
	} else {
		window.location.hash = "page-login";
	}
});

function pullNotification(){
	var currentUser = Parse.User.current();
	// check new friend request
	var displayFunction = function(objects){
		if ((typeof(objects)!="undefined")&&(objects.length > 0)) {
			jQuery("[id=friend]") .each(function(){
				$(this).addClass("friend-notification-custom");
			})
			$('#new-friend-requests-number').html(objects.length.toString());
		} else {
			jQuery("[id=friend]") .each(function(){
				$(this).removeClass("friend-notification-custom");
			})
		}
	}
	ParsePullUnreadFriendRequest(currentUser.id, displayFunction);
	setTimeout(function(){
		pullNotification();
	}, 2000)
}

function signup(){
	var name = $("#signup-name").val();
	var email = $("#signup-email").val();
	var password = $("#signup-password").val();
	var errorObject = $("#signup-error");
	var destID = "page-event";
	var customFunction = function(object){
		pullUserEvent();
		pullNotification();
		ParseCreateProfilePhotoObject(object.id);
	};
	ParseSignup(email, password, email, name, errorObject, destID, customFunction);
	$("#signup-password").val("");
}

function login(){
	var email = $("#login-email").val();
	var password = $("#login-password").val();
	var errorObject = $("#login-error");
	var destID = "page-event";
	var customFunction = function(){
		pullUserEvent();
		pullNotification();
	};
	ParseLogin(email, password, errorObject, destID, customFunction);
	$("#login-password").val("");
}

function logout(){
	var currentUser = Parse.User.current();
	var email = currentUser.getUsername();
	$("#login-email").val(email);
	$("#login-error").html("");
	$("#signup-error").html("");
	var destID = "page-login";
	ParseLogout(destID);
}

function createUserEvent(){
	var currentUser = Parse.User.current();
	var owner = currentUser.getUsername();
	$('#event-create-button').unbind("click");
	var title = $("#event-create-title").val();
	var location = $("#event-create-location").val();
	var time = $("#event-create-start-time").val().replace('T',' ');
	if (($("#event-create-start-time").val().toString().length > 0) && ($("#event-create-end-time").val().toString().length > 0)) {
		time = time + ' -- ';
	}
	time = time + $("#event-create-end-time").val().replace('T', ' ');
	var visibility = $("#event-create-visibility").val()=="on" ? true : false ;
	var description = $("#event-create-description").val();
	var errorObject = $("#event-error");
	var destID = "page-event";
	var clearFunction = function(){
		$("#event-create-title").val("");
		$("#event-create-location").val("");
		$("#event-create-start-time").val("");
		$("#event-create-end-time").val("");
		$("#event-create-description").val("");
		$("#event-create-visibility").val("on").flipswitch('refresh');
		$("#event-create-error").html("");
		pullUserEvent();
	};
	ParseEventCreate(owner, title, location, time, visibility, description, errorObject, destID, clearFunction);
}

var pullLastItem=0;

function pullUserEventHolderInfo(holder, eventId){
	var displayFunction = function(eventId, object) {
		var name = object[0].get("name");
		var gender = object[0].get("gender");
		var userId = object[0].id;

		$("#"+eventId+"-owner-name").html(name);
		if (typeof(gender) == 'undefined') {
			//$("#"+eventId+"-owner-denger").html(gender.toString());
		} else if (gender) {
			$("#"+eventId+"-owner-denger").css("backgroundImage","url('./content/customicondesign-line-user-black/png/male-white-20.png')");
			$("#"+eventId+"-owner-denger").css("backgroundColor","#8970f1");
		} else {
			$("#"+eventId+"-owner-denger").css("backgroundImage","url('./content/customicondesign-line-user-black/png/female1-white-20.png')");
			$("#"+eventId+"-owner-denger").css("backgroundColor","#f46f75");
		};
		
		pullLastItem = pullLastItem - 1;
		if (pullLastItem == 0) {
			$("#event-content").removeClass("ui-hidden-accessible");
		}

		var displayFunction = function(eventId, object){
			var photo120 = object[0].get("profilePhoto120");
			if (typeof(photo120) == "undefined") {
				photo120 = "./content/png/Taylor-Swift.png";
			}
			$("#"+eventId+" > .custom-corners").css("backgroundImage","url('"+photo120+"')");
			pullLastItem = pullLastItem - 1;
			if (pullLastItem == 0) {
				$("#event-content").removeClass("ui-hidden-accessible");
			}
		}
		ParseGetProfilePhoto(eventId, userId, displayFunction);
	};
	ParseGetProfile(holder, displayFunction, eventId);
}

function pullUserEvent(){
	var limitNumber = 15;
	var descendingOrderKey = "createdAt";
	var ascendingOrderKey = "createdAt";
	$("#event-content").addClass("ui-hidden-accessible");
	pullLastItem=3*limitNumber;
	var displayFunction = function(objects){
		var currentUser = Parse.User.current();
		var owner = currentUser.getUsername();
		for (var i=objects.length-1; i >= 0; i--) {
			if ($("#"+objects[i].id).length == 0) {
				var title = objects[i].get("title");
				var location = objects[i].get("location");
				var time = objects[i].get("time");
				var visibility = objects[i].get("visibility");
				var description = objects[i].get("description");
				var interestNumber = objects[i].get("interestNumber");
				var commentNumber = objects[i].get("commentNumber");
				var holder = objects[i].get("owner");
				var id = objects[i].id;
				var newElement = "";
				newElement = newElement + "<div id='"+id+"'>";
				newElement = newElement + "<div class='custom-corners-public custom-corners'>";
				newElement = newElement + "<div class='ui-bar ui-bar-a'>";
				newElement = newElement + "<div><strong id='"+id+"-owner-name'></strong></div>";
				newElement = newElement + "<div id='"+id+"-owner-denger' class='ui-icon-custom-gender'></div>";
				newElement = newElement + "</div>";
				newElement = newElement + "<div class='ui-body ui-body-a'>";
				newElement = newElement + "<p class='ui-custom-event-title'>" + title + "</p>";
				if (location.length > 0) {
					newElement = newElement + "<p class='ui-custom-event-location'>" + location + "</p>";
				}
				if (time.length > 0) {
					newElement = newElement + "<p class='ui-custom-event-time'>" + time + "</p>";
				}
				if ((location.length == 0) && (time.length == 0)) {
					newElement = newElement + "<p class='ui-custom-event-description-less-margin'>" + description.replace("\n","</br>") + "</p>";
				} else {
					newElement = newElement + "<p class='ui-custom-event-description'>" + description.replace("\n","</br>") + "</p>";
				}
				newElement = newElement + "<div id='comment-statistics-"+id+"' class='event-statistics'>" + commentNumber + " Comments</div><div id='interest-statistics-"+id+"' class='event-statistics'>" + interestNumber + " Interests</div>";
				newElement = newElement + "</div>";
				newElement = newElement + "<div class='ui-footer ui-bar-custom'>";
				newElement = newElement + "<div class='ui-custom-float-left'><a href='#page-event-detail' data-transition='slide' class='ui-btn ui-bar-btn-custom ui-mini ui-icon-custom-comment' id='comment-button-"+id+"' onclick=\"updateEventDetail('"+id+"')\">"+"Detail"+"</a></div>";
				newElement = newElement + "<div class='ui-custom-float-left'><a href='#' class='ui-btn ui-bar-btn-custom ui-mini ui-icon-custom-favor-false' id='interest-button-"+id+"' >"+"Interest"+"</a></div>";
				newElement = newElement + "</div>";
				newElement = newElement + "</div>";
				newElement = newElement + "</div>";
				$("#event-content").prepend(newElement);
				// display event holder's name | not the email one
				pullUserEventHolderInfo(holder, id);
				// check if owner has interested this event
				var successFunction = function(eventId, interest){
					if (interest.length == 0){
						$("#interest-button-"+eventId).bind("click", function() {
							addInterestEvent(eventId);
						});
					} else {
						$("#interest-button-"+eventId).removeClass("ui-icon-custom-favor-false");
						$("#interest-button-"+eventId).addClass("ui-icon-custom-favor-true");
						$("#interest-button-"+eventId).bind("click", function() {
							removeInterestEvent(eventId);
						});
					};
					pullLastItem = pullLastItem - 1;
					if (pullLastItem == 0) {
						$("#event-content").removeClass("ui-hidden-accessible");
					}
				}
				ParseCheckInterest(owner, id, successFunction);
			} else {
				var commentNumber = objects[i].get("commentNumber");
				var interestNumber = objects[i].get("interestNumber");
				var holder = objects[i].get("owner");
				var id = objects[i].id;
				$("#comment-statistics-"+id).html(commentNumber.toString()+" Comments");
				$("#interest-statistics-"+id).html(interestNumber.toString()+" Interests");
				pullLastItem = pullLastItem - 1;
				if (pullLastItem == 0) {
					$("#event-content").removeClass("ui-hidden-accessible");
				}
				// display event holder's name | not the email one
				pullUserEventHolderInfo(holder, id);
			}
		};
	};
	ParsePullEvent(null, limitNumber, descendingOrderKey, "public", displayFunction);
}

function convertTime(rawTime){
	var minutes = 1000 * 60;
	var hours = minutes * 60;
	var days = hours * 24;
	var years = days * 365;
	var currentTime = new Date();
	var time = currentTime.getTime()-Date.parse(rawTime.toString());
	if (time < 0) {
		time = 0;
	}
	var y = Math.floor(time / years);
	time = time - years * y;
	var d = Math.floor(time / days);
	time = time - days * d;
	var h = Math.floor(time / hours);
	time = time - hours * h;
	var m = Math.floor(time / minutes);
	var showtime;
	if (y > 1) {
		showtime = y.toString()+" years ago";
	} else if (y > 0) {
		showtime = y.toString()+" year ago";
	} else if (d > 1) {
		showtime = d.toString()+" days ago";
	} else if (d > 0) {
		showtime = d.toString()+" day ago";
	} else if (h > 1) {
		showtime = h.toString()+" hours ago";
	} else if (h > 0) {
		showtime = h.toString()+" hour ago";
	} else if (m > 1) {
		showtime = m.toString()+" minutes ago";
	} else if (m > 0) {
		showtime = m.toString()+" minute ago";
	} else {
		showtime = "just now";
	}
	return showtime
}


// update the detail of event when the user clicked to the page-event-detail
function updateEventDetail(id){
	$("#event-detail-content").html("");
	$("#event-id-label").html(id);
	var descendingOrderKey = "createdAt";
	var displayFunction = function(object){
		var title = object[0].get("title");
		var location = object[0].get("location");
		var time = object[0].get("time");
		var visibility = object[0].get("visibility");
		var description = object[0].get("description");
		var id = object[0].id;
		var newElement = "";
		newElement = newElement + "<div id=event-detail-'"+id+"'>";
		newElement = newElement + "<div class='ui-corner-all custom-corners custom-corners-detail'>";
		newElement = newElement + "<div class='ui-body ui-body-a'>";
		newElement = newElement + "<p class='ui-custom-event-title'>" + title + "</p>";
		if (location.length > 0) {
			newElement = newElement + "<p class='ui-custom-event-location'>" + location + "</p>";
		}
		if (time.length > 0) {
			newElement = newElement + "<p class='ui-custom-event-time'>" + time + "</p>";
		}
		if ((location.length == 0) && (time.length == 0)) {
			newElement = newElement + "<p class='ui-custom-event-description-less-margin'>" + description.replace("\n","</br>") + "</p>";
		} else {
			newElement = newElement + "<p class='ui-custom-event-description'>" + description.replace("\n","</br>") + "</p>";
		}
		newElement = newElement + "</div>";
		newElement = newElement + "</div>";
		newElement = newElement + "</div>";
		$("#event-detail-content").prepend(newElement);
	}
	ParseSelectEvent(id, displayFunction);
	displayFunction = function(objects){
		$("#event-detail-content").append("<ul id='event-commnets-list' data-role='listview' data-inset='true' class='ui-listview ui-listview-inset ui-corner-all ui-shadow'></ul>")
		
		for (var i=objects.length-1; i>=0; i--) {
			var ownerName = objects[i].get("ownerName");
			var content = objects[i].get("content");
			var newElement = "<li>";
			newElement = newElement + "<a href='#' class='ui-btn'>"
			newElement = newElement + "<p><strong>"+ownerName+": </strong>"+content+"</p>";
			newElement = newElement + "<p><strong>"+convertTime(objects[i].createdAt)+"</strong></p>"
			newElement = newElement + "</a></li>";
			$("#event-commnets-list").prepend(newElement);
		}
	}
	ParsePullEventComment(id, descendingOrderKey, displayFunction);
}

// send comment to database
function sendCommnet(){
	var eventId = $("#event-id-label").html();
	var currentUser = Parse.User.current();
	var owner = currentUser.getUsername();
	var content = $("#comment-content").val();
	$("#comment-content").val("");
	if (content.length==0)
		return
	var errorFunction = function(error){
		$.mobile.loading( 'show', {
			text: error,
			textVisible: true,
			theme: 'a',
			textonly: true,
			html: ""
		});
		setTimeout( function(){$.mobile.loading( "hide" );}, 2000);
	};
	var successFunction = function(object){
		var eventId = object.id;
		var commentNumber = object.get("commentNumber");
		updateEventDetail(eventId);
		$("#comment-statistics-"+eventId).html(commentNumber.toString()+" Comments");
		$("#my-comment-statistics-"+eventId).html(commentNumber.toString()+" Comments");
	};
	ParseAddEventComment(eventId, owner, content, errorFunction, successFunction);
}

var selectedElement="";
var animateDuration=150;
function pullMyEvent(){
	var currentUser = Parse.User.current();
	var owner = currentUser.getUsername();
	var descendingOrderKey = "createdAt";
	var displayFunction = function(objects){
		for (var i=objects.length-1; i >= 0; i--) {
			if ($("#my-event-content > #my-"+objects[i].id).length == 0) {
				var owner = objects[i].get("owner");
				var title = objects[i].get("title");
				var location = objects[i].get("location");
				var time = objects[i].get("time");
				var visibility = objects[i].get("visibility");
				var description = objects[i].get("description");
				var interestNumber = objects[i].get("interestNumber");
				var commentNumber = objects[i].get("commentNumber");
				var id = objects[i].id;
				var newElement = "";
				newElement = newElement + "<div id='my-"+id+"'>";
				newElement = newElement + "<div class='custom-corners'>";
				newElement = newElement + "<div class='ui-body ui-body-a'>";
				newElement = newElement + "<p class='ui-custom-event-title'>" + title + "</p>";
				if (location.length > 0) {
					newElement = newElement + "<p class='ui-custom-event-location'>" + location + "</p>";
				}
				if (time.length > 0) {
					newElement = newElement + "<p class='ui-custom-event-time'>" + time + "</p>";
				}
				if ((location.length == 0) && (time.length == 0)) {
					newElement = newElement + "<p class='ui-custom-event-description-less-margin'>" + description.replace("\n","</br>") + "</p>";
				} else {
					newElement = newElement + "<p class='ui-custom-event-description'>" + description.replace("\n","</br>") + "</p>";
				}
				newElement = newElement + "<div id='my-comment-statistics-"+id+"' class='event-statistics'>" + commentNumber + " Comments</div><div id='my-interest-statistics-"+id+"' class='event-statistics'>" + interestNumber + " Interests</div>";
				newElement = newElement + "</div>";
				newElement = newElement + "<div class='ui-footer ui-bar-custom'>"
				newElement = newElement + "<div class='ui-custom-float-left'><a href='#page-event-detail' data-transition='slide' class='ui-btn ui-bar-btn-custom ui-mini ui-icon-custom-comment' id='my-comment-button-"+id+"' onclick=\"updateEventDetail('"+id+"')\">"+"Detail"+"</a></div>";
				//newElement = newElement + "<div class='ui-block-c'><a href='#' class='ui-btn ui-mini ui-btn-icon-left' id='my-delete-button-"+id+"' onclick=\"deleteMyEvent('"+id+"')\">"+'delete'+"</a></div>";
				newElement = newElement + "</div>";
				newElement = newElement + "</div>";
				newElement = newElement + "<div class='ui-custom-delete-btn' onclick=\"deleteMyEvent('"+id+"')\"></div>"
				newElement = newElement + "</div>";
				$("#my-event-content").prepend(newElement);


				$("#my-"+id).on("swipeleft", function (){
					var id= $(this)[0].id;
					if (selectedElement == id) {
						return;
					}
					$("#"+selectedElement).animate({
						marginLeft:"0%"
					},{
						duration: animateDuration,
						complete: function(){
							$(this).css("width","");
						}
					});
					$("#"+selectedElement).children(".ui-custom-delete-btn").animate({
						width:"0%"
					},{
						duration: animateDuration,
						complete: function(){
							$(this).css("height","");
						}
					});
					var eventId = id.substring(3);
					$(this).css("width","100%");
					$(this).animate({
						marginLeft:"-72px"
					},{
						duration: animateDuration,
					});
					$(this).children(".ui-custom-delete-btn").css({
						"height": ($(this).height()-6.4).toString()+"px",
						"top": (-$(this).height()-6.4).toString()+"px",
						"marginBottom": (-$(this).height()+6.4).toString()+"px",
						"width":"72px"
					});
					selectedElement = id;
					$(window).scroll(function(){
						$("#"+selectedElement).animate({
							marginLeft:"0%"
						},{
							duration: animateDuration,
							complete: function(){
								$(this).css("width","");
							}
						});
						$("#"+selectedElement).children(".ui-custom-delete-btn").animate({
							width:"0%"
						},{
							duration: animateDuration,
							complete: function(){
								$(this).css("height","");
							}
						});
						$("#page-event-my-event").not("#"+selectedElement).unbind("click");
						$(window).unbind("scroll");
						selectedElement = "";
					});
					$("#page-event-my-event").not("#"+selectedElement).click(function() {
						$("#"+selectedElement).animate({
							marginLeft:"0%"
						},{
							duration: animateDuration,
							complete: function(){
								$(this).css("width","");
							}
						});
						$("#"+selectedElement).children(".ui-custom-delete-btn").animate({
							width:"0%"
						},{
							duration: animateDuration,
							complete: function(){
								$(this).css("height","");
							}
						});
						$("#page-event-my-event").not("#"+selectedElement).unbind("click");
						$(window).unbind("scroll");
						selectedElement = "";
					});
				});
				$("#my-"+id).on("swiperight", function (){
					if (selectedElement == "") {
						return;
					}
					$("#"+selectedElement).animate({
						marginLeft:"0%"
					},{
						duration: animateDuration,
						complete: function(){
							$(this).css("width","");
						}
					});
					$("#"+selectedElement).children(".ui-custom-delete-btn").animate({
						width:"0%"
					},{
						duration: animateDuration,
						complete: function(){
							$(this).css("height","");
						}
					});
					$("#page-event-my-event").not("#"+selectedElement).unbind("click");
					$(window).unbind("scroll");
					selectedElement = "";
				});


			} else {
				var commentNumber = objects[i].get("commentNumber");
				var interestNumber = objects[i].get("interestNumber");
				var id = objects[i].id;
				$("#my-comment-statistics-"+id).html(commentNumber.toString()+" Comments");
				$("#my-interest-statistics-"+id).html(interestNumber.toString()+" Interests");
			}
		};
	};
	ParsePullEvent(owner, null, descendingOrderKey, null, displayFunction);
}

function addInterestEvent(eventId){
	var currentUser = Parse.User.current();
	var owner = currentUser.getUsername();
	var displayFunction = function(object){
		var eventId = object.id;
		var interestNumber = object.get("interestNumber");
		$("#interest-statistics-"+eventId).html(interestNumber.toString()+" Interests");
		$("#interest-button-"+eventId).removeClass("ui-icon-custom-favor-false");
		$("#interest-button-"+eventId).addClass("ui-icon-custom-favor-true");
		$("#interest-button-"+eventId).unbind("click");
		$("#interest-button-"+eventId).bind("click", function() {
			removeInterestEvent(eventId);
		});
	};
	ParseAddInterest(owner, eventId, displayFunction);

}

function removeInterestEvent(eventId){
	var currentUser = Parse.User.current();
	var owner = currentUser.getUsername();
	var displayFunction = function(object,eventId){
		if (object.length == 1) {
			objectId = object[0].id;
			var displayFunction = function(object) {
				var eventId = object.id;
				var interestNumber = object.get("interestNumber");
				$("#interest-statistics-"+eventId).html(interestNumber.toString()+" Interests");
				$("#interest-button-"+eventId).removeClass("ui-icon-custom-favor-true");
				$("#interest-button-"+eventId).addClass("ui-icon-custom-favor-false");
				$("#interest-button-"+eventId).unbind("click");
				$("#interest-button-"+eventId).bind("click", function() {
					addInterestEvent(eventId); 
				});
			};
			ParseRemoveInterest(objectId, null, eventId, displayFunction)
		}
	};
	ParseRemoveInterest(null, owner, eventId, displayFunction);
}

function sendToolbarActiveKeyboard(){
	$("html body").animate({ scrollTop: $(document).height().toString()+"px" }, {
		duration: 150,
        complete : function(){
            $('#comment-content').textinput('enable');
			$('#comment-content').focus();
        }
    });
}

function deleteMyEvent(eventId){
	var displayFunction = function(eventId){
		$("#my-"+eventId).slideUp("fast", function(){
			$("#"+eventId).remove();
			$("#my-"+eventId).remove();
		});
	};
	ParseDeleteEvent(eventId, displayFunction);
}

var refreshPreviewPhoto = false;
function refreshPreviewCanvas(){
	profilePhotoCrop();
	if (refreshPreviewPhoto) {
		setTimeout(function(){
			refreshPreviewCanvas();
		},2000);
	}
}

function getMyProfile(){
	refreshPreviewPhoto = true;
	refreshPreviewCanvas();
	var currentUser = Parse.User.current();
	var owner = currentUser.getUsername();
	var userId = currentUser.id;
	var displayFunction = function(objects){
		var name = objects[0].get("name");
		var gender = objects[0].get("gender");
		var birthdate = objects[0].get("birthdate");
		var motto = objects[0].get("motto");
		var major = objects[0].get("major");
		var school = objects[0].get("school");
		var interest = objects[0].get("interest");
		var location = objects[0].get("location");

		$("#profile-edit-name").val(objects[0].get("name"));
		$("#profile-edit-gender").val(objects[0].get("gender") ? "on" : "off");
		if (!objects[0].get("gender")) {
			$("#profile-edit-gender").parent().removeClass("ui-flipswitch-active");
		} else {
			$("#profile-edit-gender").parent().addClass("ui-flipswitch-active");
		}
		$("#profile-edit-birthdate").val(objects[0].get("birthdate"));
		$("#profile-edit-motto").val(objects[0].get("motto"));
		$("#profile-edit-major").val(objects[0].get("major"));
		$("#profile-edit-school").val(objects[0].get("school"));
		$("#profile-edit-interest").val(objects[0].get("interest"));
		$("#profile-edit-location").val(objects[0].get("location"));
		$("#saveprofile-id").html(objects[0].id);
		
	} 
	ParseGetProfile(owner, displayFunction, null);
	displayFunction = function(eventId, object){
		var photo120 = object[0].get('profilePhoto120');
		if (typeof(photo120) == "undefined") {
			photo120 = "./content/png/Taylor-Swift.png";
		}
		var canvas = document.getElementById('canvas-photo');
		var context = canvas.getContext('2d');
		var image = new Image();
		image.src = photo120;
		context.drawImage(image, 0, 0);
		console.log("pull profile photo");
	}
	ParseGetProfilePhoto(null, userId, displayFunction);
}

function saveProfile(){
	refreshPreviewPhoto = false;
	var currentUser = Parse.User.current();
	var owner = currentUser.getUsername();
	var id = $("#saveprofile-id").html();
	var fileUploadControl = $("#profile-edit-photo")[0];
	if (fileUploadControl.files.length > 0) {
		var canvas = document.getElementById('canvas-photo');
		var photo120 = canvas.toDataURL();
		var photo = fileUploadControl.files[0];
	}
	else {
		var photo120 = null;
		var photo = null;
	};
	var name = $("#profile-edit-name").val();
	var gender = $("#profile-edit-gender").val()=="on" ? true : false ;
	var birthdate = $("#profile-edit-birthdate").val();
	var motto = $("#profile-edit-motto").val();
	var major = $("#profile-edit-major").val();
	var school = $("#profile-edit-school").val();
	var interest = $("#profile-edit-interest").val();
	var location = $("#profile-edit-location").val();
	var displayFunction = function(){
		ParseUpdateCurrentUser(function(){}, function(){});
	}
	ParseSaveProfile(id, null, null, name, gender, birthdate, motto, major, school, interest, location, displayFunction);
	ParseSaveProfilePhoto(id, photo, photo120, function(object){});
}

function profilePhotoCrop(){
	var fileUploadControl = $("#profile-edit-photo")[0];
	var file = fileUploadControl.files[0];
	if (typeof(file) == "undefined")
		return;
	var reader = new FileReader();
	reader.onload = function(e) {
		var image = new Image();
		var canvas = document.getElementById('canvas-photo');
		var context = canvas.getContext('2d');
		image.src = e.target.result;
		console.log(image.width);
		console.log(image.height);
		var sourceX=0;
		var sourceY=0;
		var sourceWidth = image.width;
		var sourceHeight = image.height;
		var destWidth = canvas.width;
		var destHeight = canvas.height;
		var destX=0;
		var destY=0;
		if (sourceHeight < sourceWidth) {
			destWidth = sourceWidth*(destHeight/sourceHeight);
			destX = (canvas.width - destWidth)/2;
		} else if (sourceHeight > sourceWidth) {
			destHeight = sourceHeight*(destWidth/sourceWidth);
			destY = (canvas.height - destHeight)/2;
		}
		context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
	}
	reader.readAsDataURL(file);
}


var geoWatchId;
function listFriendNearBy(){
	if (navigator.geolocation){
		geoWatchId = navigator.geolocation.watchPosition(showPeopleNearByList,showPeopleNearByListError);
	} else {
		$("#page-people-near-by > .ui-content").html("<p style='padding: 1em'>Geolocation is not supported by this browser.</p>");
	}
}

function stopGeoWatch(){
	navigator.geolocation.clearWatch(geoWatchId);
	$("#page-people-near-by > .ui-content").html("");
}

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

function buildUserListElement(object, liIdPrefix, lat, lng) {
	var name = object.get('name');
	var gender = object.get('gender');
	var latitude = object.get('latitude');
	var longitude = object.get('longitude');
	var userId = object.id;
	var updatedAt = object.updatedAt;
	var newElement = "<li id='"+liIdPrefix+userId+"'>";
	newElement = newElement + "<div class='custom-corners-people-near-by custom-corners'>"
	newElement = newElement + "<div class='ui-bar ui-bar-a'>";
	newElement = newElement + "<div><strong>"+name+"</strong></div>";
	newElement = newElement + "<div class='ui-icon-custom-gender' style='";
	if (typeof(gender) == 'undefined') {
		//$("#"+eventId+"-owner-denger").html(gender.toString());
	} else if (gender) {
		newElement = newElement + "background-image:url("+"./content/customicondesign-line-user-black/png/male-white-20.png"+");";
		newElement = newElement + "background-color:"+"#8970f1"+";";
	} else {
		newElement = newElement + "background-image:url("+"./content/customicondesign-line-user-black/png/female1-white-20.png"+");";
		newElement = newElement + "background-color:"+"#f46f75"+";";
	};
	newElement = newElement + "'></div>";
	if ((lat != null) && (lng != null)) {
		newElement = newElement + "<div class='people-near-by-list-distance'>" + getDistance(latitude, longitude, lat, lng) + "km, "+convertTime(updatedAt)+"</div>";
	}
	newElement = newElement + "</div>";
	newElement = newElement + "</div></li>";

	return newElement;
}

function showPeopleNearByList(position){
	var latitudeLimit = 1;
	var longitudeLimit = 1;
	var descendingOrderKey = "updatedAt";
	if ($("#people-near-by-list").length == 0) {
		$("#page-people-near-by > .ui-content").html("<ul id='people-near-by-list' data-role='listview' data-inset='true' class='ui-listview ui-listview-inset ui-corner-all ui-shadow'></ul>");
	}
	var displayFunction = function(lat,lng,objects){
		for (var i = objects.length-1; i >= 0; i--) {
			if ($("#people-near-by-list > #near-by-"+objects[i].id).length == 0) {
				var newElement = buildUserListElement(objects[i], "near-by-", lat, lng);
				var userId = objects[i].id;
				$("#people-near-by-list").prepend(newElement);
				var displayFunction = function(eventId, object){
					var photo120 = object[0].get("profilePhoto120");
					if (typeof(photo120) == "undefined") {
						photo120 = "./content/png/Taylor-Swift.png";
					}
					$("#near-by-"+object[0].get('userId')+" > .custom-corners-people-near-by").css("backgroundImage","url('"+photo120+"')");
				}
				ParseGetProfilePhoto(null, userId, displayFunction);
			} else {
				var latitude = objects[i].get('latitude');
				var longitude = objects[i].get('longitude');
				$("#near-by-"+objects[i].id+" > .custom-corners-people-near-by > .ui-bar-a > .people-near-by-list-distance").html(getDistance(latitude, longitude, lat, lng) + "km, "+convertTime(objects[i].updatedAt));
			}
		}
	}
	ParsePullUserByGeolocation(position.coords.latitude,position.coords.longitude,latitudeLimit,longitudeLimit,descendingOrderKey,displayFunction);
}

function showPeopleNearByListError(error){
	switch(error.code) {
		case error.PERMISSION_DENIED:
		$("#page-people-near-by > .ui-content").html("<p style='padding: 1em'>User denied the request for Geolocation.</p>");
		break;
		case error.POSITION_UNAVAILABLE:
		$("#page-people-near-by > .ui-content").html("<p style='padding: 1em'>Location information is unavailable.</p>");
		break;
		case error.TIMEOUT:
		$("#page-people-near-by > .ui-content").html("<p style='padding: 1em'>The request to get user location timed out.</p>");
		break;
		case error.UNKNOWN_ERROR:
		$("#page-people-near-by > .ui-content").html("<p style='padding: 1em'>An unknown error occurred.</p>");
		break;
	}
}

function displayEventMoreOption(){
	$('#event-page-right-top-option-1').unbind("click");
	$('#event-page-right-top-option-2').unbind("click");
	$('#ui-icon-custom-right-top-more').attr("id","ui-icon-custom-right-top-more-active");
	$(window).unbind("scroll");
	$('#event-page-right-top-option-1').on('click',function(){
		$('#event-create-button').bind('click',function(){
			createUserEvent();
		});
		hiddenEventMoreOption();
	})
	$('#event-page-right-top-option-2').on('click',function(){
		pullMyEvent();
		hiddenEventMoreOption();
	})
	$('.options-hidden-cover-layer').show();
	$('.event-page-right-top-options').fadeIn('fast');
	$('.options-hidden-cover-layer').on('click',hiddenEventMoreOption);
	$('.options-hidden-cover-layer').on('swipeleft',hiddenEventMoreOption)
	$('.options-hidden-cover-layer').on('swiperight',hiddenEventMoreOption)
	$(window).scroll(hiddenEventMoreOption)
}

function hiddenEventMoreOption(){
	$('#event-page-right-top-option-1').unbind("click");
	$('#event-page-right-top-option-2').unbind("click");
	$('#ui-icon-custom-right-top-more-active').attr("id","ui-icon-custom-right-top-more");
	$(window).unbind("scroll");
	$('.options-hidden-cover-layer').hide();
	$('.event-page-right-top-options').fadeOut('fast');
}

function bindSearchAutocomplete(){
	$( "#user-autocomplete-list" ).on( "filterablebeforefilter", function ( e, data ) {
		var $ul = $( this );
		var $input = $( data.input );
		var value = $input.val();
		$ul.html( "" );
		if ( value && value.length > 1 ) {
			var displayFunction = function(objects){
				var html = "";
				for (var i=0; i<objects.length; i++) {
					var newElement = buildUserListElement(objects[i], "people-search-", null, null);
					var userId = objects[i].id;
					$( "#user-autocomplete-list" ).append(newElement);
					var displayFunction = function(eventId, object){
						var photo120 = object[0].get("profilePhoto120");
						if (typeof(photo120) == "undefined") {
							photo120 = "./content/png/Taylor-Swift.png";
						}
						$("#people-search-"+object[0].get('userId')+" > .custom-corners-people-near-by").css("backgroundImage","url('"+photo120+"')");
					}
					ParseGetProfilePhoto(null, userId, displayFunction);
					var displayFunction = function(friendId, object){
						if (typeof(object)=="undefined") {
							var sendFriendRequestButton = "<div class='send-friend-request'>Send Friend Request</div>";
							$("#people-search-"+friendId+" > .custom-corners-people-near-by > .ui-bar").append(sendFriendRequestButton);
							$("#people-search-"+friendId+" > .custom-corners-people-near-by > .ui-bar > .send-friend-request").on("click",function(){
								sendFriendRequest(friendId);
							})
						} else {
							var valid = object.get('valid');
							if (valid) {
								var startChatButton = "<div class='send-friend-request chat-friend'>Start Chat</div>";
								$("#people-search-"+friendId+" > .custom-corners-people-near-by > .ui-bar").append(startChatButton);
							} else {
								var sendFriendRequestButton = "<div class='send-friend-request'>Request Sent</div>";
								$("#people-search-"+friendId+" > .custom-corners-people-near-by > .ui-bar").append(sendFriendRequestButton);
							}
						}
					}
					ParseCheckFriend(Parse.User.current().id, userId, displayFunction);
				}
			}
			ParseUserByEmailAndName(value, "updatedAt", displayFunction);
		}
	});
}

function unbindSearchAutocomplete(){
	$( "#user-autocomplete-list" ).unbind( "filterablebeforefilter" );
	$( "#user-autocomplete-list" ).html("");
	$( "#user-autocomplete-input" ).val("");
}

function sendFriendRequest(friendId) {
	var currentUser = Parse.User.current();
	$("#people-search-"+friendId+" > .custom-corners-people-near-by > .ui-bar > .send-friend-request").unbind("click");
	var successFunction = function(object){
		var friendId = object.get('friend');
		$("#people-search-"+friendId+" > .custom-corners-people-near-by > .ui-bar > .send-friend-request").html("Request Sent");
	}
	ParseSendFriendRequest(currentUser.id, friendId, successFunction);
}

function getMyFriendRequests() {
	$("#page-my-friend-requests > .ui-content").html("<ul id='friend-requests-list' data-role='listview' data-inset='true' class='ui-listview ui-listview-inset ui-corner-all ui-shadow'></ul>");
	var descendingOrderKey = "createdAt";
	var displayFunction = function(objects){
		for (var i=0; i<objects.length; i++) {
			var friendId = objects[i].get("owner");
			var objectId = objects[i].id;
			var displayFunction = function(friendObject, userObject) {
				var newElement = buildUserListElement(userObject, "new-friend-request-", null, null);
				var objectId = friendObject.id;
				var friendId = friendObject.get('owner');
				$( "#friend-requests-list" ).append(newElement);
				var displayFunction = function(objectId, object){
					var photo120 = object[0].get("profilePhoto120");
					if (typeof(photo120) == "undefined") {
						photo120 = "./content/png/Taylor-Swift.png";
					}
					$("#new-friend-request-"+objectId+" > .custom-corners-people-near-by").css("backgroundImage","url('"+photo120+"')");
				}
				ParseGetProfilePhoto(friendId, friendId, displayFunction);
				var acceptFriendRequestButton = "<div class='send-friend-request accept-friend-request'>Accept Request</div>";
				var rejectFriendRequestButton = "<div class='reject-friend-request'>Reject Request</div>";
				$("#new-friend-request-"+friendId+" > .custom-corners-people-near-by > .ui-bar").append(acceptFriendRequestButton+rejectFriendRequestButton);
				$("#new-friend-request-"+friendId+" > .custom-corners-people-near-by > .ui-bar > .accept-friend-request").on("click",function(){
					var successFunction = function(object){
						var objectId = object.id;
						var friendId = object.get('friend');
						$("#new-friend-request-"+friendId+" > .custom-corners-people-near-by > .ui-bar > .accept-friend-request").remove();
						$("#new-friend-request-"+friendId+" > .custom-corners-people-near-by > .ui-bar > .reject-friend-request").remove();
						var startChatButton = "<div class='send-friend-request chat-friend'>Start Chat</div>";
						$("#new-friend-request-"+friendId+" > .custom-corners-people-near-by > .ui-bar").append(startChatButton);
					}
					ParseAcceptFriendRequest(objectId, null, friendId, successFunction);
				});

				$("#new-friend-request-"+friendId+" > .custom-corners-people-near-by > .ui-bar > .reject-friend-request").on("click",function(){
					var successFunction = function(friendId){
						$("#new-friend-request-"+friendId).slideUp("fast", function(){
							$("#new-friend-request-"+friendId).remove();
						});
					}
					ParseRejectFriendRequest(objectId, null, friendId, successFunction);
				});
			}
			ParseGetProfileById(friendId, displayFunction, objects[i]);
			ParseSetRequestRead(objectId);
		}
	}
	ParsePullNewFriendRequest(Parse.User.current().id, descendingOrderKey, displayFunction);
}