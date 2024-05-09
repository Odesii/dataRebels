import * as THREE from 'three';
import { DragControls } from 'three/addons/controls/DragControls.js';




const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

let card;
//setting animation state
let returning = false;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


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

let startPoint; // = new THREE.Vector3(card.position.x, card.position.y, card.position.z)
function renderCard(url) {
    console.log('NEW URL FROM TEST',url)
    // card texture
    const cardTextureLoader = new THREE.TextureLoader();
    const cardTexture = cardTextureLoader.load(url)

const cardMaterial = new THREE.MeshBasicMaterial({
    map: cardTexture, 
});
cardMaterial.side = THREE.DoubleSide;
//card geo
const cardGeometry = new THREE.BoxGeometry( 2, 2.5, 0.1 );
// card mesh
card = new THREE.Mesh( cardGeometry, cardMaterial );
// card position
card.position.set( -3.5,0, 1,0)
scene.add(card);
startPoint = new THREE.Vector3(card.position.x, card.position.y, card.position.z)

// Setup DragControls
const controls = new DragControls([card], camera, renderer.domElement);
controls.addEventListener('dragend', event =>{
    returning = true;
})
}


// create Terminal 
const cubeTextureLoader = new THREE.TextureLoader();
const cubeTexture = cubeTextureLoader.load('/imgs/UI/Terminal.png') 
const geometry = new THREE.PlaneGeometry( 5, 2.5);
const material = new THREE.MeshBasicMaterial( { 
    transparent: true,
    map: cubeTexture } );
const cube = new THREE.Mesh( geometry, material );
cube.position.set( .82,0,2)
scene.add( cube );



camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
    if(returning){
        card.position.lerp(startPoint, 0.1);
        if (card.position.distanceTo(startPoint)< 0.01){
            card.position.copy(startPoint)
            returning = false;
        }
    }

    skybox.rotation.y += -0.0015 
    skybox.rotation.x += -0.0015 
	renderer.render( scene, camera );
}

animate();

export  {renderCard}