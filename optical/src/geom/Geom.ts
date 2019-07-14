namespace hanyeah.optical.geom {
  export class Geom implements IGeom {
    constructor() {

    }

    public clone(): Geom {
      return new Geom();
    }

    public intersectT(ray: Ray): number[] {
      return [];
    }

    public intersect(ray: Ray): IntersectResult {
      const tArr: number[] = this.intersectT(ray);
      if (tArr.length) {
        const t: number = tArr[0];
        return this.getIntersectResult(ray, t);
      }
      return IntersectResult.noHit;
    }

    public getNormal(p: Point, normalize: boolean = false): Point {
      return new Point();
    }

    protected getTbyAbc(result: number[], a: number, b: number, c: number) {
      if (a === 0) {
        const t: number = -c / b;
        if (t > 0) {
          result.push(t);
        }
      } else {
        const delta: number = b * b - 4 * a * c;
        if (delta >= 0) {
          const a2: number = 2 * a;
          const sqrDelta: number = Math.sqrt(delta);
          const t1: number = (-b - sqrDelta) / a2;
          if (t1 > 0) {
            result.push(t1);
          }
          const t2: number = (-b + sqrDelta) / a2;
          if (t2 > 0) {
            result.push(t2);
          }
        }
      }
    }

    public containsPoint(p: Point): boolean{
      return false;
    }
    protected getIntersectResult(ray: Ray, t: number): IntersectResult {
      const result: IntersectResult = new IntersectResult();
      result.geom = this;
      result.distance = t;
      result.position = ray.getPoint(result.distance);
      result.normal = this.getNormal(result.position);
      result.normal.normalize(ray.dir.dot(result.normal) > 0 ? -1 : 1);
      return result;
    }

  }
}
