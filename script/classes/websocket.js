ws = {
	init: function(option) {
		this.host = "ws://yueme-websocket.herokuapp.com/"
		if (typeof(option) != "undefined" && option.autoconnect == false) {
		} else {
			ws.connect()
		}
	},
	connect: function() {
		this.connection = new WebSocket(this.host)
		this.connection.onopen = function(event) {
			$(document).trigger("ws:ready")
		}
		this.connection.onclose = function(event) {
			console.log("WebSocket Reconnecting")
			pullNotification = true
			ws.connect()
		}
	},
	login: function(obj) {
		var callback = obj.callback
		var errorHandler = obj.errorHandler
		var key = obj.key
		this.connection.onmessage = function(event) {
			var data = JSON.parse(event.data)
			if (data.type == "token") {
				if (typeof(data.token) != "undefined") {
					ws.token = data.token
					ws.userid = data.userid
					localStorage.ws = JSON.stringify({
						auth: true,
						userid: data.userid,
						token: data.token,
						date: data.date
					})
					callback(data)
				} else {
					errorHandler(data)
				}
			} else if (data.type == "notification_message") {
				ws.noti_receiver(data)
			}
		}
		if (typeof(key)!="undefined" && "username" in key && "password" in key) {
			var msg = {
				type: "login",
				username: key.username,
				password: key.password,
				date: Date.now()
			}
		} else if ("ws" in localStorage) {
			key = JSON.parse(localStorage.ws)
			if ("userid" in key && "token" in key && "auth" in key) {
				var msg = {
					type: "login",
					userid: key.userid,
					token: key.token,
					date: key.date
				}
			} else {
				errorHandler("incomplete cache keys")
			}
		} else {
			errorHandler("no key access")
		}
		this.connection.send(JSON.stringify(msg))
	},
	noti_receiver: function(data) {
		if (typeof(this.lastPull) == "undefined" || this.lastPull < data.date) {
			this.lastPull = Date.now()
			pullNotification()
		}
	},
	logout: function() {
		this.connection.onmessage = undefined
		localStorage.removeItem("ws")
		var msg = {
			type: "logout",
			userid: this.userid,
			token: this.token,
		}
		this.connection.send(JSON.stringify(msg))
	}
}