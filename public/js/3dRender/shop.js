import * as THREE from 'three';




const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );



//wip 
const wipTextureLoader =new THREE.TextureLoader();
const wipTexture = wipTextureLoader.load('/imgs/UI/wip.png')
const wipMaterial = new THREE.MeshBasicMaterial({
    transparent: true,
    map: wipTexture
})
const wipGeometry = new THREE.PlaneGeometry(2, 1);
const wip = new THREE.Mesh(wipGeometry, wipMaterial)
wip.position.set( -3.8,1.6,1)
scene.add( wip );


// Create the skybox mesh
const skyTextureLoader = new THREE.TextureLoader();
const skyTextureColor = skyTextureLoader.load('/imgs/floor/hexSpin.png', function(texture){
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
    texture.repeat.set(10, 10);
});

const skyboxGeometry = new THREE.SphereGeometry( 100,100, 100);
const skyboxMaterial = new THREE.MeshBasicMaterial({
    color: 0x1d000,
    map: skyTextureColor,
    side: THREE.BackSide
});
const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
// Add the skybox to the scene
scene.add(skybox);



camera.position.z = 5;




anime({
  targets: wip.position,
//   x: [-1.5, -1.3], // sway range
  z: [1.5, 1.4], // sway range
  duration: 1500, // 2 seconds
  easing: 'easeInOutSine',
  loop: true, // repeat the animation
  direction: 'alternate' // sway back and forth
});


function animate() {
	requestAnimationFrame( animate );

    skybox.rotation.y += -0.0015 
    skybox.rotation.x += -0.0015 
	renderer.render( scene, camera );
}

animate();