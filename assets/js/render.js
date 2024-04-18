import * as THREE from 'three';
import { DragControls } from 'three/addons/controls/DragControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


// card texture
const textureLoader = new THREE.TextureLoader();
const cardTexture = textureLoader.load('assets/imgs/image.png')
//card generator
const geometry = new THREE.BoxGeometry( 3.5, 4.5, 0.1 );
const material = new THREE.MeshToonMaterial( {map: cardTexture});
const card = new THREE.Mesh( geometry, material );
scene.add(card);
// card position
card.position.set(-1.5,-1,0)
const startPoint = new THREE.Vector3(card.position.x, card.position.y, card.position.z)

//setting
let returning = false;

// Setup DragControls
const controls = new DragControls([card], camera, renderer.domElement);
controls.addEventListener('dragend', event =>{
    returning = true;
})


// lights
const ambiLight = new THREE.AmbientLight(0x404040)
scene.add(ambiLight);

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(4, 1, 1)
scene.add(light)

// const pointLight = new THREE.PointLight(0xffffff, 1, 100);
// pointLight.position.set(-4, -3, 4);
// scene.add(pointLight);

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
    card.rotation.y += -0.01
	renderer.render( scene, camera );
}

animate();