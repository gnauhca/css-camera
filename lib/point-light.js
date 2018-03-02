export default class Light{
  constructor(position, intensity) {
    this.position = position || [0, -1, 0];
    this.intensity = intensity || 1;
    this.updated = true;
  }

  setNeedUpdate() {
    this.updated = true;;
  }

  setPosition(vec3) {
    this.position = vec3;
    setNeedUpdate();
  }

  setIntensity(intense) {
    this.intensity = intensity;
    setNeedUpdate();
  }

  calBrightness(position, normal, backSide) {
    // overwrite
    
    let lightPosition = [ ...this.position ];
    lightPosition[1] *= -1; 

    let cosOfAngle = glMatrix.vec3.dot(lightPosition, normal) / (glMatrix.vec3.length(lightPosition) * 1);
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