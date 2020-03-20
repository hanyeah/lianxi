namespace hanyeah {
  import Container = PIXI.Container;
  import Graphics = PIXI.Graphics;
  export class Wall extends Equipment{
    public data: Segment;
    private gra: Graphics;
    private p0: IPoint;
    private p1: IPoint;
    constructor(main: Scene, p0: IPoint, p1: IPoint) {
      super(main);
      this.gra = new Graphics();
      this.addChild(this.gra);
      this.data = new Segment(this.main.world, SegmentType.wall);
      this.p0 = p0;
      this.p1 = p1;
    }
    update(dt: number): void {
      super.update(dt);
      this.data.p0.set(this.x + this.p0.x, this.y + this.p0.y);
      this.data.p1.set(this.x + this.p1.x, this.y + this.p1.y);
      //
      this.gra.clear();
      this.gra.lineStyle(1, 0xff0000, 0.8);
      this.gra.moveTo(this.p0.x, this.p0.y);
      this.gra.lineTo(this.p1.x, this.p1.y);
    }
  }
}