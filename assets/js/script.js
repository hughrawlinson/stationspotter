$("#reporticon").click(function(){
	$("#reportbox").toggle();
});






// set the scene size
var WIDTH = 800,
		HEIGHT = 400;

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
var initialcameray = 1000

init();
animate();

function init() {
	var container = $('#display');
	renderer = new THREE.CanvasRenderer();
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
	camera.position.set(camerax,cameray,cameraz);
	camera.lookAt(scene.position);
	renderer.setSize(WIDTH, HEIGHT);
	container.append(renderer.domElement);

	var radius = 100,
			segments = 64,
			rings = 64;
	var texture = THREE.ImageUtils.loadTexture('assets/img/map.png', {}, function() {
		renderer.render(scene, camera);
	})

	var sphereMaterial =
		new THREE.MeshBasicMaterial({
			color: 0xCC0000
			//map:texture
		});

	var sphere = new THREE.Mesh(
		new THREE.SphereGeometry(
			radius,
			segments,
			rings),

		sphereMaterial);

	scene.add(sphere);

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
	WIDTH = $("#canvas").width();
	HEIGHT = WIDTH = $("#canvas").height();
	t += 0.0005;
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
