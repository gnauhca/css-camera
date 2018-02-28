import Group from './group.js';
import Light from './light.js'

export default class Scene {
  constructor(container) {
    this.container = container;
    this.viewWrapper = document.createElement('div');
    this.viewWrapper.className = 'CSS3D-view-wrapper';
    this.container.appendChild(this.viewWrapper);
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.faces = [];
    this.objs = [];

    this.lights = [];
    this.ambientLightIntensity = 0;

    this.container.style.perspective = this.container.offsetHeight / 2 + 'px';
  }

  add(obj) {

    let add = (o) => {
      if (o instanceof Group) {
        o.children.forEach(oc => add(oc));
      } else {
        this.viewWrapper.appendChild(o.elem);
        this.faces.push(o);
      }
    }

    this.objs.push(obj);
    add(obj);
  }

  addLight(light) {
    this.lights.push(light);
  }

  setAmbientLightIntensity(ambientLightIntensity) {
    this.ambientLightIntensity = ambientLightIntensity;
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
  }
}