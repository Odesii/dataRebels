import * as THREE from 'three';
import { EffectComposer } from 'three/EffectComposer';
import { RenderPass } from 'three/RenderPass';
import { UnrealBloomPass } from 'three/UnrealBloomPass';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const cubeTextureLoader = new THREE.TextureLoader();
const cubeTexture = cubeTextureLoader.load('/imgs/UI/GITGUD.png') 
const geometry = new THREE.PlaneGeometry( 6, 3.5);
const material = new THREE.MeshBasicMaterial( { 
    transparent: true,
    map: cubeTexture } );
const cube = new THREE.Mesh( geometry, material );
cube.position.set( 0,0,2)
scene.add( cube );


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


let zDirection = 1; // 1 for forward, -1 for backward
const zSpeed = 0.05; // Speed of movement
const zRange = 2.5; // Half the range (amplitude)


function animate() {
	requestAnimationFrame( animate );

    cube.position.z += zDirection * zSpeed;
    if (cube.position.z > zRange || cube.position.z < -zRange) {
        zDirection *= -1;
    }

    skybox.rotation.y += -0.0015 
    skybox.rotation.x += -0.0015 
	renderer.render( scene, camera );
}

animate();