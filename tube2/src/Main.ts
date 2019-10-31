/**
 * Created by hanyeah on 2019/10/23.
 */
namespace hanyeah.tube {

  import DTube = hanyeah.tube.DTube;
  export class Main {

    public app: PIXI.Application;
    public renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
    public stage: PIXI.Container;
    public ticker: PIXI.ticker.Ticker;
    public tube: DTube;
    public bottle: Bottle;

    constructor(canvas: HTMLCanvasElement) {
      console.log("main");
      this.app = new PIXI.Application({view: canvas, transparent: true, antialias: true});
      this.renderer = this.app.renderer;
      this.stage = this.app.stage;
      this.stage.interactive = true;
      this.ticker = this.app.ticker;

      this.stage.hitArea = new StageHItArea();

    }

    public update(dt: number) {
      //
    }

  }

  class StageHItArea implements PIXI.IHitArea {
    constructor() {
    }

    contains(x, y): boolean {
      return true;
    }
  }
}
