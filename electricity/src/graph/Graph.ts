/**
 * 图。
 */
namespace hanyeah.electricity.graph {

  export class Graph extends HObject {
    public index: number = -1;
    private vertexs: Vertex[] = [];
    private edges: Edge[] = [];
    private vn: number = 0;
    private en: number = 0;

    constructor(index: number) {
      super();
      this.index = index;
    }

    addEdge(edge: Edge): void {
      this.edges[this.en] = edge;
      edge.index2 = this.en;
      this.en++;
    }

    addVertex(vertex: Vertex): void {
      this.vertexs[this.vn] = vertex;
      vertex.index2 = this.vn;
      this.vn++;
    }

    getEn(): number {
      return this.en;
    }

    getVn(): number {
      return this.vn;
    }

    getVertexs(): Vertex[] {
      return this.vertexs;
    }

    getEdges(): Edge[] {
      return this.edges;
    }

  }
}
