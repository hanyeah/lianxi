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
      // ------------顶点合并-----------
      for (let i: number = 0; i < len; i++) {
        ele = elements[i];
        if (ele.isShortCircuit) {
          terminal0 = ele.terminal0.root2;
          terminal1 = ele.terminal1.root2;
          if (terminal0 !== terminal1) {
            terminal0.root2 = terminal1;
          }
        }
      }
      // ------------生成顶点Map---------
      const vertexMap: Object = {};
      for (let i: number = 0; i < len; i++) {
        ele = elements[i];
        terminal0 = ele.terminal0.root2;
        terminal1 = ele.terminal1.root2;
        if (!vertexMap[terminal0.UID]) {
          vertexMap[terminal0.UID] = new Vertex();
        }
        if (!vertexMap[terminal1.UID]) {
          vertexMap[terminal1.UID] = new Vertex();
        }
      }
      // ------------生成边Map------------
      const edgeMap: Object = {};
      for (let i: number = 0; i < len; i++) {
        ele = elements[i];
        if (ele.isBreak) {
          continue;
        }
        terminal0 = ele.terminal0.root2;
        terminal1 = ele.terminal1.root2;
        if (terminal0 !== terminal1) {
          edgeMap[ele.UID] = new Edge();
        }
      }

      console.log(vertexMap);
      console.log(edgeMap);
    }

  }
}
