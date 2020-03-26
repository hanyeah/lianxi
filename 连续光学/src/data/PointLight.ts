namespace hanyeah {
  /**
   * 点光源
   */
  export class PointLight extends LightData {
    public angle0: number = 0;
    public angle1: number = 0;
    constructor(world: World, sp: HPoint = null, angle0: number = 0, angle1: number = Math.PI / 2) {
      super(world, sp);
      this.angle0 = angle0;
      this.angle1 = angle1;
    }

    public destroy(): void {
      super.destroy();
    }

    /**
     * 获取光源到指定点的光线。
     */
    protected getRay(p: HPoint): RayData {
      const ang: number = Math.atan2(p.y - this.sp.y, p.x - this.sp.x);
      if(this.isLegalAng(ang)) {
        return new RayData(this.sp.clone(), p, ang, this);
      }
      return null;
    }

    protected getBoundary(): RayData[] {
      return [
        new RayData(this.sp.clone(), this.getP1ByAngle(this.angle0), this.angle0, this),
        new RayData(this.sp.clone(), this.getP1ByAngle(this.angle1), this.angle1, this)
      ];
    }

    protected getP1ByAngle(ang: number): HPoint {
      return new HPoint(this.sp.x + Math.cos(ang), this.sp.y + Math.sin(ang));
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

    private formatAngle(ang: number): number {
      if (ang <= this.angle1) {
        ang += 2 * Math.PI;
      }
      return ang;
    }

  }
}