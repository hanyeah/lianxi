/**
 * Created by hanyeah on 2019/8/12.
 */
namespace hanyeah.electricity {
  export class HObject {
    private static COUNTING: number = 1;
    private static TIME: number = 0; // new Date().getTime();
    public UID: number = HObject.TIME + (HObject.COUNTING++);

    constructor() {

    }

    destroy() {
     //
    }
  }
}
