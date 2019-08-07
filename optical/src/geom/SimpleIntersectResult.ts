/**
 * Created by hanyeah on 2019/8/2.
 */
namespace hanyeah.optical.geom{
  export class SimpleIntersectResult{
    public t: number;
    public geom: Geom;
    public shape: Shape;
    public localRay: Ray;
    constructor(t: number = Infinity, geom: Geom = void 0, shape: Shape = void 0, localRay: Ray = void 0) {
      this.t = t;
      this.geom = geom;
      this.shape = shape;
      this.localRay = localRay;
    }
  }
}
