/**
 * Created by hanyeah on 2019/7/17.
 */
namespace hanyeah.optical {
  import Ray = hanyeah.optical.geom.Ray;
  import Point = hanyeah.optical.geom.Point;
  import IntersectResult = hanyeah.optical.geom.IntersectResult;
  import VVLens = hanyeah.optical.lens.VVLens;
  import Shape = hanyeah.optical.geom.Shape;

  export class Example01 {
    public ctx: CanvasRenderingContext2D;
    private mouseP: Point = new Point();
    private world: OpticalWorld = new OpticalWorld();
    private mouseMoved: boolean = true;

    constructor(ctx: CanvasRenderingContext2D) {
      this.ctx = ctx;

      for (let i: number = 0; i < 100; i++) {
        const ang: number = Math.PI * i / 50;
        const ray: Ray = new Ray(new Point(400 + 200 * Math.cos(ang), 300 + 200 * Math.sin(ang)), new Point(100, 100));
        this.world.addRay(ray);
      }

      for (let i: number = 0; i < 100; i++) {
        const ang: number = Math.PI * i / 50;
        const vvlens: VVLens = new VVLens();
        vvlens.setPosition(400 + 100 * Math.cos(ang), 300 + 100 * Math.sin(ang));
        vvlens.updateTransform();
        this.world.addShape(vvlens);
      }

      setInterval(this.loop.bind(this));

      ctx.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
    }

    onMouseMove(e: MouseEvent) {
      this.mouseP.x = e.clientX;
      this.mouseP.y = e.clientY;
      this.world.rays.forEach((ray: Ray) => {
        ray.dir.setXY(this.mouseP.x - ray.sp.x, this.mouseP.y - ray.sp.y);
        ray.dir.normalize(1);
      });
      this.mouseMoved = true;
    }

    loop() {
      const ctx: CanvasRenderingContext2D = this.ctx;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.canvas.style.backgroundColor = "#cccccc";

      // const result: IntersectResult = this.circle.intersect(this.ray);
      // console.time("计算用时：");

      const rayLen: number = this.world.rays.length;
      const shapeLen: number = this.world.shapes.length;

      let ray: Ray;
      let shape: Shape;
      if (this.mouseMoved) {
        this.mouseMoved = false;
        for (let i = 0; i < rayLen; i++) {
          this.world.updateLocalRayByRay(this.world.rays[i]);
        }
      }

      const result: IntersectResult = new IntersectResult();
      for (let i = 0; i < rayLen; i++) {
        result.distance = Infinity;
        ray = this.world.rays[i];
        this.world.rayCast2(ray, result);
        ray.distance = result.distance === Infinity ? 2000 : result.distance;
      }
      // console.timeEnd("计算用时：");
      // console.time("渲染用时：");
      for (let i = 0; i < rayLen; i++) {
        ray = this.world.rays[i];
        this.drawLine(ctx, ray.sp, ray.getPoint(ray.distance));
      }

      for (let i = 0; i < shapeLen; i++) {
        shape = this.world.shapes[i];
        if (shape instanceof VVLens) {
          // a
          const vvlens: VVLens = shape as VVLens;
          ctx.save();
          ctx.rotate(vvlens.rotation);
          ctx.translate(vvlens.x, vvlens.y);

          ctx.beginPath();
          ctx.fillStyle = "red";
          ctx.arc(vvlens.circleL.x, vvlens.circleL.y, vvlens.circleL.r, 0, 2 * Math.PI);
          ctx.clip("nonzero"); // 'nonzero', 'evenodd'
          ctx.arc(vvlens.circleR.x, vvlens.circleR.y, vvlens.circleR.r, 0, 2 * Math.PI);
          ctx.stroke(); // 用于绘制线条
          ctx.closePath();

          ctx.restore();
        }
      }

      // console.timeEnd("渲染用时：");
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
