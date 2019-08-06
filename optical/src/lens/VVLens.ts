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
  import Point = hanyeah.optical.geom.Point;
  export class VVLens extends Lens {
    public circleL: Circle;
    public circleR: Circle;
    private rayL: Ray = new Ray(new Point(1, 0), new Point(1, 0));
    private rayR: Ray = new Ray(new Point(1, 0), new Point(1, 0));
    private arr: SimpleIntersectResult[] = [];

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
      this.circleL.globalRayToLocalRay2(ray, this.rayL);
      this.circleR.globalRayToLocalRay2(ray, this.rayR);
      this.circleL.intersectSimpleResult2(this.rayL, this.arr);
      this.circleR.intersectSimpleResult2(this.rayR, this.arr);


      this.arr.sort((a: SimpleIntersectResult, b: SimpleIntersectResult) => {
        return a.t - b.t;
      });
      const len: number = this.arr.length;
      let temp: SimpleIntersectResult;
      for(let j: number = 1; j < len; j++) {
        let i: number = j;
        temp = this.arr[j];
        while(i > 0) {
          this.arr[i + 1] = this.arr[i];
          i--;
        }
      }

      let r: SimpleIntersectResult;
      for (let i: number = 0; i < len; i++) {
        r = this.arr[i];
        if (r.geom === this.circleL && Geom.In(this.circleR, this.rayR.getPoint(r.t))) {
          result = this.circleR.getGlobalIntersectResult(ray, this.rayL, r.t);
          break;
        } else if (r.geom === this.circleR && Geom.In(this.circleL, this.rayL.getPoint(r.t))) {
          result = this.circleL.getGlobalIntersectResult(ray, this.rayR, r.t);
          break;
        }
      }
      this.arr = [];
      return result;
    }

  }
}
