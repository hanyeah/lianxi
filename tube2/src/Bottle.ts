/**
 * Created by hanyeah on 2019/10/23.
 */
namespace hanyeah.tube{
  export class Bottle extends PIXI.Container{
    public d: number = 80;
    public s: number = DUtils.getS(this.d / 2);
    public h: number = 100;
    public v: number = this.s * this.h;
    public wV: number = 0;
    public wH: number = 0;
    public p0: number = 0;
    public gra: PIXI.Graphics;

    constructor() {
      super();
      this.gra = new PIXI.Graphics();
      this.addChild(this.gra);
    }

    public update(dt: number) {
      this.updateSkin();
    }

    public updateSkin() {
      const gra: PIXI.Graphics = this.gra;
      gra.clear();
      gra.lineStyle(1, 0x000000, 1.0);
      gra.drawRect(-40, -120, 80, 120);
      gra.beginFill(0xff0000, 0.3);
      gra.drawRect(-40, -this.wH, 80, this.wH);
      gra.endFill();
    }

    public v2h(v: number): number{
      return v / this.s;
    }

    public h2v(h: number): number {
      return h * this.s;
    }

    public addWater(v) {
      this.wV += v;
      if (this.wV > this.v) {
        this.wV = this.v;
      }
      if (this.wV < 0) {
        this.wV = 0;
      }
      this.wH = this.v2h(this.wV);
    }

    public removeWater(v) {
      this.addWater(-v);
    }

    public getP(g: number, h: number): number{
      return this.p0 + 1.0e3 * g * Math.min(this.wH, h);
    }



  }
}
