/**
 * Created by hanyeah on 2019/8/13.
 */

namespace hanyeah.electricity {
  import DTwoTerminalElement = hanyeah.electricity.elecData.DTwoTerminalElement;
  import Edge = hanyeah.electricity.graph.Edge;
  import Vertex = hanyeah.electricity.graph.Vertex;
  import DTerminal = hanyeah.electricity.elecData.DTerminal;
  import Graph = hanyeah.electricity.graph.Graph;
  import MethodBase = hanyeah.electricity.calculaters.MethodBase;
  import ImpedanceMethod = hanyeah.electricity.calculaters.ImpedanceMethod;
  import AdmittanceMethod = hanyeah.electricity.calculaters.AdmittanceMethod;
  import ListMethod = hanyeah.electricity.calculaters.ListMethod;

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
          edge.R = ele.R;
          ele.index = n;
          n++;
          if (edge.vertex0.root !== edge.vertex1.root) {
            edge.vertex0.root.root = edge.vertex1.root;
          }
        }
      }
      // console.log(vertexs);
      // console.log(edges);

      // const method: MethodBase = new ImpedanceMethod();
      // method.solve(vertexs, edges);

      // const method: MethodBase = new AdmittanceMethod();
      // method.solve(vertexs, edges);
      const method: MethodBase = new ListMethod();
      method.solve(vertexs, edges);
    }
  }
}
