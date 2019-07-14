/**
 * Created by hanyeah on 2019/7/11.
 */
namespace hanyeah.optical.geom {
  export class Line2 extends Geom {
    public p1: Point;
    public p2: Point;

    constructor(p1: Point, p2: Point) {
      super();
      this.p1 = p1.clone();
      this.p2 = p2.clone();
    }

    public clone(): Line2 {
      return new Line2(this.p1, this.p2);
    }

    public intersectT(ray: Ray): number[] {
      const result: number[] = [];
      const b: Point = Point.sub(this.p2, this.p1);
      const db: number = ray.dir.cross(b);
      if (db !== 0) {
        const a: Point = Point.sub(ray.sp, this.p1);
        const ab: number = a.cross(b);
        const t = ab / db;
        if (t > 0){
          result.push(t);
        }
      }
      return result;
    }

    public getNormal(p: Point, normalize: boolean = false): Point{
      const b: Point = Point.sub(this.p2, this.p1);
      const normal = Point.rotNeg90(b);
      if (normalize) {
        normal.normalize(1);
      }
      return normal;
    }

  }
}
