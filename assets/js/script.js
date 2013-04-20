$("#reporticon").click(function(){
	$("#reportbox").slideDown(300,function(){
		$("#reportbox").children().slideDown(300);
	});
});
$("#closeReportBox").click(function(){
	$("#reportbox").children().hide();
	$("#reportbox").slideUp(300);
});


// set the scene size
var WIDTH = $("body").width() - 20,
		HEIGHT = $("body").height() - 60;

// set some camera attributes
var VIEW_ANGLE = 45,
		ASPECT = WIDTH / HEIGHT,
		NEAR = 0.1,
		FAR = 10000;

var container;
var camera, scene, renderer;
var camerax,cameray,cameraz;
var t;
var centerAltitude;
var initialcameray = 1000;
var directionalLight;
var station;
var stationVector;

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

	t = 0.5;
	scene.add(camera);
	camerax = 300*Math.sin(Math.PI*t);
	cameraz = 300*Math.cos(Math.PI*t);
	cameray = initialcameray;
	centerAltitude = new THREE.Vector3(0,cameray,0);
	stationVector = new THREE.Vector3(80,20,80);
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
			//0.1,
			5,
			segments,
			rings),

		stationMaterial);

	scene.add(station);
	station.position.x = stationVector.x;
	station.position.y = stationVector.y;
	station.position.z = stationVector.z;

	var ambientLight = new THREE.AmbientLight(0x888888,0.1);
        scene.add(ambientLight);

  directionalLight = new THREE.DirectionalLight( 0xFFFFFF, 0.4 );
	directionalLight.position.set( camerax,cameray,cameraz);
	scene.add( directionalLight );

	// create the sphere's material

	// // create a point light
	// var pointLight =
	// 	new THREE.PointLight(0xFFFFFF);

	// // set its position
	// pointLight.position.x = 20;
	// pointLight.position.y = 50;
	// pointLight.position.z = 130;

	// // add to the scene
	// scene.add(pointLight);

	// var pointLight2 =
	// 	new THREE.PointLight(0xFFFFFF);

	// // set its position
	// pointLight2.position.x = -20;
	// pointLight2.position.y = -50;
	// pointLight2.position.z = 130;

	// // add to the scene
	// scene.add(pointLight2);

	renderer.setClearColor( 0x1B1B1B, 1 );

	renderer.render(scene, camera);
}

$("canvas").click(function(){
	cameray = initialcameray;
})
function animate() {
	t += 0.0005;
	stationVector.x = Math.sin(t*Math.pi)*80;
	stationVector.z = Math.cos(t*Math.pi)*80;
	//stationVector.z = Math.sin(t*Math.pi)*60;

	station.position.x = stationVector.x;
	station.position.y = stationVector.y;
	station.position.z = stationVector.z;

	directionalLight.position.set( camerax,cameray,cameraz);
	WIDTH = $("#canvas").width();
	HEIGHT = WIDTH = $("#canvas").height();
	
	// station.translate(stationVector)
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
