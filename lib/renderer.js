import * as glMatrix from 'gl-matrix';

export default class Renderer {
  constructor(options) {
    let defaults = {
      lightEffect: false,
      clearColor: ''
    };

    options = Object.assign(defaults, options);
    this.options = options;
  }

  render(scene, camera) {
    let viewMatrix = glMatrix.mat4.create();
    let perspective = scene.height / 2 / Math.tan(camera.fov / 2);
    scene.container.style.perspective = perspective + 'px';
    viewMatrix = camera.getViewMatrix();
  
    viewMatrix.map(num => num.toFixed(6));
    scene.viewWrapper.style.transform = `translateZ(${perspective}px) matrix3d(${viewMatrix.join(',')})`;
  
  
    let lightsUpdated = false;
  
    // 光是否有更新
    scene.lights.forEach(light => {
      lightsUpdated = lightsUpdated || light.updated;
      light.updated = false;
    });
    scene.lights.forEach(light => {
      lightsUpdated = lightsUpdated || light.updated;
      light.updated = false;
    });
  
    scene.faces.forEach((face, i) => {
      let faceMatrix = face.getWorldModalMatrix();
  
      faceMatrix = faceMatrix.map(num => num.toFixed(6));
      face.elem.style.transform = `translate(-50%, -50%) matrix3d(${faceMatrix.join(',')})`;
  
      if (this.options.lightEffect) {
        // 面的法向量（世界坐标）改变，重新计算光照
        if (lightsUpdated || face.normalNeedUpdate) {
          let faceNormal = face.getWorldNormal();
          let totalBrightness = 0;

          scene.lights.forEach(light => {
            let lightDirection = light.position.map((v, i) => { return v * -1 });
            lightDirection[1] *= -1; 

            let cosOfAngle = glMatrix.vec3.dot(lightDirection, faceNormal) / (glMatrix.vec3.length(lightDirection) * 1);
            let brightness = 0;

            cosOfAngle *= -1;
            brightness = cosOfAngle < 0 ? 0 : cosOfAngle;
            totalBrightness += brightness;
          });

          totalBrightness += scene.ambientLightIntensity;
          face.elem.style.filter = `brightness(${totalBrightness})`;
          
        }
      }

  
    });
  }


}
