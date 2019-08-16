/**
 * Created by hanyeah on 2019/7/29.
 */
namespace hanyeah.optical.geom {
  import HObject = hanyeah.electricity.HObject;
  export class Space extends HObject{
    public x: number = 0;
    public y: number = 0;
    public rotation: number = 0;
    protected matrix: Matrix = new Matrix();
    protected invMatrix: Matrix = new Matrix();
    protected gMatrix: Matrix = new Matrix();
    protected gInvMatrix: Matrix = new Matrix();

    constructor() {
      super();
    }

    public destroy() {

    }

    public clone(): Space {
      return new Space();
    }

    public globalToLocal(p: Point): Point {
      return this.gInvMatrix.transformPoint(p);
    }

    public deltaGlobalToLocal(p: Point): Point {
      return this.gInvMatrix.deltaTransformPoint(p);
    }

    public globalRayToLocalRay(ray: Ray): Ray {
      const result = ray.clone();
      result.sp = this.globalToLocal(result.sp);
      result.dir = this.deltaGlobalToLocal(result.dir);
      return result;
    }

    public globalToLocal2(p: Point, lp: Point): void {
      this.gInvMatrix.transformPoint2(p, lp);
    }

    public deltaGlobalToLocal2(p: Point, lp: Point): void {
      this.gInvMatrix.deltaTransformPoint2(p, lp);
    }

    public globalRayToLocalRay2(ray: Ray, localRay: Ray): void {
      this.gInvMatrix.transformPoint2(ray.sp, localRay.sp);
      this.gInvMatrix.deltaTransformPoint2(ray.dir, localRay.dir);
    }

    public localToGlobal(p: Point): Point {
      return this.gMatrix.transformPoint(p);
    }

    public deltaLocalToGlobal(p: Point): Point {
      return this.gMatrix.deltaTransformPoint(p);
    }

    public localRayToGlobal(ray: Ray): Ray{
      const result = ray.clone();
      result.sp = this.localToGlobal(result.sp);
      result.dir = this.deltaLocalToGlobal(result.dir);
      return result;
    }

    public setPosition(x: number, y: number) {
      this.x = x;
      this.y = y;
    }

    public updateTransform(gMatrix: Matrix = null) {
      this.matrix.createBox(1, 1, this.rotation, this.x, this.y);
      this.invMatrix.createBox(1, 1, -this.rotation, -this.x, -this.y);
      this.gMatrix = this.matrix.clone();
      if (gMatrix) {
        this.gMatrix.concat(gMatrix);
      }
      this.gInvMatrix = this.gMatrix.clone();
      this.gInvMatrix.invert();
    }

  }
}
