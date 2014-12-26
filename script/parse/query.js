Parse.initialize("uFgE3rx2fcIDcWXQgjzuE70VF5WBH76I3TFkwo7W", "21lb7CMEkfLUurx1ETYa805EVu6KYU2WeluLIJ73");

function ParseSignup(username, password, email, name, errorObject, destID, customFunction) {
	var user = new Parse.User();
	user.set("username",username);
	user.set("password",password);
	user.set("email",email);
	user.set("name",name);

	user.signUp(null, {
		success: function(user) {
			window.location.hash = destID;
			customFunction(user);
		},
		error: function(user,error) {
			errorObject.html("Error: " + error.code + " " + error.message);
		}
	});

}

function ParseCreateProfilePhotoObject(userId){
	var Photo = Parse.Object.extend("Photo");
	var photo = new Photo;

	photo.set("userId",userId);
	photo.save();
}

function ParseLogin(username, password, errorObject, destID, customFunction) {
	Parse.User.logIn(username,password,{
		success: function(user){
			window.location.hash = destID;
			customFunction();
		},
		error: function(user, error){
			errorObject.html("Error: " + error.code + " " + error.message);
		}
	});
}

function ParseLogout(destID) {
	Parse.User.logOut();
	window.location.hash = destID;
}

function ParseUpdateCurrentUser(successFunction, errorFunction) {
	var currentUser = Parse.User.current();
	currentUser.fetch({
		success: function(currentUser) {
			successFunction();
		},
		error: function(currentUser,error){
			errorFunction();
		}
	});
}

function ParseEventCreate(owner, title, location, time, visibility, description, errorObject, destID, clearFunction) {
	var UserEvent = Parse.Object.extend("UserEvent");
	var userEvent = new UserEvent();

	userEvent.set("owner",owner);
	userEvent.set("title",title);
	userEvent.set("location",location);
	userEvent.set("time",time);
	userEvent.set("visibility",visibility);
	userEvent.set("description",description);
	userEvent.set("interestNumber",0);
	userEvent.set("commentNumber",0);

	userEvent.save(null, {
		success: function(userEvent) {
			clearFunction();
			window.location.hash = destID;
		},
		error: function(userEvent, error){
			errorObject.html("Error: " + error.code + " " + error.message);
		}
	});
}

function ParsePullEvent(owner, limitNumber, descendingOrderKey, accessibility, displayFunction) {
	var UserEvent = Parse.Object.extend("UserEvent");
	var query = new Parse.Query(UserEvent);
	if (owner != null) {
		query.equalTo("owner",owner);
	}
	if (limitNumber != null) {
		query.limit(limitNumber);
	}
	if (accessibility != null) {
		if (accessibility == "public") {
			query.equalTo("visibility",true);
		}
	}
	query.descending(descendingOrderKey);
	query.find({
		success: function(userEvents) {
			displayFunction(userEvents);
		}
	});
}

function ParseSelectEvent(id, displayFunction) {
	var UserEvent = Parse.Object.extend("UserEvent");
	var query = new Parse.Query(UserEvent);

	query.equalTo("objectId",id);
	query.find({
		success: function(userEvents) {
			displayFunction(userEvents);
		}
	});
}

function ParsePullEventComment(eventId, descendingOrderKey, displayFunction) {
	var comment = Parse.Object.extend("Comment");
	var query = new Parse.Query(comment);
	query.equalTo("eventId",eventId);
	query.descending(descendingOrderKey);
	query.find({
		success: function(comments) {
			displayFunction(comments);
		}
	});
}

function ParseAddEventComment(eventId, owner, content, errorFunction, successFunction) {
	var Comment = Parse.Object.extend("Comment");
	var comment = new Comment;
	var currentUser = Parse.User.current();
	
	comment.set("eventId", eventId);
	comment.set("owner",owner);
	comment.set("ownerName",currentUser.get("name"));
	comment.set("content",content);
	comment.save(null, {
		success: function(comment) {
			ParseUpdateEventCommentNumber(1, eventId, successFunction);
		},
		error: function(comment, error){
			errorFunction("Error: " + error.code + " " + error.message);
		}
	});
}

function ParseUpdateEventInterestNumber(count, eventId, displayFunction){
	var UserEvent = Parse.Object.extend("UserEvent");
	var query = new Parse.Query(UserEvent);
	
	query.get(eventId, {
		success: function(userEvent){
			userEvent.increment("interestNumber",count);
			userEvent.save(null, {
				success: function(userEvent){
					displayFunction(userEvent);
				}
			});
		}
	});
}

