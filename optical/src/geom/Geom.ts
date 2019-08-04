/// <reference path="Space.ts"/>
namespace hanyeah.optical.geom {
  /**
   * 几何图形基类。
   */
  export class Geom extends Space implements IGeom {

    /**
     * 求一元二次方程的根。
     * @param result
     * @param a
     * @param b
     * @param c
     */
    public static getTbyAbc(result: number[], a: number, b: number, c: number) {
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

    public static getSign(value: number): number {
      return value > 0 ? 1 : value < 0 ? -1 : 0;
    }

    public static In(geom: Geom, p: Point): boolean {
      return geom.containsPoint(p) === 1;
    }

    public static Out(geom: Geom, p: Point): boolean {
      return geom.containsPoint(p) === -1;
    }

    public static NotIn(geom: Geom, p: Point): boolean {
      return geom.containsPoint(p) !== 1;
    }

    public static NotOut(geom: Geom, p: Point): boolean {
      return geom.containsPoint(p) !== -1;
    }

    public static On(geom: Geom, p: Point): boolean {
      return geom.containsPoint(p) === 0;
    }

    constructor() {
      super();
    }

    /**
     * 克隆。
     * @returns {Geom}
     */
    public clone(): Geom {
      return new Geom();
    }

    /**
     * 计算和射线相交的所有点的t值，射线的表达式为r(t) = o + t*d，t>=0。
     * @param ray
     * @returns {Array}
     */
    public intersectT(ray: Ray): number[] {
      return [];
    }

    /**
     *  封装的intersectT。
     * @param ray
     */
    public intersectSimpleResult(ray: Ray): SimpleIntersectResult[] {
      const tArr: number[] = this.intersectT(ray);
      const result: Array<SimpleIntersectResult> = [];
      tArr.forEach((t: number) => {
        result.push(new SimpleIntersectResult(t, this));
      });
      return result;
    }

    /**
     * 计算与射线相交的最近的点。
     * @param ray
     * @returns {IntersectResult}
     */
    public intersect(ray: Ray): IntersectResult {
      const tArr: number[] = this.intersectT(ray);
      if (tArr.length) {
        const t: number = tArr[0];
        return this.getIntersectResult(ray, t);
      }
      return IntersectResult.noHit;
    }

    /**
     * 计算所有与射线交互的点。
     * @param ray
     */
    public intersects(ray: Ray): IntersectResult[] {
      const tArr: number[] = this.intersectT(ray);
      const result: IntersectResult[] = [];
      tArr.forEach((t: number) => {
        result.push(this.getIntersectResult(ray, t));
      });
      return result;
    }

    /**
     * 获取法线
     * @param p 图形上的点
     * @param normalize 是否归一化，默认不归一化。
     * @returns {Point} 法线
     */
    public getNormal(p: Point, normalize: boolean = false): Point {
      return new Point();
    }

    /**
     * 点与图形的关系
     * @param p
     * @returns {number} 1：点在图形内，0：点在图形上，-1：点在图形外。
     */
    public containsPoint(p: Point): number {
      return -1;
    }

    /**
     * 封装与射线相交的结果。
     * @param ray
     * @param t
     * @returns {IntersectResult}
     */
    public getIntersectResult(ray: Ray, t: number): IntersectResult {
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
