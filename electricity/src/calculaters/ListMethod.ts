/**
 * Created by hanyeah on 2019/8/22.
 * 列表法。
 */
namespace hanyeah.electricity.calculaters {
  import Vertex = hanyeah.electricity.graph.Vertex;
  import Edge = hanyeah.electricity.graph.Edge;
  import Graph = hanyeah.electricity.graph.Graph;
  import EdgeType = hanyeah.electricity.consts.EdgeType;
  export class ListMethod extends MethodBase {
    constructor() {
      super();
    }

    solveGraph(graph: Graph): void {
      const vertexs: Vertex[] = graph.getVertexs();
      const edges: Edge[] = graph.getEdges();
      const rows: number = vertexs.length - 1;
      const cols: number = edges.length;
      let edge: Edge;
      const n0: number = rows + cols;
      const n: number = n0 + cols;
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
        ni = n0 + i;
        // A
        M.setElement(r0, ni, 1);
        M.setElement(r1, ni, -1);
        // -AT
        M.setElement(ri, r0, -1);
        M.setElement(ri, r1, 1);
        // I
        M.setElement(ri, ri, 1);
        // F
        if (edge.SU) {
          M.setElement(ni, ri, 1);
          M.setElement(ni, ni, 0);
        } else if (edge.SI) {
          M.setElement(ni, ri, 0);
          M.setElement(ni, ni, 1);
        } else if (edge.R === 0) {
          M.setElement(ni, ri, -1);
          M.setElement(ni, ni, edge.R);
        } else {
          M.setElement(ni, ri, 1 / edge.R);
          M.setElement(ni, ni, -1);
        }
        // Us + Is
        Y.setElement(ni, 0, edge.SU + edge.SI);
      }
      console.log("M:");
      MatrixMath.traceMatrix(M);
      console.log("Y:");
      MatrixMath.traceMatrix(Y);
      const X: MatrixMath = MatrixMath.GaussSolution(M, Y);
      console.log("x:");
      MatrixMath.traceMatrix(X);
      // 给边和节点设置计算好的电流电压。
      let vertex: Vertex;
      for (let i: number = 0; i <= rows; i++) {
        vertex = vertexs[i];
        vertex.U = X.getElement(vertex.index2, 0);
      }
      for (let i: number = 0; i < cols; i++) {
        edge = edges[i];
        edge.U = X.getElement(rows + i, 0);
        edge.I = X.getElement(n0 + i, 0);
      }
    }
  }
}
