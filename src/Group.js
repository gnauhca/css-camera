import Object3D from './Object3D.js';

export default class Group extends Object3D {
  constructor() {
    super();
    this.elemMatrixNeedUpdate = true; // 元素 Matrix 是否需要更新

    this.children = [];
    this.elem = document.createElement('div');

    const defaultStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      'transform-style': 'preserve-3d'
    };

    for (let item in defaultStyle) {
      let value = defaultStyle[item];

      if (typeof value === 'number') {
        value += 'px';
      }

      this.elem.style[item] = value;
    }
  }

  setNeedUpdate() {
    // overwrite
    super.setNeedUpdate();
    this.elemMatrixNeedUpdate = true;

    this.children.forEach(child => {
      child.normalNeedUpdate = true;
      child.worldModelMatrixNeedUpdate = true;
    });
  }

  add(obj) {
    this.children.push(obj);
    obj.parent = this;

    if (obj.elem) {
      this.elem.appendChild(obj.elem);
    }
  }

  // updateElemMatrix() {
  //   if (this.elemMatrixNeedUpdate) {
  //     let modelMatrix = this.getModelMatrix().elements.map(num => num.toFixed(6));
      
  //     this.elem.style.transform = `translate(-50%, -50%) matrix3d(${modelMatrix.join(',')})`;
  //     this.elemMatrixNeedUpdate = false;
  //   }
  // }


}