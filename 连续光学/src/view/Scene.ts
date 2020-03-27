namespace hanyeah {
  import Container = PIXI.Container;
  import Graphics = PIXI.Graphics;
  export class Scene extends Container {
    public world: World = new World();
    private gra: Graphics;
    private eqs: Equipment[] = [];
    constructor() {
      super();
      this.gra = new Graphics();
      this.addChild(this.gra);
      this.addEq(new Light(this), 400, 100);
      // this.addEq(new Mirror(this), 300, 300);
      // this.addEq(new Mirror(this), 500, 300);
      this.addEq(new Lens(this, 100), 400, 400);
      this.addEq(new Lens(this, -100), 400, 500);
      this.addEq(new Wall(this, {x: 0, y: 0}, {x: 0, y: 600}), 0, 0);
      this.addEq(new Wall(this, {x: 800, y: 0}, {x: 800, y:600}), 0, 0);
      this.addEq(new Wall(this, {x: 0, y: 0}, {x: 800, y: 0}), 0, 0);
      this.addEq(new Wall(this, {x: 0, y: 600}, {x: 800, y: 600}), 0, 0);
    }

    addEq(eq: Equipment, x: number, y: number): Equipment {
      eq.position.set(x, y);
      this.addChild(eq);
      this.eqs.push(eq);
      return eq;
    }

    update(dt: number): void {
      this.eqs.forEach((eq: Equipment) => {
        eq.update(dt);
      });
      const quads: QuadData[] = this.world.calculate();
      this.gra.clear();
      this.gra.lineStyle(1, 0xffffff, 0.8);
      for (let i: number = 0; i < quads.length; i++) {
        this.gra.beginFill(0xff00ff, 0.5);
        const quad: QuadData = quads[i];
        const p: IPoint = LineUtil.intersectSegmentSegment(quad.p0, quad.p1, quad.p2, quad.p3);
        if (p) {
          this.gra.moveTo(quad.p0.x, quad.p0.y);
          this.gra.lineTo(p.x, p.y);
          this.gra.lineTo(quad.p3.x, quad.p3.y);
          this.gra.closePath();
          this.gra.moveTo(p.x, p.y);
          this.gra.lineTo(quad.p2.x, quad.p2.y);
          this.gra.lineTo(quad.p1.x, quad.p1.y);
          this.gra.closePath();
        } else {
          this.gra.moveTo(quad.p0.x, quad.p0.y);
          this.gra.lineTo(quad.p1.x, quad.p1.y);
          this.gra.lineTo(quad.p2.x, quad.p2.y);
          this.gra.lineTo(quad.p3.x, quad.p3.y);
        }
        this.gra.endFill();
      }
      
      this.world.calculater.lightArr.forEach((light: LineLight) => {
        this.gra.beginFill(0x00ff00, 0.5);
        this.gra.drawCircle(light.sp.x, light.sp.y, 10);
        this.gra.endFill();
      });
    }
  }
}