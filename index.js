import * as CSS3D from './lib/main.js';
import Box from './lib/geometry/box.js';
import Light from './lib/light.js';
import Stats from 'stats.js';
import * as glMatrix from 'gl-matrix';

let stats = new Stats();
document.body.appendChild( stats.dom );

require('./index.scss');

let containerElem = document.querySelector('.container');
let containerWidth = containerElem.offsetWidth;
let containerHeight = containerElem.offsetHeight;
let aspect = containerWidth / containerHeight;

let camera = new CSS3D.Camera(Math.PI / 4, aspect);
let scene = new CSS3D.Scene(containerElem);

let face1 = new CSS3D.Face();
let face2 = new CSS3D.Face();
let face3 = new CSS3D.Face();
let face4 = new CSS3D.Face();
let face5 = new CSS3D.Face();
let face6 = new CSS3D.Face();

face1.elem.className = 'face'
face2.elem.className = 'face'
face3.elem.className = 'face'
face4.elem.className = 'face'
face5.elem.className = 'face'
face6.elem.className = 'face'

// let plane = new CSS3D.Face({
//   width: 500,
//   height: 500
// });

// plane.setPosition([0, -60, 0]);
// plane.setRotation([Math.PI / -2, 0, 0]);
// plane.elem.style.background = '#ddd';
// scene.add(plane);

// face2.elem.style.background = 'rgba(255, 0, 0, 0.5)';

camera.setPosition([-100, 100, 300]);
camera.setLookAt([0, 0, 0]);

face1.setPosition([0, 0, 55]); 
face2.setPosition([0, 0, -55]);
face3.setPosition([0, -55, 0]); 
face4.setPosition([0, 55, 0]);
face5.setPosition([55, 0, 0]); 
face6.setPosition([-55, 0, 0]);

// face.setScale([0.5, 1, 1]);
// face1.setRotation([Math.PI / -4, 0, 0]);
face2.setRotation([Math.PI, 0, 0]);
face3.setRotation([Math.PI / -2, 0, 0]);
face4.setRotation([Math.PI / 2, 0, 0]);
face5.setRotation([0, Math.PI / -2, 0]);
face6.setRotation([0, Math.PI / 2, 0]);
// face2.setRotation([Math.PI / -2, 0, 0]);
// scene.add(face1);
// scene.add(face2);
// scene.add(face3);
// scene.add(face4);
// scene.add(face5);
// scene.add(face6);

let group = new CSS3D.Group();


group.add(face1);
group.add(face2);
group.add(face3);
group.add(face4);
group.add(face5);
group.add(face6);

// scene.add(group); rotateX(10deg) rotateY(10deg)


let box = new Box(100, 50, 80, '#abcdef');
// scene.add(box);

let box2 = new Box(50, 50, 50, 'red');
box2.setPosition([100, 0, 0]);
// scene.add(box2);

let box3 = new Box(50, 50, 50, '#223412');
box3.setPosition([-100, 0, 0]);
// scene.add(box3);


let boxes = [];
let boxWidthCount = 5;
let boxWidthCountHalf = boxWidthCount / 2;

for (let x = 0; x < boxWidthCount; x++) {
  for (let y = 0; y < boxWidthCount; y++) {
    let color = `rgba(${(Math.random() * 255) | 0}, ${(Math.random() * 255) | 0}, ${(Math.random() * 255) | 0}, ${(Math.random().toFixed(6))}, )`;
    let count = x * boxWidthCount + y
    // console.log(color);
    
    boxes[count] = new Box(20, 20, 20, `rgba(${(Math.random() * 255) | 0}, ${(Math.random() * 255) | 0}, ${(Math.random() * 255) | 0}, 1)`);
    boxes[count].setPosition([(x - boxWidthCountHalf) * 30, (y - boxWidthCountHalf) * 30, (Math.random() - 0.5) * 300 ]);
    
    boxes[count].rotationAdd = [Math.random() * 0.06, Math.random() * 0.06, Math.random() * 0.06];
    
    scene.add(boxes[count]);
  }
}

let light = new Light([-1.5, 1, 0.6], 1);
scene.addLight(light);
scene.ambientLightIntensity = 0.3


window.glMatrix = glMatrix;


let renderer = new CSS3D.Renderer({
  lightEffect: true
});

renderer.render(scene, camera);
let cameraRadian = 0;
function tick(){
  // cameraRadian += 1.57;
  cameraRadian += 0.007;

  camera.setPosition([Math.cos(cameraRadian) * 300, Math.sin(cameraRadian) * 300, Math.sin(cameraRadian) * 300]);
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
  // setTimeout(tick, 1000);

  // box.setRotation([box.rotation[0] + 0.02, box.rotation[1] + 0.006, box.rotation[2] + 0.04]);
  // box2.setRotation([box2.rotation[0] + 0.05, box2.rotation[1] + 0.001, box2.rotation[2] + 0.04]);
  // box3.setRotation([box3.rotation[0] + 0.06, box3.rotation[1] + 0.003, box3.rotation[2] + 0.01]);
  // box.rotation[1] += 0.01;

  for (let x = 0; x < boxWidthCount; x++) {
    for (let y = 0; y < boxWidthCount; y++) {
      // console.log(x + y);
      let count = x * boxWidthCount + y; //break;
      boxes[count].setRotation([
        boxes[count].rotation[0] + boxes[count].rotationAdd[0], 
        boxes[count].rotation[1] + boxes[count].rotationAdd[1], 
        boxes[count].rotation[2] + boxes[count].rotationAdd[2]
      ]);
    }
  }
  stats.update();
}
tick();
