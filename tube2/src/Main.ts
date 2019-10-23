/**
 * Created by hanyeah on 2019/10/23.
 */
namespace hanyeah.tube{

  import Tube = hayeah.tube.Tube;
  export class Main{

    public app: PIXI.Application;
    public renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
    public stage: PIXI.Container;
    public ticker: PIXI.ticker.Ticker;
    public tube: Tube;
    public bottle: Bottle;
    constructor(canvas: HTMLCanvasElement) {
      console.log("main");
      this.app = new PIXI.Application({view: canvas, transparent: true, antialias: true});
      this.renderer = this.app.renderer;
      this.stage = this.app.stage;
      this.stage.interactive = true;
      this.ticker = this.app.ticker;

      this.stage.hitArea = new StageHItArea();

      this.ticker.add(this.update, this);

      this.tube = new Tube();
      this.stage.addChild(this.tube);
      this.tube.x = 400;
      this.tube.y = 400;

      this.bottle = new Bottle();
      this.stage.addChild(this.bottle);
      this.bottle.x = 400;
      this.bottle.y = 400 + 20;
      this.bottle.addWater(this.bottle.h2v(60));
    }

    public update(dt: number) {
      this.tube.update(dt);
      this.bottle.update(dt);
    }

  }

  class StageHItArea implements PIXI.IHitArea{
    constructor(){
    }

    contains(x, y): boolean {
      return true;
    }
  }
}
