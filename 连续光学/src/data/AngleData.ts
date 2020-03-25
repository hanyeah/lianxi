namespace hanyeah {
  export class AngleData{
    public p0: HPoint;
    public p1: HPoint;
    public angle: number;
    public d: number;
    constructor(p0: HPoint, p1: HPoint, ang0: number) {
      //
      this.p0 = p0;
      this.p1 = p1;
      this.angle = Utils.formatAngle(PointUtils.getAngle2(p0, p1), ang0);
      this.d = PointUtils.distance(p0, p1);
    }
  } 
}