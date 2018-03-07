import Light from './Light.js';

export default class DirectionLight extends Light {
  constructor(position, intensity) {
    super();
    this.position = position || new Vector3(0, 1, 0);
    this.intensity = intensity || 1;
    this.updated = true;
  }

  setNeedUpdate() {
    this.updated = true;;
  }

  setPosition(x, y, z) {
    this.position.set(x, y, z);
    this.setNeedUpdate();
  }

  setPositionX(x) {
    this.position.x = x;
    this.setNeedUpdate();
  }

  setPositionY(y) {
    this.position.y = y;
    this.setNeedUpdate();
  }

  setPositionZ(z) {
    this.position.z = z;
    this.setNeedUpdate();
  }


  setIntensity(intense) {
    this.intensity = intensity;
    setNeedUpdate();
  }

  calBrightness(position, normal, backSide) {
    // overwrite

    let lightPosition = this.position.clone();;
    // lightPosition.y *= -1; 

    let cosOfAngle = lightPosition.dot(normal) / (lightPosition.length() * 1);
    let brightness = 0;

    if (backSide) {
      brightness = Math.abs(cosOfAngle);
    } else {
      brightness = cosOfAngle < 0 ? 0 : cosOfAngle;
    }

    // console.log(brightness);

    return brightness;
  }

}