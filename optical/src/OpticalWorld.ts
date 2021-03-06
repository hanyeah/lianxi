/**
 * Created by hanyeah on 2019/7/11.
 */
namespace hanyeah.optical {
  import Shape = hanyeah.optical.geom.Shape;
  import IntersectResult = hanyeah.optical.geom.IntersectResult;
  import Ray = hanyeah.optical.geom.Ray;
  import SimpleIntersectResult = hanyeah.optical.geom.SimpleIntersectResult;
  import HObject = hanyeah.electricity.HObject;
  export class OpticalWorld extends HObject{
    public shapes: Array<Shape> = [];
    public rays: Array<Ray> = [];

    constructor() {
      super();
    }

    public addShape(shape: Shape): void {
      if (this.shapes.indexOf(shape) === -1) {
        this.shapes.push(shape);
      }
    }

    public removeShape(shape: Shape): void {
      const ind: number = this.shapes.indexOf(shape);
      if (ind !== -1) {
        this.shapes.splice(ind, 1);
        shape.destroy();
      }
    }

    public addRay(ray: Ray): void {
      if (this.rays.indexOf(ray) === -1) {
        this.rays.push(ray);
      }
    }

    public removeRay(ray: Ray): void {
      const ind: number = this.rays.indexOf(ray);
      if (ind !== -1) {
        this.rays.splice(ind, 1);
        let len: number = this.rays.length;
        for (let i = 0; i < len; i++) {
          this.shapes[i].removeLocalRay(ray);
        }
        ray.destroy();
      }
    }

    /**
     * 获取与光线碰撞的结果。
     * @param ray
     * @returns {IntersectResult}
     */
    public rayCast(ray: Ray): IntersectResult {
      let result: IntersectResult = IntersectResult.noHit;
      const len: number = this.shapes.length;
      let shape: Shape;
      for (let i = 0; i < len; i++) {
        shape = this.shapes[i];
        const r0: IntersectResult = shape.intersect(ray);
        if (r0.distance < result.distance) {
          result = r0;
        }
      }
      return result;
    }

    public rayCast2(ray: Ray, result: IntersectResult): void {
      const len: number = this.shapes.length;
      const simpleResult: SimpleIntersectResult = new SimpleIntersectResult();
      for (let i: number = 0; i < len; i++) {
        this.shapes[i].intersect2(ray, simpleResult);
      }
      if (simpleResult.t !== Infinity) {
        simpleResult.geom.getGlobalIntersectResult2(ray, simpleResult.localRay, simpleResult.t, result);
      }
    }

    /**
     * 获取所有与光线碰撞的结果。
     * @param ray
     * @param sort
     * @returns {IntersectResult[]}
     */
    public rayMultiCast(ray: Ray, sort: boolean = true): IntersectResult[] {
      let result: IntersectResult[] = [];
      this.shapes.forEach((shape: Shape) => {
        const r0: IntersectResult = shape.intersect(ray);
        result.push(r0);
      });
      if (sort) {
        result.sort((a: IntersectResult, b: IntersectResult) => {
          return a.distance - b.distance;
        });
      }
      return result;
    }

    public updateLocalRayByRay(ray: Ray) {
      const len: number = this.shapes.length;
      for (let i = 0; i < len; i++) {
        this.shapes[i].updateLocalRay(ray);
      }
    }

    public updateLocalRayByShape(shape: Shape) {
      let len: number = this.rays.length;
      for (let i = 0; i < len; i++) {
        shape.updateLocalRay(this.rays[i]);
      }
    }

  }
}
