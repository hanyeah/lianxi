namespace hanyeah {
  export class Utils{

    public static formatAngle(ang: number, ang0: number): number {
      ang = -(ang - ang0);
      if (ang > Math.PI) {
        ang -= Math.PI * 2;
      } else if (ang < -Math.PI) {
        ang += Math.PI * 2;
      }
      return ang;
    }

  }
}