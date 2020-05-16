namespace hanyeah.circuit {
  export class Calculater implements ICalculater {
    private world: IWorld;
    constructor(world: IWorld){
      this.world = world;
    }

    public destroy(): void {
      this.world = null;
    }

    public calculate(): void {
      console.log(this.world.getEdges());
      console.log(this.world.getVertexs());
      const edges: IEdge[] = this.world.getEdges();
      const vertexs: IVertex[] = this.world.getVertexs();
      let edge: IEdge;
      let vertex: IVertex;

      const cEdges: ICalcEdge[] = [];
      const cVertex: ICalcVertex[] = [];
      // 初始化
      for (let i: number = 0; i < vertexs.length; i++) {
        cVertex[i] = {index: i, root: i};
      }
      // 并查
      for (let i: number = 0; i < vertexs.length; i++) {
        vertex = vertexs[i];
        if (cVertex[vertex.index].root === cVertex[vertex.index].index) {
          while (vertex.next !== vertexs[i]) {
            cVertex[vertex.next.index].root = cVertex[vertexs[i].index].root;
            vertex = vertex.next;
          }
        }
      }
      //
      for () {

      }
    }
  }

  interface ICalcEdge {
    index: number;
    root: number;
  }

  interface ICalcVertex {
    index: number;
    root: number;
  }
}
