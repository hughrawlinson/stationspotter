var Pusher = require( 'pusher' );
var http = require('http');

var pusher = new Pusher({ appId: "38442", key: "1ccd6fd9880863b97f0d", secret: "dd9e528ed20dca277c00" });

http.createServer(function (req, result) {
	console.log('1');
	if (req.method == 'POST') {
		console.log('2');
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
        	console.log('3');
            var POST = qs.parse(body);
            console.log(POST);
            pusher.trigger( "space_apps", "sighting", POST );

        });
    }
}).listen(3000);