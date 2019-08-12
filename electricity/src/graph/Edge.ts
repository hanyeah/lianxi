/**
 * Created by hanyeah on 2019/8/12.
 */
///<reference path="../HObject.ts" />
namespace hanyeah.electricity.graph {
  export class Edge extends HObject{
    public vertex1;
    public vertex2;
    constructor() {
      super();
      this.vertex1 = new Vertex();
      this.vertex2 = new Vertex();
    }
  }
}
