namespace hanyeah.optical.geom {
  export class Line extends Geom {
    public x0: number;

    constructor(x0: number) {
      super();
      this.x0 = x0;
    }

    public clone(): Line {
      return new Line(this.x0);
    }

    public intersectT(ray: Ray): number[] {
      const result: number[] = [];
      if (ray.dir.x !== 0) {
        const t: number = (this.x0 - ray.sp.x) / ray.dir.x;
        if (t > 0) {
          result.push(t);
        }
      }
      return result;
    }

    public getNormal(p: Point, normalize: boolean = false): Point {
      return new Point(-1, 0);
    }

    public containsPoint(p: Point): number{
      return Geom.getSign(p.x - this.x0);
    }

  }
}
