/**
 * Created by hanyeah on 2019/7/15.
 */
/// <reference path="Geom.ts"/>
namespace hanyeah.optical.geom{
  export class Circle extends Geom{
    public r: number;
    constructor(r: number) {
      super();
      this.r = r;
    }

    public clone(): Circle {
      return new Circle(this.r);
    }

    public intersectT(ray: Ray): number[] {
      const result: number[] = [];
      const c: number = ray.sp.sqrLength() - this.r * this.r;
      const b: number = 2 * ray.dir.dot(ray.sp);
      this.getTbyAbc(result, 1, b, c);
      return result;
    }

    public getNormal(p: Point, normalize: boolean = false): Point {
      const normal = p.clone();
      if (normalize) {
        normal.normalize(1);
      }
      return normal;
    }

    public containsPoint(p: Point): number{
      return Geom.getSign(this.r * this.r - p.sqrLength());
    }

  }
}
