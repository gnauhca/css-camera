import Object3D from './object3d.js';
import * as glMatrix from 'gl-matrix';

export default class Face extends Object3D {
  constructor(elem) {
    super();

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

}