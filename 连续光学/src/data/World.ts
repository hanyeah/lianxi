namespace hanyeah {
  export class World {
    private lightDataArr: LightData[] = [];
    private sagmentDataArr: Segment[] = [];
    private calculater: Calculater = new Calculater();
    constructor() {

    }

    public addLight(data: LightData): void {
      this.lightDataArr.push(data);
    }

    public addSegment(data: Segment): void {
      this.sagmentDataArr.push(data);
    }

    public getAllLights(): LightData[] {
      return this.lightDataArr;
    }

    public getAllSegments(): Segment[] {
      return this.sagmentDataArr;
    }

    public calculate(): Quad[] {
      return this.calculater.calculate(this);
    }
  }
}