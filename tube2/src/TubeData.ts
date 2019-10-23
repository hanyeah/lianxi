/**
 * Created by hanyeah on 2019/10/23.
 */
namespace hanyeah.tube{
  import Point = PIXI.Point;
  export class TubeData{
    public p0: Point;
    public p1: Point;
    public d: number;
    public column0: Column;
    public column1: Column;
    private length: number;

    constructor(p0: Point, p1: Point, d: number, data: LiquidData) {
      console.log("tube");
      this.p0 = p0;
      this.p1 = p1;
      this.d = d;
      //
      this.length = Utils.distance(this.p0, this.p1);
      //
      data.v = this.h2v(this.length);
      this.column0 = new Column(this.length, data);
      this.column1 = this.column0;
    }

    public v2h(v: number): number{
      return v / this.d;
    }

    public h2v(h: number): number{
      return h * this.d;
    }

    public add(data: LiquidData) {
      if (data.type === this.column0.data.type) {
        this.column0.length += this.v2h(data.v);
      } else {
        const column: Column = new Column(this.v2h(data.v), data);
        column.next = this.column0;
        this.column0.prev = column;
        this.column0 = column;
      }
      //
      this.updatePrevLength();
      this.cutOff();
    }

    public reverseAdd(data: LiquidData) {
      if (data.type === this.column1.data.type) {
        this.column1.length += this.v2h(data.v);
      } else {
        const column: Column = new Column(this.v2h(data.v), data);
        column.prev = this.column1;
        this.column1.next = column;
        this.column1 = column;
      }
      //
      this.updateNextLength();
      this.reverseCutOff();
    }

    public forEach(callBack: Function) {
      let column: Column = this.column0;
      callBack(column);
      while (column !== this.column1) {
        column = column.next;
        callBack(column);
      }
    }

    public reverseForEach(callBack: Function) {
      let column: Column = this.column1;
      callBack(column);
      while (column !== this.column0) {
        column = column.prev;
        callBack(column);
      }
    }

    public columnNum(): number{
      let n: number = 1;
      let column = this.column0;
      while (column !== this.column1) {
        column = column.next;
        n++;
      }
      return n;
    }

    public getP(g: number): number{
      const dy: number = this.p0.y - this.p1.y;
      if (dy === 0) {
        return 0;
      }
      let column = this.column0;
      let p = column.getP(g);
      while (column !== this.column1) {
        column = column.next;
        p += column.getP(g);
      }
      return p * dy / this.length;
    }

    private updatePrevLength() {
      let column: Column = this.column0;
      column.prevLength = 0;
      while (column !== this.column1) {
        column.next.prevLength = column.prevLength + column.length;
        column = column.next;
      }
    }

    private cutOff() {
      while (this.column1.prevLength > this.length) {
        this.remove();
      }
      this.column1.length = this.length - this.column1.prevLength;
    }

    private remove() {
      this.column1 = this.column1.prev;
      this.column1.next.destroy();
      this.column1.next = this.column1;
    }

    private updateNextLength() {
      let column: Column = this.column1;
      column.nextLength = 0;
      while (column !== this.column0){
        column.prev.nextLength = column.nextLength + column.length;
        column = column.prev;
      }
    }

    private reverseCutOff() {
      while (this.column0.nextLength > this.length) {
        this.reverseRemove();
      }
      this.column0.length = this.length - this.column0.nextLength;
    }

    private reverseRemove() {
      this.column0 = this.column0.next;
      this.column0.prev.destroy();
      this.column0.prev = this.column0;
    }

  }
}
