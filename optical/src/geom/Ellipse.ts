namespace hanyeah.optical.geom {
  /**
   * 椭圆
   */
  export class Ellipse extends Geom {
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

    public clone(): Ellipse {
      return new Ellipse(this.a, this.b);
    }

    public setAB(a: number, b: number) {
      this.a = Math.abs(a);
      this.b = Math.abs(b);
      this.calcC();
    }

    public calcC() {
      this.c = Math.sqrt(this.a * this.a - this.b * this.b);
    }

    public intersectT(ray: Ray): number[] {
      const result: number[] = [];
      const ta2: number = this.a * this.a;
      const tb2: number = this.b * this.b;
      const a: number = ray.dir.x * ray.dir.x * tb2 + ray.dir.y * ray.dir.y * ta2;
      const b: number = 2 * (ray.sp.x * ray.dir.x * tb2 + ray.sp.y * ray.dir.y * ta2);
      const c: number = ray.sp.x * ray.sp.x * tb2 + ray.sp.y * ray.sp.y * ta2 - ta2 * tb2;
      Geom.getTbyAbc(result, a, b, c);
      return result;
    }

    public getNormal(p: Point, normalize: boolean = false): Point {
      let normal;
      if (this.c === 0) {
        normal = p.clone();
      } else {
        const pc1: Point = Point.sub(p, new Point(-this.c, 0));
        const pc2: Point = Point.sub(p, new Point(this.c, 0));
        pc1.normalize(1);
        pc2.normalize(1);
        normal = Point.add(pc1, pc2);
      }
      if (normalize) {
        normal.normalize(1);
      }
      return normal;
    }
    public containsPoint(p: Point): number{
      return Geom.getSign(2 * this.a - (Point.distance(p, new Point(this.c, 0)) +  Point.distance(p, new Point(-this.c, 0))));
    }
  }
}
