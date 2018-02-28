import Object3D from './object3d.js';

export default class Group extends Object3D {
  constructor() {
    super();
    this.children = [];
    this.elem = document.createElement('div');
  }

  setNeedUpdate() {
    // overwrite
    this.modelMatrixNeedUpdate = true;
    this.worldModelMatrixNeedUpdate = true;

    this.children.forEach(child => child.setNeedUpdate());
  }

  add(obj) {
    this.children.push(obj);
    obj.parent = this;
  }
}