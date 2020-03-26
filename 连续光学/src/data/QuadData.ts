namespace hanyeah {
  export class QuadData{
    public sp: QuadPoint = new QuadPoint();
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
    public seg: Segment;
    constructor(x: number = 0, y: number = 0, seg: Segment = null) {
      this.x = x;
      this.y = y;
      this.seg = seg;
    }
  }
}
