namespace hanyeah.optical.geom {
  /**
   * 几何图形基类。
   */
  export class Geom extends Space implements IGeom {

    public localRayMap: Object = {};

    /**
     * 求一元二次方程的根。
     * @param result
     * @param a
     * @param b
     * @param c
     */
    public static getTbyAbc(result: number[], a: number, b: number, c: number) {
      let n = 0;
      let t: number;
      if (a === 0) {
        t = -c / b;
        if (t > 0) {
          result[n] = t;
          n++;
          // result.push(t);
        }
      } else {
        const delta: number = b * b - 4 * a * c;
        if (delta >= 0) {
          a = 1 / (2 * a);
          const sqrDelta: number = Math.sqrt(delta);
          const sa: number = sqrDelta * a;
          const ba: number = -b * a;
          t = ba - sa; // (-b - sqrDelta) * a;
          if (t > 0) {
            result[n] = t;
            n++;
            // result.push(t);
          }
          t = ba + sa; // (-b + sqrDelta) * a;
          if (t > 0) {
            result[n] = t;
            n++;
            // result.push(t);
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

    public destroy() {
      super.destroy();
      this.localRayMap = null;
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

    public intersectSimpleResult2(ray: Ray, arr: SimpleIntersectResult[]): void {
      const tArr: number[] = this.intersectT(ray);
      tArr.forEach((t: number) => {
        arr.push(new SimpleIntersectResult(t, this));
      });
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

    /**
     * 封装与射线相交的结果，转换到全局坐标。
     * @param ray
     * @param lacalRay
     * @param t
     * @returns {IntersectResult}
     */
    public getGlobalIntersectResult(ray: Ray, lacalRay: Ray, t: number): IntersectResult {
      const result: IntersectResult = new IntersectResult();
      result.geom = this;
      result.distance = t;
      result.position = ray.getPoint(result.distance);

      const normal: Point = this.getNormal(lacalRay.getPoint(result.distance));
      normal.normalize(lacalRay.dir.dot(normal) > 0 ? -1 : 1);
      result.normal = this.deltaLocalToGlobal(normal);

      return result;
    }

    public getGlobalIntersectResult2(ray: Ray, lacalRay: Ray, t: number, result: IntersectResult): void {
      result.geom = this;
      result.distance = t;
      result.position = ray.getPoint(result.distance);

      const normal: Point = this.getNormal(lacalRay.getPoint(result.distance));
      normal.normalize(lacalRay.dir.dot(normal) > 0 ? -1 : 1);
      result.normal = this.deltaLocalToGlobal(normal);
    }

    public updateLocalRay(ray: Ray): void {
      if (!this.localRayMap[ray.UID]) {
        this.localRayMap[ray.UID] = new Ray();
      }
      this.globalRayToLocalRay2(ray, this.localRayMap[ray.UID]);
    }

    public getLocalRay(ray: Ray): Ray {
      return this.localRayMap[ray.UID];
    }

    public removeLocalRay(ray: Ray): void {
      delete this.localRayMap[ray.UID];
    }

  }
}
