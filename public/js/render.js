import * as THREE from 'three';
import { DragControls } from 'three/addons/controls/DragControls.js';
import { EffectComposer } from 'three/EffectComposer';
import { RenderPass } from 'three/RenderPass';
import { UnrealBloomPass } from 'three/UnrealBloomPass';
import { CSS2DRenderer, CSS2DObject} from 'three/CSS2DRenderer';
// import {renderCard} from './3dRender/homePage.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

let card;
//setting animation state
let returning = false;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(devicePixelRatio)
renderer.shadowMap.enabled = true;
document.body.appendChild( renderer.domElement );
renderer.physicallyCorrectLights = true; // Optional, for more realistic lighting
renderer.gammaOutput = true; // Ensure gamma correction is enabled

//mouse pointers
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();



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

// Add floor mesh
const floorGeometry = new THREE.CircleGeometry(25, 64);
const floorTextureLoader = new THREE.TextureLoader();
const floorTexture = floorTextureLoader.load('/imgs/floor/hexSpin.png', function(texture){
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
    texture.repeat.set(40, 40);
    
})
const floorMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    map: floorTexture,
    transparent: true
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.set(0, -4.5, 0);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);



let startPoint; // = new THREE.Vector3(card.position.x, card.position.y, card.position.z)
function renderCard(url) {
    console.log('NEW URL FROM TEST',url)
    // card texture
    const cardTextureLoader = new THREE.TextureLoader();
const cardTexture = cardTextureLoader.load(url)
const cardMaterial = new THREE.MeshStandardMaterial({
    map: cardTexture, 
    emissive: 0x000000, // initially no emissive color
    emissiveIntensity: 0
});

cardMaterial.side = THREE.DoubleSide;
//card geo
const cardGeometry = new THREE.BoxGeometry( 3.5, 4.5, 0.1);
// card mesh
card = new THREE.Mesh( cardGeometry, cardMaterial );
// card position
card.position.set(  2.5,-1.5, 1,0)
scene.add(card);
startPoint = new THREE.Vector3(card.position.x, card.position.y, card.position.z)

// Setup DragControls
const controls = new DragControls([card], camera, renderer.domElement);
controls.addEventListener('dragend', event =>{
    returning = true;
})
}

// // card texture
// const cardTextureLoader = new THREE.TextureLoader();
// const cardTexture = cardTextureLoader.load('/imgs/cards/StomWorm.png')
// const cardMaterial = new THREE.MeshToonMaterial({
//     map: cardTexture, 
//     emissive: 0x000000, // initially no emissive color
//     emissiveIntensity: 0
// });
// cardMaterial.side = THREE.DoubleSide;
// //card geo
// const geometry = new THREE.BoxGeometry( 3.5, 4.5, 0.1 );
// // card mesh
// const card = new THREE.Mesh( geometry, cardMaterial );
// // card position
// card.position.set( 2.5,-1.5, 1,0)
// const startPoint = new THREE.Vector3(card.position.x, card.position.y, card.position.z)
// scene.add(card);


// enemy card texture
const EcardTextureLoader = new THREE.TextureLoader();
const EcardTexture = EcardTextureLoader.load('/imgs/cards/stuxnet.png')
const EcardMaterial = new THREE.MeshToonMaterial( {map: EcardTexture,  
  emissive: 0x000000, // initially no emissive color
  emissiveIntensity: 0}

);
EcardMaterial.side = THREE.DoubleSide;
//card geo
const Egeometry = new THREE.BoxGeometry( 3.5, 4.5, 0.1);
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
// renderCard.castShadow = true;
Ecard.castShadow = true;
floor.receiveShadow = true;

camera.position.z = 7.5;



// // Setup DragControls
// const controls = new DragControls([card], camera, renderer.domElement);
// controls.addEventListener('dragend', event =>{
//     returning = true;
// })


// Enemy card move Logic
renderer.domElement.addEventListener('click', (event) => {
  // Get the mouse position in normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the raycaster with the mouse position and camera
  raycaster.setFromCamera(mouse, camera);

  // Check for intersections with the Ecard mesh
  const intersects = raycaster.intersectObjects([Ecard]);

  // If there's an intersection, move the Ecard
  if (intersects.length > 0) {
    // Get the cursor position in 3D space
    const cursorPosition = intersects[0].point;

    // Define the relativePosition object
    const relativePosition = {
      x: cursorPosition.x - Ecard.position.x,
      y: cursorPosition.y - Ecard.position.y
    };

    // Determine the direction of the movement (left or right)
    const direction = Math.random() < 0.5 ? -1 : 1;
    const distance = Math.random() * 4 + 1;

    // Move the Ecard x units in the determined direction
    anime({
      targets: Ecard.position,
      x: Ecard.position.x + direction * distance,
      duration: 50,
      easing: 'easeInOutSine',
    });

    // Return the Ecard to its start position after a short delay
    setTimeout(() => {
      Ecard.position.x = EstartPoint.x;
    }, 350); // delay
  }
});




