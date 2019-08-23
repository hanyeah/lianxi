/**
 * Created by hanyeah on 2019/8/22.
 * 列表法。
 */
namespace hanyeah.electricity.calculaters{
  import Vertex = hanyeah.electricity.graph.Vertex;
  import Edge = hanyeah.electricity.graph.Edge;
  import Graph = hanyeah.electricity.graph.Graph;
  export class ListMethod extends MethodBase{
    constructor() {
      super();
    }

    solveGraph(graph: Graph): void {
      const vertexs: Vertex[] = graph.getVertexs();
      const edges: Edge[] = graph.getEdges();
      const rows: number = vertexs.length - 1;
      const cols: number = edges.length;
      let edge: Edge;
      const n1: number = rows + cols;
      const n: number =  n1 + cols;
      const M: MatrixMath = new MatrixMath(n, n);
      const Y: MatrixMath = new MatrixMath(n, 1);
      let r0: number;
      let r1: number;
      let ri: number;
      let ni: number;
      for (let i: number = 0; i < cols; i++) {
        edge = edges[i];
        r0 = edge.vertex0.index2;
        r1 = edge.vertex1.index2;
        ri = rows + i;
        ni = n1 + i;
        // A
        M.setElement(r0, ni, 1);
        M.setElement(r1, ni, -1);
        // AT
        M.setElement(ri, r0, 1);
        M.setElement(ri, r1, -1);
        // I
        M.setElement(ri, ri, 1);
        // F
        M.setElement(ri, ni, edge.FKK);
        // ...
        // K
        M.setElement(ni, ni, edge.HKK);
        // ...
        // Us + Is
        Y.setElement(ni, 0, edge.SU + edge.SI);
      }
    }
  }
}
