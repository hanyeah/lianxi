/**
 * Created by hanyeah on 2019/8/12.
 */

namespace hanyeah.electricity.graph {
  import UnionFindSet = hanyeah.electricity.elecData.UnionFindSet;

  export class Vertex extends UnionFindSet {
    public index: number = -1;
    public index2: number = -1;
    public graphIndex: number = -1;
    constructor(index: number) {
      super();
      this.index = index;
    }
  }
}
