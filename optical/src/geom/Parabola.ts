namespace hanyeah.optical.geom {
  export class Parabola extends Geom {
    public p: number;

    constructor(p: number) {
      super();
      this.p = p;
    }

    public clone(): Parabola {
      return new Parabola(this.p);
    }

    public intersectT(ray: Ray): number[] {
      const result: number[] = [];
      const a: number = ray.dir.y * ray.dir.y;
      const b: number = 2 * (ray.sp.y * ray.dir.y - this.p * ray.dir.x);
      const c: number = ray.sp.y * ray.sp.y - 2 * this.p * ray.sp.x;
      const arr: number[] = [];
      this.getTbyAbc(arr, a, b, c);
      arr.forEach((t: number) => {
        if (ray.sp.x + ray.dir.x * t > 0) {
          result.push(t);
        }
      });
      return result;
    }

    public getNormal(p: Point, normalize: boolean = false): Point {
      const normal = new Point(-1, p.y / this.p);
      if (normalize) {
        normal.normalize(1);
      }
      return normal;
    }

    public containsPoint(p: Point): number{
      return Geom.getSign(p.x + this.p / 2 - Point.distance(p, new Point(this.p / 2, 0)));
    }

  }
}
