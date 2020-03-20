namespace hanyeah {
  import Container = PIXI.Container;
  import Graphics = PIXI.Graphics;
  export class Light extends Equipment{
    public p0: DragAbleCircle;
    public p1: DragAbleCircle;
    public p2: DragAbleCircle;
    public data: LightData;
    private gra: Graphics;
    constructor(main: Scene) {
      super(main);
      this.gra = new Graphics();
      this.addChild(this.gra);
      this.p2 = new DragAbleCircle(5, 0x00ff00, 0, 0);
      this.p0 = new DragAbleCircle(5, 0xff0000, -20, 50);
      this.p1 = new DragAbleCircle(5, 0xff0000, 20, 50);
      this.addChild(this.p0);
      this.addChild(this.p1);
      this.addChild(this.p2);
      this.data = new LightData(this.main.world);
    }
    update(dt: number): void {
      super.update(dt);
      this.data.p0.set(this.x + this.p0.x, this.y + this.p0.y);
      this.data.p1.set(this.x + this.p1.x, this.y + this.p1.y);
      this.data.sP.set(this.x + this.p2.x, this.y + this.p2.y);
      //
      this.gra.clear();
      this.gra.lineStyle(5, 0x00ffff, 0.8);
      this.gra.moveTo(this.p0.x, this.p0.y);
      this.gra.lineTo(this.p1.x, this.p1.y);
      this.gra.lineStyle(1, 0x00ffff, 0.8);
      this.gra.moveTo(this.p2.x, this.p2.y);
      this.gra.lineTo(this.p0.x, this.p0.y);
      this.gra.moveTo(this.p2.x, this.p2.y);
      this.gra.lineTo(this.p1.x, this.p1.y);
    }
  }
}