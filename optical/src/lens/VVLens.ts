/**
 * Created by hanyeah on 2019/7/15.
 * 凸凸透镜
 */
/// <reference path="Lens.ts"/>
namespace hanyeah.optical.lens {
  import Circle = hanyeah.optical.geom.Circle;
  import Ray = hanyeah.optical.geom.Ray;
  import IntersectResult = hanyeah.optical.geom.IntersectResult;
  import SimpleIntersectResult = hanyeah.optical.geom.SimpleIntersectResult;
  import Geom = hanyeah.optical.geom.Geom;
  export class VVLens extends Lens {
    public a: number = 10;
    private circleL: Circle = new Circle(1);
    private circleR: Circle = new Circle(1);

    constructor() {
      super();
    }

    update() {
      const r: number = 2.0 * (this.n - 1.0) * this.f;
      if (this.a > r) {
        this.a = r;
      }
      this.circleL.r = r;
      this.circleR.r = r;
    }

    public intersect(ray: Ray): IntersectResult{
      let result: IntersectResult = IntersectResult.noHit;
      const arrL: SimpleIntersectResult[] = this.circleL.intersectSimpleResult(ray);
      const arrR: SimpleIntersectResult[] = this.circleR.intersectSimpleResult(ray);
      const arr: SimpleIntersectResult[] = arrL.concat(arrR);
      arr.sort((a: SimpleIntersectResult, b: SimpleIntersectResult) => {
        return a.t - b.t;
      });
      for (let i = 0; i < arr.length; i++) {
        const r: SimpleIntersectResult = arr[i];
        if (r.geom === this.circleL && Geom.In(this.circleR, ray.getPoint(r.t))) {
          result = this.circleR.getIntersectResult(ray, r.t);
          break;
        } else if (r.geom === this.circleR && Geom.In(this.circleL, ray.getPoint(r.t))) {
          result = this.circleL.getIntersectResult(ray, r.t);
          break;
        }
      }
      return result;
    }

  }
}
