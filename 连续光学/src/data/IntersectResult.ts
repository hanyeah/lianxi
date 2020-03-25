namespace hanyeah {
  export class IntersectResult {
    public p: IPoint;
    public seg: Segment;
    public d: number;
    public ray: RayData;
    constructor(p: IPoint, seg: Segment, d: number, ray: RayData) {
      this.p = p;
      this.seg = seg;
      this.d = d;
      this.ray = ray;
    }
  }
}