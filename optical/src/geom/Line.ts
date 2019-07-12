/**
 * Created by hanyeah on 2019/7/11.
 */
namespace hanyeah.optical.geom {
  export class Line implements IGeom {
    public p1: Point;
    public p2: Point;

    constructor(p1: Point, p2: Point) {
      this.p1 = p1.clone();
      this.p2 = p2.clone();
    }

    public clone(): Line {
      return new Line(this.p1, this.p2);
    }

    public intersect(ray: Ray): IntersectResult {
      const b: Point = Point.sub(this.p2, this.p1);
      const db: Number = ray.dir.cross(b);
      if (db !== 0) {
        const a: Point = Point.sub(ray.sp, this.p1);
        const ab: Number = a.cross(b);
        const t = ab / db;
        if (t > 0){
          const result: IntersectResult = new IntersectResult();
          result.geom = this;
          result.distance = t;
          result.position = ray.getPoint(result.distance);
          const normal = Point.rot90(b);
          normal.normalize(ray.dir.dot(normal) > 0 ? -1 : 1);
          result.normal = normal;
          return result;
        }
      }
      return IntersectResult.noHit;
    }

  }
}
