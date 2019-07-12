/**
 * Created by hanyeah on 2019/7/11.
 */
namespace hanyeah.optical.geom {
  export class Circle implements IGeom {
    public cp: Point;
    private _r: Number;
    private r2: Number;

    constructor(cp: Point, r: Number) {
      this.cp = cp.clone();
      this.r = r;
    }

    public set r(value: Number) {
      this._r = value;
      this.r2 = value * value;
    }

    public get r(): Number {
      return this._r;
    }

    public clone(): Circle {
      return new Circle(this.cp, this.r);
    }

    public intersect(ray: Ray): IntersectResult {
      const v: Point = Point.sub(ray.sp, this.cp);
      const ac: Number = v.sqrLength() - this.r2;
      const dv: Number = ray.dir.dot(v);
      const delta: Number = dv * dv - ac;
      if (delta >= 0) {
        const sqrDelta: Number = Math.sqrt(delta);
        let t: Number = -dv - sqrDelta;
        if (t <= 0) {
          t = -dv + sqrDelta;
        }
        if (t > 0) {
          const result: IntersectResult = new IntersectResult();
          result.geom = this;
          result.distance = t;
          result.position = ray.getPoint(result.distance);
          const normal = Point.sub(result.position, this.cp);
          normal.normalize(ray.dir.dot(normal) > 0 ? -1 : 1);
          result.normal = normal;
          return result;
        }
      }
      return IntersectResult.noHit;
    }
  }
}
