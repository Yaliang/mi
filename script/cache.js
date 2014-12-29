var cachePhoto = new Array;

function CacheGetProfilePhoto(userId, displayFunction, data) {
	var cached = false;
	for (var i = 1; i < cachePhoto.length; i++) {
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

function CacheUpdateProfilePhoto(object){
	var cached = false;
	for (var i = 1; i < cachePhoto.length; i++) {
		if (cachePhoto[i].get('userId') == userId) {
			cachePhoto.splice(i, 1, object);
			cached = true;
			break;
		}
	}
	if (!cached) {
		CacheAddProfilePhoto(object);
	}
}

function CacheAddProfilePhoto(object){
	cachePhoto.push(object);
}