/**
 * Created by hanyeah on 2019/8/2.
 */
namespace hanyeah.optical.geom{
  export class SimpleIntersectResult{
    public t: number;
    public UID: number;
    constructor(t: number, UID: number) {
      this.t = t;
      this.UID = UID;
    }
  }
}
