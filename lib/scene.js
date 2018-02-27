import Group from './group.js';

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

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
  }
}