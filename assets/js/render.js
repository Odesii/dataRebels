import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { DragControls } from 'three/addons/controls/DragControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(devicePixelRatio)
renderer.shadowMap.enabled = true;
document.body.appendChild( renderer.domElement );



const skyTextureLoader = new THREE.TextureLoader();
const skyTexture = skyTextureLoader.load('assets/imgs/skybox.png');


// Create the skybox mesh
const skyboxGeometry = new THREE.SphereGeometry(500, 1000, 500);
const skyboxMaterial = new THREE.MeshBasicMaterial({map: skyTexture, side: THREE.BackSide});
const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);

// Add the skybox to the scene
scene.add(skybox);

// Add floor mesh
const floorGeometry = new THREE.CircleGeometry(22, 64);
const floorMaterial = new THREE.MeshToonMaterial({color: 0x1d000,});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.set(0, -4, 0);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);



// card texture
const cardTextureLoader = new THREE.TextureLoader();
const cardTexture = cardTextureLoader.load('assets/imgs/image.png')
const cardMaterial = new THREE.MeshToonMaterial( {map: cardTexture, transparent: true});
cardMaterial.side = THREE.DoubleSide;
//card geo
const geometry = new THREE.BoxGeometry( 3.5, 4.5, 0.1 );
// card mesh
const card = new THREE.Mesh( geometry, cardMaterial );
scene.add(card);
// card position
card.position.set( 2.5,-1.5, 2,0)
const startPoint = new THREE.Vector3(card.position.x, card.position.y, card.position.z)



//setting animation state
let returning = false;


// Setup DragControls
const controls = new DragControls([card], camera, renderer.domElement);
controls.addEventListener('dragend', event =>{
    returning = true;
})


// lights
// const ambiLight = new THREE.AmbientLight(0x404040)
// scene.add(ambiLight);

const light = new THREE.DirectionalLight(0xffffff, .5)
light.position.set(-4, 1, 1)
scene.add(light)

// Enable shadows
light.castShadow = true;
card.castShadow = true;
floor.receiveShadow = true;
camera.position.z = 7.5;

function animate() {
	requestAnimationFrame( animate );

    if(returning){
        card.position.lerp(startPoint, 0.1);
        if (card.position.distanceTo(startPoint)< 0.01){
            card.position.copy(startPoint)
            returning = false;
        }
    }
    // card.rotation.y += -0.01
	renderer.render( scene, camera );
}

animate();