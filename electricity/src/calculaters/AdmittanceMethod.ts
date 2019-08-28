/**
 * Created by hanyeah on 2019/8/22.
 * 导纳矩阵法。
 */
namespace hanyeah.electricity.calculaters {
  import Vertex = hanyeah.electricity.graph.Vertex;
  import Edge = hanyeah.electricity.graph.Edge;
  import Graph = hanyeah.electricity.graph.Graph;
  export class AdmittanceMethod extends MethodBase {
    constructor() {
      super();
    }

    solveGraph(graph: Graph): void {
      const vertexs: Vertex[] = graph.getVertexs();
      const edges: Edge[] = graph.getEdges();
      const rows: number = vertexs.length - 1;
      const cols: number = edges.length;
      let edge: Edge;
      // 关联矩阵。
      const A: MatrixMath = new MatrixMath(rows, cols);
      // 支路电压源矩阵
      const US: MatrixMath = new MatrixMath(cols, 1);
      // 支路电流源矩阵
      const IS: MatrixMath = new MatrixMath(cols, 1);
      // 支路导纳矩阵
      const Y: MatrixMath = new MatrixMath(cols, cols);
      for (let i: number = 0; i < cols; i++) {
        edge = edges[i];
        A.setElement(edge.vertex0.index2, i, 1);
        A.setElement(edge.vertex1.index2, i, -1);
        US.setElement(i, 0, edge.SU);
        IS.setElement(i, 0, edge.SI);
        Y.setElement(i, i, edge.R === 0 ? 1e6 : 1 / edge.R);
      }
      // A·Y·AT·UN = A·IS - A·Y·US;
      // 其中YN = A·Y·AT;
      const AT: MatrixMath = A.transpose();
      const AY: MatrixMath = A.multiply(Y);
      const YN: MatrixMath = AY.multiply(AT);
      const AIS: MatrixMath = A.multiply(IS);
      const AYUS: MatrixMath = AY.multiply(US);
      const UN: MatrixMath = MatrixMath.GaussSolution(YN, AIS.clone().sub(AYUS));
      console.log("UN");
      MatrixMath.traceMatrix(UN);
    }
  }
}

