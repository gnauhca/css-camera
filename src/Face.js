import Object3D from './Object3D.js';
import * as util from './util/util.js';

export default class Face extends Object3D {
  constructor(elem) {
    super();
    this.elemMatrixNeedUpdate = true; // 元素 Matrix 是否需要更新
    this.elemLightNeedUpdate = true; // 元素 亮度 是否需要更新
    this.brightness = 1; // 元素亮度
    
    const faceStyles = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      overflow: 'hidden',
      'box-sizing': 'border-box',
      // 'backface-visibility': 'hidden'
    };

    this.elem = elem || document.createElement('div');

    util.setStyles(this.elem, faceStyles);
    
  }

  setNeedUpdate() {
    super.setNeedUpdate();
    this.elemMatrixNeedUpdate = true;
    this.elemLightNeedUpdate = true;
  }

  setBrightness(brightness) {
    if (this.brightness !== brightness) {
      this.brightness = brightness;
      this.elemLightNeedUpdate = true;
    }
  }

  updateElemBrightness() {
    if (this.elemLightNeedUpdate) {
      this.elem.style.filter = `brightness(${this.brightness})`;
      this.elemLightNeedUpdate = false;
    }
  }

}