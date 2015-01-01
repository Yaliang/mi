var cachePhoto = new Array;
var cacheUser = new Array;
var cacheFriend = new Array;
function rawLocalToCache(object) {
	var item = {
		id: object.objectId, 
		attributes: object, 
		createdAt: object.createdAt,
		updatedAt: object.updatedAt
	};
	item['get'] = function(a) {
		return this.attributes[a];
	}
	item['toJSON'] = function() {
		return this.attributes;
	}

	return item;
}

// reload from localStorage and update
if (typeof(localStorage.cachePhoto)!="undefined") {
	var rawData = JSON.parse(localStorage.cachePhoto);
	var lastUpdate = 0;
	var updateIdList = new Array;
	for (var i=0; i < rawData.length; i++) {
		var rawObject = rawData[i];
		cachePhoto.push(rawLocalToCache(rawObject));
		updateIdList.push(rawData[i].objectId);
		if (Date.parse(rawObject.updatedAt) > lastUpdate)
			lastUpdate = Date.parse(rawObject.updatedAt);
	}
	lastUpdate = new Date(lastUpdate);
	console.log(lastUpdate.toJSON());
	ParseUpdateCache("Photo", updateIdList,lastUpdate);
}
if (typeof(localStorage.cacheUser)!="undefined") {
	var rawData = JSON.parse(localStorage.cacheUser);
	var lastUpdate = 0;
	var updateIdList = new Array;
	for (var i=0; i < rawData.length; i++) {
		var rawObject = rawData[i];
		cacheUser.push(rawLocalToCache(rawObject));
		updateIdList.push(rawData[i].objectId);
		if (Date.parse(rawObject.updatedAt) > lastUpdate)
			lastUpdate = Date.parse(rawObject.updatedAt);
	}
	lastUpdate = new Date(lastUpdate);
	console.log(lastUpdate.toJSON());
	ParseUpdateCache("User", updateIdList,lastUpdate);
}
if (typeof(localStorage.cacheFriend)!="undefined") {
	var rawData = JSON.parse(localStorage.cacheFriend);
	var lastUpdate = 0;
	var updateIdList = new Array;
	for (var i=0; i < rawData.length; i++) {
		var rawObject = rawData[i];
		cacheFriend.push(rawLocalToCache(rawObject));
		updateIdList.push(rawData[i].objectId);
		if (Date.parse(rawObject.updatedAt) > lastUpdate)
			lastUpdate = Date.parse(rawObject.updatedAt);
	}
	lastUpdate = new Date(lastUpdate);
	console.log(lastUpdate.toJSON());
	ParseUpdateCache("Friend", updateIdList,lastUpdate);
}

function CacheGetProfilePhoto(userId, displayFunction, data) {
	var cached = false;
	for (var i = 0; i < cachePhoto.length; i++) {
		if (cachePhoto[i].get('userId') == userId) {
			displayFunction(cachePhoto[i], data);
			cached = true;
			break;
		}
	}
	if (!cached) {
		console.log("Photo miss: "+userId);
		ParseGetProfilePhoto(userId, displayFunction, data);
	}
}

function CacheUpdatePhoto(object){
	if (typeof(object) == "undefined")
		return
	object = rawLocalToCache(JSON.parse(JSON.stringify(object)));
	var cached = false;
	for (var i = 0; i < cachePhoto.length; i++) {
		if (cachePhoto[i].get('userId') == object.get('userId')) {
			cachePhoto.splice(i, 1, object);
			cached = true;
			break;
		}
	}
	if (!cached) {
		cachePhoto.push(object);
	}
	localStorage.cachePhoto = JSON.stringify(cachePhoto);
}

function CacheGetProfileByUsername(username, displayFunction, data){
	var cached = false;
	for (var i = 0; i < cacheUser.length; i++) {
		if (cacheUser[i].get('username') == username) {
			displayFunction(cacheUser[i], data);
			cached = true;
			break;
		}
	}
	if (!cached) {
		console.log("User miss: "+username);
		ParseGetProfileByUsername(username, displayFunction, data);
	}
}

function CacheGetProfileByUserId(userId, displayFunction, data){
	var cached = false;
	for (var i = 0; i < cacheUser.length; i++) {
		if (cacheUser[i].id == userId) {
			displayFunction(cacheUser[i], data);
			cached = true;
			break;
		}
	}
	if (!cached) {
		console.log("User miss: "+userId);
		ParseGetProfileByUserId(userId, displayFunction, data);
	}
}

function CacheUpdateUser(object){
	if (typeof(object) == "undefined")
		return
	object = rawLocalToCache(JSON.parse(JSON.stringify(object)));
	var cached = false;
	for (var i = 0; i < cacheUser.length; i++) {
		if (cacheUser[i].id == object.id) {
			cacheUser.splice(i, 1, object);
			cached = true;
			break;
		}
	}
	if (!cached) {
		cacheUser.push(object);
	}
	localStorage.cacheUser = JSON.stringify(cacheUser);
}

function CacheCheckFriend(friendId, ownerId, displayFunction){
	var cached = false;
	for (var i = 0; i < cacheFriend.length; i++) {
		if ((cacheFriend[i].get("friend") == friendId) && (cacheFriend[i].get("owner") == ownerId)) {
			displayFunction(ownerId, friendId, cacheFriend[i]);
			cached = true;
			break;
		}
	}
	if (!cached) {
		displayFunction(ownerId, friendId);
	}
}

function CachePullNewFriendRequest(userId, descendingOrderKey, displayFunction) {
	var requests = new Array;

	for (var i = 0; i < cacheFriend.length; i++) {
		if ((cacheFriend[i].get("friend") == userId) && (cacheFriend[i].get("valid") == false)) {
			requests.push(cacheFriend[i]);
		}
	}

	displayFunction(requests);
}

function CachePullMyFriend(userId, descendingOrderKey, displayFunction) {
	var friends = new Array;

	for (var i = 0; i < cacheFriend.length; i++) {
		if ((cacheFriend[i].get("owner") == userId) && (cacheFriend[i].get("valid") == true)) {
			friends.push(cacheFriend[i]);
		}
	}

	displayFunction(friends);
}

function CacheUpdateFriend(object){
	if (typeof(object) == "undefined")
		return
	object = rawLocalToCache(JSON.parse(JSON.stringify(object)));
	var cached = false;
	for (var i = 0; i < cacheFriend.length; i++) {
		if (cacheFriend[i].id == object.id) {
			cacheFriend.splice(i, 1, object);
			cached = true;
			break;
		}
	}
	if (!cached) {
		cacheFriend.push(object);
	}
	localStorage.cacheFriend = JSON.stringify(cacheFriend);
}

function CacheRemoveFriend(object) {
	for (var i = 0; i < cacheFriend.length; i++) {
		if (cacheFriend[i].id == object.id) {
			cacheFriend.splice(i, 1);
			break;
		}
	}
	localStorage.cacheFriend = JSON.stringify(cacheFriend);
}