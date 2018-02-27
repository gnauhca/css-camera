import * as glMatrix from 'gl-matrix';


export default function render(scene, camera) {

  let viewMatrix = glMatrix.mat4.create();


  let perspective = scene.height / 2 / Math.tan(camera.fov / 2);
  scene.container.style.perspective = perspective + 'px';
  viewMatrix = camera.getViewMatrix();

  viewMatrix.map(num => num.toFixed(6));
  scene.viewWrapper.style.transform = `translateZ(${perspective}px) matrix3d(${viewMatrix.join(',')})`;

  scene.faces.forEach(face => {
    let faceMatrix = face.getWorldModalMatrix();

    faceMatrix = faceMatrix.map(num => num.toFixed(6));
    face.elem.style.transform = `translate(-50%, -50%) matrix3d(${faceMatrix.join(',')})`;
  });
}