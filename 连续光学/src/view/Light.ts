namespace hanyeah {
  import Container = PIXI.Container;
  import Graphics = PIXI.Graphics;
  export class Light extends Equipment{
    public p0: DragAbleCircle;
    public p1: DragAbleCircle;
    public p2: DragAbleCircle;
    public data: PointLight;
    private gra: Graphics;
    constructor(main: Scene) {
      super(main);
      this.gra = new Graphics();
      this.addChild(this.gra);
      this.p0 = new DragAbleCircle(5, 0xff0000, 0, 0);
      this.p1 = new DragAbleCircle(5, 0xff0000, 30, 50);
      this.p2 = new DragAbleCircle(5, 0xff0000, -30, 50);
      this.addChild(this.p0);
      this.addChild(this.p1);
      this.addChild(this.p2);
      this.data = new PointLight(this.main.world);
    }
    update(dt: number): void {
      super.update(dt);
      this.data.sp.set(this.x + this.p0.x, this.y + this.p0.y);
      this.data.angle0 = Math.atan2(this.p1.y - this.p0.y, this.p1.x - this.p0.x);
      this.data.angle1 = Math.atan2(this.p2.y - this.p0.y, this.p2.x - this.p0.x);
      //
      this.gra.clear();
      this.gra.lineStyle(5, 0x00ffff, 0.8);
      this.gra.moveTo(this.p0.x, this.p0.y);
      this.gra.lineTo(this.p1.x, this.p1.y);
      this.gra.moveTo(this.p0.x, this.p0.y);
      this.gra.lineTo(this.p2.x, this.p2.y);
    }
  }
}