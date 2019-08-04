/**
 * Created by hanyeah on 2019/7/17.
 */

/// <reference path="geom/Ray.ts"/>
/// <reference path="geom/Point.ts"/>
/// <reference path="geom/Circle.ts"/>
/// <reference path="geom/Circle2.ts"/>
/// <reference path="geom/Ellipse.ts"/>
/// <reference path="geom/IntersectResult.ts"/>
/// <reference path="lens/VVLens.ts"/>
namespace hanyeah.optical {
  import IGeom = hanyeah.optical.geom.IGeom;
  import Ray = hanyeah.optical.geom.Ray;
  import Point = hanyeah.optical.geom.Point;
  import Circle = hanyeah.optical.geom.Circle;
  import IntersectResult = hanyeah.optical.geom.IntersectResult;
  import Ellipse = hanyeah.optical.geom.Ellipse;
  import VVLens = hanyeah.optical.lens.VVLens;
  import Lens = hanyeah.optical.lens.Lens;

  export class Example01 {
    public ctx: CanvasRenderingContext2D;
    public arr: Array<IGeom> = [];
    private ray: Ray;
    private mouseP: Point = new Point();
    private lens: Lens;
    constructor(ctx: CanvasRenderingContext2D) {
      console.log(ctx);
      this.ctx = ctx;

      this.ray = new Ray(new Point(100, 100), new Point(100, 100));
      this.arr.push(this.ray);

      this.lens = new VVLens();
      this.lens.setPosition(400, 300);

      setInterval(this.loop.bind(this));

      ctx.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
    }

    onMouseMove(e: MouseEvent) {
      this.mouseP.x = e.clientX;
      this.mouseP.y = e.clientY;
      this.ray.dir.setXY(this.mouseP.x - this.ray.sp.x, this.mouseP.y - this.ray.sp.y);
      this.ray.dir.normalize(1);
    }

    loop() {
      const ctx: CanvasRenderingContext2D = this.ctx;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.canvas.style.backgroundColor = "#cccccc";

      // const result: IntersectResult = this.circle.intersect(this.ray);

      let result: IntersectResult = this.lens.intersect(this.ray);
      const d: number = result.distance || 1000;
      this.drawLine(ctx, this.ray.sp, this.ray.getPoint(d));
    }

    drawEllipse(ctx: CanvasRenderingContext2D, x: number, y: number, a: number, b: number, w: number = 1, co: string = "red") {
      ctx.beginPath();
      ctx.lineWidth = w; // 设置线条宽度
      ctx.strokeStyle = co; // 设置线条颜色
      ctx.ellipse(x, y, a, b, 0, 0, 2 * Math.PI);
      ctx.stroke(); // 用于绘制线条
      ctx.closePath();
    }

    drawLine(ctx: CanvasRenderingContext2D, p0: Point, p1: Point, w: number = 1, co: string = "red") {
      ctx.beginPath();
      ctx.lineWidth = w; // 设置线条宽度
      ctx.strokeStyle = co; // 设置线条颜色
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.stroke(); // 用于绘制线条
      ctx.closePath();
    }

    drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, w: number = 1, co: string = "red") {
      ctx.beginPath();
      ctx.lineWidth = w; // 设置线条宽度
      ctx.strokeStyle = co; // 设置线条颜色
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.stroke(); // 用于绘制线条
      ctx.closePath();
    }

  }
}
