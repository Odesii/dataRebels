export function createTextLabels() {
    const testText = document.createElement('div');
    testText.textContent = 'TEST TEST TEST';
    testText.style.marginTop = '-1em'; // Center vertically
  
    // Wrap it in a CSS2DObject
    const labelObject = new CSS2DObject(testText);
    labelObject.position.set(-5.5, 1, -10.0); // Position in 3D space 
    scene.add(labelObject);
  
    // Set up the CSS2DRenderer
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.pointerEvents = 'none';
    document.body.appendChild(labelRenderer.domElement);
  
  
  
    const textCanvas = document.createElement('canvas');
    const textContext = textCanvas.getContext('2d');
    textContext.font = '24px Arial';
    textContext.fillText('Hello, world!', 1, 2, 0);
  
    const textTexture = new THREE.Texture(textCanvas);
    const textSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: textTexture }));
    scene.add(textSprite);
  }
