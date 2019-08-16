/**
 * Created by hanyeah on 2019/8/13.
 */
namespace hanyeah.electricity {
  import DTwoTerminalElement = hanyeah.electricity.elecData.DTwoTerminalElement;
  import Edge = hanyeah.electricity.graph.Edge;
  import Vertex = hanyeah.electricity.graph.Vertex;
  import DTerminal = hanyeah.electricity.elecData.DTerminal;

  export class ElectricityCalculater {
    constructor() {

    }

    calculate(elements: Array<DTwoTerminalElement>) {
      const len: number = elements.length;
      let ele: DTwoTerminalElement;
      let terminal0: DTerminal;
      let terminal1: DTerminal;
      // -------------初始化index-------------
      for (let i: number = 0; i < len; i++) {
        ele = elements[i];
        ele.terminal0.index = -1;
        ele.terminal1.index = -1;
      }
      // ------------生成顶点Map---------
      const vertexs: Array<Vertex> = [];
      let n: number = 0;
      for (let i: number = 0; i < len; i++) {
        ele = elements[i];
        terminal0 = ele.terminal0.root;
        terminal1 = ele.terminal1.root;
        if (terminal0.index === -1) {
          vertexs[n] = new Vertex(n);
          terminal0.index = n;
          n++;
        }
        if (terminal1.index === -1) {
          vertexs[n] = new Vertex(n);
          terminal1.index = n;
          n++;
        }
      }
      // ------------生成边Map------------
      const edges: Array<Edge> = [];
      n = 0;
      let edge: Edge;
      for (let i: number = 0; i < len; i++) {
        ele = elements[i];
        if (ele.isBreak) {
          continue;
        }
        terminal0 = ele.terminal0.root;
        terminal1 = ele.terminal1.root;
        if (terminal0 !== terminal1) {
          edge = new Edge(n);
          edge.vertex0 = vertexs[terminal0.index];
          edge.vertex1 = vertexs[terminal1.index];
          edges[n] = edge;
          edge.SU = ele.SU;
          edge.SI = ele.SI;
          edge.Y = ele.getY(0);
          edge.Z = ele.getZ(0);
          ele.index = n;
          n++;
        }
      }
      console.log(vertexs);
      console.log(edges);

      const rows: number = vertexs.length;
      const cols: number = edges.length;
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
        A.setElement(edge.vertex0.index, i, 1);
        A.setElement(edge.vertex1.index, i, -1);
        US.setElement(i, 0, edge.SU);
        IS.setElement(i, 0, edge.SI);
        Y.setElement(i, i, edge.Y);
      }
      MatrixMath.traceMatrix(A);
      MatrixMath.traceMatrix(US);
      MatrixMath.traceMatrix(IS);
      MatrixMath.traceMatrix(Y);
      // A·Y·AT·UN = A·IS - A·Y·US;
      // 其中YN = A·Y·AT;
      const AT: MatrixMath = A.transpose();
      const AY: MatrixMath = A.multiply(Y);
      const YN: MatrixMath = AY.multiply(AT);
      const AIS: MatrixMath = A.multiply(IS);
      const AYUS: MatrixMath = AY.multiply(US);
      const UN: MatrixMath = MatrixMath.GaussSolution(YN, AIS.sub(AYUS));
      // MatrixMath.traceMatrix(AY);
      // MatrixMath.traceMatrix(YN);
      MatrixMath.traceMatrix(UN);
    }

  }
}
