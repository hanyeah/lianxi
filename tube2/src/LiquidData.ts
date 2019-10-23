/**
 * Created by hanyeah on 2019/10/23.
 */
namespace hanyeah.tube{
  export class LiquidData{
    public static TYPE_AIR = 1;
    public static TYPE_WATER = 2;
    private static COUNTING = 0;
    public rho: number;
    public v: number;
    public color: number;
    public type: number;

    public static getWater(): LiquidData {
      return new LiquidData(LiquidData.TYPE_WATER, 1.0e3, 1, 0x000000);
    }

    public static getAir(): LiquidData {
      return new LiquidData(LiquidData.TYPE_AIR, 1.293, 1, 0xff0000);
    }

    constructor(type: number, rho: number, v: number, color: number) {
      this.rho = rho;
      this.v = v;
      this.color = color;
      this.type = type;
    }


    public clone(): LiquidData {
      return new LiquidData(this.type, this.rho, this.v, this.color);
    }
  }
}
