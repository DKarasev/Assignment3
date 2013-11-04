var express = require('express');
var bpAppRoutes = require('./routes/bp-app');

var app = express();

// Configuration:
var PORT = 3007;
app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.set('view options', { layout : false });
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});

// Routes for BP app:
app.get('/bp-measurements/', bpAppRoutes.getMeasurements);
app.post('/bp-measurements/', bpAppRoutes.postNewMeasurement);
app.get('/bp-measurement/:mid', bpAppRoutes.getMeasurement);

console.log('App to listen on port ' + PORT);
app.listen(PORT);

