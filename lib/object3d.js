import * as glMatrix from 'gl-matrix';

// console.log(glMatrix.mat4.create());

export default class Object3D {
  constructor() {
    this.position = [0, 0, 0];
    this.rotation = [0, 0, 0];
    this.scale = [1, 1, 1];
    this.modelMatrixNeedUpdate = false;
    this.worldModelMatrixNeedUpdate = false;
    this.modelMatrix = glMatrix.mat4.create();
    this.worldModelMatrix = glMatrix.mat4.create();
    this.normal = [0, 0, 1];
  }

  setNeedUpdate() {
    this.modelMatrixNeedUpdate = true;
    this.worldModelMatrixNeedUpdate = true;
    this.normalNeedUpdate = true;
  }

  setPosition(vec3) {
    this.position = vec3;
    this.setNeedUpdate();
  }

  setRotation(vec3) {
    this.rotation = vec3;
    this.setNeedUpdate();
  }

  setScale(vec3) {
    this.scale = vec3;
    this.setNeedUpdate();
  }

  getModelMatrix() {
    if (!this.modelMatrixNeedUpdate) {
      return this.modelMatrix;
    }

    let matrix = glMatrix.mat4.create();
    let position = [ ...this.position ];

    position[1] *= -1;
    matrix = glMatrix.mat4.translate(
      glMatrix.mat4.create(),
      matrix,
      position
    );

    matrix = glMatrix.mat4.scale(glMatrix.mat4.create(), matrix, this.scale);
    
    matrix = glMatrix.mat4.rotateX(
      glMatrix.mat4.create(),
      matrix,
      this.rotation[0]
    );
    matrix = glMatrix.mat4.rotateY(
      glMatrix.mat4.create(),
      matrix,
      -this.rotation[1]
    );
    matrix = glMatrix.mat4.rotateZ(
      glMatrix.mat4.create(),
      matrix,
      this.rotation[2]
    );

    this.modelMatrix = matrix;
    this.modelMatrixNeedUpdate = false;
    return matrix;
  }

  getWorldModalMatrix() {
    if (!this.worldModelMatrixNeedUpdate) {
      return this.worldModelMatrix;
    }

    let parent = this.parent;
    let matrix = this.getModelMatrix();

    if (parent) {
      glMatrix.mat4.multiply(matrix, parent.getWorldModalMatrix(), matrix);
    }

    this.worldModelMatrixNeedUpdate = false;
    this.worldModelMatrix = matrix;
    return matrix;
  }

  getWorldNormal() {
    if (!this.normalNeedUpdate) {
      return this.normal;
    }

    let start = [0, 0, 0];
    let end = [0, 0, 1];
    let worldModelMatrix = this.getWorldModalMatrix();

    start = glMatrix.vec3.transformMat4(glMatrix.vec3.create(), start, worldModelMatrix);
    end = glMatrix.vec3.transformMat4(glMatrix.vec3.create(), end, worldModelMatrix);

    this.normal = glMatrix.vec3.subtract(glMatrix.vec3.create(), end, start);
    this.normalNeedUpdate = false;
    return this.normal;
  }
  
}