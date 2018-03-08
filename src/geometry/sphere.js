import Face from '../Face.js';
import Group from '../Group.js';
import { Vector3 } from '../math/Vector3.js';
import { Matrix4 } from '../math/Matrix4.js';
import * as CONST from '../CONST.js';

export default class Sphere extends Group {
  constructor(radiusTop, radiusBottom, height, color, radiusSegment) {
    super();
    this.radiusBottom = radiusBottom;
    this.radiusTop = radiusTop;
    this.height = height;
    this.color = color;
    this.radiusSegment = radiusSegment;

    this.createFaces(radiusTop, radiusBottom, height, color, radiusSegment);
  }

  createFaces(radiusTop, radiusBottom, height, color, radiusSegment) {


    let segmentRadian = Math.PI * 2 / radiusSegment;
    let segmentRadianHalf = segmentRadian / 2;
    let cosSegmentRadianHalf = Math.cos(segmentRadianHalf);
    let sinSegmentRadianHalf = Math.sin(segmentRadianHalf);

    // 顶面
    let topTriangleHeight = radiusTop * cosSegmentRadianHalf;
    let topTriangleWidth = radiusTop * sinSegmentRadianHalf * 2;

    // 底面
    let bottomTriangleHeight = radiusBottom * cosSegmentRadianHalf;
    let bottomTriangleWidth = radiusBottom * sinSegmentRadianHalf * 2;

    // sub
    let endHeightSub = bottomTriangleHeight - topTriangleHeight;
    let endWidthSub = bottomTriangleWidth - topTriangleWidth;
    let endWidthSubHalf = endWidthSub / 2;

    console.log(topTriangleHeight, bottomTriangleHeight);

    // 侧面
    let sideFaceRadian = Math.atan(endHeightSub / height);
    let sideHeight = height / Math.cos(sideFaceRadian);

    let sideBaseMatrix = new Matrix4().makeTranslation(0, sideHeight / 2, 0);

    sideBaseMatrix.multiplyMatrices(
      new Matrix4().makeRotationX(sideFaceRadian),
      sideBaseMatrix
    );

    sideBaseMatrix.multiplyMatrices(
      new Matrix4().makeTranslation(0, -height / 2, topTriangleHeight),
      sideBaseMatrix
    );

    let sideFaceStyles = {
      'height': 0,
      'border-left': `${Math.abs(endWidthSubHalf)}px solid transparent`,
      'border-right': `${Math.abs(endWidthSubHalf)}px solid transparent`
    };
    if (endWidthSub > 0) {
      Object.assign(sideFaceStyles, {
        'border-bottom': `${sideHeight}px solid ${color}`,
        'width': bottomTriangleWidth
      });
    } else {
      Object.assign(sideFaceStyles, {
        'border-top': `${sideHeight}px solid ${color}`,
        'width': topTriangleWidth
      });
    }

    for (let i = 0; i < radiusSegment; i++) {
      let sideFace = new Face();
      let faceMatrix = new Matrix4().makeRotationAxis(
        new Vector3(0, 1, 0),
        i * segmentRadian
      );

      for (let item in sideFaceStyles) {
        let value = sideFaceStyles[item];
  
        if (typeof value === 'number') {
          value += 'px';
        }
  
        sideFace.elem.style[item] = value;
      }


      faceMatrix.multiplyMatrices(
        faceMatrix,
        sideBaseMatrix
      );

      sideFace.setModelMatrix(faceMatrix);
      this.add(sideFace);
    }


  }


  setColor(color) {
    if (!color) {
      return;
    }

    this.color = color;
    for (let key in this.faces) {
      this.faces[key].elem.style.color = color;
    }
  }

}