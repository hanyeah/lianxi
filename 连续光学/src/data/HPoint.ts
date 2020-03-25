namespace hanyeah {
  export class HPoint implements IPoint{
    public x: number;
    public y: number;
    constructor(x: number = 0, y: number = 0) {
      this.x = x;
      this.y = y;
    }

    public set(x: number, y: number): void {
      this.x = x;
      this.y = y;
    }

    public clone(): HPoint {
      return new HPoint(this.x, this.y);
    }
  }
}