/**
 * Created by hanyeah on 2019/7/11.
 */
namespace hanyeah.optical.geom {

  export class IntersectResult {
    public static noHit: IntersectResult = new IntersectResult();
    public shape: Shape;
    public geom: Geom;
    public distance: number = Infinity;
    public position: Point;
    public normal: Point;

    constructor() {

    }
  }
}
