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
    public circleL: Circle;
    public circleR: Circle;

    constructor() {
      super();
      this.circleL = new Circle(30);
      this.circleR = new Circle(30);
      this.circleL.x = -5;
      this.circleR.x = 5;
      this.addGeom(this.circleL);
      this.addGeom(this.circleR);
    }

    update() {
      const r: number = 2.0 * (this.n - 1.0) * this.f;
      this.circleL.r = r;
      this.circleR.r = r;
    }

    public intersect(ray: Ray): IntersectResult{
      let result: IntersectResult = IntersectResult.noHit;
      const rayL: Ray = this.circleL.globalRayToLocalRay(ray);
      const rayR: Ray = this.circleR.globalRayToLocalRay(ray);
      const arrL: SimpleIntersectResult[] = this.circleL.intersectSimpleResult(rayL);
      const arrR: SimpleIntersectResult[] = this.circleR.intersectSimpleResult(rayR);
      const arr: SimpleIntersectResult[] = arrL.concat(arrR);
      arr.sort((a: SimpleIntersectResult, b: SimpleIntersectResult) => {
        return a.t - b.t;
      });
      for (let i = 0; i < arr.length; i++) {
        const r: SimpleIntersectResult = arr[i];
        if (r.geom === this.circleL && Geom.In(this.circleR, rayR.getPoint(r.t))) {
          result = this.circleR.getGlobalIntersectResult(ray, rayL, r.t);
          break;
        } else if (r.geom === this.circleR && Geom.In(this.circleL, rayL.getPoint(r.t))) {
          result = this.circleL.getGlobalIntersectResult(ray, rayR, r.t);
          break;
        }
      }
      return result;
    }

  }
}
