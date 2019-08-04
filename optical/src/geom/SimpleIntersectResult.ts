/**
 * Created by hanyeah on 2019/8/2.
 */
namespace hanyeah.optical.geom{
  export class SimpleIntersectResult{
    public t: number;
    public geom: Geom;
    constructor(t: number, geom: Geom) {
      this.t = t;
      this.geom = geom;
    }
  }
}
