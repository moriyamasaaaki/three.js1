(function() {
  'use strict';

  var scene;
  var light;
  var ambient;
  var camera;
  var renderer;
  var width = 1440;
  var height = 850;
  var controls;
  var text;
  var loader;
  var count = 200;
  var i;
  var box;


  // scene
  scene = new THREE.Scene();

  // light
  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 100, 30);
  scene.add(light);
  ambient = new THREE.AmbientLight(0x404040);
  scene.add(ambient);

  // camera
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  camera.position.set(200, 100, 300);
  camera.lookAt(scene.position);

  // controls
  controls = new THREE.OrbitControls(camera);
  controls.autoRotate = true;

  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('base').appendChild(renderer.domElement);

   // texture
  loader = new THREE.FontLoader();
  loader.load('js/helvetiker_regular.typeface.json', function(font) {
    createText(font);
    render();
  });



      function createText(font) {

    // text
    text = new THREE.Mesh(
      new THREE.TextGeometry('MASAAKI', {
        font: font,
        weight: "bold",
        size: 30,
        height: 6,
        curveSegments: 5,
      }),
      new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
    );
    text.position.set(-90, 0, 0);
    scene.add(text);
  }



  // picking
  for (i = 0; i < count; i++) {
    box = new THREE.Mesh(
      new THREE.SphereGeometry(10,10, 10),
      new THREE.MeshLambertMaterial({ color:  0xbe3dff })
    );
    box.position.set(
      Math.random() * 500 - 250,
      Math.random() * 300 - 100,
      Math.random() * 500 - 200
    );
    scene.add(box);
  }

  function render() {
      // camera.rotation.x += 0.01;
      // camera.rotation.y += 0.01;
    requestAnimationFrame(render);

    controls.update();
    renderer.render(scene, camera);
  }
  render();

})();
