/**
 * Created by hanyeah on 2019/7/11.
 */
namespace hanyeah.optical.geom {
  export class Point {
    public x: Number;
    public y: Number;

    public static add(p1: Point, p2: Point): Point {
      return new Point(p1.x + p2.x, p1.y + p2.y);
    }

    public static sub(p1: Point, p2: Point): Point {
      return new Point(p1.x - p2.x, p1.y - p2.y);
    }

    public static dot(p1: Point, p2: Point): Number {
      return p1.x * p2.x + p1.y * p2.y;
    }

    public static cross(p1: Point, p2: Point): Number {
      return p1.x * p2.y - p1.y * p2.x;
    }

    public static rot90(p: Point): Point {
      return new Point(+p.y, -p.x);
    }

    public static rotNeg90(p: Point): Point {
      return new Point(-p.y, +p.x);
    }

    public static interpolate(p1: Point, p2: Point, f: Number): Point {
      return new Point(p1.x + (p2.x - p1.x) * f, p1.y + (p2.y - p1.y) * f);
    }

    public static getFactor(p1: Point, p2: Point, p: Point): Number{
      if (p1.x !== p2.x) {
        return (p.x - p1.x) / (p2.x - p1.x);
      }
      if (p1.y !== p2.y) {
        return (p.y - p1.y) / (p2.y - p1.y);
      }
      return NaN;
    }

    constructor(x: Number = 0, y: Number = 0) {
      this.x = x;
      this.y = y;
    }

    public clone(): Point {
      return new Point(this.x, this.y);
    }

    public length(): Number {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public sqrLength(): Number {
      return this.x * this.x + this.y * this.y;
    }

    public normalize(value: Number = 1) {
      const inv = value / this.length();
      this.x *= inv;
      this.y *= inv;
    }

    public negate() {
      this.x = -this.x;
      this.y = -this.y;
    }

    public multiplay(f) {
      this.x *= f;
      this.y *= f;
    }

    public divide(f) {
      this.x /= f;
      this.y /= f;
    }

    public add(p: Point) {
      this.x += p.x;
      this.y += p.y;
    }

    public sub(p: Point) {
      this.x -= p.x;
      this.y -= p.y;
    }

    public rot90() {
      const t: Number = this.y;
      this.y = -this.x;
      this.y = t;
    }

    public rotNeg90() {
      const t: Number = this.x;
      this.x = -this.y;
      this.y = t;
    }

    public dot(p: Point): Number {
      return this.x * p.x + this.y * p.y;
    }

    public cross(p: Point): Number {
      return this.x * p.y - this.y * p.x;
    }

    public setXY(x: Number, y: Number) {
      this.x = x;
      this.y = y;
    }

  }
}
