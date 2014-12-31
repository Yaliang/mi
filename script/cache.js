var cachePhoto = new Array;
var cacheUser = new Array;
var cacheFriend = new Array;

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
		ParseGetProfilePhoto(userId, displayFunction, data);
	}
}

function CacheUpdatePhoto(object){
	if (typeof(object) == "undefined")
		return
	var cached = false;
	for (var i = 0; i < cachePhoto.length; i++) {
		if (cachePhoto[i].get('userId') == userId) {
			cachePhoto.splice(i, 1, object);
			cached = true;
			break;
		}
	}
	if (!cached) {
		CacheAddPhoto(object);
	}
}

function CacheAddPhoto(object){
	cachePhoto.push(object);
}

function CacheGetProfileByUsername(username, displayFunction, data){
	var cached = false;
	for (var i = 0; i < cacheUser.length; i++) {
		if (cacheUser[i].getUsername() == username) {
			displayFunction(cacheUser[i], data);
			cached = true;
			break;
		}
	}
	if (!cached) {
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
		ParseGetProfileByUserId(userId, displayFunction, data);
	}
}

function CacheUpdateUser(object){
	if (typeof(object) == "undefined")
		return
	var cached = false;
	for (var i = 0; i < cacheUser.length; i++) {
		if (cacheUser[i].id == object.id) {
			cacheUser.splice(i, 1, object);
			cached = true;
			break;
		}
	}
	if (!cached) {
		CacheAddUser(object);
	}
}

function CacheAddUser(object) {
	cacheUser.push(object);
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
	var cached = false;
	for (var i = 0; i < cacheFriend.length; i++) {
		if (cacheFriend[i].id == object.id) {
			cacheFriend.splice(i, 1, object);
			cached = true;
			break;
		}
	}
	if (!cached) {
		CacheAddFriend(object);
	}
}

function CacheAddFriend(object) {
	cacheFriend.push(object);
}

function CacheRemoveFriend(object) {
	for (var i = 0; i < cacheFriend.length; i++) {
		if (cacheFriend[i].id == object.id) {
			cacheFriend.splice(i, 1);
			break;
		}
	}
}