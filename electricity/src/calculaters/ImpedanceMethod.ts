/**
 * Created by hanyeah on 2019/8/22.
 * 回路阻抗法。
 */
namespace hanyeah.electricity.calculaters {
  import Vertex = hanyeah.electricity.graph.Vertex;
  import Edge = hanyeah.electricity.graph.Edge;
  import Graph = hanyeah.electricity.graph.Graph;
  export class ImpedanceMethod extends MethodBase {
    constructor() {
      super();
    }

    /**
     *
     * @param vertexs
     * @param edges
     */
    solve(vertexs: Vertex[], edges: Edge[]): void {
      // 连通图
      const vLen: number = vertexs.length;
      const eLen: number = edges.length;
      let vertex0: Vertex;
      let vertex1: Vertex;
      let n: number = 0;
      let edge: Edge;
      const graphs: Graph[] = [];
      let graph: Graph;
      let vertex;
      for (let i: number = 0; i < eLen; i++) {
        edge = edges[i];
        vertex0 = edge.vertex0;
        vertex1 = edge.vertex1;
        vertex = vertex0.root as Vertex;
        if (vertex.graphIndex === -1) {
          graph = new Graph(n);
          graphs[n] = graph;
          vertex.graphIndex = n;
          n++;
        } else {
          graph = graphs[vertex.graphIndex];
        }
        if (vertex0.index2 === -1 || vertex1.index2 === -1) {
          graph.addTEdge(edge);
        } else {
          graph.addLEdge(edge);
        }
        if (vertex0.index2 === -1) {
          graph.addVertex(vertex0);
        }
        if (vertex1.index2 === -1) {
          graph.addVertex(vertex1);
        }
      }
      //
      for (let i: number = 0; i < graphs.length; i++) {
        this.solveGraph(graphs[i]);
      }
    }

    solveGraph(graph: Graph): void {
      const vertexs: Vertex[] = graph.getVertexs();
      const tEdges: Edge[] = graph.getTEdges();
      const lEdges: Edge[] = graph.getLEdges();
      const vn: number = graph.getVn() - 1;
      const tn: number = graph.getTn();
      const ln: number = graph.getLn();
      const AT: MatrixMath = new MatrixMath(vn, tn);
      const AL: MatrixMath = new MatrixMath(vn, ln);
      let edge: Edge;
      for (let i: number = 0; i < tn; i++) {
        edge = tEdges[i];
        AT.setElement(edge.vertex0.index2, i, 1);
        AT.setElement(edge.vertex1.index2, i, -1);
      }
      for (let i: number = 0; i < ln; i++) {
        edge = lEdges[i];
        AL.setElement(edge.vertex0.index2, i, 1);
        AL.setElement(edge.vertex1.index2, i, -1);
      }
      // BF=[BT, IL]=[-(AT¹·AL)',IL]
      const BT: MatrixMath = AT.inverse().multiply(AL).transpose();
      BT.scalar(-1);
      const IL: MatrixMath = new MatrixMath(ln, ln);
      IL.identity();
      const BF: MatrixMath = BT.merge(IL);
      //
      const en: number = tn + ln;
      const edges: Edge[] = tEdges.concat(lEdges);
      // 关联矩阵。
      const A: MatrixMath = new MatrixMath(vn, en);
      // 支路电压源矩阵
      const US: MatrixMath = new MatrixMath(en, 1);
      // 支路电流源矩阵
      const IS: MatrixMath = new MatrixMath(en, 1);
      // 支路导纳矩阵
      const Z: MatrixMath = new MatrixMath(en, en);
      for (let i: number = 0; i < en; i++) {
        edge = edges[i];
        A.setElement(edge.vertex0.index2, i, 1);
        A.setElement(edge.vertex1.index2, i, -1);
        US.setElement(i, 0, edge.SU);
        IS.setElement(i, 0, edge.SI);
        Z.setElement(i, i, edge.R);
      }
      //
      const BZ: MatrixMath = BF.multiply(Z);
      BF.resize(en, en);
      BZ.resize(en, en);
      const BZA: MatrixMath = BZ.clone();
      BZA.insert(A, en - vn, 0);
      const BU: MatrixMath = BF.multiply(US);
      const BZI: MatrixMath = BZ.multiply(IS);
      const BUBZI: MatrixMath = BU.clone().sub(BZI);
      const IB: MatrixMath = MatrixMath.GaussSolution(BZA, BUBZI);
      console.log("IB");
      MatrixMath.traceMatrix(IB);
      // 给边和节点设置计算好的电流电压。
      for (let i: number = 0; i < en; i++) {
        edge = edges[i];
        edge.I = IB.getElement(i, 0);
        edge.U = edge.R * edge.I;
      }
      // 不知道结点电压
    }
  }
}