function ParseUpdateEventCommentNumber(count, eventId, displayFunction){
	var UserEvent = Parse.Object.extend("UserEvent");
	var query = new Parse.Query(UserEvent);
	
	query.get(eventId, {
		success: function(userEvent){
			userEvent.increment("commentNumber",count);
			userEvent.save(null, {
				success: function(userEvent){
					displayFunction(userEvent);
				}
			});
		}
	});
}

function ParseAddInterest(owner, eventId, displayFunction){
	var Interest = Parse.Object.extend("Interest");
	var interest = new Interest;

	interest.set("owner", owner);
	interest.set("eventId", eventId);
	interest.save(null, {
		success: function(interest){
			ParseUpdateEventInterestNumber(1, eventId, displayFunction);
		}
	});
}

function ParseCheckInterest(owner, eventId, successFunction){
	var Interest = Parse.Object.extend("Interest");
	var query = new Parse.Query(Interest);

	query.equalTo("owner", owner);
	query.equalTo("eventId", eventId);
	query.find({
		success: function(interest) {
			successFunction(eventId, interest);
		}
	});

}

function ParseRemoveInterest(objectId, owner, eventId, displayFunction){
	var Interest = Parse.Object.extend("Interest");
	var query = new Parse.Query(Interest);
	if (objectId == null) {
		query.equalTo("owner", owner);
		query.equalTo("eventId", eventId);
		query.find({
			success: function(interest){
				displayFunction(interest,eventId);
			}
		});
	} 
	else {
		query.get(objectId, {
			success: function(interest){
				interest.destroy({
					success: function(interest){
						ParseUpdateEventInterestNumber(-1, eventId, displayFunction);
					}
				});
			}
		});
	}
}

function ParseDeleteEvent(eventId, displayFunction){
	var UserEvent = Parse.Object.extend("UserEvent");
	var query = new Parse.Query(UserEvent);
	query.get(eventId,{
		success: function(userEvent){
			userEvent.destroy({
				success: function(userEvent){
					displayFunction(eventId);
				}
			});
		}
	});
}

function ParseGetProfile(owner, eventId, displayFunction){
	var query = new Parse.Query(Parse.User);

	query.equalTo("username", owner);
	query.find({
		success: function(user) {
			if (eventId == null) {
				displayFunction(user);
			} else {
				displayFunction(eventId, user);
			}
		}
	});
}

function ParseSaveProfile(id, photo, photo50, name, gender, birthdate, motto, major, school, interest, location, displayFunction) {
	var currentUser = Parse.User.current();
	if (photo != null) {
		currentUser.set("photo50",photo50);
		var parseFile = new Parse.File(photo.name, photo);
		parseFile.save().then(function(object) {
			currentUser.set("photo",object.url());
			currentUser.save(null,{
				success: function(userProfile){
					displayFunction();
				}
			});
		}, function(error) {
			$("#upload-error").html("Error: " + error.code + " " + error.message);
		});
	}
	currentUser.set("name",name);
	currentUser.set("gender",gender);
	currentUser.set("birthdate",birthdate);
	currentUser.set("motto",motto);
	currentUser.set("major",major);
	currentUser.set("school",school);
	currentUser.set("interest",interest);
	currentUser.set("location",location);
	currentUser.save(null,{
		success: function(userProfile){
			displayFunction();
		}
	});
}

function ParseSaveProfilePhoto(id, photo, photo120, displayFunction) {
	var Photo = Parse.Object.extend("Photo");
	var query = new Parse.Query(Photo);

	console.log(photo);
	console.log(photo120);
	if (photo == null)
		return;
	query.equalTo("userId",id);
	query.first({
		success: function(photoObject) {
			photoObject.set('profilePhoto120',photo120);
			var parseFile = new Parse.File(photo.name, photo);
			parseFile.save().then(function(object) {
				photoObject.set("photo",object.url());
				photoObject.save(null,{
					success: function(photo){
						displayFunction(photo);
					}
				});
			}, function(error) {
				
			});
		}
	})
}

function ParseGetProfilePhoto(eventId, userId, displayFunction) {
	var Photo = Parse.Object.extend("Photo");
	var query = new Parse.Query(Photo);

	query.equalTo("userId",userId);
	query.find({
		success: function(object){
			displayFunction(eventId, object);
		}
	})
}

