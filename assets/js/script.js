// set the scene size
var WIDTH = 400,
		HEIGHT = 300;

// set some camera attributes
var VIEW_ANGLE = 45,
		ASPECT = WIDTH / HEIGHT,
		NEAR = 0.1,
		FAR = 10000;



var container;
var camera, scene, renderer;

init();

function init() {
	var container = $('#display');
	var renderer = new THREE.CanvasRenderer();
	var camera =
		new THREE.PerspectiveCamera(
			VIEW_ANGLE,
			ASPECT,
			NEAR,
			FAR);
	var scene = new THREE.Scene();

	scene.add(camera);
	camera.position.z = 300;
	renderer.setSize(WIDTH, HEIGHT);
	container.append(renderer.domElement);

	var radius = 100,
			segments = 64,
			rings = 64;

	var sphereMaterial =
		new THREE.MeshLambertMaterial({
			color: 0xCC0000
		});

	var sphere = new THREE.Mesh(
		new THREE.SphereGeometry(
			radius,
			segments,
			rings),

		sphereMaterial);

	// add the sphere to the scene
	scene.add(sphere);

	// create the sphere's material

	// create a point light
	var pointLight =
		new THREE.PointLight(0xFFFFFF);

	// set its position
	pointLight.position.x = 20;
	pointLight.position.y = 50;
	pointLight.position.z = 130;

	// add to the scene
	scene.add(pointLight);

	var pointLight2 =
		new THREE.PointLight(0xFFFFFF);

	// set its position
	pointLight2.position.x = -20;
	pointLight2.position.y = -50;
	pointLight2.position.z = 130;

	// add to the scene
	scene.add(pointLight2);

	renderer.setClearColor( 0x000000, 1 );

	renderer.render(scene, camera);
}