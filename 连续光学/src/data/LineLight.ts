namespace hanyeah {
  /**
   * 线光源
   */
  export class LineLight extends LightData {
    public p0: HPoint;
    public p1: HPoint;
    public type: LightType = LightType.diverge;
    constructor(world: World, sp: HPoint, p0: HPoint, p1: HPoint, type: LightType) {
      super(world, sp);
      this.p0 = p0;
      this.p1 = p1;
      this.type = type;
    }

    public destroy(): void {
      super.destroy();
    }

  }
}
