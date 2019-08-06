/**
 * Created by hanyeah on 2019/7/11.
 */
namespace hanyeah.optical{
  import Shape = hanyeah.optical.geom.Shape;
  import IntersectResult = hanyeah.optical.geom.IntersectResult;
  import Ray = hanyeah.optical.geom.Ray;
  export class OpticalWorld{
    public shapes: Array<Shape> = [];
    public rays: Array<Ray> = [];
    constructor() {

    }

    public addShape(shape: Shape): void{
      if (this.shapes.indexOf(shape) === -1) {
        this.shapes.push(shape);
      }
    }

    public removeShape(shape: Shape): void{
      const ind: number = this.shapes.indexOf(shape);
      if (ind !== -1) {
        this.shapes.splice(ind, 1);
      }
    }

    public addRay(ray: Ray): void{
      if(this.rays.indexOf(ray) === - 1) {
        this.rays.push(ray);
      }
    }

    public removeRay(ray: Ray): void{
      const ind: number = this.rays.indexOf(ray);
      if (ind !== -1) {
        this.rays.splice(ind, 1);
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
      for(let i = 0; i < len; i++ ) {
        shape = this.shapes[i];
        const r0: IntersectResult = shape.intersect(ray);
        if (r0.distance < result.distance) {
          result = r0;
        }
      }
      return result;
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

  }
}
