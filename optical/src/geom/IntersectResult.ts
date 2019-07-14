/**
 * Created by hanyeah on 2019/7/11.
 */
namespace hanyeah.optical.geom {

  export class IntersectResult {
    public static noHit: IntersectResult = new IntersectResult();
    public geom: IGeom;
    public distance: number;
    public position: Point;
    public normal: Point;

    constructor() {

    }
  }
}
