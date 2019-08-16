/**
 * Created by hanyeah on 2019/8/12.
 */
namespace hanyeah.electricity.graph {
  export class Vertex extends HObject {
    public index: number = 0;
    constructor(index: number) {
      super();
      this.index = index;
    }
  }
}