// // glow effect on attack click
document.querySelector('#attack').addEventListener('click', (event) => {
    event.preventDefault();
    const cardMat = card.material;
    const EcardMat= Ecard.material;
    cardMat.emissive.set(0xffff)
    
    console.log('Animation started!')
    anime({
        targets: cardMat, 
        emissiveIntensity: [0.5, 0.1],
        duration: 150,
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: 2,
        delay: 50,
        complete: () => {;
        }
      });

      setTimeout(() => {
        cardMat.emissive.set(0x000000)
      }, 400);
      
      setTimeout(() => {
        EcardMat.emissive.set(0xff0000)
        anime({
          targets: EcardMat, 
          emissiveIntensity: [0.5, 0.1],
          duration: 150,
          easing: 'easeInOutSine',
          direction: 'alternate',
          loop: 2,
          delay: 50,
          complete: () => {;
          }
        });
      }, 1000)
      setTimeout(() => {
        EcardMat.emissive.set(0x000000)
      },1000 + 400)
  });


  document.querySelector('#nextTurn').addEventListener('click', (event) => {
    event.preventDefault();
    const cardMat = card.material;
    const EcardMat= Ecard.material;
    EcardMat.emissive.set(0xffff)
    
    console.log('Animation started!')
    anime({
        targets: EcardMat, 
        emissiveIntensity: [0.5, 0.1],
        duration: 150,
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: 2,
        delay: 50,
        complete: () => {;
        }
      });

      setTimeout(() => {
        EcardMat.emissive.set(0x000000)
      }, 400);
      
      setTimeout(() => {
        cardMat.emissive.set(0xff0000)
        anime({
          targets: cardMat, 
          emissiveIntensity: [0.5, 0.1],
          duration: 150,
          easing: 'easeInOutSine',
          direction: 'alternate',
          loop: 2,
          delay: 50,
          complete: () => {;
          }
        });
      }, 1000)
      setTimeout(() => {
        cardMat.emissive.set(0x000000)
      },1000 + 400)
  });



  document.querySelector('#defend').addEventListener('click', (event) => {
    event.preventDefault();
    const cardMat = card.material;
    cardMat.emissive.set(0xFFD700)
  anime({
    targets: cardMat,
    emissiveIntensity: [0.2, 0.1],
    duration: 150,
    easing: 'easeInOutSine',
    direction: 'alternate',
    loop: 2,
    delay: 50,
    complete: () => {
      // Hold the glow for 1 second
      setTimeout(() => {
        anime({
          targets: cardMat,
          emissiveIntensity: .3,
          duration: 10,
          easing: 'easeInOutSine'
        });
      }, 500);
    }
  });
  setTimeout(() => {
    cardMat.emissive.set(0x000000)
  },1500);
  
});
// // player take damage
// document.querySelector('#data-').addEventListener('change', (event) => {
//     event.preventDefault();
//     const cardMat = card.material;

//     cardMat.emissive.set(0xa44141)
    
//     console.log('Animation started!')
//     anime({
//         targets: cardMat, 
//         emissiveIntensity: [0.5, 0.1],
//         duration: 150,
//         easing: 'easeInOutSine',
//         direction: 'alternate',
//         loop: 2,
//         delay: 50,
//         complete: () => {
//           console.log('Animation ended!');
//         }
//       });

//       setTimeout(() => {
//         cardMat.emissive.set(0x000000)
//       }, 400);
//   });


const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

// bloom
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = 0.21;
bloomPass.strength = 1.5; // Bloom strength; increase for more intense bloom
bloomPass.radius = 0; // Bloom radius; small value for sharper glow edges

composer.addPass(bloomPass);


renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = Math.pow(1.4, 4.0); // Adjust for desired brightness


function animate() {
	requestAnimationFrame( animate );


    if(returning){
        card.position.lerp(startPoint, 0.1);
        if (card.position.distanceTo(startPoint)< 0.01){
            card.position.copy(startPoint)
            returning = false;
        }
    }
    // render the text
    // labelRenderer.render(scene, camera);

    // Ecard.rotation.y += 0.005
    // card.rotation.y += -0.0061

    floor.rotation.z +=0.001
    skybox.rotation.y += -0.0015 
    skybox.rotation.x += -0.0015 
    composer.render();
}

animate();

export {renderCard}