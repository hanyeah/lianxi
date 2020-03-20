namespace hanyeah {
  export class HPoint implements IPoint{
    public x: number;
    public y: number;
    public brother: HPoint;
    public owner: ISegment;
    public angData: AngleData;
    constructor(x: number = 0, y: number = 0, owner: ISegment = null) {
      this.x = x;
      this.y = y;
      this.owner = owner;
    }

    public set(x: number, y: number): void {
      this.x = x;
      this.y = y;
    }
  }
}