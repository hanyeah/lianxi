/**
 * Created by hanyeah on 2019/7/11.
 */
namespace hanyeah.optical.geom {
  export class Ray implements IGeom {
    public sp: Point;
    private _dir: Point;

    constructor(sp: Point, dir: Point) {
      this.sp = sp.clone();
      this.dir = dir;
    }

    public set dir(value: Point) {
      this._dir = value.clone();
      this._dir.normalize();
    }

    public get dir(): Point {
      return this._dir;
    }

    public clone(): Ray {
      return new Ray(this.sp, this.dir);
    }

    public getPoint(t: Number): Point {
      return new Point(this.sp.x + t * this._dir.x, this.sp.y + t * this._dir.y);
    }

    public intersect(ray: Ray): IntersectResult {
      const d12: Number = this.dir.cross(ray.dir);
      if (d12 !== 0) {
        const o: Point = Point.sub(ray.sp , this.sp);
        const dco: Number = this.dir.cross(o);
        const t: Number = dco / d12;
        if (t > 0) {
          const result: IntersectResult = new IntersectResult();
          result.geom = this;
          result.distance = t;
          result.position = ray.getPoint(result.distance);
          const normal = Point.rot90(this.dir);
          normal.normalize(ray.dir.dot(normal) > 0 ? -1 : 1);
          result.normal = normal;
          return result;
        }
      }
      return IntersectResult.noHit;
    }

  }
}
