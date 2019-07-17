/**
 * Created by hanyeah on 2019/7/17.
 */
namespace hanyeah.optical{
  import IGeom = hanyeah.optical.geom.IGeom;
  import Ray = hanyeah.optical.geom.Ray;
  import Point = hanyeah.optical.geom.Point;
  import Circle = hanyeah.optical.geom.Circle;
  export class Example01{
    public ctx: CanvasRenderingContext2D;
    public arr: Array<IGeom> = [];
    private ray: Ray;
    private circle: Circle;
    private mouseP: Point = new Point();
    constructor(ctx: CanvasRenderingContext2D) {
      console.log(ctx);
      this.ctx = ctx;

      this.ray = new Ray(new Point(100, 100), new Point(100, 100));
      this.arr.push(this.ray);

      this.circle = new Circle(50);
      this.arr.push(this.circle);
      this.circle.setPosition(400, 300);

      setInterval(this.loop.bind(this));

      ctx.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
    }

    onMouseMove(e: MouseEvent) {
      this.mouseP.x = e.clientX;
      this.mouseP.y = e.clientY;
      this.ray.dir.setXY(this.mouseP.x - this.ray.sp.x, this.mouseP.y - this.ray.sp.y);
      this.ray.dir.normalize(1);
    }

    loop(){
      const ctx: CanvasRenderingContext2D = this.ctx;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.canvas.style.backgroundColor = "#cccccc";

      ctx.beginPath();
      ctx.lineWidth = 1; // 设置线条宽度
      ctx.strokeStyle = "red"; // 设置线条颜色
      ctx.moveTo(this.ray.sp.x, this.ray.sp.y);
      const p = this.ray.getPoint(300);
      ctx.lineTo(p.x, p.y);
      ctx.stroke(); // 用于绘制线条
      ctx.closePath();

      ctx.beginPath();
      ctx.lineWidth = 1; // 设置线条宽度
      ctx.strokeStyle = "green"; // 设置线条颜色
      ctx.arc(this.circle.x, this.circle.y, this.circle.r, 0, 2 * Math.PI);
      ctx.stroke(); // 用于绘制线条
      ctx.closePath();

    }
  }
}
