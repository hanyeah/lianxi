namespace hanyeah {
  import Container = PIXI.Container;
  import Graphics = PIXI.Graphics;
  import Point = PIXI.Point;
  import InteractionEvent = PIXI.interaction.InteractionEvent;
  import Text = PIXI.Text;
  export class DragAbleCircle extends Container{
    private lastP: Point;
    public tf: Text;
    constructor(r: number, co: number, x: number, y: number) {
      super();
      const gra: Graphics = new Graphics();
      this.addChild(gra);
      gra.lineStyle(1, 0xffffff, 0.8);
      gra.beginFill(co, 0.6);
      gra.drawCircle(0, 0, r);
      this.x = x;
      this.y = y;
      this.addListener("mousedown", this.mouseDownHandler);
      this.cursor = "pointer";
      this.interactive = true;

      this.tf = new Text("", {fill: "#00ff00", fontSize: 12});
      this.addChild(this.tf);
      this.tf.y = - r - 30; 
    }

    mouseDownHandler = (e: InteractionEvent) => {
      this.lastP = e.data.global.clone();
      this.addListener("mousemove", this.mouseMoveHandler);
      this.addListener("mouseup", this.mouseUpHandler);
      this.addListener("mouseupoutside", this.mouseUpHandler);
    }

    mouseMoveHandler = (e: InteractionEvent) => {
      this.x += e.data.global.x - this.lastP.x;
      this.y += e.data.global.y - this.lastP.y;
      this.lastP = e.data.global.clone();
    }

    mouseUpHandler = (e: InteractionEvent) => {
      this.removeListener("mousemove", this.mouseMoveHandler);
      this.removeListener("mouseup", this.mouseUpHandler);
      this.removeListener("mouseupoutside", this.mouseUpHandler);
    }
  }
}