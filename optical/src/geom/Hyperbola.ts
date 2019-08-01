/**
 * Created by hanyeah on 2019/7/12.
 */
namespace hanyeah.optical.geom {
  /**
   * 双曲线。
   * x^2 / a^2 - y^2 / b^2 = 1
   */
  export class Hyperbola extends Geom {

    public a: number;
    public b: number;
    private c: number;

    constructor(a: number, b: number) {
      super();
      this.setAB(a, b);
    }

    public getC() {
      return this.c;
    }

    public clone(): Hyperbola {
      return new Hyperbola(this.a, this.b);
    }

    public setAB(a: number, b: number) {
      this.a = Math.abs(a);
      this.b = Math.abs(b);
      this.calcC();
    }

    public calcC() {
      this.c = Math.sqrt(this.a * this.a + this.b * this.b);
    }

    public intersectT(ray: Ray): number[] {
      const result: number[] = [];
      const a2: number = this.a * this.a;
      const b2: number = this.b * this.b;
      const pab: Point = new Point(this.a, this.b);
      const a: number = ray.dir.dot(pab) * ray.dir.cross(pab);
      const b: number = 2 * (ray.sp.x * ray.dir.x * b2 - ray.sp.y * ray.dir.y * a2);
      const c: number = ray.sp.dot(pab) * ray.sp.cross(pab);
      Geom.getTbyAbc(result, a, b, c);
      return result;
    }

    public getNormal(p: Point, normalize: boolean = false): Point {
      const pc: Point = Point.sub(p, new Point(this.c, 0));
      pc.normalize(1);
      const normal: Point = new Point(pc.x - this.c, pc.y);
      if (normalize) {
        normal.normalize(1);
      }
      return normal;
    }

    public containsPoint(p: Point): number{
      return Geom.getSign(Point.distance(p, new Point(-this.c, 0)) -  Point.distance(p, new Point(this.c, 0)) - 2 * this.a);
    }

  }
}
