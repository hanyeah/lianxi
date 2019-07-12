/**
 * Created by hanyeah on 2019/7/12.
 */
namespace hanyeah.optical.geom {
  /**
   * 双曲线。
   * x^2 / a^2 - y^2 / b^2 = 1
   */
  export class Hyperbola implements IGeom {

    public a: Number;
    public b: Number;
    private c: Number;

    constructor(a: Number, b: Number) {
      this.setAB(a, b);
    }

    public clone(): Hyperbola {
      return new Hyperbola(this.a, this.b);
    }

    public setAB(a: Number, b: Number) {
      this.a = Math.abs(a);
      this.b = Math.abs(b);
      this.calcC();
    }

    public calcC() {
      this.c = Math.sqrt(this.a * this.a + this.b * this.b);
    }

    public intersect(ray: Ray): IntersectResult {
      const a2: Number = this.a * this.a;
      const b2: Number = this.b * this.b;
      const pab: Point = new Point(this.a, this.b);
      const a: Number = ray.dir.dot(pab) * ray.dir.cross(pab);
      const b: Number = 2 * (ray.sp.x * ray.dir.x * b2 - ray.sp.y * ray.dir.y * a2);
      const c: Number = ray.sp.dot(pab) * ray.sp.cross(pab);
      let t;
      if (a === 0) {
        t = -c / b;
      } else {
        const delta: Number = b2 - 4 * a * c;
        if (delta >= 0) {
          const a02: Number = a * 2;
          const sqrDelta: Number = Math.sqrt(delta);
          t = (-b - sqrDelta) / a02;
          if (!(t > 0 && ray.sp.x + ray.dir.x * t > 0)) {
            t = (-b + sqrDelta) / a02;
          }
        }
      }
      if (t > 0) {
        const result: IntersectResult = new IntersectResult();
        result.geom = this;
        result.distance = t;
        result.position = ray.getPoint(result.distance);
        const pc: Point = Point.sub(new Point(this.c, 0), result.position);
        pc.normalize(1);
        const normal = new Point(pc.x + this.c, pc.y);
        normal.normalize(ray.dir.dot(normal) > 0 ? -1 : 1);
        result.normal = normal;
        return result;
      }
      return IntersectResult.noHit;
    }

  }
}
