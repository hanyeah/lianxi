namespace hanyeah {

  export class LineUtil {

    /**
     * 两条直线<p1,p2>与<p3,p4>的交点
     * @param p1
     * @param p2
     * @param p3
     * @param p4
     * @returns {null}
     */
    public static intersectLineLine(p1: IPoint, p2: IPoint, p3: IPoint, p4: IPoint): IPoint {
      // 参考：https://www.iteye.com/blog/fins-1522259
      const denominator: number = (p2.y - p1.y) * (p4.x - p3.x) - (p3.y - p4.y) * (p1.x - p2.x);
      if (denominator === 0) {
        // 平行，不相交
        return null;
      }
      const dx1: number = p2.x - p1.x;
      const dy1: number = p2.y - p1.y;
      const dx2: number = p4.x - p3.x;
      const dy2: number = p4.y - p3.y;
      const dx3: number = p3.x - p1.x;
      const dy3: number = p3.y - p1.y;
      return {
        x: (dx1 * dx2 * dy3 + dy1 * dx2 * p1.x - dy2 * dx1 * p3.x) / denominator,
        y: -(dy1 * dy2 * dx3 + dx1 * dy2 * p1.y - dx2 * dy1 * p3.y) / denominator
      };
    }

    /**
     * 直线<p1,p2>与线段(p3,p4)的交点
     * @param p1
     * @param p2
     * @param p3
     * @param p4
     * @returns {IPoint}
     */
    public static intersectLineSegment(p1: IPoint, p2: IPoint, p3: IPoint, p4: IPoint): IPoint {
      const p: IPoint = LineUtil.intersectLineLine(p1, p2, p3, p4);
      if (p && LineUtil.pointInSegment(p, p3, p4)) {
        // 在线上段(p3,p4)上
        return p;
      }
      return null;
    }

    /**
     * 射线和直线的交点
     */
    public static intersectRayLine(p1: IPoint, p2: IPoint, p3: IPoint, p4: IPoint): IPoint {
      const p: IPoint = LineUtil.intersectLineLine(p1, p2, p3, p4);
      if (p && LineUtil.pointInRay(p, p1, p2)) {
        return p;
      }
      return null;
    }

    /**
     * 射线和线段的交点
     */
    public static intersectRaySegment(p1: IPoint, p2: IPoint, p3: IPoint, p4: IPoint): IPoint {
      const p: IPoint = LineUtil.intersectLineLine(p1, p2, p3, p4);
      if (p && LineUtil.pointInRay(p, p1, p2) && LineUtil.pointInSegment(p, p3, p4)) {
        return p;
      }
      return null;
    }

    /**
     * 点在线段上(包含端点)
     */
    private static pointInSegment(p: IPoint, p1: IPoint, p2: IPoint): boolean {
      return (p.x - p1.x) * (p.x - p2.x) + (p.y - p1.y) * (p.y - p2.y) <= 0;
    }

    /**
     * 点在射线上
     */
    private static pointInRay(p: IPoint, p1: IPoint, p2: IPoint): boolean {
      return (p.x - p1.x) * (p2.x - p1.x) + (p.y - p1.y) * (p2.y - p1.y) >= 0;
    }

    /**
     * 两条线段(p1,p2)与(p3,p4)的交点
     * @param p1
     * @param p2
     * @param p3
     * @param p4
     * @returns {IPoint}
     */
    public static intersectSegmentSegment(p1: IPoint, p2: IPoint, p3: IPoint, p4: IPoint): IPoint {
      // 参考：https://www.cnblogs.com/i-gps/archive/2012/06/19/2554992.html
      // https://www.iteye.com/blog/fins-1522259
      const p: IPoint = LineUtil.intersectLineLine(p1, p2, p3, p4);
      if (p
        && (p.x - p1.x) * (p.x - p2.x) + (p.y - p1.y) * (p.y - p2.y) <= 0 // 在线上段(p1,p2)上
        && (p.x - p3.x) * (p.x - p4.x) + (p.y - p3.y) * (p.y - p4.y) <= 0 // 在线上段(p3,p4)上
      ) {
        return p;
      }
      return null;
    }

    /**
     * 得到两条直线<p1,p2>、<p3, p4>相交的交点
     * @param	p1
     * @param	p2
     * @param	p3
     * @param	p4
     * @return {IPoint}
     */
    public static lineIntersect(p1: IPoint, p2: IPoint, p3: IPoint, p4: IPoint): IPoint {
      const rp: IPoint = { x: 0, y: 0 };
      const x1: number = p1.x;
      const y1: number = p1.y;
      const x2: number = p2.x;
      const y2: number = p2.y;
      const x3: number = p3.x;
      const y3: number = p3.y;
      const x4: number = p4.x;
      const y4: number = p4.y;
      const c: number = 0.0000001;
      let m: number;
      if (x2 === x1) {
        m = (y2 - y1) / (x2 - x1 + c);
      }
      else {
        m = (y2 - y1) / (x2 - x1);
      }
      let n: number;
      if (x4 === x3) {
        n = (y4 - y3) / (x4 - x3 + c);
      }
      else {
        n = (y4 - y3) / (x4 - x3);
      }
      if (m === n) {
        rp.x = (m * x1 - n * x3 + y3 - y1) / (m - n + c);
      }
      else {
        rp.x = (m * x1 - n * x3 + y3 - y1) / (m - n);
      }
      rp.y = m * rp.x - m * x1 + y1;
      return rp;
    }


    /**
     * 直线 p1-p2 和 p3-p4是否平行
     * 如果(p1,p2)长度很小，或者(p3,p4)长度很小，可能会判断错。所以线段长度推荐用单位向量（或者尽量大一些）
     * @param p1
     * @param p2
     * @param p3
     * @param p4
     * @returns {boolean}
     */
    public static isParallel(p1: IPoint, p2: IPoint, p3: IPoint, p4: IPoint): boolean {
      // 叉积是否为0
      return Math.abs((p2.x - p1.x) * (p4.y - p3.y) - (p2.y - p1.y) * (p4.x - p3.x)) < 1e-10;
    }

    /**
     * 点p是否在线段 (p1,p2) 上
     */
    public static containsPoint(p: IPoint, p1: IPoint, p2: IPoint): boolean {
      // 叉积
      if (!LineUtil.isParallel(p, p1, p, p2)) {
        return false;
      }
      // 点积
      return (p.x - p1.x) * (p.x - p2.x) + (p.y - p1.y) * (p.y - p2.y) <= 0;
    }

    /**
     * 点到线段的最短距离
     * @param p
     * @param p1
     * @param p2
     * @returns {number}
     */
    public static distancePointToSegment(p: IPoint, p1: IPoint, p2: IPoint): number {
      const pt: IPoint = LineUtil.pointToSegmentDisPoint(p, p1, p2);
      return PointUtils.distance(pt, p);
    }

    /**
     * 点到线段的最短距离的点。
     * @param p
     * @param p1
     * @param p2
     * @returns {IPoint}
     */
    public static pointToSegmentDisPoint(p: IPoint, p1: IPoint, p2: IPoint): IPoint {
      const cross: number = (p2.x - p1.x) * (p.x - p1.x) + (p2.y - p1.y) * (p.y - p1.y);
      if (cross <= 0) {
        return p1;
      }
      const d2: number = (p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y);
      if (cross >= d2) {
        return p2;
      }
      const r: number = cross / d2;
      return {
        x: p1.x + (p2.x - p1.x) * r,
        y: p1.y + (p2.y - p1.y) * r
      };
    }

    /**
     * 点到直线的距离
     * @param p
     * @param p1
     * @param p2
     * @returns {number}
     */
    public static distancePointToLine(p: IPoint, p1: IPoint, p2: IPoint): number {
      const pt: IPoint = LineUtil.getFootPoint(p, p1, p2);
      return PointUtils.distance(pt, p);
    }

    /**
     * 计算点到直线的垂足。
     * @param p
     * @param p1
     * @param p2
     * @returns {{x: number, y: number}}
     */
    public static getFootPoint(p: IPoint, p1: IPoint, p2: IPoint): IPoint {
      const cross: number = (p2.x - p1.x) * (p.x - p1.x) + (p2.y - p1.y) * (p.y - p1.y);
      const d2: number = (p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y);
      const r: number = cross / d2;
      return {
        x: p1.x + (p2.x - p1.x) * r,
        y: p1.y + (p2.y - p1.y) * r
      };
    }

  }
}
