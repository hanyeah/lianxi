namespace hanyeah {
  export class Segment {
    public world: World;
    public p0: HPoint = new HPoint(0, 0, this);
    public p1: HPoint = new HPoint(0, 0, this);
    public type: SegmentType;
    constructor(world: World, type: SegmentType) {
      this.p0.brother = this.p1;
      this.p1.brother = this.p0;
      this.world = world;
      this.world.addSegment(this);
      this.type = type;
    }

    public destroy(): void {
      
    }

  }

  export enum SegmentType {
    mirror,
    wall,
    light
  }

  export interface ISegment {
    p0: HPoint;
    p1: HPoint;
  }

}