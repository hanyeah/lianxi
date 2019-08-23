/**
 * Created by hanyeah on 2019/8/22.
 */
namespace hanyeah.electricity.calculaters{
  import Vertex = hanyeah.electricity.graph.Vertex;
  import Edge = hanyeah.electricity.graph.Edge;
  import Graph = hanyeah.electricity.graph.Graph;
  export class MethodBase extends HObject{
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
        this.solveGraph(graphs[i]);
      }
    }
    solveGraph(graph: Graph): void{
      //
    }
  }
}
