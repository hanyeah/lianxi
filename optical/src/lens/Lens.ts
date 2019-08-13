/**
 * Created by hanyeah on 2019/7/15.
 */
namespace hanyeah.optical.lens {
  import Shape = hanyeah.optical.geom.Shape;
  export class Lens extends Shape implements ILens {
    public f: number = 100;
    public n: number = 1.5;
    constructor() {
      super();
    }
  }
}
