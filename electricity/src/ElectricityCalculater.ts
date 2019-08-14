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
          vertexs[n] = new Vertex();
          terminal0.index = n;
          n++;
        }
        if (terminal1.index === -1) {
          vertexs[n] = new Vertex();
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
          edge = new Edge();
          edge.vertex0 = vertexs[terminal0.index];
          edge.vertex1 = vertexs[terminal1.index];
          edges[n] = edge;
          ele.index = n;
          n++;
        }
      }
      console.log(vertexs);
      console.log(edges);
    }

  }
}
