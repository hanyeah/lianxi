/**
 * Created by hanyeah on 2019/7/15.
 * 凸凸透镜
 */
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
    public result: IntersectResult = new IntersectResult();
    private rayL: Ray = new Ray(new Point(1, 0), new Point(1, 0));
    private rayR: Ray = new Ray(new Point(1, 0), new Point(1, 0));
    private tArr1: number[] = [];
    private tArr2: number[] = [];
    private p: Point = new Point(0, 0);

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

    public intersect(ray: Ray): IntersectResult {
      this.result.distance = Infinity;
      this.circleL.globalRayToLocalRay2(ray, this.rayL);
      this.circleR.globalRayToLocalRay2(ray, this.rayR);
      this.tArr1 = this.circleL.intersectT(this.rayL);
      this.tArr2 = this.circleR.intersectT(this.rayR);
      let i = 0, j = 0, len1 = this.tArr1.length, len2 = this.tArr2.length;
      let len = len1 + len2;
      let n = 0;
      let t = 0, type = 0;
      while (n < len) {
        if (i >= len1) {
          type = 2;
        } else if (j >= len2) {
          type = 1;
        } else {
          if (this.tArr1[i] < this.tArr2[j]) {
            type = 1;
          } else {
            type = 2;
          }
        }
        if (type === 1) {
          t = this.tArr1[i];
          i++;
          this.rayR.getPoint2(t, this.p);
          if (Geom.In(this.circleR, this.p)) {
            this.circleL.getGlobalIntersectResult2(ray, this.rayL, t, this.result);
            break;
          }
        } else {
          t = this.tArr2[j];
          j++;
          this.rayL.getPoint2(t, this.p);
          if (Geom.In(this.circleL, this.p)) {
            this.circleR.getGlobalIntersectResult2(ray, this.rayR, t, this.result);
            break;
          }
        }
        n++;
      }
      return this.result;
    }

    public intersect2(ray: Ray, result: SimpleIntersectResult): void {
      this.circleL.globalRayToLocalRay2(ray, this.rayL);
      this.circleR.globalRayToLocalRay2(ray, this.rayR);
      this.tArr1 = this.circleL.intersectT(this.rayL);
      this.tArr2 = this.circleR.intersectT(this.rayR);
      let i = 0, j = 0, len1 = this.tArr1.length, len2 = this.tArr2.length;
      let len = len1 + len2;
      let n = 0;
      let t = 0, type = 0;
      while (n < len) {
        if (i >= len1) {
          type = 2;
        } else if (j >= len2) {
          type = 1;
        } else {
          if (this.tArr1[i] < this.tArr2[j]) {
            type = 1;
          } else {
            type = 2;
          }
        }
        if (type === 1) {
          t = this.tArr1[i];
          i++;
          if (t < result.t) {
            this.rayR.getPoint2(t, this.p);
            if (Geom.In(this.circleR, this.p)) {
              result.t = t;
              result.geom = this.circleL;
              result.shape = this;
              result.localRay = this.rayL;
              break;
            }
          }
        } else {
          t = this.tArr2[j];
          j++;
          if (t < result.t) {
            this.rayL.getPoint2(t, this.p);
            if (Geom.In(this.circleL, this.p)) {
              result.t = t;
              result.geom = this.circleR;
              result.shape = this;
              result.localRay = this.rayR;
              break;
            }
          }
        }
        n++;
      }
    }

    public intersect0(ray: Ray): IntersectResult {
      const arr: SimpleIntersectResult[] = [];
      let result: IntersectResult = IntersectResult.noHit;
      this.circleL.globalRayToLocalRay2(ray, this.rayL);
      this.circleR.globalRayToLocalRay2(ray, this.rayR);
      this.circleL.intersectSimpleResult2(this.rayL, arr);
      this.circleR.intersectSimpleResult2(this.rayR, arr);

      const len: number = arr.length;
      // 插入排序
      let temp: SimpleIntersectResult;
      for (let i: number = 1; i < len; i++) {
        let j: number = i;
        temp = arr[i];
        while (j > 0 && arr[j].t < arr[j - 1].t) {
          arr[j] = arr[j - 1];
          j--;
        }
        arr[j] = temp;
      }

      let r: SimpleIntersectResult;
      for (let i: number = 0; i < len; i++) {
        r = arr[i];
        if (r.geom === this.circleL && Geom.In(this.circleR, this.rayR.getPoint(r.t))) {
          result = this.circleR.getGlobalIntersectResult(ray, this.rayL, r.t);
          break;
        } else if (r.geom === this.circleR && Geom.In(this.circleL, this.rayL.getPoint(r.t))) {
          result = this.circleL.getGlobalIntersectResult(ray, this.rayR, r.t);
          break;
        }
      }
      return result;
    }

  }
}
