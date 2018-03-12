import Group from './Group.js';
import Face from './Face.js';

class Renderer {
  constructor(options) {
    let defaults = {
      lightEffect: false,
      clearColor: ''
    };

    options = Object.assign(defaults, options);
    this.options = options;
  }

  setObj(obj, lights, lightsUpdated) {
    if (obj instanceof Face) {

      if (this.options.lightEffect && (lightsUpdated || obj.normalNeedUpdate)) {
        let faceNormal = obj.getWorldNormal();
        let sumBrightness = 0;

        lights.forEach(light => {
          sumBrightness += light.calBrightness(obj.position, faceNormal, obj.backside);
        });

        obj.setBrightness(sumBrightness);
        obj.updateElemBrightness();
      };

      obj.updateElemMatrix();

    } else if (obj instanceof Group && obj.children.length > 0) {
      obj.updateElemMatrix();
      obj.children.forEach(child => this.setObj(child, lights));
    }
  }


  render(scene, camera) {
    let viewMatrixUpdated = camera.viewMatrixNeedUpdate;
    let viewMatrix = camera.getViewMatrix().elements.map(num => num.toFixed(6));

    let perspectiveUpdated;

    if (scene.sizeUpdated || camera.configUpdated) {
      let perspective = scene.height / 2 / Math.tan(camera.fov / 2);
      perspectiveUpdated = true;
      if (camera.fov) {
        scene.container.style.perspective = `${perspective}px`;
      }

      scene.sizeUpdated = false;
      camera.configUpdated = false;
    }

    if (perspectiveUpdated || viewMatrixUpdated) {
      let perspective = scene.height / 2 / Math.tan(camera.fov / 2);
      
      scene.viewWrapper.style.transform = `translateZ(${perspective}px) matrix3d(${viewMatrix.join(',')})`;
    }
    
  
    // 光照处理
    let lightsUpdated = false;
  
    scene.lights.forEach(light => {
      lightsUpdated = lightsUpdated || light.updated;
      light.updated = false;
    });
    scene.lights.forEach(light => {
      lightsUpdated = lightsUpdated || light.updated;
      light.updated = false;
    });

    scene.objs.forEach(obj => {
      this.setObj(obj, scene.lights, lightsUpdated);
    });

  }


}


export default Renderer;