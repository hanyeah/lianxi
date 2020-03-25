namespace hanyeah {
  export class PointUtils {

    /**
     * 两点之间的距离
     * @param p1
     * @param p2
     * @returns {number}
     */
    public static distance(p1: IPoint, p2: IPoint): number {
      const dx: number = p1.x - p2.x;
      const dy: number = p1.y - p2.y;
      return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * 两点距离的平方
     * @param p1
     * @param p2
     * @returns {number}
     */
    public static sqrDistance(p1: IPoint, p2: IPoint): number {
      const dx: number = p1.x - p2.x;
      const dy: number = p1.y - p2.y;
      return dx * dx + dy * dy;
    }

    /**
     * 到原点的长度
     */
    public static length0(p: IPoint): number {
      return Math.sqrt(p.x * p.x + p.y * p.y);
    }

    /**
     * 到原点的长度的平方
     */
    public static sqrLength(p: IPoint): number {
      return p.x * p.x + p.y * p.y;
    }

    /**
     * 归一化
     */
    public static normalize(p: IPoint): void {
      const s: number = 1 / PointUtils.length0(p);
      p.x *= s;
      p.y *= s;
    }

    /**
     * 点积
     */
    public static dot(p0: IPoint, p1:IPoint): number {
      return p0.x * p1.x + p0.y * p1.y;
    }

    /**
     * 叉乘
     */
    public static cross(p0: IPoint, p1: IPoint): number {
      return p0.x * p1.y - p1.x * p0.y;
    }

    public static cross2(p0: IPoint, p1: IPoint, p2: IPoint, p3: IPoint): number {
      return (p1.x - p0.x) * (p3.y - p2.y) - (p3.x - p2.x) * (p1.y - p0.y);
    }

    /**
     * 获取两点组成的向量角度
     */
    public static getAngle2(p0: IPoint, p1: IPoint): number {
      return Math.atan2(p1.y - p0.y, p1.x - p0.x);
    }

    /**
     * 获取两点的中点
     */
    public static getMiddleP(p0: IPoint, p1: IPoint): IPoint {
      return {x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2};
    }

    /**
     * 两点相加
     */
    public static addP(p0: IPoint, p1: IPoint): IPoint {
      return {x: p0.x + p1.x, y: p0.y + p1.y};
    }

    /**
     * 两个点是否相等
     */
    public static isEqual(p0: IPoint, p1: IPoint): boolean {
      return Math.abs(p0.x - p1.x) < 1e-8 && Math.abs(p0.y - p1.y) < 1e-8;
    }

  }
}
