var express = require('express');
var app = express.createServer();
var property = require('property');
var nowjs = require('now');

app.configure(function () {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.bodyParser());
	
	app.use(express['static'](__dirname + '/../site/assets'));
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

everyone.now.distributeMessage = function (message) {
  everyone.now.receiveMessage(this.now.name, message);
};