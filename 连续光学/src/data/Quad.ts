namespace hanyeah {
  export class Quad{
    public p0: QuadPoint = new QuadPoint();
    public p1: QuadPoint = new QuadPoint();
    public p2: QuadPoint = new QuadPoint();
    public p3: QuadPoint = new QuadPoint();
    constructor() {

    }
  }

  export class QuadPoint implements IPoint {
    public x: number;
    public y: number;
    public seg: ISegment;
    constructor(x: number = 0, y: number = 0, seg: ISegment = null) {
      this.x = x;
      this.y = y;
      this.seg = seg;
    }
  }
}
