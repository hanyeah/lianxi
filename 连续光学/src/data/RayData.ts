namespace hanyeah {
  export class RayData {
    public p0: HPoint;
    public p1: HPoint;
    public dir: HPoint;
    public angle: number;
    public light: LightData;
    constructor(p0: HPoint, p1: HPoint, angle: number, light: LightData) {
      this.p0 = p0;
      this.p1 = p1;
      this.dir = new HPoint(p1.x - p0.x, p1.y - p0.y);
      PointUtils.normalize(this.dir);
      this.angle = angle;
      this.light = light;
    }
  }
}
