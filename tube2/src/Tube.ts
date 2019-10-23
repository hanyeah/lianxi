/**
 * Created by hanyeah on 2019/10/23.
 */
namespace hayeah.tube{
  import TubeData = hanyeah.tube.TubeData;
  import Point = PIXI.Point;
  import LiquidData = hanyeah.tube.LiquidData;
  import Column = hanyeah.tube.Column;
  export class Tube extends PIXI.Container{
    public tubeData: TubeData;
    public length: number = 100;
    public gra: PIXI.Graphics;
    constructor() {
      super();
      this.tubeData = new TubeData(new Point(0, 0), new Point(0, -200), 6, LiquidData.getAir());
      this.gra = new PIXI.Graphics();
      this.addChild(this.gra);
    }

    update(dt: number) {
      this.updateSkin();
    }

    updateSkin() {
      const gra: PIXI.Graphics = this.gra;
      gra.clear();
      gra.lineStyle(1, 0x000000, 1.0);
      gra.moveTo(-3, 0);
      gra.lineTo(-3, -200);
      gra.moveTo(3, 0);
      gra.lineTo(3, -200);

      this.tubeData.forEach((column: Column) => {
        gra.lineStyle(6, column.data.color, 1.0);
        gra.moveTo(0, -column.prevLength);
        gra.lineTo(0, -(column.prevLength + column.length));
      });
    }

  }
}
