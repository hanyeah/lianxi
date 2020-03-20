namespace hanyeah {
  import Container = PIXI.Container;
  import Graphics = PIXI.Graphics;
  export class Mirror extends Equipment {
    public p0: DragAbleCircle;
    public p1: DragAbleCircle;
    public data: Segment;
    private gra: Graphics;
    constructor(main: Scene) {
      super(main);
      this.gra = new Graphics();
      this.addChild(this.gra);
      this.p0 = new DragAbleCircle(5, 0x0000ff, -20, 0);
      this.p1 = new DragAbleCircle(5, 0x0000ff, 20, 0);
      this.addChild(this.p0);
      this.addChild(this.p1);
      this.data = new Segment(this.main.world, SegmentType.mirror);
    }
    update(dt: number): void {
      super.update(dt);
      this.data.p0.set(this.x + this.p0.x, this.y + this.p0.y);
      this.data.p1.set(this.x + this.p1.x, this.y + this.p1.y);
      //
      this.gra.clear();
      this.gra.lineStyle(5, 0xffff00, 0.8);
      this.gra.moveTo(this.p0.x, this.p0.y);
      this.gra.lineTo(this.p1.x, this.p1.y);
      //
      if(this.data.p0.angData) {
        this.p0.tf.text = "" + Math.round(this.data.p0.angData.angle * 100)/100;
      }
      if(this.data.p1.angData) {
        this.p1.tf.text = "" + Math.round(this.data.p1.angData.angle * 100)/100;
      }
    }
  }
}