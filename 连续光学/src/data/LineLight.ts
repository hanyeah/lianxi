namespace hanyeah {
  /**
   * 线光源
   */
  export class LineLight extends LightData {
    public p0: HPoint;
    public p1: HPoint;
    public angle0: number = 0;
    public angle1: number = 0;
    constructor(world: World, sp: HPoint, p0: HPoint, p1: HPoint) {
      super(world, sp);
      this.p0 = p0;
      this.p1 = p1;
      this.angle0 = PointUtils.getAngle2(sp, p0);
      this.angle1 = PointUtils.getAngle2(sp, p1);
      if (this.angle1 < this.angle0) {
        if (this.angle0 - this.angle1 < Math.PI) {
          let temp: number = this.angle0;
          this.angle0 = this.angle1;
          this.angle1 = temp;
          this.p0 = p1;
          this.p1 = p0;
        }
      }
    }

    public destroy(): void {
      super.destroy();
    }

    /**
     * 获取光源到指定点的光线。
     */
    protected getRay(p: HPoint): RayData {
      if (PointUtils.isEqual(p, this.p0) || PointUtils.isEqual(p, this.p1)) {
        return null;
      }
      const c1: number = PointUtils.cross2(this.p0, this.sp, this.p0, this.p1);
      const c2: number = PointUtils.cross2(this.p0, p, this.p0, this.p1);
      if (c1 * c2 <= 0) {
        const sp: IPoint = LineUtil.intersectLineSegment(this.sp, p, this.p0, this.p1);
        if (sp) {
          return new RayData(new HPoint(sp.x, sp.y), p, PointUtils.getAngle2(sp, p), this);
        }
      }
      return null;
    }
    
    /**
     * 
     */
    protected getBoundary(): RayData[] {
      return [
        new RayData(this.p0.clone(), this.getP1(this.p0), PointUtils.getAngle2(this.sp, this.p0), this),
        new RayData(this.p1.clone(), this.getP1(this.p1), PointUtils.getAngle2(this.sp, this.p1), this)
      ];
    }

    protected isLegalAng(ang: number): boolean {
      if (this.angle1 > this.angle0) {
        return ang >= this.angle0 && ang <= this.angle1;
      }
      return ang <= this.angle1 || ang >= this.angle0;
    }

    protected compareFn(a: RayData, b: RayData): number {
      if (this.angle1 >= this.angle0) {
        return -(a.angle - b.angle);
      }
      return -(this.formatAngle(a.angle) - this.formatAngle(b.angle));
    }

    protected formatAngle(ang: number): number {
      if (ang <= this.angle1) {
        ang += 2 * Math.PI;
      }
      return ang;
    }

    protected getP1(p: IPoint): HPoint {
      const vec: IPoint = {x: p.x - this.sp.x, y: p.y - this.sp.y};
      PointUtils.normalize(vec);
      return new HPoint(p.x + vec.x, p.y + vec.y);
    }

  }
}
