/**
 * 图。
 */
namespace hanyeah.electricity.graph {

  export class Graph extends HObject {
    public index: number = -1;
    private vertexs: Vertex[] = [];
    private edges: Edge[] = [];
    private tEdges: Edge[] = [];
    private lEdges: Edge[] = [];
    private vn: number = 0;
    private en: number = 0;
    private tn: number = 0;
    private ln: number = 0;

    constructor(index: number) {
      super();
      this.index = index;
    }

    addEdge(edge: Edge): void {
      this.edges[this.en] = edge;
      edge.index2 = this.en;
      this.en++;
    }

    addTEdge(edge: Edge): void {
      this.tEdges[this.tn] = edge;
      edge.index2 = this.tn;
      this.tn++;
    }

    addLEdge(edge: Edge): void {
      this.lEdges[this.ln] = edge;
      edge.index2 = this.ln;
      this.ln++;
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

    getTn(): number {
      return this.tn;
    }

    getLn(): number {
      return this.ln;
    }

    getVertexs(): Vertex[] {
      return this.vertexs;
    }

    getEdges(): Edge[] {
      return this.edges;
    }

    getTEdges(): Edge[] {
      return this.tEdges;
    }

    getLEdges(): Edge[] {
      return this.lEdges;
    }

  }
}