function ParsePullUserByGeolocation(latitude,longitude,latitudeLimit,longitudeLimit,descendingOrderKey,displayFunction){
	var currentUser = Parse.User.current();
	currentUser.set("latitude",latitude);
	currentUser.set("longitude",longitude);
	currentUser.save();

	var query = new Parse.Query(Parse.User);
	query.notEqualTo("username", currentUser.getUsername());
	query.greaterThan("latitude",(latitude-latitudeLimit/2.0));
	query.lessThan("latitude",(latitude+latitudeLimit/2.0));
	query.greaterThan("longitude",(longitude-longitudeLimit/2.0));
	query.lessThan("longitude",(longitude+longitudeLimit/2.0));
	query.descending(descendingOrderKey);
	query.find({
		success: function(users){
			displayFunction(latitude,longitude,users);
		}
	});
}

function ParseSendFriendRequest(ownerId, friendId, successFunction){
	var Friend = Parse.Object.extend("Friend");
	var friend = new Friend;

	friend.set('owner', ownerId);
	friend.set('friend', friendId);
	friend.set('valid',false);
	friend.save(null, {
		success: function(friend){
			successFunction(friend);
		}
	})
}

function ParseAcceptFriendRequest(objectId, ownerId, friendId, successFunction){
	var Friend = Parse.Object.extend("Friend");
	var query = new Parse.Query(Friend);

	if (objectId != null) {
		query.equalTo("object",objectId);
	} else {
		query.equalTo("owner",ownerId);
		query.equalTo("friend",friendId);
	}
	query.first({
		success:function(object){
			object.set('valid',true);
			object.save(null, {
				success: function(object){
					var friend = new Friend;

					friend.set('owner',object.get('friend'));
					friend.set('friend',object.get('owner'));
					friend.set('valid',true);
					friend.save(null, {
						success: function(){
							successFunction();
						}
					})
				}
			});
			
		}
	})
}

function ParseUserByEmailAndName(string, descendingOrderKey, displayFunction){
	var queryByEmail = new Parse.Query(Parse.User);
	var queryByName = new Parse.Query(Parse.User);
	var currentUser = Parse.User.current();

	queryByEmail.startsWith("username",string);
	queryByName.startsWith("name",string);

	var query = Parse.Query.or(queryByEmail, queryByName);
	query.notEqualTo("username", currentUser.getUsername());
	query.descending(descendingOrderKey);
	query.find({
		success: function(objects){
			displayFunction(objects);
		}
	})
}


// functions for database maintaining /never used in front-end script.


function ParseUserNameFieldUpdate(i){
	console.log(i);
	var Comment = Parse.Object.extend("Comment");
	var query = new Parse.Query(Comment);

	query.descending("createdAt");
	query.find({
		success: function(comments){
				var query = new Parse.Query(Parse.User);
				var email = comments[i].get("owner");
				var objectId = comments[i].id;
				console.log(email);
				query.equalTo("username", email);
				query.find({
					success: function(user){
						var ownerName = user[0].get("name");
						console.log(ownerName);
						var Comment = Parse.Object.extend("Comment");
						var query = new Parse.Query(Comment);
						query.get(objectId,{
							success: function(comment){
								console.log(ownerName);
								comment.set("ownerName",ownerName);
								comment.save(null, {
									success: function(comments){
										console.log("success");
									}
								});
							},
							error: function(comment, error){
								console.log("Error: " + error.code + " " + error.message);
							}
						});
					},
					error: function(userEvent, error){
						console.log("Error: " + error.code + " " + error.message);
					}
				})
		}
	})
}

var refreshNumber=0;
function ParseRefreshComment(){
	ParseUserNameFieldUpdate(refreshNumber);
	refreshNumber = refreshNumber+1;
	if (refreshNumber == 100)
		return;
	setTimeout(function(){
		ParseRefreshComment();
	}, 5000);
}

function ParsePhotoClassCreateBaseUserObject(i){
	var query = new Parse.Query(Parse.User);
	query.descending("createdAt");
	query.find({
		success: function(user) {
			console.log(i);
			var userId = user[i].id;
			var profilePhoto = user[i].get("photo");
			var profilePhoto120 = user[i].get("photo50");
			console.log(userId);
			console.log(profilePhoto);
			console.log(profilePhoto120);
			var Photo = Parse.Object.extend("Photo");
			var photo = new Photo;

			photo.set('userId',userId);
			photo.set('profilePhoto',profilePhoto);
			photo.set('profilePhoto120',profilePhoto120);
			photo.save(null,{
				success: function() {
					console.log('success');
				}
			})
		}
	})
}

function ParseRefreshUserProfilePhoto() {
	ParsePhotoClassCreateBaseUserObject(refreshNumber);
	refreshNumber = refreshNumber + 1;
	if (refreshNumber == 16)
		return
	setTimeout(function(){
		ParseRefreshUserProfilePhoto();
	}, 5000);
}