namespace hanyeah {
  export class ConvergeLineLight extends LightData {
    public p0: HPoint;
    public p1: HPoint;
    public angle0: number = 0;
    public angle1: number = 0;
    constructor(world: World, sp: HPoint, p0: HPoint, p1: HPoint) {
      super(world, sp);
      this.p0 = p0;
      this.p1 = p1;
      this.angle0 = PointUtils.getAngle2(p0, sp);
      this.angle1 = PointUtils.getAngle2(p1, sp);
    }

    public destroy(): void {
      super.destroy();
    }

    /**
     * 获取光源到指定点的光线。
     */
    protected getRay(p: HPoint): RayData {
      return null;
    }
    
    /**
     * 
     */
    protected getBoundary(): RayData[] {
      return [
        new RayData(this.p0.clone(), this.getP1(this.p0), PointUtils.getAngle2(this.p0, this.sp), this),
        new RayData(this.p1.clone(), this.getP1(this.p1), PointUtils.getAngle2(this.p1, this.sp), this)
      ];
    }

    protected compareFn(a: RayData, b: RayData): number {
      if (this.angle1 >= this.angle0) {
        return -(a.angle - b.angle);
      }
      return -(this.formatAngle(a.angle) - this.formatAngle(b.angle));
    }

    private formatAngle(ang: number): number {
      if (ang <= this.angle1) {
        ang += 2 * Math.PI;
      }
      return ang;
    }

    private getP1(p: IPoint): HPoint {
      const vec: IPoint = {x: this.sp.x - p.x, y: this.sp.y - p.y};
      PointUtils.normalize(vec);
      return new HPoint(p.x + vec.x, p.y + vec.y);
    }
  }
}