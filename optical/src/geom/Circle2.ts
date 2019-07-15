/**
 * Created by hanyeah on 2019/7/11.
 */
/// <reference path="Geom.ts"/>
namespace hanyeah.optical.geom {
  export class Circle2 extends Geom {
    public cp: Point;
    public r: number;

    constructor(cp: Point, r: number) {
      super();
      this.cp = cp.clone();
      this.r = r;
    }

    public clone(): Circle2 {
      return new Circle2(this.cp, this.r);
    }

    public intersectT(ray: Ray): number[] {
      const result: number[] = [];
      const v: Point = Point.sub(ray.sp, this.cp);
      const c: number = v.sqrLength() - this.r * this.r;
      const b: number = 2 * ray.dir.dot(v);
      this.getTbyAbc(result, 1, b, c);
      return result;
    }

    public getNormal(p: Point, normalize: boolean = false): Point {
      const normal = Point.sub(p, this.cp);
      if (normalize) {
        normal.normalize(1);
      }
      return normal;
    }

    public containsPoint(p: Point): number{
      return Geom.getSign(this.r * this.r - Point.sqrDistance(p, this.cp));
    }

  }
}
