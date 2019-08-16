/**
 * Created by hanyeah on 2019/8/12.
 */
namespace hanyeah.electricity.graph {
  export class Edge extends HObject{
    public index: number = 0;
    public vertex0: Vertex;
    public vertex1: Vertex;
    public SU: number = 0;
    public SI: number = 0;
    public Y: number = 0;
    public Z: number = 0;
    constructor(index: number) {
      super();
      this.index = index;
    }
  }
}
