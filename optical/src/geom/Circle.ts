/**
 * Created by hanyeah on 2019/7/15.
 */
/// <reference path="Geom.ts"/>
namespace hanyeah.optical.geom{
  export class Circle extends Geom{
    public _r: number;
    private _r2: number;

    public get r(): number {
      return this._r;
    }

    public set r(v: number) {
      this._r = v;
      this._r2 = v * v;
    }

    public get r2(): number{
      return this._r2;
    }

    constructor(r: number) {
      super();
      this.r = r;
    }

    public clone(): Circle {
      return new Circle(this.r);
    }

    public intersectT(ray: Ray): number[] {
      const result: number[] = [];
      const c: number = ray.sp.sqrLength() - this.r2;
      const b: number = 2 * ray.dir.dot(ray.sp);
      Geom.getTbyAbc(result, 1, b, c);
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
      return Geom.getSign(this.r2 - p.sqrLength());
    }

  }
}
