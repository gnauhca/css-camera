require('./index.scss');

import * as CSS3D from './lib/main.js';


let containerElem = document.querySelector('.container');
let containerWidth = containerElem.offsetWidth;
let containerHeight = containerElem.offsetHeight;
let aspect = containerWidth / containerHeight;

let camera = new CSS3D.Camera(Math.PI / 2, aspect);
let scene = new CSS3D.Scene(containerElem);
let face1 = new CSS3D.Face({
  width: 100,
  height: 100
});
let face2 = new CSS3D.Face({
  width: 100,
  height: 100
});
let face3 = new CSS3D.Face({
  width: 100,
  height: 100
});
let face4 = new CSS3D.Face({
  width: 100,
  height: 100
});
let face5 = new CSS3D.Face({
  width: 100,
  height: 100
});
let face6 = new CSS3D.Face({
  width: 100,
  height: 100
});

let plane = new CSS3D.Face({
  width: 500,
  height: 500
});

plane.setPosition([0, -60, 0]);
plane.setRotation([Math.PI / -2, 0, 0]);
plane.elem.style.background = '#ddd';
scene.add(plane);

// face2.elem.style.background = 'rgba(255, 0, 0, 0.5)';

camera.setPosition([0, 0, 300]);
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

scene.add(group);


let cameraRadian = 0;
function tick(){
  cameraRadian += 0.006;

  camera.setPosition([Math.cos(cameraRadian) * 300, Math.sin(cameraRadian) * 300 + 300, Math.sin(cameraRadian) * 300]);
  CSS3D.render(scene, camera);
  window.requestAnimationFrame(tick);
  // setTimeout(tick, 100);

  // group.setRotation([group.rotation[0], group.rotation[1] + 0.006, group.rotation[2]]);
  // group.rotation[1] += 0.01;

  // console.log(group.rotation);
}
tick();

CSS3D.render(scene, camera);
