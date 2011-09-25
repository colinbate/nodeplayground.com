var express = require('express');
var app = express.createServer();
var property = require('property');
var nowjs = require('now');

app.configure(function () {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.bodyParser());
	
	app.use(express['static'](__dirname + '/public'));
	app.set('view options', {
	    open: '{{',
	    close: '}}'
	});
});

app.dynamicHelpers ({
	scripts: property.factory(),
	styles: property.factory()
});

app.get('/', function (req, res) {
	res.render('chat');
});

app.listen(2428);

var everyone = nowjs.initialize(app);

console.log('Chat running on http://localhost:2428');

var users = [];

var removeUser = function (username) {
	var userIndex = users.indexOf(username);
	if (userIndex !== -1) {
		users.splice(userIndex, 1);
	}
};

everyone.now.distributeMessage = function (message) {
	everyone.now.receiveMessage(this.now.name, message);
};

everyone.now.joinChat = function (username) {
	removeUser(username);
	this.now.listParticipants(users);
	users.push(username);
	everyone.now.newParticipant(username);
};

nowjs.on('disconnect', function () {
	console.log('Quit: ' + this.now.name);
	removeUser(this.now.name);
	everyone.now.participantQuit(this.now.name, users);
});

everyone.now.leaveChat = function (username) {
	removeUser(username);
	everyone.now.participantQuit(username, users);
};