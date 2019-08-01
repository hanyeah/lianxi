/**
 * Created by hanyeah on 2019/7/29.
 */
namespace hanyeah.optical.geom {
  export class Space {
    public x: number = 0;
    public y: number = 0;
    public rotation: number = 0;
    protected invMatrix: Matrix = new Matrix();
    protected gInvMatrix: Matrix = new Matrix();

    constructor() {

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

    public setPosition(x: number, y: number) {
      this.x = x;
      this.y = y;
    }

    public updateTransform(gInvMatrix: Matrix = null) {
      this.invMatrix.createBox(1, 1, -this.rotation, -this.x, -this.y);
      if (gInvMatrix) {
        this.gInvMatrix = gInvMatrix.clone();
        this.gInvMatrix.concat(this.invMatrix);
      } else {
        this.gInvMatrix = this.invMatrix.clone();
      }
    }

  }
}
