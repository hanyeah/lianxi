/**
 * Created by hanyeah on 2019/8/12.
 */
namespace hanyeah.electricity.graph {
  import EdgeType = hanyeah.electricity.consts.EdgeType;
  export class Edge extends HObject{
    public index: number = -1;
    public index2: number = -1;
    public vertex0: Vertex;
    public vertex1: Vertex;
    public SU: number = 0;
    public SI: number = 0;
    public R: number = 0;

    constructor(index: number) {
      super();
      this.index = index;
    }
  }
}
