import Face from '../face.js';
import Group from '../group.js';
import * as CONST from '../const.js';

export default class Box extends Group {
  constructor(width, height, depth, color) {
    super();
    this.width = width;
    this.height = height;
    this.depth = depth;

    this.faces = {
      front: new Face(),
      back: new Face(),
      left: new Face(),
      right: new Face(),
      top: new Face(),
      bottom: new Face()
    };

    this.setSize(width, height, depth);

    for (let key in this.faces) {
      this.faces[key].elem.style.background = color;
      this.add(this.faces[key]);
    }
  }

  setSize(width, height, depth) {
    this.faces.front.setPosition([0, 0, depth / 2]);
    this.faces.front.elem.style.width = width + 'px';
    this.faces.front.elem.style.height = height + 'px';

    this.faces.back.setPosition([0, 0, -depth / 2]);
    this.faces.back.rotation[0] = CONST.R180;
    this.faces.back.elem.style.width = width + 'px';
    this.faces.back.elem.style.height = height + 'px';

    this.faces.left.setPosition([-width / 2, 0, 0]);
    this.faces.left.rotation[1] = CONST.R90;
    this.faces.left.elem.style.width = depth + 'px';
    this.faces.left.elem.style.height = height + 'px';

    this.faces.right.setPosition([width / 2, 0, 0]);
    this.faces.right.rotation[1] = -CONST.R90;
    this.faces.right.elem.style.width = depth + 'px';
    this.faces.right.elem.style.height = height + 'px';

    this.faces.top.setPosition([0, height / 2, 0]);
    this.faces.top.rotation[0] = CONST.R90;
    this.faces.top.elem.style.width = width + 'px';
    this.faces.top.elem.style.height = depth + 'px';

    this.faces.bottom.setPosition([0, -height / 2, 0]);
    this.faces.bottom.rotation[0] = -CONST.R90;
    this.faces.bottom.elem.style.width = width + 'px';
    this.faces.bottom.elem.style.height = depth + 'px';
  }

  setColor(color) {
    if (!color) {
      return;
    }

    this.color = color;
    for (let key in this.faces) {
      this.faces.elem.style.color = color;
    }
  }

}