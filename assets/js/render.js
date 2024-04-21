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
const skyTextureColor = skyTextureLoader.load('assets/imgs/skybox/space-cruiser-panels2_albedo.png');


// Create the skybox mesh
const skyboxGeometry = new THREE.BoxGeometry( 500, 500, 500, 100, 100, 100);
const skyboxMaterial = new THREE.MeshBasicMaterial({
    color: 0x1d000,
    wireframe:true,
    map: skyTextureColor,
    side: THREE.BackSide});
const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);

// Add the skybox to the scene
scene.add(skybox);

// Add floor mesh
const floorGeometry = new THREE.CircleGeometry(25, 64, 900, 900);
const floorTextureLoader = new THREE.TextureLoader();
const floorTexture = floorTextureLoader.load('assets/imgs/floor/Texturelabs_Grunge_334L.jpg')
const floorMaterial = new THREE.MeshToonMaterial({

});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.set(0, -4.5, 0);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);



// card texture
const cardTextureLoader = new THREE.TextureLoader();
const cardTexture = cardTextureLoader.load('assets/imgs/ILOVEYOU.png')
const cardMaterial = new THREE.MeshToonMaterial( {map: cardTexture, transparent: true});
cardMaterial.side = THREE.DoubleSide;
//card geo
const geometry = new THREE.BoxGeometry( 3.5, 4.5, 0.1 );
// card mesh
const card = new THREE.Mesh( geometry, cardMaterial );
// card position
card.position.set( 2.5,-1.5, 1,0)
scene.add(card);


// enemy card texture
const EcardTextureLoader = new THREE.TextureLoader();
const EcardTexture = EcardTextureLoader.load('assets/imgs/stuxnet.png')
const EcardMaterial = new THREE.MeshToonMaterial( {map: EcardTexture, transparent: true});
cardMaterial.side = THREE.DoubleSide;
//card geo
const Egeometry = new THREE.BoxGeometry( 3.5, 4.5, 0.1 );
// card mesh
const Ecard = new THREE.Mesh( Egeometry, EcardMaterial );
scene.add(Ecard);
// card position
Ecard.position.set( -5.5,-1.5, -10.0)
const startPoint = new THREE.Vector3(card.position.x, card.position.y, card.position.z)



//setting animation state
let returning = false;


// Setup DragControls
const controls = new DragControls([card], camera, renderer.domElement);
controls.addEventListener('dragend', event =>{
    returning = true;
})





scene.add( new THREE.AmbientLight( 0xcccccc, .15 ) );

const light = new THREE.DirectionalLight( 0xffffff, .5 );
light.position.set( 1, 1, 1 );
scene.add( light );
// Enable shadows
light.castShadow = true;
card.castShadow = true;
Ecard.castShadow = true;
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
    // Ecard.rotation.y += 0.005
    // card.rotation.y += -0.0061
    skybox.rotation.y += -0.0005 
    skybox.rotation.x += -0.0005 
	renderer.render( scene, camera );
}

animate();