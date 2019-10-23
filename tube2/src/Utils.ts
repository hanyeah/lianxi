/**
 * Created by hanyeah on 2019/10/23.
 */
namespace hanyeah.tube{
  import Point = PIXI.Point;

  export class Utils{
    public static PX_PER_M = 1000;

    public static getDir(p0: Point, p1: Point): Point{
      const leng: number = Utils.distance(p0, p1);
      if (leng === 0) {
        throw(new Error("getDir error: leng is zero!"));
      }
      return new Point((p1.x - p0.x) / leng, (p1.y - p0.y) / leng);
    }

    public static pointAt(p0: Point, dir: Point, d: number): Point{
      return new Point(p0.x + dir.x * d, p0.y + dir.y * d);
    }

    public static distance(p0: Point, p1: Point): number{
      return Utils.leng(p0.x - p1.x, p0.y - p1.y);
    }

    public static leng(x: number, y: number): number{
      return Math.sqrt(x * x + y * y);
    }

    public static m2px(m: number): number{
      return m * Utils.PX_PER_M;
    }

    public static px2m(px: number): number{
      return px / Utils.PX_PER_M;
    }

  }

}
