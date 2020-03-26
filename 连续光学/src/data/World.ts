namespace hanyeah {
  export class World {
    public calculater: Calculater = new Calculater();
    private lightDataArr: LightData[] = [];
    private sagmentDataArr: Segment[] = [];
    constructor() {

    }

    public addLight(data: LightData): void {
      this.lightDataArr.push(data);
    }

    public removeLight(data: LightData): void {
      const ind: number = this.lightDataArr.indexOf(data);
      if (ind !== -1) {
        this.lightDataArr.splice(ind, 1);
      }
    }

    public addSegment(data: Segment): void {
      this.sagmentDataArr.push(data);
    }

    public removeSegment(data: Segment): void {
      const ind: number = this.sagmentDataArr.indexOf(data);
      if (ind !== -1) {
        this.sagmentDataArr.splice(ind, 1);
      }
    }

    public getAllLights(): LightData[] {
      return this.lightDataArr;
    }

    public getAllSegments(): Segment[] {
      return this.sagmentDataArr;
    }

    public calculate(): QuadData[] {
      return this.calculater.calculate(this);
    }
  }
}