/**
 * Created by hanyeah on 2019/7/11.
 */
namespace hanyeah.optical.geom {
  export class Point {
    public x: number;
    public y: number;

    public static add(p1: Point, p2: Point): Point {
      return new Point(p1.x + p2.x, p1.y + p2.y);
    }

    public static sub(p1: Point, p2: Point): Point {
      return new Point(p1.x - p2.x, p1.y - p2.y);
    }

    public static dot(p1: Point, p2: Point): number {
      return p1.x * p2.x + p1.y * p2.y;
    }

    public static cross(p1: Point, p2: Point): number {
      return p1.x * p2.y - p1.y * p2.x;
    }

    public static rot90(p: Point): Point {
      return new Point(+p.y, -p.x);
    }

    public static rotNeg90(p: Point): Point {
      return new Point(-p.y, +p.x);
    }

    public static interpolate(p1: Point, p2: Point, f: number): Point {
      return new Point(p1.x + (p2.x - p1.x) * f, p1.y + (p2.y - p1.y) * f);
    }

    public static getFactor(p1: Point, p2: Point, p: Point): number{
      if (p1.x !== p2.x) {
        return (p.x - p1.x) / (p2.x - p1.x);
      }
      if (p1.y !== p2.y) {
        return (p.y - p1.y) / (p2.y - p1.y);
      }
      return NaN;
    }

    public static distance(p1: Point, p2: Point): number{
      return Point.sub(p2, p1).length();
    }

    public static sqrDistance(p1: Point, p2: Point): number{
      return Point.sub(p2, p1).sqrLength();
    }

    constructor(x: number = 0.0, y: number = 0.0) {
      this.x = x;
      this.y = y;
    }

    public clone(): Point {
      return new Point(this.x, this.y);
    }

    public length(): number {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public sqrLength(): number {
      return this.x * this.x + this.y * this.y;
    }

    public normalize(value: number = 1) {
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
      const t: number = this.y;
      this.y = -this.x;
      this.y = t;
    }

    public rotNeg90() {
      const t: number = this.x;
      this.x = -this.y;
      this.y = t;
    }

    public dot(p: Point): number {
      return this.x * p.x + this.y * p.y;
    }

    public cross(p: Point): number {
      return this.x * p.y - this.y * p.x;
    }

    public setXY(x: number, y: number) {
      this.x = x;
      this.y = y;
    }

  }
}
