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

//mouse pointers
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const skyTextureLoader = new THREE.TextureLoader();
const skyTextureColor = skyTextureLoader.load('assets/imgs/floor/hexspin.png', function(texture){
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
    texture.repeat.set(10, 10);
});


// Create the skybox mesh
const skyboxGeometry = new THREE.SphereGeometry( 100,100, 100);
const skyboxMaterial = new THREE.MeshBasicMaterial({
    color: 0x1d000,
    map: skyTextureColor,
    side: THREE.BackSide
});
const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
// Add the skybox to the scene
scene.add(skybox);

// Add floor mesh
const floorGeometry = new THREE.CircleGeometry(25, 64);
const floorTextureLoader = new THREE.TextureLoader();
const floorTexture = floorTextureLoader.load('assets/imgs/floor/hexspin.png', function(texture){
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
    texture.repeat.set(40, 40);
})
const floorMaterial = new THREE.MeshToonMaterial({
    color: 0xffffff,
    map: floorTexture,
    transparent: true
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.set(0, -4.5, 0);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);



// card texture
const cardTextureLoader = new THREE.TextureLoader();
const cardTexture = cardTextureLoader.load('assets/imgs/ILOVEYOU.png')
const cardMaterial = new THREE.MeshToonMaterial({
    map: cardTexture, 
    emissive: 0x50000, // initially no emissive color
    emissiveIntensity: 1
});
cardMaterial.side = THREE.DoubleSide;
//card geo
const geometry = new THREE.BoxGeometry( 3.5, 4.5, 0.1 );
// card mesh
const card = new THREE.Mesh( geometry, cardMaterial );
// card position
card.position.set( 2.5,-1.5, 1,0)
const startPoint = new THREE.Vector3(card.position.x, card.position.y, card.position.z)
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
const EstartPoint = new THREE.Vector3(Ecard.position.x, Ecard.position.y, Ecard.position.z)


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



//setting animation state
let returning = false;

// Setup DragControls
const controls = new DragControls([card], camera, renderer.domElement);
controls.addEventListener('dragend', event =>{
    returning = true;
})

renderer.physicallyCorrectLights = true; // Optional, for more realistic lighting
renderer.gammaOutput = true; // Ensure gamma correction is enabled

// Enemy card move Logic
renderer.domElement.addEventListener('click', (event) => {
    // Get the mouse position in normalized device coordinates
    mouse.x = event.clientX / window.innerWidth * 2 - 1;
    mouse.y = event.clientY / window.innerHeight * 2 - 1;
    
    // Update the raycaster with the mouse position and camera
    raycaster.setFromCamera(mouse, camera);
    
    // Check for intersections with the Ecard mesh
    const intersects = raycaster.intersectObjects([Ecard]);
    
    // If there's an intersection, move the Ecard
    if (intersects.length > 0) {
      // Get the cursor position in 3D space
      const cursorPosition = intersects[0].point;
      
      // Calculate the relative position of the cursor to the Ecard
      const relativePosition = new THREE.Vector3();
      relativePosition.x = cursorPosition.x - Ecard.position.x;
      relativePosition.y = cursorPosition.y - Ecard.position.y;
      
      // Determine the direction of the movement (left or right)
      const direction = (relativePosition.x > 0) ? 1 : -1;
      
      // Move the Ecard 2 units in the determined direction
      Ecard.position.x += direction * 2;
      
      // Return the Ecard to its start position after a short delay
      setTimeout(() => {
        Ecard.position.x = EstartPoint.x;
      }, 300); // delay
    }
  });




function animate() {
	requestAnimationFrame( animate );

    if(returning){
        card.position.lerp(startPoint, 0.1);
        if (card.position.distanceTo(startPoint)< 0.01){
            card.position.copy(startPoint)
            returning = false;
        }
    }
    floor.rotation.z +=0.001
    // Ecard.rotation.y += 0.005
    // card.rotation.y += -0.0061
    skybox.rotation.y += -0.0015 
    skybox.rotation.x += -0.0015 
	renderer.render( scene, camera );
}

animate();