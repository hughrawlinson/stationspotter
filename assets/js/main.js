require.config({
    baseUrl: 'assets/js/',
    paths: {
        jquery: 'bower_components/jquery/dist/jquery.min',
        threejs: 'bower_components/three.js/three.min'
    }
});


define(['jquery','threejs'],function($){
	var radius = 119;
	var altitude = 7;
	var rotateSpeed = 1;

	setInterval(function(){
		$.ajax({
			url:"http://open-notify-api.herokuapp.com/iss-now.json",
			dataType:"jsonp"
		}).success(parseResponse);
	},100);

	var latitude;
	var longitude;
	var stationPosition = new THREE.Vector3();
	var camerax,cameray,cameraz;
	function parseResponse(data){
		latitude = data.iss_position.latitude;
		longitude = data.iss_position.longitude;

		coords = lla2ecef(latitude,longitude,altitude);
		cameraCoords = lla2ecef(latitude*0.5,longitude,170);
		stationPosition.set(coords[0],coords[1],coords[2]);

		station.position.x = stationPosition.x;
		station.position.y = stationPosition.y;
		station.position.z = stationPosition.z;
		camerax = cameraCoords[0];
		cameray = cameraCoords[1];
		cameraz = cameraCoords[2];
	};

	function lla2ecef(latitudeArg,longitudeArg,altitudeArg) {
		var pi = 3.14159265358979323846;
		var halfPi = 0.5 * pi;
		var twoPi = 2.0 * pi;

		var _latitude = latitudeArg;
		var _longitude = -longitudeArg;

		var fullCircle = 360.0;
		var halfCircle = 180.0;

		var lat = (_latitude / fullCircle) * twoPi;
		var lon = (_longitude / fullCircle) * twoPi;

		while (lat < halfPi) {
		    lat += pi;
		} 

		while (lat > halfPi) {
		    lat -= pi;
		}

		while (lon < -pi) {
		    lon += twoPi;
		}

		while (lon > pi) {
		    lon -= twoPi;
		}

		var xyz = [0, 0, 0]; // output

		xyz[0] = (100+altitudeArg)*Math.cos(lat) * Math.cos(lon);
		xyz[1] = (100+altitudeArg)*Math.sin(lat);
		xyz[2] = (100+altitudeArg)*Math.cos(lat) * Math.sin(lon);

		return xyz;
	}

	// set the scene size
	var WIDTH = $("body").width() - 20,
		HEIGHT = $("body").height() - 60;

	// set some camera attributes
	var VIEW_ANGLE = 45,
		ASPECT = WIDTH / HEIGHT,
		NEAR = 1,
		FAR = 10000;

	var container;
	var camera, scene, renderer;
	var t;
	var center = new THREE.Vector3(0,0,0);
	var initialcameray = 0;
	var directionalLight;
	var station;
	var stationPosition;

	init();
	animate();

	function init() {
		var container = $('#display');
		renderer = new THREE.WebGLRenderer();
		camera =
			new THREE.PerspectiveCamera(
				VIEW_ANGLE,
				ASPECT,
				NEAR,
				FAR);

		scene = new THREE.Scene();

		t = 0;
		scene.add(camera);
		camerax = 300*Math.sin(Math.PI*t);
		cameraz = 300*Math.cos(Math.PI*t);
		cameray = initialcameray;
		
		camera.position.set(camerax,cameray,cameraz);
		camera.lookAt(scene.position);
		renderer.setSize(WIDTH, HEIGHT);
		container.append(renderer.domElement);

		var radius = 100,
				segments = 64,
				rings = 65;
		var texture = THREE.ImageUtils.loadTexture('./assets/img/map.png', {}, function() {
			renderer.render(scene, camera);
		})

		var sphereMaterial =
			new THREE.MeshLambertMaterial({
				//color: 0xCC0000
				map: THREE.ImageUtils.loadTexture( "./assets/img/map.png" ),
				transparent:true
				//map:texture
			});

		var sphere = new THREE.Mesh(
			new THREE.SphereGeometry(
				radius,
				segments,
				rings),

			sphereMaterial);
		sphere.position.set(0,0,0);

		scene.add(sphere);

		var stationMaterial =
			new THREE.MeshLambertMaterial({
				color: 0xe92632
			});

		station = new THREE.Mesh(
			new THREE.SphereGeometry(
				1,
				segments,
				rings),

			stationMaterial);

		scene.add(station);

		var ambientLight = new THREE.AmbientLight(0x222222,0.1);
	        scene.add(ambientLight);

	    directionalLight = new THREE.DirectionalLight( 0xFFFFFF, 0.7 );
		directionalLight.position.set( camerax,cameray,cameraz);
		scene.add( directionalLight );

		renderer.setClearColor( 0x1B1B1B, 1 );

		renderer.render(scene, camera);
	}

	function animate() {
		// t += 0.0005 * rotateSpeed;
		directionalLight.position.set( camerax,cameray,cameraz);
		WIDTH = $("#canvas").width();
		HEIGHT = WIDTH = $("#canvas").height();
		
		// station.translate(stationPosition)
		// camerax = 300*Math.sin(Math.PI*(t));
		// cameraz = 300*Math.cos(Math.PI*(t));
		// cameray = cameray / 1.075;
		
		//center.setY(cameray-(cameray/3.5));
		camera.position.set(camerax,cameray,cameraz);
		camera.lookAt(center);
		// render the 3D scene
		renderer.render( scene, camera );
		// relaunch the 'timer' 
		requestAnimationFrame( animate );
	}

	$(window).resize(function() {
	  var WIDTH = $("body").width() - 20,
				HEIGHT = $("body").height() - 60;
		renderer.setSize(WIDTH, HEIGHT);
		camera.aspect = WIDTH/HEIGHT;
		camera.updateProjectionMatrix();
	});
});