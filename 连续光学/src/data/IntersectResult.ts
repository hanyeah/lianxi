namespace hanyeah {
  export class IntersectResult {
    public p: IPoint;
    public seg: Segment;
    public d: number;
    constructor(p: IPoint, seg: Segment, d: number) {
      this.p = p;
      this.seg = seg;
      this.d = d;
    }
  }
}