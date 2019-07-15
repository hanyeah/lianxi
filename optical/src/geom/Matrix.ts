/**
 * Created by hanyeah on 2019/7/15.
 */
namespace hanyeah.optical.geom {
  export class Matrix {
    public a: number;
    public b: number;
    public c: number;
    public d: number;
    public tx: number;
    public ty: number;

    constructor(a: number = 1.0, b: number = 0.0, c: number = 0.0, d: number = 1.0, tx: number = 0.0, ty: number = 0.0) {
      this.a = a;
      this.b = b;
      this.c = c;
      this.d = d;
      this.tx = tx;
      this.ty = ty;
    }

    public clone(): Matrix {
      return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
    }

    public setMatrix(m: Matrix): void{
      this.a = m.a;
      this.b = m.b;
      this.c = m.c;
      this.d = m.d;
      this.tx = m.tx;
      this.ty = m.ty;
    }

    public identity(): void {
      this.a = 1.0;
      this.b = 0.0;
      this.c = 0.0;
      this.d = 1.0;
      this.tx = 0.0;
      this.ty = 0.0;
    }

    public rotate(angle: number): void {
      const sin: number = Math.sin(angle);
      const cos: number = Math.cos(angle);
      const m: Matrix = new Matrix(cos, sin, -sin, cos, 0.0, 0.0);
      this.concat(m);
    }

    public scale(sx: number, sy: number): void {
      const m: Matrix = new Matrix(sx, 0.0, 0.0, sy, 0.0, 0.0);
      this.concat(m);
    }

    public translate(dx: number, dy: number): void {
      this.tx += dx;
      this.ty += dy;
    }

    public transformPoint(p: Point): Point {
      return new Point(this.a * p.x + this.b * p.y + this.tx, this.c * p.x + this.d * p.y + this.ty);
    }

    public deltaTransformPoint(p: Point): Point {
      return new Point(this.a * p.x + this.b * p.y, this.c * p.x + this.d * p.y);
    }

    public createBox(sx: number, sy: number, rotation: number, tx: number, ty: number) {
      this.identity();
      this.rotate(rotation);
      this.scale(sx, sy);
      this.translate(tx, ty);
    }

    public concat(m: Matrix): void {
      const a0: number = this.a * m.a + this.b * m.c;
      const b0: number = this.a * m.b + this.b * m.d;
      const c0: number = this.c * m.a + this.d * m.c;
      const d0: number = this.c * m.b + this.d * m.d;
      const tx0: number = this.a * m.tx + this.b * m.ty + this.tx;
      const ty0: number = this.c * m.tx + this.d * m.ty + this.ty;
      this.a = a0;
      this.b = b0;
      this.c = c0;
      this.d = d0;
      this.tx = tx0;
      this.ty = ty0;
    }

    public invert() {
      const c0: number = this.c / (this.b * this.c - this.a * this.d);
      const a0: number = this.d / (this.a * this.d - this.b * this.c);
      const d0: number = this.a / (this.a * this.d - this.b * this.c);
      const b0: number = this.b / (this.b * this.c - this.a * this.d);
      const tx0: number = (this.b * this.ty - this.d * this.tx) / (this.a * this.d - this.b * this.c);
      const ty0: number = (this.a * this.ty - this.c * this.tx) / (this.b * this.c - this.a * this.d);
      this.a = a0;
      this.b = b0;
      this.c = c0;
      this.d = d0;
      this.tx = tx0;
      this.ty = ty0;
    }

    public toString(): string {
      return "( a=" + this.a + ", b=" + this.b + " ,c=" + this.c + " ,d=" + this.d + " ,tx=" + this.tx + " ,ty=" + this.ty + " )";
    }

    public toJsonString(): string {
      return `{a: ${this.a}, b: ${this.b}, c: ${this.c}, d: ${this.d}, tx: ${this.tx}, ty: ${this.ty}`;
    }

  }
}
