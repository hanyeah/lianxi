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
      // this.ySolve(vertexs, edges);
      console.log("----------------------------");
      this.zSolve(vertexs, edges);
    }

    /**
     * 回路阻抗法。
     * @param vertexs
     * @param edges
     */
    zSolve(vertexs: Vertex[], edges: Edge[]): void {
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
        graph = graphs[i];
        console.log("图" + i + ":", graph);
        this.zSolveGraph(graph);
      }
    }

    zSolveGraph(graph: Graph): void {
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
      // console.log("BT:");
      // MatrixMath.traceMatrix(BT);
      // console.log(ln);
      const BF: MatrixMath = BT.merge(IL);
      MatrixMath.traceMatrix(BF);

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
        Z.setElement(i, i, edge.Z);
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
      // console.log("BF");
      // MatrixMath.traceMatrix(BF);
      // console.log("BZ");
      // MatrixMath.traceMatrix(BZ);
      // console.log("BZA");
      // MatrixMath.traceMatrix(BZA);
      // console.log("BU");
      // MatrixMath.traceMatrix(BU);
      // console.log("BZI");
      // MatrixMath.traceMatrix(BZI);
      // console.log("BUBZI");
      // MatrixMath.traceMatrix(BUBZI);
      console.log("IB");
      MatrixMath.traceMatrix(IB);
    }

    /**
     * 导纳矩阵法。
     * @param vertexs
     * @param edges
     */
    ySolve(vertexs: Vertex[], edges: Edge[]): void {
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
        if (vertex0.index2 === -1) {
          graph.addVertex(vertex0);
        }
        if (vertex1.index2 === -1) {
          graph.addVertex(vertex1);
        }
        graph.addEdge(edge);
      }
      //
      for (let i: number = 0; i < graphs.length; i++) {
        graph = graphs[i];
        console.log("图" + i + ":", graph);
        this.ySolveGraph(graph);
      }
    }

    ySolveGraph(graph: Graph): void {
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
