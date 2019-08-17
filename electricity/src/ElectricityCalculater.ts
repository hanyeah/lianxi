/**
 * Created by hanyeah on 2019/8/13.
 */

namespace hanyeah.electricity {
  import DTwoTerminalElement = hanyeah.electricity.elecData.DTwoTerminalElement;
  import Edge = hanyeah.electricity.graph.Edge;
  import Vertex = hanyeah.electricity.graph.Vertex;
  import DTerminal = hanyeah.electricity.elecData.DTerminal;
  import Graph = hanyeah.electricity.graph.Graph;

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
      const vertexs: Vertex[] = [];
      let n: number = 0;
      for (let i: number = 0; i < len; i++) {
        ele = elements[i];
        terminal0 = ele.terminal0.root as DTerminal;
        terminal1 = ele.terminal1.root as DTerminal;
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
      const edges: Edge[] = [];
      n = 0;
      let edge: Edge;
      for (let i: number = 0; i < len; i++) {
        ele = elements[i];
        if (ele.isBreak) {
          continue;
        }
        terminal0 = ele.terminal0.root as DTerminal;
        terminal1 = ele.terminal1.root as DTerminal;
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
          if (edge.vertex0.root !== edge.vertex1.root) {
            edge.vertex0.root.root = edge.vertex1.root;
          }
        }
      }
      // console.log(vertexs);
      // console.log(edges);
      //
      const vLen: number = vertexs.length;
      const eLen: number = edges.length;
      let vertex0: Vertex;
      let vertex1: Vertex;
      n = 0;
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
        if (vertex0.index2 === -1) {
          graph.addVertex(vertex0);
        }
        if (vertex1.index2 === -1) {
          graph.addVertex(vertex1);
        }
        graph.addEdge(edge);
      }
      //
      for (let i: number = 0; i < graphs.length; i++){
        graph = graphs[i];
        console.log("图" + i + ":", graph);
        this.solveGraph(graph.getVertexs(), graph.getEdges());
      }
    }

    solveGraph(vertexs: Vertex[], edges: Edge[]): void {
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
        Y.setElement(i, i, edge.Y);
      }
      console.log("A");
      MatrixMath.traceMatrix(A);
      // console.log("US");
      // MatrixMath.traceMatrix(US);
      // console.log("IS");
      // MatrixMath.traceMatrix(IS);
      // console.log("Y");
      // MatrixMath.traceMatrix(Y);
      // A·Y·AT·UN = A·IS - A·Y·US;
      // 其中YN = A·Y·AT;
      const AT: MatrixMath = A.transpose();
      const AY: MatrixMath = A.multiply(Y);
      const YN: MatrixMath = AY.multiply(AT);
      const AIS: MatrixMath = A.multiply(IS);
      const AYUS: MatrixMath = AY.multiply(US);
      const UN: MatrixMath = MatrixMath.GaussSolution(YN, AIS.clone().sub(AYUS));
      // console.log("AT");
      // MatrixMath.traceMatrix(AT);
      // console.log("AY");
      // MatrixMath.traceMatrix(AY);
      // console.log("YN");
      // MatrixMath.traceMatrix(YN);
      // console.log("AIS");
      // MatrixMath.traceMatrix(AIS);
      // console.log("AYUS");
      // MatrixMath.traceMatrix(AYUS);
      // console.log("UN");
      MatrixMath.traceMatrix(UN);
    }

  }
}
