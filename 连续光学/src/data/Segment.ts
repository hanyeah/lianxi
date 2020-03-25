namespace hanyeah {
  export class Segment {
    public world: World;
    public p0: HPoint = new HPoint(-10, 0);
    public p1: HPoint = new HPoint(10, 0);
    public type: SegmentType;
    constructor(world: World, type: SegmentType) {
      this.type = type;
      this.world = world;
      world.addSegment(this);
    }

    public destroy(): void {
      this.world.removeSegment(this);
      this.world = null;
    }

  }

}
