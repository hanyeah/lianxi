/**
 * Created by hanyeah on 2019/8/2.
 */
namespace hanyeah.optical.geom{
  export class SimpleIntersectResult{
    public t: number;
    public geom: Geom;
    public shape: Shape;
    constructor(t: number, geom: Geom, shape: Shape = void 0) {
      this.t = t;
      this.geom = geom;
      this.shape = shape;
    }
  }
}
