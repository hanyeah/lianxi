/**
 * Created by hanyeah on 2019/7/11.
 */
/// <reference path="Geom.ts"/>
namespace hanyeah.optical.geom {
  export class Circle extends Geom {
    public cp: Point;
    private _r: number;
    private r2: number;

    constructor(cp: Point, r: number) {
      super();
      this.cp = cp.clone();
      this.r = r;
    }

    public set r(value: number) {
      this._r = value;
      this.r2 = value * value;
    }

    public get r(): number {
      return this._r;
    }

    public clone(): Circle {
      return new Circle(this.cp, this.r);
    }

    public intersectT(ray: Ray): number[] {
      const result: number[] = [];
      const v: Point = Point.sub(ray.sp, this.cp);
      const c: number = v.sqrLength() - this.r2;
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

    public containsPoint(p: Point): boolean{
      return Point.sqrDistance(p, this.cp) < this.r * this.r;
    }

  }
}
