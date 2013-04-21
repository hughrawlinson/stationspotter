var Pusher = require( 'pusher' );
var http = require('http');
var url = require('url');

var pusher = new Pusher({ appId: "38442", key: "1ccd6fd9880863b97f0d", secret: "dd9e528ed20dca277c00" });

http.createServer(function (req, result) {
	console.log('1');
	var url_parts = url.parse(request.url, true);
	var query = url_parts.query;
	console.log(query)
	pusher.trigger( "space_apps", "sighting", query );
}).listen(3000);