/**
 * Created by hanyeah on 2019/7/15.
 * 凸凸透镜
 */
namespace hanyeah.optical.lens {
  import Circle = hanyeah.optical.geom.Circle;
  import Ray = hanyeah.optical.geom.Ray;
  import IntersectResult = hanyeah.optical.geom.IntersectResult;
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
      const tArrL: Array<number> = this.circleL.intersectT(ray);
      const tArrR: Array<number> = this.circleR.intersectT(ray);
      while() {

      }
      return result;
    }

  }
}
