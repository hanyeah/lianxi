namespace hanyeah.circuit {
  export class World implements IWorld{
    private edges: IEdge[] = [];
    private vertexs: IVertex[] = [];
    private calculater: ICalculater = new Calculater(this);
    constructor(){
      
    }

    public destroy(): void {
      this.edges = null;
      this.vertexs = null;
      this.calculater = null;
    }

    public addEdge(edge: IEdge): void {
      this.add(this.edges, edge);
    }

    public removeEdge(edge: IEdge): void {
      this.remove(this.edges, edge);
    }

    public addVertex(vertex: IVertex): void {
      this.add(this.vertexs, vertex);
    }

    public removeVertex(vertex: IVertex): void {
      this.remove(this.vertexs, vertex);
    }

    public getEdges(): IEdge[] {
      return this.edges;
    }

    public getVertexs(): IVertex[] {
      return this.vertexs;
    }

    public calculate(): void {
      this.calculater.calculate();
    }

    private add<T>(arr: T[], ele: T): void {
      const ind: number = arr.indexOf(ele);
      if (ind === -1) {
        arr.push(ele);
      }
    }

    private remove<T>(arr: T[], ele: T): void {
      const ind: number = arr.indexOf(ele);
      if (ind !== -1) {
        arr.splice(ind, 1);
      }
    }

  }
}
