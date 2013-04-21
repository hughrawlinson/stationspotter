$(".customModalTrigger").click(function(){
	$($(this).attr("data-targetid")).slideDown(300,function(){
		$($(this).attr("data-targetid")).children().slideDown(300);
	});
});
$("#customModalClose").click(function(){
	$($(this).attr("data-targetid")).children().hide();
	$($(this).attr("data-targetid")).slideUp(300);
});

var radius = 119;
var altitude = 7;

setInterval(function(){
	$("body").append("<script type='text/javascript' src='http://open-notify-api.herokuapp.com/iss-now.json?callback=parseResponse&_=1366507466900'></script>")
},1000);

var latitude;
var longitude;
function parseResponse(data){
  latitude = data.data.iss_position.latitude;
	longitude = data.data.iss_position.longitude;

	coords = lla2ecef(latitude,longitude,altitude);
	stationPosition = new THREE.Vector3(coords[0],coords[1],coords[2]);

	station.position.x = stationPosition.x;
	station.position.y = -stationPosition.y;
	station.position.z = stationPosition.z;
};

function lla2ecef(latitude,longitude,altitude) {
	var lat = latitude*Math.PI/180.0;
	var lon = longitude*Math.PI/180.0;
	var alt = altitude;
	
	var xyz = [0, 0, 0]; // output
	
	var A = 100.0;			// earth semimajor axis in meters 
	var F = 0; 	// reciprocal flattening 
	var E2 = 2*F - F*F; // eccentricity squared 
	
	var chi = Math.sqrt(1-E2*Math.sin(lat)*Math.sin(lat));
	
	xyz[0] = (A/chi + alt)*Math.cos(lat)*Math.cos(lon);
	xyz[1] = (A/chi + alt)*Math.cos(lat)*Math.sin(lon);
	xyz[2] = (A*(1.0-E2)/chi + alt)*Math.sin(lat);
	
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
var camerax,cameray,cameraz;
var t;
var centerAltitude;
var initialcameray = 1000;
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
	centerAltitude = new THREE.Vector3(0,cameray,0);
	
	camera.position.set(camerax,cameray,cameraz);
	camera.lookAt(scene.position);
	renderer.setSize(WIDTH, HEIGHT);
	container.append(renderer.domElement);

	var radius = 100,
			segments = 64,
			rings = 65;
	var texture = THREE.ImageUtils.loadTexture('assets/img/map.png', {}, function() {
		renderer.render(scene, camera);
	})

	var sphereMaterial =
		new THREE.MeshLambertMaterial({
			//color: 0xCC0000
			map: THREE.ImageUtils.loadTexture( "assets/img/map.png" ),
			transparent:true
			//map:texture
		});

	var sphere = new THREE.Mesh(
		new THREE.SphereGeometry(
			radius,
			segments,
			rings),

		sphereMaterial);

	scene.add(sphere);

	var stationMaterial =
		new THREE.MeshLambertMaterial({
			color: 0xD7D7D7
		});

	station = new THREE.Mesh(
		new THREE.SphereGeometry(
			1,
			segments,
			rings),

		stationMaterial);

	scene.add(station);

	var ambientLight = new THREE.AmbientLight(0x888888,0.1);
        scene.add(ambientLight);

  directionalLight = new THREE.DirectionalLight( 0xFFFFFF, 0.4 );
	directionalLight.position.set( camerax,cameray,cameraz);
	scene.add( directionalLight );

	renderer.setClearColor( 0x1B1B1B, 1 );

	renderer.render(scene, camera);
}

$("canvas").click(function(){
	cameray = initialcameray;
})
function animate() {
	t += 0.0005;
	directionalLight.position.set( camerax,cameray,cameraz);
	WIDTH = $("#canvas").width();
	HEIGHT = WIDTH = $("#canvas").height();
	
	// station.translate(stationPosition)
	camerax = 300*Math.sin(Math.PI*t);
	cameraz = 300*Math.cos(Math.PI*t);

	cameray = cameray / 1.075;
	centerAltitude.setY(cameray-(cameray/3.5));
	camera.position.set(camerax,cameray,cameraz);
	camera.lookAt(centerAltitude);
	// render the 3D scene
	renderer.render( scene, camera );
	// relaunch the 'timer' 
	requestAnimationFrame( animate );
}

// ## Render the 3D Scene
function render() {
	// actually display the scene in the Dom element
	renderer.render( scene, camera );
}
$(window).resize(function() {
  var WIDTH = $("body").width() - 20,
			HEIGHT = $("body").height() - 60;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH/HEIGHT;
	camera.updateProjectionMatrix();
});
