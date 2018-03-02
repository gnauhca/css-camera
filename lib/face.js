import Object3D from './object3d.js';
import * as glMatrix from 'gl-matrix';

export default class Face extends Object3D {
  constructor(elem) {
    super();
    this.elemMatrixNeedUpdate = true; // 元素 Matrix 是否需要更新
    this.elemLightNeedUpdate = true; // 元素 亮度 是否需要更新
    this.brightness = 1; // 元素亮度
    
    const defaultStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      'backface-visibility': 'hidden'
    };

    this.elem = elem || document.createElement('div');

    for (let item in defaultStyle) {
      let value = defaultStyle[item];

      if (typeof value === 'number') {
        value += 'px';
      }

      this.elem.style[item] = value;
    }
    
  }

  setNeedUpdate() {
    super.setNeedUpdate();
    this.elemTransformNeedUpdate = true;
    this.elemLightNeedUpdate = true;
  }

  setBrightness(brightness) {
    if (this.brightness !== brightness) {
      this.brightness = brightness;
      this.elemLightNeedUpdate = true;
    }
  }

  updateElemMatrix() {
    if (this.elemMatrixNeedUpdate) {
      let modelMatrix = this.getModelMatrix().map(num => num.toFixed(6));
      
      this.elem.style.transform = `translate(-50%, -50%) matrix3d(${modelMatrix.join(',')})`;
      this.elemMatrixNeedUpdate = false;
    }
  }

  updateElemBrightness() {
    if (this.elemLightNeedUpdate) {
      this.elem.style.filter = `brightness(${this.brightness})`;
      this.elemLightNeedUpdate = false;
    }
  }

}