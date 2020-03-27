namespace hanyeah {
  export class Lens extends Mirror {
    constructor(scene: Scene, f: number = 100) {
      super(scene);
      this.data.type = SegmentType.lens;
      this.data.f = f;
    }
  }
}
