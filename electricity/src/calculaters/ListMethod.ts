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
        // AT
        M.setElement(ri, r0, 1);
        M.setElement(ri, r1, -1);
        // I
        M.setElement(ri, ri, 1);
        // F
        switch (edge.type) {
          case EdgeType.L:
            M.setElement(ri, ni, -1);
            M.setElement(ni, ni, edge.R + edge.L);
            break;
          case EdgeType.C:
            M.setElement(ri, ni, edge.G + edge.C);
            M.setElement(ni, ni, -1);
            break;
          case EdgeType.VCVS:
            M.setElement(ri, ni, 1);
            M.setElement(ni, ni, 0);
            for (let j = 0; j < edge.u.length; j += 2) {
              M.setElement(ri, n0 + edge.u[j], -edge.u[j + 1]);
            }
            break;
          case EdgeType.VCCS:
            M.setElement(ri, ni, 0);
            M.setElement(ni, ni, 1);
            for (let j = 0; j < edge.g.length; j += 2) {
              M.setElement(ri, n0 + edge.g[j], -edge.g[j + 1]);
            }
            break;
          case EdgeType.CCVS:
            M.setElement(ri, ni, 1);
            M.setElement(ni, ni, 0);
            for (let j = 0; j < edge.r.length; j += 2) {
              M.setElement(ni, n0 + edge.r[j], -edge.r[j + 1]);
            }
            break;
          case EdgeType.CCCS:
            M.setElement(ri, ni, 0);
            M.setElement(ni, ni, 1);
            for (let j = 0; j < edge.b.length; j += 2) {
              M.setElement(ni, n0 + edge.b[j], -edge.b[j + 1]);
            }
            break;
          case EdgeType.M:
            M.setElement(ri, ni, 1);
            M.setElement(ni, ni, -edge.L);
            for (let j = 0; j < edge.m.length; j += 2) {
              M.setElement(ni, n0 + edge.m[j], -edge.m[j + 1]);
            }
            break;
          case EdgeType.N:
            M.setElement(ri, ni, 1);
            M.setElement(ni, ni, 0);
            for (let j = 0; j < edge.n.length; j += 2) {
              M.setElement(ri, n0 + edge.n[j], -edge.n[j + 1]);
            }
            break;
          case EdgeType.U:
            M.setElement(ri, ni, 1);
            M.setElement(ni, ni, 0);
            break;
          case EdgeType.I:
            M.setElement(ri, ni, 0);
            M.setElement(ni, ni, 1);
            break;
          default:
            break;
        }
        // M.setElement(ri, ni, edge.FKK);
        // ...
        // H
        // M.setElement(ni, ni, edge.HKK);
        // ...
        // Us + Is
        Y.setElement(ni, 0, edge.SU + edge.SI);
      }
    }


  }
}
